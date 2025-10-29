@echo off
REM Script de ayuda para gestionar migraciones de Alembic

if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="create" goto create
if "%1"=="upgrade" goto upgrade
if "%1"=="history" goto history
if "%1"=="current" goto current
if "%1"=="downgrade" goto downgrade
goto invalid

:help
echo =========================================
echo   Gestor de Migraciones Alembic
echo =========================================
echo.
echo Uso: migrate.bat [comando]
echo.
echo Comandos disponibles:
echo   create      - Crear una nueva migracion (autogenerar)
echo   upgrade     - Aplicar todas las migraciones pendientes
echo   history     - Ver historial de migraciones
echo   current     - Ver migracion actual
echo   downgrade   - Revertir la ultima migracion
echo   help        - Mostrar esta ayuda
echo.
goto end

:create
set /p message="Ingresa el mensaje de la migracion: "
echo Creando migracion: %message%
docker exec -it project-manager-backend-1 alembic revision --autogenerate -m "%message%"
echo.
echo Migracion creada! Reinicia el backend para aplicarla:
echo   docker-compose restart backend
goto end

:upgrade
echo Aplicando migraciones...
docker exec -it project-manager-backend-1 alembic upgrade head
goto end

:history
echo Historial de migraciones:
docker exec -it project-manager-backend-1 alembic history
goto end

:current
echo Estado actual:
docker exec -it project-manager-backend-1 alembic current
goto end

:downgrade
echo ADVERTENCIA: Vas a revertir la ultima migracion!
set /p confirm="Estas seguro? (S/N): "
if /i "%confirm%"=="S" (
    docker exec -it project-manager-backend-1 alembic downgrade -1
    echo Migracion revertida
) else (
    echo Cancelado
)
goto end

:invalid
echo Comando invalido: %1
echo Usa 'migrate.bat help' para ver los comandos disponibles
goto end

:end

