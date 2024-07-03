

This call pulls a font from the [Images](/working-with-hise/project-management/projects-folders/images) folder and gives it a FontID (string) reference that you can use later on.   

{PROJECT_FOLDER} refers to the root of the projects **Images** folder. Just put your font there, or in a subfolder like in this example (fonts/).

```javascript
Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");
```