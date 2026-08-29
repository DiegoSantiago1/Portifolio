param(
    [string]$Destination = 'dist'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $projectRoot $Destination

if (Test-Path -LiteralPath $outputPath) {
    throw "A pasta de destino já existe: $outputPath. Escolha outro destino ou remova-a manualmente."
}

New-Item -ItemType Directory -Path $outputPath | Out-Null

@('index.html', 'site.webmanifest', 'robots.txt', 'sitemap.xml') |
    Where-Object { Test-Path -LiteralPath (Join-Path $projectRoot $_) } |
    ForEach-Object { Copy-Item -LiteralPath (Join-Path $projectRoot $_) -Destination $outputPath }

@('assets', 'css', 'js') |
    ForEach-Object { Copy-Item -LiteralPath (Join-Path $projectRoot $_) -Destination $outputPath -Recurse }

Write-Host "Site preparado em: $outputPath"
