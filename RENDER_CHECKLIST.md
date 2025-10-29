# ✅ Checklist de Verificación para Despliegue en Render

Usa este checklist antes de desplegar en Render para asegurar que todo esté configurado correctamente.

## 📋 Pre-Despliegue

### 1. Repositorio Git
- [ ] Todo el código está commiteado en Git
- [ ] El repositorio está en GitHub, GitLab o Bitbucket
- [ ] La rama principal está actualizada (generalmente `main` o `master`)
- [ ] El `.gitignore` excluye `node_modules/`, `venv/`, `.env`, etc.

### 2. Archivos Docker
- [ ] `backend/Dockerfile.prod` existe y funciona
- [ ] `frontend/Dockerfile` existe y funciona
- [ ] `backend/entrypoint.prod.sh` tiene permisos de ejecución
- [ ] Los Dockerfiles construyen correctamente en local

**Probar localmente:**
```bash
# Backend
cd backend
docker build -f Dockerfile.prod -t test-backend .
docker run -p 8000:8000 test-backend

# Frontend
cd frontend
docker build -f Dockerfile -t test-frontend .
docker run -p 80:80 test-frontend
```

### 3. Variables de Entorno
- [ ] `frontend/src/api.js` usa `process.env.REACT_APP_API_URL`
- [ ] `backend/app/main.py` usa `os.getenv("FRONTEND_URL")` para CORS
- [ ] Tienes las URLs correctas preparadas (ver `ENV_RENDER_EXAMPLE.txt`)

### 4. Base de Datos
- [ ] Las migraciones de Alembic están al día
- [ ] `entrypoint.prod.sh` ejecuta `alembic upgrade head`
- [ ] No hay migraciones pendientes

**Verificar:**
```bash
cd backend
alembic history
alembic current
```

### 5. Configuración de Render
- [ ] Tienes cuenta en https://render.com
- [ ] `render.yaml` está en la raíz del proyecto
- [ ] Los nombres en `render.yaml` coinciden con tu preferencia

---

## 🚀 Durante el Despliegue

### Usando Blueprint (render.yaml)
- [ ] Conecta el repositorio en Render
- [ ] Selecciona "Blueprint"
- [ ] Render detecta `render.yaml` automáticamente
- [ ] Revisa la configuración antes de aplicar
- [ ] Haz clic en "Apply"

### O Manual
- [ ] Crear base de datos PostgreSQL primero
- [ ] Copiar credenciales de la base de datos
- [ ] Desplegar backend con las variables de entorno
- [ ] Desplegar frontend con la URL del backend

---

## 🔍 Post-Despliegue

### 1. Verificar Servicios
- [ ] Base de datos está "Available" (verde)
- [ ] Backend está "Live" (verde)
- [ ] Frontend está "Live" (verde)

### 2. Probar Endpoints

**Backend:**
- [ ] `https://tu-backend.onrender.com/` devuelve `{"message": "Backend ok"}`
- [ ] `https://tu-backend.onrender.com/docs` muestra Swagger UI
- [ ] `https://tu-backend.onrender.com/projects/` devuelve un array (aunque vacío)

**Frontend:**
- [ ] `https://tu-frontend.onrender.com/` carga la aplicación
- [ ] El frontend puede hacer peticiones al backend
- [ ] No hay errores de CORS en la consola del navegador

### 3. Verificar Logs
- [ ] Los logs del backend no muestran errores
- [ ] Las migraciones se ejecutaron correctamente
- [ ] El frontend construyó sin errores

**Ver logs en Render:**
```
Dashboard > Tu Servicio > Logs
```

### 4. Verificar Base de Datos
- [ ] Las tablas se crearon correctamente
- [ ] Puedes conectarte a la base de datos (usando las credenciales internas)

**Conectar con psql:**
```bash
# Usa el "Internal Database URL" de Render
psql [Internal_Database_URL]

# Verificar tablas
\dt

# Ver proyectos
SELECT * FROM projects;
```

---

## 🐛 Solución de Problemas Comunes

### Backend no inicia
1. Revisa los logs en Render Dashboard
2. Verifica que las variables de entorno estén configuradas
3. Verifica que la conexión a la base de datos funcione
4. Asegúrate de que las migraciones no fallen

### Frontend muestra página en blanco
1. Revisa la consola del navegador (F12)
2. Verifica que `REACT_APP_API_URL` esté configurada
3. Verifica que el build se completó correctamente
4. Revisa los logs del servicio

### Error de CORS
1. Verifica que `FRONTEND_URL` esté configurada en el backend
2. Verifica que la URL sea exacta (con https://, sin trailing slash)
3. Revisa los logs del backend para ver qué origen está siendo rechazado

### Base de datos no conecta
1. Usa el "Internal Database URL" no el "External"
2. Verifica que todas las variables `POSTGRES_*` estén correctas
3. Asegúrate de que el backend espera a que la DB esté lista

### Servicio se "duerme"
- En el plan gratuito, los servicios se duermen después de 15 minutos
- El primer request toma 30-60 segundos en "despertar"
- Usa [UptimeRobot](https://uptimerobot.com/) para hacer ping cada 14 minutos

---

## 📊 Monitoreo

### Métricas en Render
- [ ] CPU Usage < 80%
- [ ] Memory Usage < 80%
- [ ] Response time < 2s

### Actualizaciones Automáticas
- [ ] Los deploys automáticos están habilitados
- [ ] Los pushes a la rama principal despliegan automáticamente
- [ ] Las notificaciones de despliegue están configuradas

---

## 🎉 ¡Listo!

Si todos los checks están marcados, tu aplicación está funcionando correctamente en Render.

**URLs Importantes:**
- Frontend: `https://project-manager-frontend.onrender.com`
- Backend: `https://project-manager-backend.onrender.com`
- API Docs: `https://project-manager-backend.onrender.com/docs`

**Próximos Pasos:**
1. Configura un dominio personalizado (opcional)
2. Upgrade a un plan de pago si necesitas más recursos
3. Configura backups de la base de datos
4. Implementa monitoreo y alertas

