# 🚀 Project Manager - Aplicación Full Stack con Docker

Aplicación de gestión de proyectos construida con React (Frontend) y FastAPI (Backend), completamente dockerizada para facilitar el despliegue.

## 📦 Tecnologías

- **Frontend**: React 19, Material-UI (MUI), Nginx
- **Backend**: FastAPI (Python), SQLAlchemy
- **Base de datos**: PostgreSQL 15
- **Containerización**: Docker & Docker Compose

## ⚡ Inicio Rápido

### Scripts Disponibles (Windows)

1. Inicio rápido:
#### 🟢 `start.bat` - Uso Diario
Iniciar la aplicación normalmente
```bash
start.bat
```
- Corrige finales de línea automáticamente
- Construye e inicia los servicios

#### 🔴 `stop.bat` - Detener Servicios
```bash
stop.bat
```

2. Inicio con limpieza de caché
#### 🔧 `rebuild.bat`
**Se usa cuando**:
- Se cambia el Dockerfile
- Problemas con caché
- Primera vez que clonas el repo en Windows (Más detalle en nota)

> **⚠️ Nota sobre finales de línea**: Este proyecto maneja automáticamente la conversión de finales de línea CRLF (Windows) → LF (Linux) para los scripts `.sh`. Git en Windows por defecto usa `core.autocrlf=true`, que convierte LF→CRLF al hacer checkout, causando errores en contenedores Linux. Los scripts `start.bat` y `rebuild.bat` corrigen esto automáticamente.

```bash
rebuild.bat
```
Elimina volúmenes y caché

### Comandos Docker Compose Manuales

```bash
# Iniciar (uso normal)
docker-compose up --build

# Detener
docker-compose down

# Limpieza completa
docker-compose down -v
docker-compose build --no-cache
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

## 🌐 Despliegue en Producción

### Render (Recomendado)

Este proyecto está listo para desplegarse en [Render](https://render.com) con Docker.

**📚 Guía completa:** Ver [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

**⚡ Inicio rápido:**
1. Sube tu código a GitHub/GitLab/Bitbucket
2. Crea una cuenta en [Render](https://render.com)
3. Conecta tu repositorio y selecciona "Blueprint"
4. Render detectará `render.yaml` y desplegará automáticamente

**Archivos de configuración:**
- `render.yaml` - Blueprint de infraestructura como código
- `RENDER_DEPLOYMENT.md` - Guía completa con checklist y solución de problemas
- `ENV_RENDER_EXAMPLE.txt` - Variables de entorno de ejemplo

## 📝 Notas

- Los datos de la base de datos persisten entre reinicios gracias a los volúmenes de Docker
- El backend tiene hot-reload habilitado para desarrollo
- El frontend está optimizado para producción con Nginx
- Las migraciones de base de datos con Alembic se ejecutan automáticamente al iniciar
- El proyecto está configurado para despliegue en la nube con Render

