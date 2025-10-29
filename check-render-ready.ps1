# Script de verificación para Render Deployment
# Verifica que todos los archivos necesarios estén presentes

Write-Host "`n🔍 Verificando archivos necesarios para Render..." -ForegroundColor Cyan

$allGood = $true

# Función para verificar archivos
function Check-File {
    param($path, $description)
    if (Test-Path $path) {
        Write-Host "✅ $description" -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ $description - NO ENCONTRADO" -ForegroundColor Red
        return $false
    }
}

Write-Host "`n📦 Archivos de configuración:" -ForegroundColor Yellow
$allGood = $allGood -and (Check-File "render.yaml" "render.yaml (Blueprint)")
$allGood = $allGood -and (Check-File "RENDER_DEPLOYMENT.md" "Guía completa de despliegue")

Write-Host "`n🐳 Archivos Docker - Backend:" -ForegroundColor Yellow
$allGood = $allGood -and (Check-File "backend\Dockerfile.prod" "Dockerfile.prod")
$allGood = $allGood -and (Check-File "backend\entrypoint.prod.sh" "entrypoint.prod.sh")
$allGood = $allGood -and (Check-File "backend\requirements.txt" "requirements.txt")
$allGood = $allGood -and (Check-File "backend\alembic.ini" "alembic.ini (migraciones)")

Write-Host "`n🐳 Archivos Docker - Frontend:" -ForegroundColor Yellow
$allGood = $allGood -and (Check-File "frontend\Dockerfile" "Dockerfile")
$allGood = $allGood -and (Check-File "frontend\nginx.conf" "nginx.conf")
$allGood = $allGood -and (Check-File "frontend\package.json" "package.json")

Write-Host "`n🔧 Archivos de código:" -ForegroundColor Yellow
$allGood = $allGood -and (Check-File "backend\app\main.py" "main.py (backend)")
$allGood = $allGood -and (Check-File "frontend\src\api.js" "api.js (frontend)")

Write-Host "`n📊 Verificando configuraciones..." -ForegroundColor Yellow

# Verificar que api.js use variables de entorno
if (Test-Path "frontend\src\api.js") {
    $apiContent = Get-Content "frontend\src\api.js" -Raw
    if ($apiContent -match "process\.env\.REACT_APP_API_URL") {
        Write-Host "✅ api.js usa REACT_APP_API_URL" -ForegroundColor Green
    } else {
        Write-Host "⚠️  api.js no usa REACT_APP_API_URL" -ForegroundColor Yellow
        $allGood = $false
    }
}

# Verificar que main.py use variables de entorno para CORS
if (Test-Path "backend\app\main.py") {
    $mainContent = Get-Content "backend\app\main.py" -Raw
    if ($mainContent -match "os\.getenv") {
        Write-Host "✅ main.py usa variables de entorno" -ForegroundColor Green
    } else {
        Write-Host "⚠️  main.py podría no usar variables de entorno correctamente" -ForegroundColor Yellow
    }
}

Write-Host "`n🔍 Verificando Git..." -ForegroundColor Yellow

# Verificar si estamos en un repositorio Git
if (Test-Path ".git") {
    Write-Host "✅ Repositorio Git detectado" -ForegroundColor Green
    
    # Verificar si hay cambios sin commitear
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "⚠️  Hay cambios sin commitear" -ForegroundColor Yellow
        Write-Host "   Ejecuta: git add . && git commit -m 'Ready for Render'" -ForegroundColor Gray
    } else {
        Write-Host "✅ No hay cambios pendientes" -ForegroundColor Green
    }
    
    # Verificar rama actual
    $currentBranch = git branch --show-current
    Write-Host "ℹ️  Rama actual: $currentBranch" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ No es un repositorio Git" -ForegroundColor Red
    Write-Host "   Ejecuta: git init && git add . && git commit -m 'Initial commit'" -ForegroundColor Gray
    $allGood = $false
}

# Verificar Docker (opcional pero recomendado)
Write-Host "`n🐋 Verificando Docker (opcional)..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker instalado: $dockerVersion" -ForegroundColor Green
    Write-Host "ℹ️  Puedes probar el build localmente antes de desplegar" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  Docker no está instalado (opcional para despliegue)" -ForegroundColor Yellow
}

# Resumen final
Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
if ($allGood) {
    Write-Host "🎉 ¡TODO LISTO PARA DESPLEGAR EN RENDER!" -ForegroundColor Green
    Write-Host "`nPróximos pasos:" -ForegroundColor Cyan
    Write-Host "1. Sube el código a GitHub/GitLab/Bitbucket" -ForegroundColor White
    Write-Host "2. Ve a https://dashboard.render.com" -ForegroundColor White
    Write-Host "3. Click en 'New +' → 'Blueprint'" -ForegroundColor White
    Write-Host "4. Conecta tu repositorio" -ForegroundColor White
    Write-Host "5. Render detectará render.yaml automáticamente" -ForegroundColor White
    Write-Host "6. Click en 'Apply' y espera 5-10 minutos" -ForegroundColor White
    Write-Host "`n📚 Guía completa: RENDER_DEPLOYMENT.md" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  HAY ALGUNOS PROBLEMAS QUE CORREGIR" -ForegroundColor Yellow
    Write-Host "`nRevisa los archivos marcados con ❌ arriba" -ForegroundColor White
    Write-Host "Consulta RENDER_DEPLOYMENT.md para más información" -ForegroundColor White
}
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host ""

