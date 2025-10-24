@echo off
node --env-file=.env deploy-commands.js
node --env-file=.env index.js
pause
