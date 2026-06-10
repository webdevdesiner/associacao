@echo off
title Associacao Digital - App (Expo)
cd /d "%~dp0projetoApp"
echo.
echo  Associacao Digital - Expo (celular + web)
echo  Encerrando servidores antigos na porta 8081/8082...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8081" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8082" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
echo  Escaneie o QR code no Expo Go (porta 8081)
echo.
npx expo start --clear --port 8081
pause