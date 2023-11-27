@echo off

REM Parar completamente o daemon do PM2
pm2 kill

echo Daemon do PM2 parado.

echo.
echo Pressione qualquer tecla para sair.
pause > nul
