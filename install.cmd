@echo off
rem Gandalf theme - one-click install into DSH Web.
rem Builds the plugin, registers it in ~/.dsh/profiles/web/cordis.patch.yml,
rem and tells you how to restart dsh web. Uninstall: uninstall.cmd.
setlocal
cd /d "%~dp0"

echo === Gandalf theme: one-click install ===

rem 1) Locate tsdown: TSDOWN env var / PATH / walk up from this script.
set "TSDOWN_CMD=%TSDOWN%"
if defined TSDOWN_CMD goto :have_tsdown

where tsdown >nul 2>nul
if not errorlevel 1 (
  set "TSDOWN_CMD=tsdown"
  goto :have_tsdown
)

for %%D in ("%~dp0plugin\node_modules\.bin\tsdown.cmd" "%~dp0..\node_modules\.bin\tsdown.cmd" "%~dp0node_modules\.bin\tsdown.cmd") do (
  if not defined TSDOWN_CMD if exist "%%~D" set "TSDOWN_CMD=%%~D"
)
if defined TSDOWN_CMD goto :have_tsdown

echo [install] tsdown not found. Set TSDOWN to your tsdown.cmd, e.g.:
echo        set TSDOWN=C:\path\to\deepseek-harness\node_modules\.bin\tsdown.cmd
pause
exit /b 1

:have_tsdown
rem 2) Build the plugin.
echo [install] building plugin...
pushd "%~dp0plugin"
call "%TSDOWN_CMD%"
if errorlevel 1 (
  popd
  echo [install] build failed.
  pause
  exit /b 1
)
popd

rem 3) Register in the DSH Web profile patch.
echo [install] registering in ~/.dsh/profiles/web/cordis.patch.yml ...
set "REPO_ROOT=%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0plugin\scripts\theme-patch.ps1" -RepoRoot "%REPO_ROOT:~0,-1%"
if errorlevel 1 (
  echo [install] registration failed.
  pause
  exit /b 1
)

echo.
echo ============================================
echo  Build + registration done. Now restart dsh web:
echo    pnpm dsh web     (or restart your running dsh web)
echo ============================================
pause
endlocal
