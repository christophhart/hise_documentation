---
keywords: Images
author:   Christoph Hart
summary:  Explains the Images Folder
index:    04
---

As the self explanatory name suggests, this is the place for all embedded images - filmstrips and backgrounds. Also, all other artwork-related data like custom fonts or the icon should be put here.

HISE supports the most important image types (JPG, GIF and PNG), however it's preferred to use PNG format since it offers the best compression ratio and decompression performance. There is one thing you need to know about images: they can get really big and waste a lot of memory. The reason is that the images will be decompressed and stored in memory as 32bit bitmaps, so retina filmstrips of a 3D rendered knob can easily eat up hundreds of megabyte of RAM.
If you're using retina images, be aware that HISE uses a "logical" resolution that is the same as the non-retina pixel size, however you can just feed it with high resolution images and it will automatically scale them correctly (and for non-retina images, use a downscaled version).

Apart from custom backgrounds and filmstrips, there are a few hardcoded locations that HISE will use to look for commonly used image data:

- **Icon**: just add a transparent, square PNG called `Icon.png` in the Images folder and it will be used as application icon (we recommend at least a 256x256 resolution). For plugins this won't have any effect.
- **Splash Screen**: you can add a splash screen that will be shown during application launch. In this case, just drop a `SplashScreen.png` file (or for iPhone screens a `SplashScreeniPhone.png`). It's recommend to use the same resolution as your final UI size, otherwise things will look weird.
- **Custom keyboard filmstrips**: If you want to use a customized keyboard, you can add images for each of the 12 keys (up and down state). Take a look at the [Keyboard](/ui-components/floating-tiles/plugin/keyboard) floating tile for more information.
- **Fonts**: if you are using a custom font, the end user will most likely not have it installed on his computer. So in order to make sure that your UI will look the same you will need to embed any non-standard font that you use into the project. In order to do so, put them all into the `Fonts` subdirectory of the Images folder (for more information, take a look at the [Engine.loadFontAs(String fileName, String fontId)](/scripting/scripting-api/engine#loadfontas) that loads custom fonts).
- **About Page**: the [AboutPagePanel](/ui-components/floating-tiles/plugin/aboutpagepanel)-Floating Tile can use a custom background image. Just add a file called `about.png` in the Images folder and it will use it.
