@echo off
echo =========================================
echo   REBUILD - Limpieza Completa
echo =========================================
echo ADVERTENCIA: Esto eliminara volumenes y cache
echo.
pause

echo.
echo [1/6] Corrigiendo finales de linea...
powershell -ExecutionPolicy Bypass -File fix-line-endings.ps1

echo [2/6] Deteniendo servicios y eliminando volumenes...
docker-compose down -v

echo [3/6] Limpiando cache de Docker...
docker builder prune -a -f

echo [4/6] Eliminando imagenes antiguas...
docker rmi project-manager-backend project-manager-frontend -f 2>nul

echo [5/6] Reconstruyendo sin cache...
docker-compose build --no-cache

echo [6/6] Iniciando servicios...
docker-compose up -d

echo.
echo =========================================
echo   Rebuild completado!
echo =========================================
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
docker-compose logs -f

pause

