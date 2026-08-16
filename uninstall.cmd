@echo off
rem Gandalf theme - remove from DSH Web.
rem Removes the gandalf-theme entry from ~/.dsh/profiles/web/cordis.patch.yml.
setlocal
cd /d "%~dp0"

echo === Gandalf theme: uninstall ===

set "REPO_ROOT=%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0plugin\scripts\theme-patch.ps1" -RepoRoot "%REPO_ROOT:~0,-1%" -Uninstall
if errorlevel 1 (
  echo [uninstall] failed.
  pause
  exit /b 1
)

echo.
echo ============================================
echo  Unregistered. Restart dsh web to restore the
echo  default appearance.
echo ============================================
pause
endlocal
