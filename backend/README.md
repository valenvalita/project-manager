# Backend - Arauco Project Manager

API REST con FastAPI para la gestión de proyectos.

## 🚀 Inicio Rápido

### Con Docker (Recomendado)
```bash
# Desde la raíz del proyecto
docker-compose up --build
```

### Sin Docker (Desarrollo local)
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📖 Documentación Interactiva

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📚 API Endpoints

### Estado del servidor
- **GET** `/` - Verificar estado del backend

### Proyectos
- **GET** `/projects/` - Listar todos los proyectos
- **POST** `/projects/` - Crear un nuevo proyecto
- **GET** `/projects/{id}` - Obtener un proyecto específico
- **PUT** `/projects/{id}` - Actualizar un proyecto (reemplazar)
- **PATCH** `/projects/{id}` - Actualizar parcialmente un proyecto
- **DELETE** `/projects/{id}` - Eliminar un proyecto

## 📊 Modelo de Datos

### Project

| Campo           | Tipo     | Descripción                   | Requerido |
|-----------------|----------|-------------------------------|-----------|
| id              | Integer  | Identificador único           | Auto      |
| title           | String   | Título del proyecto           | Sí        |
| description     | Text     | Descripción detallada         | No        |
| status          | String   | Estado del proyecto           | No        |
| priority        | String   | Prioridad (low/medium/high)   | No        |
| budget          | Decimal  | Presupuesto estimado          | No        |
| start_date      | Date     | Fecha de inicio               | No        |
| end_date        | Date     | Fecha de finalización         | No        |
| due_date        | Date     | Fecha de vencimiento          | No        |
| created_at      | DateTime | Fecha de creación             | Auto      |
| updated_at      | DateTime | Fecha de actualización        | Auto      |

**Estados**: `draft`, `in_progress`, `completed`, `cancelled`  
**Prioridades**: `low`, `medium`, `high`

## 🔧 Migraciones de Base de Datos

El proyecto usa **Alembic** para migraciones de base de datos. Las migraciones se aplican automáticamente al iniciar los contenedores Docker.

### Crear nueva migración (en Docker):
```bash
docker exec -it project-manager-backend-1 alembic revision --autogenerate -m "descripción del cambio"
docker-compose restart backend
```

### Localmente:
```bash
alembic revision --autogenerate -m "descripción del cambio"
alembic upgrade head
```
