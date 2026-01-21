@echo off
REM ============================================================================
REM HISE Documentation Build Script
REM ============================================================================
REM
REM This script generates the HISE documentation and deploys to git.
REM
REM Usage:
REM   build.bat           # Generate docs and deploy to git
REM
REM ============================================================================

set hise_path=C:\actions-runner\_work\HISE\HISE\projects\standalone\Builds\VisualStudio2022\x64\CI\App\HISE.exe

set root_dir="-p:%CD%"
set snippet_dir="-s:%CD%/hise_snippets"
set html_dir="-h:%CD%/html_build"

echo ============================================================================
echo   HISE Documentation Build
echo ============================================================================
echo.
echo Building docs with folders:
echo   Root:     %root_dir%
echo   Snippets: %snippet_dir%
echo   Output:   %html_dir%
echo.

REM Create html_build directory if needed
if not exist html_build mkdir html_build

REM Clone the deployment repository
cd html_build
if not exist .git (
    echo Cloning deployment repository...
    git clone https://github.com/christophhart/hise_doc_html .
) else (
    echo Updating deployment repository...
    git pull
)
cd ..

REM Generate documentation using HISE
echo.
echo Generating documentation...
%hise_path% create-docs %root_dir% %snippet_dir% %html_dir%

REM Copy SEO files
echo.
echo Copying SEO files...
copy /Y template\robots.txt html_build\robots.txt

REM Generate sitemap.xml
echo.
echo Generating sitemap.xml...
powershell -ExecutionPolicy Bypass -File scripts\generate-sitemap.ps1

REM Compress assets with gzip
echo.
echo Compressing assets with gzip...
call scripts/gzip-assets.bat
if %errorlevel% neq 0 (
    echo WARNING: GZIP compression failed, continuing anyway...
)

echo.
echo ============================================================================
echo   Deploying to Git
echo ============================================================================
echo.

cd html_build


git add --all
git commit -m "build server update"
git push

cd ..

echo.
echo ============================================================================
echo   Build Complete!
echo ============================================================================
echo.
