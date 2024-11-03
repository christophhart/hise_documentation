@echo off

set hise_path=C:\actions-runner\_work\HISE\HISE\projects\standalone\Builds\VisualStudio2022\x64\CI\App\HISE.exe

set root_dir="-p:%CD%"
set snippet_dir="-s:%CD%/hise_snippets"
set html_dir="-h:%CD%/html_build"

echo Building docs with folders:
echo %root_dir%
echo %snippet_dir%
echo %html_dir%

REM %hise_path% --help

%hise_path% create-docs %root_dir% %snippet_dir% %html_dir%
