import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getProjects } from '../api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    in_progress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const projects = await getProjects();
      const stats = {
        total: projects.length,
        draft: projects.filter(p => p.status === 'draft').length,
        in_progress: projects.filter(p => p.status === 'in_progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
      };
      setStats(stats);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total de Proyectos', value: stats.total, color: 'primary', icon: <FolderIcon /> },
    { title: 'Borradores', value: stats.draft, color: 'default', icon: <FolderIcon /> },
    { title: 'En Progreso', value: stats.in_progress, color: 'info', icon: <TrendingUpIcon /> },
    { title: 'Completados', value: stats.completed, color: 'success', icon: <FolderIcon /> },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Bienvenido al sistema de gestión de proyectos Arauco
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h3" color={`${stat.color}.main`}>
                  {loading ? '...' : stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Acciones Rápidas
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Comienza a gestionar tus proyectos
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('/projects/create')}
          >
            Crear Nuevo Proyecto
          </Button>
          <Button
            variant="outlined"
            startIcon={<FolderIcon />}
            onClick={() => navigate('/projects')}
          >
            Ver Todos los Proyectos
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

