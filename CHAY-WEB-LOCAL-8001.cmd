@echo off
chcp 65001 >nul
REM Luon phuc vu tu thu muc dist. Neu chay python o thu muc khac -> /tools/... se 404.

cd /d "%~dp0orbis-nft\dist"

if not exist "index.html" (
  echo [Loi] Chua co ban build trong dist.
  echo        Chay: cd "%~dp0orbis-nft" ^&^& npm run build
  pause
  exit /b 1
)

if not exist "tools\nhan-xet-hoc-sinh\index.html" (
  echo [Loi] Chua co cong cu Nhan xet hoc sinh trong dist.
  echo        Chay: cd "%~dp0orbis-nft" ^&^& npm run sync:tool:nhan-xet
  pause
  exit /b 1
)

echo.
echo  ═══════════════════════════════════════════════════════
echo    MAY CHU DANG CHAY TU: %CD%
echo  ═══════════════════════════════════════════════════════
echo    Trang chu:     http://127.0.0.1:8001/
echo    Nhan xet HS:   http://127.0.0.1:8001/tools/nhan-xet-hoc-sinh/
echo  ═══════════════════════════════════════════════════════
echo    DONG CUA SO NAY DE TAT MAY CHU
echo.

python -m http.server 8001 --bind 127.0.0.1
echo.
if errorlevel 1 echo Python loi hoac cong 8001 dang bi chiem. Tat server cu hoac doi cong.
pause
