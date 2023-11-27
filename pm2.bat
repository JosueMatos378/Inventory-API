@echo off

REM Encontrar o caminho do Node.js
for /f "tokens=*" %%i in ('where node') do set NODE_PATH=%%i

REM Encontrar o caminho do PM2
for /f "tokens=*" %%i in ('where pm2') do set PM2_PATH=%%i

REM Verificar se ambos os caminhos foram encontrados
if not defined NODE_PATH (
  echo Erro: Node.js não encontrado.
  exit /b 1
)

if not defined PM2_PATH (
  echo Erro: PM2 não encontrado.
  exit /b 1
)

REM Extrair o caminho para o diretório que contém o executável do PM2
set PM2_DIR=%PM2_PATH:~0,-6%

REM Definir variáveis de ambiente
SET PM2_HOME=%PM2_DIR%
SET PATH=%PATH%;%NODE_PATH%

REM Iniciar PM2
%PM2_DIR%\pm2 resurrect
