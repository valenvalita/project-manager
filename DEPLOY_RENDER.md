# 🚀 Guía de Despliegue en Render

Esta guía te ayudará a desplegar tu aplicación Project Manager en [Render](https://render.com) usando Docker.

## 📋 Requisitos Previos

1. Cuenta en Render (gratis): https://render.com
2. Tu proyecto debe estar en un repositorio Git (GitHub, GitLab, o Bitbucket)
3. Los archivos `Dockerfile.prod` (backend) y `Dockerfile` (frontend) deben estar listos

## 🎯 Estrategia de Despliegue

Render desplegará tu aplicación en 3 servicios separados:

1. **PostgreSQL Database** - Base de datos gestionada
2. **Backend Web Service** - FastAPI con Docker
3. **Frontend Web Service** - React + Nginx con Docker

## 📝 Opción 1: Despliegue Automático con Blueprint (Recomendado)

### Paso 1: Preparar el Repositorio

1. Asegúrate de que todos los cambios estén en Git:
```bash
git add .
git commit -m "Preparar para despliegue en Render"
git push origin main
```

### Paso 2: Crear el Blueprint en Render

1. Accede a tu cuenta en [Render Dashboard](https://dashboard.render.com)
2. Haz clic en **"New +"** → **"Blueprint"**
3. Conecta tu repositorio Git
4. Render detectará automáticamente el archivo `render.yaml`
5. Revisa la configuración y haz clic en **"Apply"**

### Paso 3: Configurar Variables de Entorno (si es necesario)

Render configurará automáticamente las variables de entorno desde la base de datos. Pero puedes agregar más:

**Backend:**
- `POSTGRES_USER` - (automático desde DB)
- `POSTGRES_PASSWORD` - (automático desde DB)
- `POSTGRES_HOST` - (automático desde DB)
- `POSTGRES_PORT` - (automático desde DB)
- `POSTGRES_DB` - (automático desde DB)

**Frontend:**
- `REACT_APP_API_URL` - URL del backend (ejemplo: `https://project-manager-backend.onrender.com`)

### Paso 4: Despliegue

Render desplegará automáticamente:
1. ✅ Base de datos PostgreSQL
2. ✅ Backend (espera a que la DB esté lista)
3. ✅ Frontend (espera a que el backend esté listo)

**Tiempo estimado:** 5-10 minutos

### Paso 5: Acceder a tu Aplicación

Una vez completado el despliegue:
- **Frontend**: `https://project-manager-frontend.onrender.com`
- **Backend API**: `https://project-manager-backend.onrender.com`
- **API Docs**: `https://project-manager-backend.onrender.com/docs`

---

## 📝 Opción 2: Despliegue Manual (Paso a Paso)

Si prefieres control total, sigue estos pasos:

### Paso 1: Crear la Base de Datos

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Haz clic en **"New +"** → **"PostgreSQL"**
3. Configura:
   - **Name**: `project-manager-db`
   - **Database**: `project_manager`
   - **User**: `postgres` (por defecto)
   - **Region**: Oregon (o el más cercano)
   - **Plan**: Free
4. Haz clic en **"Create Database"**
5. Espera a que se cree (1-2 minutos)
6. **Guarda las credenciales** que aparecen (Internal Database URL)

### Paso 2: Desplegar el Backend

1. En el Dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio Git
3. Configura:
   - **Name**: `project-manager-backend`
   - **Region**: Oregon
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile.prod`
   - **Plan**: Free

4. **Variables de Entorno** (Environment Variables):
   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=[copia desde la DB]
   POSTGRES_HOST=[copia Internal Host desde la DB]
   POSTGRES_PORT=5432
   POSTGRES_DB=project_manager
   ```

5. Haz clic en **"Create Web Service"**
6. Espera a que el despliegue termine (3-5 minutos)

### Paso 3: Desplegar el Frontend

1. En el Dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio Git (el mismo)
3. Configura:
   - **Name**: `project-manager-frontend`
   - **Region**: Oregon
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Plan**: Free

4. **Variables de Entorno**:
   ```
   REACT_APP_API_URL=https://project-manager-backend.onrender.com
   ```

5. Haz clic en **"Create Web Service"**
6. Espera a que el despliegue termine (3-5 minutos)

### Paso 4: Verificar el Despliegue

1. Accede a tu backend: `https://project-manager-backend.onrender.com/docs`
2. Accede a tu frontend: `https://project-manager-frontend.onrender.com`
3. Verifica que la conexión entre frontend y backend funciona

---

## 🔧 Configuraciones Adicionales

### Actualizar la URL del API en el Frontend

Si aún no lo has hecho, asegúrate de que tu frontend use variables de entorno para la API:

**En `frontend/src/api.js`:**
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

### CORS en el Backend

Asegúrate de que tu backend permita peticiones desde el dominio de Render:

**En `backend/app/main.py`:**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://project-manager-frontend.onrender.com",
        "http://localhost:3000"  # Para desarrollo local
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Dominio Personalizado (Opcional)

1. Ve a tu servicio en Render
2. Click en **"Settings"** → **"Custom Domain"**
3. Agrega tu dominio (por ejemplo: `www.miapp.com`)
4. Configura los DNS según las instrucciones de Render

---

## 🎉 Plan Gratuito de Render

Render ofrece un plan gratuito con estas limitaciones:

✅ **Incluye:**
- 750 horas de servicio gratis al mes
- Base de datos PostgreSQL (válida por 90 días, luego se borra)
- SSL/HTTPS automático
- Despliegue automático desde Git

⚠️ **Limitaciones:**
- Los servicios se "duermen" después de 15 minutos de inactividad
- El primer request después de dormir toma ~30-60 segundos
- 512 MB de RAM por servicio
- Base de datos solo 1 GB

💡 **Tip:** Si tu app se duerme mucho, puedes usar un servicio como [UptimeRobot](https://uptimerobot.com/) para hacer ping cada 14 minutos y mantenerla despierta.

---

## 🐛 Solución de Problemas

### Error: "Database connection failed"

1. Verifica que las variables de entorno del backend tengan las credenciales correctas
2. Usa el **Internal Database URL** para la conexión (más rápido que External)
3. Verifica que el formato sea correcto: `postgresql://user:password@host:port/database`

### Error: "Build failed"

1. Revisa los logs en Render Dashboard
2. Asegúrate de que `Dockerfile.prod` y `Dockerfile` no tengan errores
3. Verifica que `requirements.txt` (backend) y `package.json` (frontend) estén correctos

### Frontend no conecta con Backend

1. Verifica que `REACT_APP_API_URL` esté configurada correctamente
2. Verifica el CORS en el backend
3. Asegúrate de que el backend esté ejecutándose (visible en Dashboard)

### Migraciones de Alembic fallan

1. Conéctate a la base de datos usando un cliente PostgreSQL
2. Ejecuta las migraciones manualmente o revisa los errores en los logs
3. Considera usar Render Shell para ejecutar comandos:
   ```bash
   # En el dashboard del backend, abre la consola y ejecuta:
   alembic upgrade head
   ```

---

## 🔄 Actualizaciones Automáticas

Render desplegará automáticamente cuando hagas push a tu rama principal:

```bash
git add .
git commit -m "Nueva funcionalidad"
git push origin main
```

Render detectará el cambio y redesplegará automáticamente en ~2-5 minutos.

---

## 📚 Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Docker en Render](https://render.com/docs/docker)
- [PostgreSQL en Render](https://render.com/docs/databases)

---

## ✅ Checklist de Despliegue

Antes de desplegar, asegúrate de:

- [ ] Tu código está en un repositorio Git (GitHub/GitLab/Bitbucket)
- [ ] Los Dockerfiles funcionan correctamente en local
- [ ] Las migraciones de Alembic están al día
- [ ] El frontend usa variables de entorno para la API URL
- [ ] El backend tiene CORS configurado correctamente
- [ ] Tienes cuenta en Render.com
- [ ] Has probado la build de producción localmente

---

¡Listo! Tu aplicación estará disponible en la web en minutos. 🎉

