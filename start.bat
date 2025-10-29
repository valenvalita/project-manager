@echo off
echo =========================================
echo   Iniciando Project Manager
echo =========================================
echo.

echo Corrigiendo finales de linea...
powershell -ExecutionPolicy Bypass -File fix-line-endings.ps1 2>nul

echo Iniciando servicios...
docker-compose up --build -d

echo.
echo =========================================
echo   Servicios iniciados!
echo =========================================
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
docker-compose logs -f

pause

