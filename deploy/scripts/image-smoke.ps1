$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "../..")
$suffix = [Guid]::NewGuid().ToString("N").Substring(0, 8)
$backendImage = "novafield-backend:smoke-$suffix"
$frontendImage = "novafield-frontend:smoke-$suffix"
$backendContainer = "novafield-backend-$suffix"
$frontendContainer = "novafield-frontend-$suffix"

function Wait-Healthy([string]$Url) {
    for ($attempt = 0; $attempt -lt 60; $attempt++) {
        try {
            $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 2
            if ($response.StatusCode -eq 200) { return }
        } catch { Start-Sleep -Seconds 1 }
    }
    throw "Health check timed out: $Url"
}

try {
    docker build --tag $backendImage --file (Join-Path $root "backend/Dockerfile") (Join-Path $root "backend")
    docker build --tag $frontendImage --file (Join-Path $root "frontend/Dockerfile") (Join-Path $root "frontend")

    docker run --detach --rm --name $backendContainer --publish 13001:3001 `
        --env APP_ENV=development $backendImage | Out-Null
    docker run --detach --rm --name $frontendContainer --publish 13000:3000 $frontendImage | Out-Null

    Wait-Healthy "http://127.0.0.1:13001/health/live"
    Wait-Healthy "http://127.0.0.1:13000/api/health"
} finally {
    docker rm --force $backendContainer $frontendContainer 2>$null | Out-Null
    docker image rm --force $backendImage $frontendImage 2>$null | Out-Null
}
