# Dockerfile para el Backend FastAPI
FROM python:3.13-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de requisitos
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Convertir finales de línea usando Python (siempre disponible)
RUN echo "Convirtiendo finales de linea..." && \
    python -c "import sys; data = open('entrypoint.sh', 'rb').read(); open('entrypoint.sh', 'wb').write(data.replace(b'\r\n', b'\n').replace(b'\r', b'\n'))" && \
    echo "Verificando conversion..." && \
    od -c entrypoint.sh | head -n 5 && \
    chmod +x entrypoint.sh && \
    echo "Conversion completada!"

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar el script de inicio (migraciones + app)
CMD ["bash", "entrypoint.sh"]

