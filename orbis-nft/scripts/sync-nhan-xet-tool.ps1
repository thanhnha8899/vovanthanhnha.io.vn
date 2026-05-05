# Dong bo app "Web nhan xet hoc sinh" vao vovanthanhnha (orbis-nft).
# 1) npm run build trong thu muc nguon tren o D
# 2) copy dist -> orbis-nft/public/tools/nhan-xet-hoc-sinh
# 3) (tuy chon) npm run build orbis-nft
#
# Chay tu thu muc orbis-nft:
#   npm run sync:tool:nhan-xet
#   npm run sync:tool:nhan-xet -- -SkipSiteBuild   # chi copy, khong build lai trang chu

param(
    [switch]$SkipSiteBuild
)

$ErrorActionPreference = 'Stop'

# Thu muc nguon (sua neu ban dat project o cho khac)
$toolSource = 'D:\2A - App, Web\Web nhận xét học sinh'

$orbisRoot = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $orbisRoot 'public\tools\nhan-xet-hoc-sinh'

if (-not (Test-Path (Join-Path $toolSource 'package.json'))) {
    Write-Host "Khong tim thay project tai: $toolSource" -ForegroundColor Red
    Write-Host "Sua bien `$toolSource trong scripts/sync-nhan-xet-tool.ps1 cho dung duong dan." -ForegroundColor Yellow
    exit 1
}

Write-Host "==> Build cong cu tai: $toolSource" -ForegroundColor Cyan
Push-Location $toolSource
try {
    npm run build
} finally {
    Pop-Location
}

$dist = Join-Path $toolSource 'dist'
if (-not (Test-Path (Join-Path $dist 'index.html'))) {
    Write-Host "Build that bai: khong co dist/index.html" -ForegroundColor Red
    exit 1
}

Write-Host "==> Copy vao: $dest" -ForegroundColor Cyan
Remove-Item $dest -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -Path (Join-Path $dist '*') -Destination $dest -Recurse -Force

if (-not $SkipSiteBuild) {
    Write-Host "==> Build trang vovanthanhnha (orbis-nft)" -ForegroundColor Cyan
    Push-Location $orbisRoot
    try {
        npm run build
    } finally {
        Pop-Location
    }
}

Write-Host "==> Xong. URL khi deploy/local: /tools/nhan-xet-hoc-sinh/" -ForegroundColor Green
