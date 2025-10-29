@echo off
echo =========================================
echo   Iniciando Project Manager (PRODUCCIÓN)
echo =========================================
echo.
echo ADVERTENCIA: Este modo es para producción.
echo Asegúrate de tener un archivo .env configurado.
echo.

echo Construyendo e iniciando servicios...
docker-compose -f docker-compose.prod.yml up --build -d

echo.
echo Servicios iniciados en modo producción.
echo Frontend disponible en: http://localhost
echo.
pause

