import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProject, deleteProject } from '../api';

const statusLabels = {
  draft: { label: 'Borrador', color: 'default' },
  in_progress: { label: 'En Progreso', color: 'info' },
  completed: { label: 'Completado', color: 'success' },
  cancelled: { label: 'Cancelado', color: 'error' },
};

const priorityLabels = {
  low: { label: 'Baja', color: 'success' },
  medium: { label: 'Media', color: 'warning' },
  high: { label: 'Alta', color: 'error' },
};

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await getProject(id);
      setProject(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar proyecto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(id);
      navigate('/projects');
    } catch (err) {
      setError('Error al eliminar proyecto: ' + err.message);
      setDeleteDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-CL', {
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-CL', {
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Proyecto no encontrado'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
        >
          Volver a Proyectos
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
        >
          Volver
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/projects/${id}/edit`)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Eliminar
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {project.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip
              label={statusLabels[project.status].label}
              color={statusLabels[project.status].color}
            />
            <Chip
              label={priorityLabels[project.priority].label}
              color={priorityLabels[project.priority].color}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {project.description || 'Sin descripción'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Fecha de Inicio
              </Typography>
              <Typography variant="body1">
                {formatDate(project.start_date)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Fecha de Fin
              </Typography>
              <Typography variant="body1">
                {formatDate(project.end_date)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Fecha de Vencimiento
              </Typography>
              <Typography variant="body1">
                {formatDate(project.due_date)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Presupuesto
              </Typography>
              <Typography variant="body1">
                {project.budget ? `$${project.budget.toLocaleString('es-ES', { minimumFractionDigits: 2 })}` : 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Fecha de Creación
              </Typography>
              <Typography variant="body2">
                {formatDateTime(project.created_at)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Última Actualización
              </Typography>
              <Typography variant="body2">
                {formatDateTime(project.updated_at)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Dialog de confirmación de eliminación */}
      <Dialog
        open={deleteDialog}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro/a de que deseas eliminar el proyecto "{project?.title}"?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

