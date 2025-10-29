import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProjects, deleteProject } from '../api';

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

export default function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, project: null });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar proyectos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteDialog.project.id);
      setProjects(projects.filter(p => p.id !== deleteDialog.project.id));
      setDeleteDialog({ open: false, project: null });
    } catch (err) {
      setError('Error al eliminar proyecto: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-CL', {
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Proyectos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/projects/create')}
        >
          Crear Proyecto
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {projects.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay proyectos creados
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Comienza creando tu primer proyecto
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/projects/create')}
            >
              Crear Primer Proyecto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description || 'Sin descripción'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip
                      label={statusLabels[project.status].label}
                      color={statusLabels[project.status].color}
                      size="small"
                    />
                    <Chip
                      label={priorityLabels[project.priority].label}
                      color={priorityLabels[project.priority].color}
                      size="small"
                    />
                  </Box>
                  {project.due_date && (
                    <Typography variant="caption" color="text.secondary">
                      Vence: {formatDate(project.due_date)}
                    </Typography>
                  )}
                  {project.budget && (
                    <Typography variant="caption" display="block" color="text.secondary">
                      Presupuesto: ${project.budget.toLocaleString()}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/projects/${project.id}`)}
                      title="Ver detalles"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/projects/${project.id}/edit`)}
                      title="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleteDialog({ open: true, project })}
                    title="Eliminar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog de confirmación de eliminación */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, project: null })}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro/a de que deseas eliminar el proyecto "{deleteDialog.project?.title}"?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, project: null })}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

