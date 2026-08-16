@echo off
rem Gandalf theme - one-click build. Edit theme.css.ts / tokens.ts, then double-click this file.
rem Uses tsdown from one of:
rem   1. the TSDOWN environment variable (e.g. set TSDOWN=C:\path\to\deepseek-harness\node_modules\.bin\tsdown.cmd)
rem   2. the PATH (a tsdown on your PATH is used as-is)
rem   3. a node_modules\.bin\tsdown.cmd found by walking up from this script's directory
cd /d "%~dp0"

set "TSDOWN_CMD=%TSDOWN%"
if defined TSDOWN_CMD goto :have_tsdown

where tsdown >nul 2>nul
if not errorlevel 1 (
  set "TSDOWN_CMD=tsdown"
  goto :have_tsdown
)

set "TSDOWN_CMD="
for %%D in ("%~dp0..\node_modules\.bin\tsdown.cmd" "%~dp0..\..\node_modules\.bin\tsdown.cmd") do (
  if not defined TSDOWN_CMD if exist "%%~D" set "TSDOWN_CMD=%%~D"
)

if defined TSDOWN_CMD goto :have_tsdown

echo [build] tsdown not found. Set TSDOWN to your tsdown.cmd, e.g.:
echo        set TSDOWN=C:\path\to\deepseek-harness\node_modules\.bin\tsdown.cmd
pause
exit /b 1

:have_tsdown
call "%TSDOWN_CMD%"
echo.
echo ============================================
echo Build finished. Press Ctrl+F5 in the browser
echo to see the changes.
echo ============================================
pause
