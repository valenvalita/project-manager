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

# Convertir finales de línea y hacer el script ejecutable
RUN apt-get update && apt-get install -y dos2unix && \
    dos2unix entrypoint.sh && \
    chmod +x entrypoint.sh && \
    apt-get remove -y dos2unix && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar el script de inicio (migraciones + app)
CMD ["./entrypoint.sh"]

