@echo off
rem Gandalf theme - one-click build. Edit theme.css.ts / tokens.ts, then double-click this file.
cd /d "%~dp0"
call "C:\Me\harness\deepseek-harness\node_modules\.bin\tsdown.cmd"
echo.
echo ============================================
echo Build finished. Press Ctrl+F5 in the browser
echo to see the changes.
echo ============================================
pause
