@echo off
REM ============================================================================
REM GZIP Compression Script for HISE Documentation (Windows)
REM Generates pre-compressed .gz files for all static assets
REM Requires: gzip.exe in PATH or Git Bash installed
REM ============================================================================

setlocal enabledelayedexpansion

echo ======================================
echo   GZIP Asset Compression Script
echo ======================================
echo.

REM Check if gzip is available
where gzip >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: gzip not found in PATH
    echo.
    echo Options:
    echo   1. Install Git for Windows (includes gzip)
    echo   2. Install GnuWin32 gzip
    echo   3. Use WSL/Git Bash and run gzip-assets.sh
    echo.
    pause
    exit /b 1
)

echo Using gzip: 
gzip --version | findstr "gzip"
echo.

cd template

echo Compressing Minified CSS files...
echo -----------------------------------
gzip -9 -k -f css\style.min.css
gzip -9 -k -f css\prism.min.css
echo.

echo Compressing Minified JavaScript files...
echo -----------------------------------
gzip -9 -k -f scripts\anchor-nav.min.js
gzip -9 -k -f scripts\search.min.js
gzip -9 -k -f scripts\generate.min.js
echo.

echo Compressing Large JSON files...
echo -----------------------------------
gzip -9 -k -f scripts\search.json
gzip -9 -k -f scripts\toc.json
echo.

echo Compressing Other CSS/JS files...
echo -----------------------------------
gzip -9 -k -f css\autoComplete.css
gzip -9 -k -f scripts\autoComplete.js
gzip -9 -k -f scripts\prism.js
gzip -9 -k -f scripts\index.js
echo.

echo Compressing HTML templates...
echo -----------------------------------
gzip -9 -k -f header.html
gzip -9 -k -f footer.html
gzip -9 -k -f index.html
gzip -9 -k -f dummy.html
echo.

echo ======================================
echo   COMPRESSION COMPLETE
echo ======================================
echo.
echo All assets compressed successfully!
echo Pre-compressed .gz files created.
echo.
echo View file sizes:
echo   dir /s *.gz
echo.
pause
