This function can be used to create an image from a section of your interface and save it as PNG file. Just pass an array with 4 elements (`[x, y, w, h]`), a [`File`](/scripting/scripting-api/file) object that points to a directory and a relative filename (without the file extension) and it will render the specified area into a PNG image.

```javascript
// Save the image to C:\Users\UserName\Documents\myimage.png;
Content.createScreenShot([0, 0, 1024 768], 
                         FileSystem.getFolder(FileSystem.Documents), 
                         "myimage");
```

Be aware that this takes the current zoom factor into account, so if you have a UI Zoom Factor of 200%, the resulting image will be twice the size of the "default" interface dimensions. It will also hide any visual guides that you might have added so they don't clutter your exported image.

> Also be aware that if you use OpenGL shaders, they will not be rendered to the image (because they are rendered directly to the screen). However there is a [helper function](/scripting/scripting-api/scriptshader#setenablecachedbuffer) available to enable shaders to be rendered to a screenshot.