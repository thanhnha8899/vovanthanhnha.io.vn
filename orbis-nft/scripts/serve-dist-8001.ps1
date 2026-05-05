# Chay web tinh tu dung thu muc dist (bat buoc de /tools/... hoat dong).
# Dung: tu thu muc orbis-nft: powershell -ExecutionPolicy Bypass -File ./scripts/serve-dist-8001.ps1
# Hoac: npm run serve:dist:8001

param(
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$orbisRoot = Split-Path -Parent $PSScriptRoot
Set-Location $orbisRoot

if (-not $SkipBuild) {
    npm run build
}

$dist = Join-Path $orbisRoot 'dist'
$toolIndex = Join-Path $dist 'tools\nhan-xet-hoc-sinh\index.html'

if (-not (Test-Path $toolIndex)) {
    Write-Host "Thieu cong cu trong dist (khong tim thay tools/nhan-xet-hoc-sinh/). Chay npm run build." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host ">>> Goc web (Document root): $dist" -ForegroundColor Green
Write-Host ">>> Trang chu:    http://127.0.0.1:8001/" -ForegroundColor Cyan
Write-Host ">>> Nhan xet HS:  http://127.0.0.1:8001/tools/nhan-xet-hoc-sinh/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Neu van 404: ban dang mo SAI thu muc. Phai dung lenh nay, khong chay python o thu muc cha." -ForegroundColor Yellow
Write-Host ""

Set-Location $dist
python -m http.server 8001 --bind 127.0.0.1
