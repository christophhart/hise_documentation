# IOS Export

HISE can export instruments as iOS standalone app or (with the recent addition) as AUv3 app extension so you can load it into hosts like Garageband, AudioBus 3 or AUM. The workflow is almost the same as exporting desktop apps, but you need to use XCode to compile and transfer it to your device.

## Requirements

In order to compile iOS apps, you need the following things:

- an iOS device with at least iOS 9 (this is the lowest version that supports AUv3). I'd recommend the iPad 4th generation as low end device (below that it gets ridiculous).
- a computer running OSX (I am using 10.12, but it should work with older versions too)
- XCode 8+
- an Apple Developer Account (iOS apps need to be signed even for testing). You don't need to be enrolled into the Apple Developer Program (which costs 100 bucks / year), but then the apps you create on your device are only valid for 7 days, after which you'll have to recompile.
- a correctly setup for HISE and its source code so you can compile desktop apps (if you can't do this, you're out of luck on iOS).

## Basic procedure

The procedure for creating iOS apps looks like this:

### In HISE

1. Build your instrument just like a desktop plugin / app
2. **File -> Export As Standalone -> iOS Standalone app**. It will open the terminal window, but instead of launching the compiler, it just creates the XCode project.

### In XCode

1. Close HISE and open the XCode Project found in `Binaries/Builds/iOS/`
2. Choose your Development Team for *both* the **AUv3 Standalone** target as well as the **AUv3 App Extension** Target (*Project Settings -> Target -> General -> Signing -> Team*)
   
  ![iOS Target.png](http://hise.audio/manual/images/Signing.png)

> If the team selection does not appear, you have to enable **Automatic manage Signing**

3. Connect your iOS Device and choose it as target on the main XCode Toolbar:
     ![iOS Target.png](http://hise.audio/manual/images/iOSTarget.png)

4. Compile the app using **Product -> Build For Profiling** (or **Product -> Build for Testing** to debug)

That's it. From then on you can do everything just like with a normal iOS app (upload to App Store, submit for testing, etc). 

## iOS specific features

**HISE** tries to encapsulate as much platform specific details as possible. However, there are a few things that need special treatment on iOS, which will be explained here.

### Icon

Just put a `Icon.png` image into the project's image folder and it will be used as app icon.

### Splash Screen for standalone app

Depending on the size and complexity of your app, the initial start up time might be a few seconds. To avoid a black screen without any information on whats going on, you can add a image file to the projects image folder with the filename `SplashScreen.png` and it will copied and used as splash screen. The image will be scaled to the full screen size, so the recommended image dimensions are the retina iPad resolution (2048 * 1536).

> When used as AUv3 app extension, the splash screen will not be displayed.

### Support for different devices

iOS apps that are compiled with HISE are universal apps, which means that they can be executed on any iOS device. However, the screen resolution and size vary depending on the device type so in order to give the best experience on any device, you need to adapt the user interface. In order to achieve this, there are some tools that assist you with this.

#### iOS Device Simulator

Since iOS requires another UX than desktop applications, there are some things that are handled differently (eg. bigger popup menus, touch and hold for right click etc.)

During development, you might want to check out exactly how the app will appear on your device. This can be achieved by selecting a device on the Device Simulator (**Tools -> Device Simulator**). It will then recompile all scripts and return the current device for the scripting API calls.

#### Automatically choose the correct interface size

Use `Content.makeFullScreenInterface()` and it will use the full screen resolution of the device you are using (the Device Simulator will change the resolution depending on its model). You can also use `Engine.getDeviceResolution()` that will return an array with the screen bounds (`[x, y, width, height]`). If you are using vector graphics for your interface, this can be used to calculate the ratios.

#### Write device-dependant code

You can use the scripting method `Engine.getDeviceType()` to obtain the currently used device type as String (scroll through the device simulator to see every String possible). This can be used to distinguish between devices and change the interface accordingly.

#### Include different script files

For simple vector based interfaces this will be enough. But in most cases, you need to reorder your interface, use another background image etc. to support different screen models, which would increase the complexity and workflow. Fortunately, here is a neat trick in HISE that improves the clarity and that is to use the wildcard `{DEVICE}` to include different files depending on the current device

> If you do this, it is strongly recommended to use the same amount of controls with the same names to make the user presets compatible across all devices). 
 
**Example**

```javascript
// on the iPhone 5, it will include the file `Interface_iPhone5.js`
// on the iPad as AUv3, it will include the file `Interface_iPadAUv3.js`
// ...
include("Interface_{DEVICE}.js"";
```

This yields a workflow like this:

1. Design the interface for a certain device.
2. When finished, export the `onInit` callback to a external script file.
3. Repeat step 1 and 2 for every supported device.
4. Use the wildcard to include only the current device's script interface.
