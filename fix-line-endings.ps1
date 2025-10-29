# Script para convertir finales de línea de CRLF a LF en entrypoint.sh
# Ejecutar esto en la otra notebook antes de rebuild.bat

Write-Host "Convirtiendo finales de linea en entrypoint.sh..." -ForegroundColor Yellow

$file = "backend\entrypoint.sh"
$content = Get-Content $file -Raw
$content = $content -replace "`r`n", "`n"
$content = $content -replace "`r", "`n"

# Guardar con encoding UTF8 sin BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$PSScriptRoot\$file", $content, $utf8NoBom)

Write-Host "Conversion completada!" -ForegroundColor Green
Write-Host ""

# Verificar
Write-Host "Verificando el archivo..." -ForegroundColor Yellow
$bytes = [System.IO.File]::ReadAllBytes("$PSScriptRoot\$file")
$hasCRLF = $false
for ($i = 0; $i -lt $bytes.Length - 1; $i++) {
    if ($bytes[$i] -eq 0x0D -and $bytes[$i+1] -eq 0x0A) {
        $hasCRLF = $true
        break
    }
}

if ($hasCRLF) {
    Write-Host "ADVERTENCIA: El archivo todavia tiene CRLF!" -ForegroundColor Red
} else {
    Write-Host "OK: El archivo ahora tiene solo LF (Unix)" -ForegroundColor Green
}

