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

# Hacer el script de inicio ejecutable
RUN chmod +x entrypoint.sh

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar el script de inicio (migraciones + app)
CMD ["./entrypoint.sh"]

