# 🚀 Project Manager - Aplicación Full Stack con Docker

Aplicación de gestión de proyectos construida con React (Frontend) y FastAPI (Backend), completamente dockerizada para facilitar el despliegue.

## 📦 Tecnologías

- **Frontend**: React 19, Material-UI (MUI), Nginx
- **Backend**: FastAPI (Python), SQLAlchemy
- **Base de datos**: PostgreSQL 15
- **Containerización**: Docker & Docker Compose

## ⚡ Inicio Rápido

### Opción 1: Usar scripts (Windows)

```bash
# Iniciar la aplicación
start.bat

# Detener la aplicación
stop.bat
```

### Opción 2: Comandos Docker Compose

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Detener todos los servicios
docker-compose down
```

## 🌐 Acceder a la Aplicación

Una vez iniciados los contenedores:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs
- **Base de datos**: localhost:5555

## 📁 Estructura del Proyecto

```
project-manager/
├── backend/                 # Backend FastAPI
│   ├── app/
│   │   ├── main.py         # Punto de entrada
│   │   ├── models.py       # Modelos de base de datos
│   │   ├── schemas.py      # Esquemas Pydantic
│   │   ├── database.py     # Configuración de DB
│   │   └── routers/        # Endpoints de la API
│   ├── Dockerfile          # Dockerfile del backend
│   └── requirements.txt    # Dependencias Python
│
├── frontend/               # Frontend React
│   ├── src/
│   │   ├── App.js         # Componente principal
│   │   └── api.js         # Cliente API
│   ├── Dockerfile         # Dockerfile del frontend
│   └── nginx.conf         # Configuración de Nginx
│
├── docker-compose.yml     # Orquestación de servicios
├── start.bat             # Script de inicio (Windows)
└── stop.bat              # Script de detención (Windows)
```

## 🔧 Desarrollo

### Requisitos Previos

- Docker Desktop (Windows)
- Docker Compose

### Variables de Entorno

Las variables de entorno se configuran en `docker-compose.yml`:

**Base de datos:**
- `POSTGRES_USER`: postgres
- `POSTGRES_PASSWORD`: postgres
- `POSTGRES_DB`: project_manager

**Backend:**
- Las mismas variables de la base de datos para la conexión

### Modo Desarrollo Local (sin Docker)

Si prefieres desarrollar sin Docker:

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Base de datos:**
```bash
docker-compose up db
```

## 🎨 Material-UI (MUI)

El frontend está configurado con Material-UI para un diseño moderno y profesional. Incluye:

- ✅ Componentes MUI instalados y configurados
- ✅ Sistema de theming personalizable con modo oscuro/claro
- ✅ Iconos de Material-UI
- ✅ Ejemplos de uso en `src/components/MUIExamples.js`

**Recursos**: [Documentación oficial de MUI](https://mui.com/)

## 🐛 Solución Rápida de Problemas

### Los contenedores no inician
```bash
# Ver logs
docker-compose logs

# Verificar estado
docker-compose ps
```

### Resetear todo
```bash
# Eliminar contenedores y volúmenes
docker-compose down -v

# Reconstruir
docker-compose up --build
```

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en http://localhost:8000
- Revisa la consola del navegador para errores CORS

## 👥 Contribuir

1. Realiza cambios en tu rama local
2. Prueba con Docker: `docker-compose up --build`
3. Asegúrate de que todo funcione correctamente
4. Haz commit de tus cambios

## 📝 Notas

- Los datos de la base de datos persisten entre reinicios gracias a los volúmenes de Docker
- El backend tiene hot-reload habilitado para desarrollo
- El frontend está optimizado para producción con Nginx
- Las migraciones de base de datos con Alembic se ejecutan automáticamente al iniciar

