# Componentes del Proyecto

## 📁 Estructura Recomendada

```
src/
├── components/          # Componentes reutilizables
│   ├── MUIExamples.js  # Ejemplos de componentes MUI
│   ├── Header.js       # Header de la aplicación
│   ├── Footer.js       # Footer de la aplicación
│   └── ...
├── pages/              # Páginas/Vistas principales
│   ├── Home.js
│   ├── Projects.js
│   └── ...
├── hooks/              # Custom hooks
├── utils/              # Funciones utilitarias
├── api.js              # Configuración de API
└── App.js              # Componente principal
```

## 🎨 MUIExamples.js

Este archivo contiene ejemplos de los componentes más comunes de Material-UI:

### Incluye:
- **Formularios**: TextField, Select, Switch
- **Tarjetas**: Card, CardContent, CardActions
- **Chips**: Para estados y etiquetas
- **Listas**: List, ListItem, ListItemIcon
- **Botones**: Diferentes variantes y colores
- **Iconos**: Varios iconos de @mui/icons-material

### Cómo usar:

```javascript
import MUIExamples from './components/MUIExamples';

// En tu componente:
<MUIExamples />
```

## 🚀 Crear Nuevos Componentes

### 1. Componente Básico:

```javascript
import React from 'react';
import { Box, Typography } from '@mui/material';

function MiComponente() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">
        Mi Componente
      </Typography>
    </Box>
  );
}

export default MiComponente;
```

### 2. Componente con Props:

```javascript
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ProjectCard({ title, description, status }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="caption" color="text.secondary">
          Estado: {status}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
```

### 3. Componente con Estado:

```javascript
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

function MiDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Abrir Dialog
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Título del Dialog</DialogTitle>
        <DialogContent>
          Contenido aquí...
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MiDialog;
```

## 🎯 Mejores Prácticas

### 1. Usa el sistema sx para estilos:
```javascript
<Box sx={{ 
  p: 2,           // padding: 16px
  m: 3,           // margin: 24px
  bgcolor: 'primary.main',
  color: 'white'
}}>
```

### 2. Aprovecha el Theme:
```javascript
import { useTheme } from '@mui/material/styles';

function MiComponente() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      color: theme.palette.primary.main 
    }}>
      ...
    </Box>
  );
}
```

### 3. Usa Grid para layouts:
```javascript
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Este ítem ocupa:
        - 12 columnas en móviles (xs)
        - 6 columnas en tablets (sm)
        - 4 columnas en desktop (md)
    */}
  </Grid>
</Grid>
```

### 4. Usa breakpoints responsivos:
```javascript
<Typography 
  variant="h3" 
  sx={{ 
    fontSize: { 
      xs: '1.5rem',  // móvil
      sm: '2rem',    // tablet
      md: '3rem'     // desktop
    } 
  }}
>
```

## 📚 Recursos Útiles

- [Componentes MUI](https://mui.com/material-ui/all-components/)
- [Sistema sx](https://mui.com/system/the-sx-prop/)
- [Theming](https://mui.com/material-ui/customization/theming/)
- [Grid System](https://mui.com/material-ui/react-grid/)
- [Icons](https://mui.com/material-ui/material-icons/)

