@echo off

REM Configurar o local do arquivo de log
set LOG_FILE=%TEMP%\install-log.txt

REM Redirecionar mensagens de erro para o arquivo de log
2> %LOG_FILE% (

  REM Instalar dependências do Node.js
  npm install

  REM Instalar o PM2 globalmente
  npm install -g pm2

  REM Iniciar o aplicativo com o PM2
  pm2 start api.js --name Inventory-API

  REM Salvar o estado atual do PM2
  pm2 save

  echo Dependências do projeto instaladas e projeto iniciado com PM2.
)

REM Exibir o conteúdo do arquivo de log
type %LOG_FILE%

echo.
echo Pressione qualquer tecla para sair.
pause > nul
