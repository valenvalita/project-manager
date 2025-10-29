import { useEffect, useState } from "react";
import { getMessage } from "./api";
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessage()
      .then((data) => {
        setMsg(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMsg("Error al conectar con el backend");
        setLoading(false);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <HomeIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Arauco - Project Manager
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h3" component="h1" gutterBottom color="primary">
              ¡Bienvenido a Material-UI!
            </Typography>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Card sx={{ mt: 3, backgroundColor: "#f5f5f5" }}>
                <CardContent>
                  <CheckCircleIcon
                    color="success"
                    sx={{ fontSize: 60, mb: 2 }}
                  />
                  <Typography variant="h5" component="div" gutterBottom>
                    Mensaje del Backend:
                  </Typography>
                  <Typography variant="h4" color="text.secondary">
                    {msg}
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" paragraph>
                MUI está correctamente instalado y configurado. 🎉
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Puedes empezar a usar todos los componentes de Material-UI en tu
                proyecto.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
