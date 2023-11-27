@echo off

REM Instalar dependências do Node.js
npm install

REM Instalar o PM2 globalmente
npm install -g pm2

echo Dependências do projeto instaladas.

echo.
echo Pressione qualquer tecla para sair.
pause > nul
