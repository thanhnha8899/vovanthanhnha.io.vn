@echo off
chcp 65001 >nul
cd /d "%~dp0dist"

if not exist "index.html" (
  echo [Loi] Chua co dist. Chay npm run build trong thu muc nay: %~dp0
  pause
  exit /b 1
)

if not exist "tools\nhan-xet-hoc-sinh\index.html" (
  echo [Loi] Chua co cong cu. Chay: npm run sync:tool:nhan-xet
  pause
  exit /b 1
)

echo.
echo  MAY CHU: %CD%
echo  http://127.0.0.1:8001/tools/nhan-xet-hoc-sinh/
echo.

python -m http.server 8001 --bind 127.0.0.1
pause
