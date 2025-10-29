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
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Collapse,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import { getProjects, deleteProject, getUsers } from '../api';

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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, project: null });
  
  // Estados para filtros
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [userFilter, setUserFilter] = useState(''); // Filtro por usuario
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProjects();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

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

  // Función para filtrar proyectos
  const filteredProjects = projects.filter((project) => {
    // Filtro por texto (búsqueda en título y descripción)
    const matchesSearch = searchText === '' || 
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchText.toLowerCase()));
    
    // Filtro por estado
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(project.status);
    
    // Filtro por prioridad
    const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(project.priority);
    
    // Filtro por usuario asignado
    const matchesUser = userFilter === '' || 
      userFilter === 'unassigned' ? !project.assigned_to_id :
      project.assigned_to_id === parseInt(userFilter);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesUser;
  });

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchText('');
    setStatusFilter([]);
    setPriorityFilter([]);
    setUserFilter('');
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = searchText !== '' || statusFilter.length > 0 || priorityFilter.length > 0 || userFilter !== '';

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

      {/* Sección de filtros */}
      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: showFilters ? 2 : 0 }}>
          <TextField
            fullWidth
            placeholder="Buscar por título o descripción..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <Button
            variant={showFilters ? 'contained' : 'outlined'}
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtros
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outlined"
              onClick={clearFilters}
              size="small"
            >
              Limpiar
            </Button>
          )}
        </Box>

        <Collapse in={showFilters}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {/* Filtro por Estado */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Estado
              </Typography>
              <ToggleButtonGroup
                value={statusFilter}
                onChange={(e, newStatus) => setStatusFilter(newStatus)}
                aria-label="filtro de estado"
                size="small"
              >
                <ToggleButton value="draft" aria-label="borrador">
                  Borrador
                </ToggleButton>
                <ToggleButton value="in_progress" aria-label="en progreso">
                  En Progreso
                </ToggleButton>
                <ToggleButton value="completed" aria-label="completado">
                  Completado
                </ToggleButton>
                <ToggleButton value="cancelled" aria-label="cancelado">
                  Cancelado
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Filtro por Prioridad */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Prioridad
              </Typography>
              <ToggleButtonGroup
                value={priorityFilter}
                onChange={(e, newPriority) => setPriorityFilter(newPriority)}
                aria-label="filtro de prioridad"
                size="small"
              >
                <ToggleButton value="low" aria-label="baja">
                  Baja
                </ToggleButton>
                <ToggleButton value="medium" aria-label="media">
                  Media
                </ToggleButton>
                <ToggleButton value="high" aria-label="alta">
                  Alta
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Filtro por Usuario Asignado */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PersonIcon fontSize="small" />
                Asignado a
              </Typography>
              <TextField
                select
                size="small"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                sx={{ minWidth: 250 }}
                SelectProps={{
                  displayEmpty: true,
                }}
              >
                <MenuItem value="">
                  <em>Todos los proyectos</em>
                </MenuItem>
                <MenuItem value="unassigned">
                  Sin asignar
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} {!user.is_active && '(Inactivo)'}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Collapse>

        {/* Resumen de filtros activos */}
        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Filtros activos:
            </Typography>
            {searchText && (
              <Chip
                label={`Búsqueda: "${searchText}"`}
                size="small"
                onDelete={() => setSearchText('')}
              />
            )}
            {statusFilter.map((status) => (
              <Chip
                key={status}
                label={`Estado: ${statusLabels[status].label}`}
                size="small"
                onDelete={() => setStatusFilter(statusFilter.filter(s => s !== status))}
              />
            ))}
            {priorityFilter.map((priority) => (
              <Chip
                key={priority}
                label={`Prioridad: ${priorityLabels[priority].label}`}
                size="small"
                onDelete={() => setPriorityFilter(priorityFilter.filter(p => p !== priority))}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Contador de resultados */}
      {projects.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Mostrando {filteredProjects.length} de {projects.length} proyectos
        </Typography>
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
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron proyectos
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              No hay proyectos que coincidan con los filtros seleccionados
            </Typography>
            <Button
              variant="outlined"
              onClick={clearFilters}
            >
              Limpiar filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
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

