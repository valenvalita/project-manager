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
- **GET** `/projects/filter/` - Filtrar proyectos por estado y prioridad

### Usuarios
- **GET** `/users/` - Listar todos los usuarios
- **POST** `/users/` - Crear un nuevo usuario
- **GET** `/users/{id}` - Obtener un usuario específico
- **PATCH** `/users/{id}` - Actualizar parcialmente un usuario
- **DELETE** `/users/{id}` - Eliminar un usuario

## 📊 Modelo de Datos

### User

| Campo       | Tipo     | Descripción                      | Requerido |
|-------------|----------|----------------------------------|-----------|
| id          | Integer  | Identificador único              | Auto      |
| name        | String   | Nombre del usuario               | Sí        |
| email       | String   | Email (único)                    | Sí        |
| role        | String   | Rol (admin/manager/user)         | No        |
| is_active   | Boolean  | Usuario activo                   | No        |
| created_at  | DateTime | Fecha de creación                | Auto      |
| updated_at  | DateTime | Fecha de actualización           | Auto      |

**Roles**: `admin`, `manager`, `user`

### Project

| Campo           | Tipo     | Descripción                      | Requerido |
|-----------------|----------|----------------------------------|-----------|
| id              | Integer  | Identificador único              | Auto      |
| title           | String   | Título del proyecto              | Sí        |
| description     | Text     | Descripción detallada            | No        |
| status          | String   | Estado del proyecto              | No        |
| priority        | String   | Prioridad (low/medium/high)      | No        |
| budget          | Decimal  | Presupuesto estimado             | No        |
| start_date      | Date     | Fecha de inicio                  | No        |
| end_date        | Date     | Fecha de finalización            | No        |
| due_date        | Date     | Fecha de vencimiento             | No        |
| created_by_id   | Integer  | ID del usuario creador           | No        |
| assigned_to_id  | Integer  | ID del usuario asignado          | No        |
| created_at      | DateTime | Fecha de creación                | Auto      |
| updated_at      | DateTime | Fecha de actualización           | Auto      |

**Estados**: `draft`, `in_progress`, `completed`, `cancelled`  
**Prioridades**: `low`, `medium`, `high`

### Relaciones

- Un **Usuario** puede crear múltiples **Proyectos** (creator)
- Un **Usuario** puede tener asignados múltiples **Proyectos** (assigned_to)
- Un **Proyecto** tiene un **Usuario** creador (opcional)
- Un **Proyecto** puede estar asignado a un **Usuario** (opcional)

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
