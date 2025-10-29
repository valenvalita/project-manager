# Backend - Arauco Project Manager

API REST desarrollada con FastAPI para la gestión de proyectos de Arauco.

## 📋 Descripción

Backend del sistema de gestión de proyectos que proporciona una API RESTful para crear, leer, actualizar y eliminar proyectos. Utiliza PostgreSQL como base de datos y está construido con FastAPI para un rendimiento óptimo.

## 🛠️ Tecnologías

- **FastAPI** (0.120.1) - Framework web moderno y rápido
- **Uvicorn** (0.38.0) - Servidor ASGI de alto rendimiento
- **SQLAlchemy** (2.0.44) - ORM para manejo de base de datos
- **Psycopg** (3.2.12) - Adaptador de PostgreSQL
- **Pydantic** (2.12.3) - Validación de datos
- **PostgreSQL** - Base de datos relacional

## 📁 Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # Punto de entrada de la aplicación
│   ├── database.py       # Configuración de la base de datos
│   ├── models.py         # Modelos SQLAlchemy
│   ├── schemas.py        # Esquemas Pydantic
│   └── routers/
│       └── projects.py   # Rutas de proyectos
├── venv/                 # Entorno virtual
├── requirements.txt      # Dependencias del proyecto
└── README.md
```

## 🚀 Instalación

### Prerrequisitos

- Python 3.13+
- PostgreSQL
- pip

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd project-manager/backend
   ```

2. **Crear y activar el entorno virtual**
   
   En Windows (PowerShell):
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
   
   En Linux/Mac:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar la base de datos**
   
   Asegúrate de tener PostgreSQL corriendo y crear la base de datos:
   ```sql
   CREATE DATABASE project_manager;
   ```
   
   La configuración de conexión está en `app/database.py`:
   - Host: `127.0.0.1`
   - Puerto: `5555`
   - Usuario: `postgres`
   - Contraseña: `postgres`
   - Base de datos: `project_manager`

## ▶️ Ejecución

### Modo desarrollo

```bash
uvicorn app.main:app --reload --port 8000
```

La API estará disponible en: `http://localhost:8000`

### Modo producción

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📚 API Endpoints

### Estado del servidor

- **GET** `/` - Verificar estado del backend
  ```json
  Response: {
    "message": "Backend ok"
  }
  ```

### Proyectos

*(Endpoints en desarrollo)*

- **GET** `/projects` - Listar todos los proyectos
- **POST** `/projects` - Crear un nuevo proyecto
- **GET** `/projects/{id}` - Obtener un proyecto específico
- **PUT** `/projects/{id}` - Actualizar un proyecto
- **DELETE** `/projects/{id}` - Eliminar un proyecto

## 📊 Modelo de Datos

### Project

| Campo       | Tipo     | Descripción                    | Requerido |
|-------------|----------|--------------------------------|-----------|
| id          | Integer  | Identificador único            | Auto      |
| title       | String   | Título del proyecto (max 200) | Sí        |
| description | Text     | Descripción detallada          | No        |
| status      | String   | Estado del proyecto (max 50)   | No        |
| created_at  | DateTime | Fecha de creación              | Auto      |
| updated_at  | DateTime | Fecha de última actualización  | Auto      |

**Estados disponibles:**
- `draft` - Borrador (por defecto)
- `active` - Activo
- `completed` - Completado
- `archived` - Archivado

## 🔧 Configuración

### Variables de Entorno

Puedes configurar las siguientes variables de entorno (opcional):

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@127.0.0.1:5555/project_manager
```

### CORS

El backend está configurado con CORS habilitado para permitir peticiones desde el frontend. Actualmente permite todos los orígenes (`*`), pero se recomienda limitar esto en producción.

## 📖 Documentación Interactiva

FastAPI genera documentación interactiva automáticamente:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🧪 Testing

*(Por implementar)*

```bash
pytest
```

## 🐳 Docker

El proyecto incluye configuración Docker en el directorio raíz:

```bash
cd ..
docker-compose up -d
```

## 📝 Notas de Desarrollo

### Migraciones de Base de Datos

Actualmente las tablas se crean automáticamente al iniciar la aplicación mediante:
```python
Base.metadata.create_all(bind=engine)
```

Para producción se recomienda implementar Alembic para migraciones controladas.

### TODOs

- [ ] Implementar endpoints CRUD completos en `/routers/projects.py`
- [ ] Limitar CORS solo al dominio del frontend
- [ ] Implementar autenticación y autorización
- [ ] Añadir tests unitarios e integración
- [ ] Configurar Alembic para migraciones
- [ ] Implementar logging estructurado
- [ ] Añadir validaciones adicionales en esquemas
- [ ] Documentar respuestas de error

## 👥 Contribución

1. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
2. Commit de cambios (`git commit -m 'Añadir nueva funcionalidad'`)
3. Push a la rama (`git push origin feature/nueva-funcionalidad`)
4. Crear un Pull Request

## 📄 Licencia

[Especificar licencia del proyecto]

## 👤 Autor

Arauco - Project Manager Team

---

**Última actualización:** Octubre 2025
