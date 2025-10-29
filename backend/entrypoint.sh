#!/bin/bash

# Script de inicio para ejecutar migraciones y arrancar la aplicaciÃƒÆ’Ã‚Â³n

echo "Esperando a que la base de datos estÃƒÆ’Ã‚Â© lista..."
sleep 5

echo "Ejecutando migraciones de Alembic..."
alembic upgrade head

if [ $? -eq 0 ]; then
    echo "Migraciones completadas exitosamente!"
else
    echo "Error al ejecutar migraciones"
    exit 1
fi

echo "Iniciando la aplicaciÃƒÆ’Ã‚Â³n FastAPI..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

