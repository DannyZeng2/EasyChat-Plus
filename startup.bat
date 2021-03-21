@echo off
start cmd /k "cd easychat-frontend&&npm run serve"
start cmd /k "cd easychat-backend&&nodemon app.js"