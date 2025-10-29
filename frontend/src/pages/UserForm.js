import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
  FormControlLabel,
  Switch,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { createUser, updateUser, getUser } from '../api';

const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'manager', label: 'Manager' },
  { value: 'user', label: 'Usuario' },
];

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    is_active: true,
  });

  useEffect(() => {
    if (isEditing) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const user = await getUser(id);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      });
      setError(null);
    } catch (err) {
      setError('Error al cargar usuario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'is_active' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!formData.email.trim()) {
      setError('El email es obligatorio');
      return;
    }

    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El email no es válido');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        is_active: formData.is_active,
      };

      if (isEditing) {
        await updateUser(id, dataToSend);
      } else {
        await createUser(dataToSend);
      }

      navigate('/users');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={saving}
                  placeholder="Ej: Juan Pérez"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={saving}
                  placeholder="usuario@ejemplo.com"
                  helperText={isEditing ? "Asegúrate de que el email sea único" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Rol"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={saving}
                  helperText="Define los permisos del usuario"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={handleChange}
                      name="is_active"
                      disabled={saving}
                      color="primary"
                    />
                  }
                  label={formData.is_active ? "Usuario Activo" : "Usuario Inactivo"}
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Los usuarios inactivos no pueden acceder al sistema
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => navigate('/users')}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

