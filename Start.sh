#!/bin/bash

# Instalar o PM2 globalmente
npm install -g pm2

# Instalar o pm2-windows-startup globalmente
npm install pm2-windows-startup -g

# Configurar o PM2 para iniciar com o Windows
pm2-startup install

# Iniciar a aplicação com PM2
pm2 start api.js --name Inventory-API -f

# Salvar o estado atual do PM2
pm2 save
