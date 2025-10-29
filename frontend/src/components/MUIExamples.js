import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Alert,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Star,
  Favorite,
  Share,
  Settings,
  Person,
  Email,
  Phone,
} from '@mui/icons-material';

/**
 * Componente de ejemplo mostrando varios componentes de Material-UI
 * Puedes copiar y modificar estos ejemplos para tu proyecto
 */
function MUIExamples() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Datos enviados:\nNombre: ${nombre}\nEmail: ${email}\nProyecto: ${proyecto}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Ejemplos de Componentes Material-UI
      </Typography>

      {/* Alerts */}
      {showAlert && (
        <Alert 
          severity="info" 
          onClose={() => setShowAlert(false)}
          sx={{ mb: 3 }}
        >
          Este es un ejemplo de componente Alert. Puedes cerrarlo haciendo clic en la X.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Tarjeta 1: Formulario */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Formulario de Ejemplo
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Proyecto</InputLabel>
                  <Select
                    value={proyecto}
                    label="Proyecto"
                    onChange={(e) => setProyecto(e.target.value)}
                  >
                    <MenuItem value="proyecto1">Proyecto 1</MenuItem>
                    <MenuItem value="proyecto2">Proyecto 2</MenuItem>
                    <MenuItem value="proyecto3">Proyecto 3</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                  }
                  label="Modo Oscuro (ejemplo)"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Tarjeta 2: Chips y Listas */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Chips y Estados
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Estados del Proyecto:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="En Progreso" color="primary" />
                  <Chip label="Completado" color="success" />
                  <Chip label="Pendiente" color="warning" />
                  <Chip label="Cancelado" color="error" />
                  <Chip label="En Revisión" color="info" />
                </Box>
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Acciones Rápidas:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Star color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Proyectos Favoritos" 
                    secondary="Ver proyectos marcados como favoritos"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Settings color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Configuración" 
                    secondary="Ajustes del proyecto"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Contactos" 
                    secondary="Lista de contactos del proyecto"
                  />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<Favorite />}>
                Me Gusta
              </Button>
              <Button size="small" startIcon={<Share />}>
                Compartir
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Tarjeta 3: Botones */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Variantes de Botones
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Button variant="contained" color="primary">Primary</Button>
                <Button variant="contained" color="secondary">Secondary</Button>
                <Button variant="contained" color="success">Success</Button>
                <Button variant="contained" color="error">Error</Button>
                <Button variant="contained" color="warning">Warning</Button>
                <Button variant="contained" color="info">Info</Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" size="small">Small</Button>
                <Button variant="contained" size="medium">Medium</Button>
                <Button variant="contained" size="large">Large</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MUIExamples;

