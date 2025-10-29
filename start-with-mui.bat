@echo off
echo ========================================
echo   Arauco Project Manager con Material-UI
echo ========================================
echo.
echo Iniciando servicios en modo desarrollo...
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:8000
echo - Database: localhost:5555
echo.
echo Presiona Ctrl+C para detener los servicios
echo.

REM Ir al directorio del proyecto
cd /d "%~dp0"

REM Detener contenedores existentes
echo Deteniendo contenedores existentes...
docker-compose down

REM Iniciar los servicios
echo.
echo Construyendo e iniciando servicios...
docker-compose up --build

pause

