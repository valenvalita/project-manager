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
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { createProject, updateProject, getProject, getUsers } from '../api';

const statuses = [
  { value: 'draft', label: 'Borrador' },
  { value: 'in_progress', label: 'En Progreso' },
  { value: 'completed', label: 'Completado' },
  { value: 'cancelled', label: 'Cancelado' },
];

const priorities = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
];

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'draft',
    priority: 'medium',
    start_date: '',
    end_date: '',
    due_date: '',
    budget: '',
    assigned_to_id: '',
  });

  useEffect(() => {
    loadUsers();
    if (isEditing) {
      loadProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.filter(user => user.is_active)); // Solo usuarios activos
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

  const loadProject = async () => {
    try {
      setLoading(true);
      const project = await getProject(id);
      // Formatear las fechas para el input type="date"
      setFormData({
        title: project.title,
        description: project.description || '',
        status: project.status,
        priority: project.priority,
        start_date: project.start_date ? project.start_date.split('T')[0] : '',
        end_date: project.end_date ? project.end_date.split('T')[0] : '',
        due_date: project.due_date ? project.due_date.split('T')[0] : '',
        budget: project.budget || '',
        assigned_to_id: project.assigned_to_id || '',
      });
      setError(null);
    } catch (err) {
      setError('Error al cargar proyecto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Preparar datos para enviar (convertir fechas y números)
      const dataToSend = {
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        priority: formData.priority,
        start_date: formData.start_date ? `${formData.start_date}T00:00:00` : null,
        end_date: formData.end_date ? `${formData.end_date}T00:00:00` : null,
        due_date: formData.due_date ? `${formData.due_date}T00:00:00` : null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        assigned_to_id: formData.assigned_to_id ? parseInt(formData.assigned_to_id) : null,
      };

      if (isEditing) {
        await updateProject(id, dataToSend);
      } else {
        await createProject(dataToSend);
      }

      navigate('/projects');
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
        {isEditing ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Estado"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={saving}
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Prioridad"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  disabled={saving}
                >
                  {priorities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Asignado a"
                  name="assigned_to_id"
                  value={formData.assigned_to_id}
                  onChange={handleChange}
                  disabled={saving}
                  helperText="Usuario responsable del proyecto"
                >
                  <MenuItem value="">
                    <em>Sin asignar</em>
                  </MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Fecha de Inicio"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Fecha de Fin"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Fecha de Vencimiento"
                  name="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Presupuesto"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  disabled={saving}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => navigate('/projects')}
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

