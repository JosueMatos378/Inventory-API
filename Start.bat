@echo off

REM Iniciar o aplicativo com o PM2
pm2 start api.js --name Inventory-API

REM Abrir o PM2 Plus no navegador padrão
start "" "http://localhost:9615"

REM Salvar o estado atual do PM2
pm2 save

echo Projeto iniciado com PM2 e PM2 Plus aberto no navegador.

echo.
echo Pressione qualquer tecla para sair.
pause > nul
