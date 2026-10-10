@echo off
title Blog dev server - D:\code\blog
cd /d D:\code\blog

if not exist node_modules (
    echo [setup] Installing dependencies, please wait...
    call npm install
    if errorlevel 1 (
        echo [error] npm install failed. Check that Node.js is installed.
        pause
        exit /b 1
    )
)

echo [ok] Dev server starting at http://localhost:4321/
echo [tip] Edit src/content/posts/*.md - changes hot-reload in the browser.
echo [stop] Close this window to stop the server.

rem Open the browser after 4s to give the dev server a head start
start /min cmd /c "timeout /t 4 /nobreak >nul & start "" http://localhost:4321/"

call npm run dev
pause