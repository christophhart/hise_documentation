# Creating the User Interface

In the last chapter we have created our patch and added modulators and additional sound generators. Now we want to build a custom user interface. For simple interfaces like this one you'll almost get away without writing a single line of Javascript yourself - there are some helper tools which try to do the most boring stuff for you. However please have a look at the generated code. As soon as the interface gets more complicated or you need a more dynamic behaviour, you'll need to go in there manually.

We'll be using a background image and film strips for the sliders. The graphics are kindly provided by Jesus Ginard from Wavesfactory. You can download the image files [here](http://hise.audio/download/tutorial/ImagesTutorial.zip). If you copy them into the `Images` subfolder of our project, we are ready to start.

## Add the Interface Script Processor

A user interface script is a ScriptProcessor in the **Master Chain** slot which is explicity told to act as interface. Let's insert a Script Processor (you can rename it to *Interface* or something like that...). In the `onInit` callback, please add these lines:

```javascript
Content.makeFrontInterface(505, 252); // width, height
Synth.deferCallbacks(true);
```

The first line tells the engine that this script is a interface that will be used in the compiled plugin. The second line defers the callbacks so they won't waste any CPU cycles in the audio thread.

> It is generally recommended to defer the main interface because it increases the encapsulation. You can always add an undeferred ScriptProcessor and control it via the interface script (we'll also do this later in this tutorial).

If you press **Compile**, the interface area will increase and the home button in the top toolbar will be enabled. The button toggles a window with a preview how the finished plugin will look like. Press it and you should see this:

![EmptyInterface.png](http://hise.audio/manual/images/EmptyInterface.png)

There's a crowded little toolbar in the top, then a blank black space (which will be our interface later on) and a keyboard on the bottom.

### Customize the Toolbar

First let's get rid of some stuff in the toolbar. By default everything is enabled but you can easily deactivate some elements. First let's take a look at each element so we can decide what we wan't.

Element | Property Identifier | Description
------- | ------------------- | -----------
CPU Meter / BPM Display / Voice Counter | `cpuTempoVoicesShown`| Displays the system stats for this instrument
Preset Manager | `presetShown` | Shows the preset manager (a drop down menu and the two arrow buttons)
Tooltip Bar | `tooltipBarShown` | The tooltip bar that shows some help when hovering over controls
Master Knobs | `knobsShown`| Knobs that can control the master tune / pan / gain
OutputMeter | `outputMeterShown` | A output peak meter

In our example we won't be using any presets, so we don't need the preset manager widget. Also the master knobs will be hidden (so that the tooltip bar is a little bit bigger).

In order to hide elements, you need to create a JSON object and pass it to the method `Content.setToolbarProperties(toolbarData)`. Fortunately, there is a helper function that creates the default behaviour, so just use **Tools -> Create Default Toolbar JSON Definition**. Paste the clipboard content into the `onInit` callback and change the properties `presetShown` and `knobsShown` to `false`. Press Compile and enjoy the new shiny toolbar (you might have to close and reopen the preview window after this step).

### Customize the keyboard

The colours of each key in the keyboard can be defined separately in order to give the user a hint where the range of the instrument can be found. In our case, the samples are mapped between 50 (D2) and 76  (E4). If you wonder how I got the numbers, just add `Console.print(Message.getNoteNumber())` in the `onNoteOn` callback and check what are the edges of your mapped range in the console.

Add this code to the `onInit` Callback:

```javascript
for(i = 0; i < 127; i++)
{
	if(i >= 50 && i <= 76)
    {
		Engine.setKeyColour(i, 0x22FFFFFF);    
    }
    else
    {
    	Engine.setKeyColour(i, 0x77000000);
    }
}

// This centers the range in our plugin window (symmetry is awesome)
Engine.setLowestKeyToDisplay(33);


```

The format for the colour is best written as hexadecimal number in the format `0xAARRGGBB` so you might play around with different colours if you are bored. But go easy on the alpha value or it gets ugly...

Now we're ready to tackle the big black space in the middle.

### Create the interface content

We'll be using the fancy new Interface Designer to add the background image and the knobs and buttons. Close the preview, double click on the header of the interface script to set it to **Full Screen** (there is a breadcrumb bar which shows the current view level) and click on the **Lock** symbol on the top right of the interface to change the interaction mode. Basically there are two modes:

1. **Edit mode (the pen symbol)**: Create new widgets, drag them around and change their properties
2. **Play mode (the lock symbol)**: Test the interface

Now that you're in Play mode you'll notice the rasterized overlay with 10px measurements. First let's add the background image. Rightclick somewhere on the interface, choose **Add new Image** and give it a name (`bgImage` would come into mind...). Press OK and you should see a small image without content.


![AddBgImage.gif](http://hise.audio/manual/images/AddBgImage.gif)


Click on the image (it gets selected and the properties of it show up in the right panel). Drag it to (0,0) (you can see how the code changes as you move it around). Scroll down in the property list and click on the **Open** button of the `fileName` property. Select the `Background.png` file in the dialog and press **OK**. The little placeholder for the image should be replaced with the background image. Press **Compile** to save the changes (you are currently in a intermediate stage where the changes you made are withholded from the scripting engine to allow a nicer UX).

If you reopen the preview window now, you'll see something that starts to resemble our final plugin:

![InterfaceWithBG.png](http://hise.audio/manual/images/InterfaceWithBG.png)

Now we'll be adding the knobs and the buttons. There are six knobs with a custom filmstrip and two buttons. Click somewhere and choose **Add new Slider** and call it `modWheelAttKnob`(a slider and a knob is practically the same thing so please don't get too confused by this).

Click on the Knob, and load the image called `knob_128frames.png` (by clicking on the **Open** button of the `filmStrip` property. Change the `filmstripAmount` property to 128 (you might have guessed this one from the filename), the `width` to 32px, the `height` to 38px and press Compile.

Now select the knob again and move it to the correct position (above the *ModWheel Att.* label). There are some features that assist you with correct positioning:

1. Use the arrow keys to move widgets around.
2. Use modifier keys to alter the behaviour:

Modifier Key | Action | Behaviour
--- | --- | ---
Command Key | Mouse Drag & Key Stroke | Enables rastered movement (rounded to multiplies of 10)
Shift Key | Mouse Drag | Enables horizontal / vertical only movement / resizing
Shift Key | Key Stroke | Resize the widget
Alt Key | Mouse Drag | Creates a copy of the currently selected widget (there will also be a plus sign on the widget indicating that it will be copied).

Before we proceed, let's take a look at the code we generated:

```javascript
const var modWheelAttKnob = Content.addKnob("modWheelAttKnob", 87, 99);
// [JSON modWheelAttKnob]
Content.setPropertiesFromJSON("modWheelAttKnob", {
  "width": 32,
  "height": 38,
  "filmstripImage": "{PROJECT_FOLDER}knob_128frames.png",
  "numStrips": "128"
});
// [/JSON modWheelAttKnob]
```

The first line is the widget definition (it is strongly recommended to keep the name of the widget and the variable name identical). The rest is the properties of the component as JSON (there are more properties, but it just shows the non default ones to keep the redundancy low).

We could now start duplicating the knob until we have all knobs that we need. However it would copy the JSON list for each knob which creates a huge amount of boilerplate code (for this example it might be OK, but for larger interfaces it gets extremely annoying). But there is a handy solution baked right into HISE:

In almost every interface you'll probably end up with multiple widgets which are basically the same (and only differ in their x/y position). For this kind of widgets I recommend using a factory function, which has at least three parameters:

1. Name
2. x-position
3. y-position

If you rewrite the widget definition as factory method, you'll end up with something like this:

```javascript
inline function createMusicBoxKnob(name, x, y)
{
	local widget = Content.addKnob(name, x, y);
    
    Content.setPropertiesFromJSON(name, {
      "width": 32,
      "height": 38,
      "filmstripImage": "{PROJECT_FOLDER}knob_128frames.png",
      "numStrips": "128"
    });
    
    return widget;
};

const var modWheelAttKnob = createMusicBoxKnob("modWheelAttKnob", 87, 99);
```

This does not seem to be less code, but from now on, you can add the same knob type with a simple line:

```javascript
const var clickAttackKnob = createMusicBoxKnob("clickAttackKnob", 127, 99);
```

Now comes the best part: HISE can automatically convert a widget definition plus its JSON properties into a factory method. Select everything you want to move into the factory method (in this case the widget definition line and all JSON code including the comments), and select "Convert to UI factory method" in the context menu. Enter a name for the method (start with `createXXX`) and it will replace the definition with the lines shown above:

Things get easier from now on. After you successfully positioned the first knob, you can simply duplicate the knob and move it around horizontally by holding both the **Alt** and the **Shift** key (notice the `+` symbol while dragging. Add the other knobs and use these names (so we don't mix things up later):

1. `clickAttackKnob`
2. `reverbAmountKnob`
3. `reverbSizeKnob`
4. `reverbColourKnob`
5. `reverbPreDelayKnob`

It detects automatically if the original knob was created using a factory method and uses the same method for the new definition (or copies the JSON data if it was defined the standard way):

```javascript
const var modWheelAttKnob = createMusicBoxKnob("modWheelAttKnob", 87, 99);
const var clickAttackKnob = createMusicBoxKnob("clickAttackKnob", 212, 99);
const var reverbAmountKnob = createMusicBoxKnob("reverbAmountKnob", 345, 99);
const var reverbSizeKnob = createMusicBoxKnob("reverbSizeKnob", 419, 99);
const var reverbColourKnob = createMusicBoxKnob("reverbColourKnob", 419, 174);
const var predelayKnob = createMusicBoxKnob("predelayKnob", 344, 174);
```

Now we just need to add the two buttons and then we can proceed to connecting the interface to the instrument and conclude this chapter. You should be able to do without further guidance. The filmstrip images for the `releaseTriggerButton` is called `onOffSwitch.png` and the image for the `noteOffButton` is the `switch.png` image. The size of the buttons is `43 x 22 px`.

If your interface looks like this, you are ready to proceed:

![InterfaceFinished.png](http://hise.audio/manual/images/InterfaceFinished.png)

### Cleaning up...

You might want to add some empty lines to structure the code a little bit. And you can insert **Code Bookmarks** by adding a line like this:

```javascript
//! ============ [...] ====== Bookmark Title
```

An exlamation mark after the comment slashes tells the parser to treat that line as bookmarks (characters like `=` or `-` will be stripped from the bookmark title). This allows you to quickly jump between locations in the code (All bookmarks are listed in the editor's context menu after compilation). 

#### Bonus Level: Tooltips

You can add tooltips pretty easily which will be displayed when you hover over a widget. Select each widget and insert a descriptive text into the `tooltip` property field:

Widget | Tooltip
------ | -------
`modWheelAttKnob` | Dampens the velocity according to the modwheel position
`clickAttackKnob` | Controls the volume of the click noise
`reverbAmountKnob` | Controls the reverb amount
`reverbSizeKnob` | Controls the room size of the reverb
`reverbColourKnob` | Controls the timbre of the reverb
`reverbPreDelayKnob` | Controls the predelay of the reverb
`releaseTriggerButton` | Enables a muted ring off sound
`noteOffButton` | Lets the note ring off naturally (ignores note offs)

If you are not the click and scroll type, you could also use this javascript code to achieve the same thing (this would be an example where its faster to do this manually):

```javascript
//! ============================================================================== Tooltips

modWheelAttKnob.set("tooltip", "Dampens the velocity according to the modwheel position");
clickAttackKnob.set("tooltip", "Controls the volume of the click noise");
reverbAmountKnob.set("tooltip", "Controls the reverb amount");
reverbSizeKnob.set("tooltip", "Controls the room size of the reverb");
reverbColourKnob.set("tooltip", "Controls the timbre of the reverb");
reverbPreDelayKnob.set("tooltip", "Controls the predelay of the reverb");
releaseTriggerButton.set("tooltip", "Enables a muted ring off sound");
noteOffButton.set("tooltip", "Lets the note ring off naturally (ignores note offs)");
```

### Connecting the parameters

Until now the interface is a pretty but useless thingy so we need to connect the controls to parameters within the patch.

> For a detailed description of the parameter system in HISE take a look at this blog entry

For our little example we can use the **Parameter Connection Wizard** that automatically creates the code for us. Let's start with the reverb knobs. Change to **Edit Mode**, right click the `reverbAmountKnob` and select **Connect to Module Parameter**. Select the `ReverbSendGain` module and the `Gain` parameter and press OK. There will be two new things added to the script:

**1. The variable definition for the reverb module in the `onInit` callback:**
```javascript
const var ReverbSendGain = Synth.getEffect("ReverbSendGain");
```

This creates a connection to the module in the patch. It searches the entire tree and returns the first element with this name, so make sure you don't use names twice if you want to access them via scripting.

**2. A switch statement in the onControl callback**:

```javascript
	switch(number)
	{
		case reverbAmountKnob:
		{
			ReverbSendGain.setAttribute(ReverbSendGain.Gain, value);
			break;
		}
	};
```

If you move the knob, it should now change the gain parameter. However, it just moves between 0dB and 1dB (because the slider has a default range of 0...1). So you'll need to change the slider's range by inserting these lines after its definition. Normally we could simply change the JSON properties, but since we replaced the JSON definition with the factory method, we'll need to change this manually (this is the tradeoff we have to take):

```javascript
reverbAmountKnob.setRange(-100, 0, 0.1);
reverbAmountKnob.setMidPoint(-12.0);
```

Proceed with the other sliders. Apart from the `predelaySlider` all parameters should happily accept the default `0...1` range. But you might want to change the mid point of the click attack slider to `0.25` (which is -12dB as gain factor).

Now the buttons. The "Release Trigger" button will toggle the sine generator. We could turn down the volume to zero by using the Gain parameter, but there is a more elegant solution: Add a MIDI muter to the Sine Generator and use its "Ignore all events" parameter to bypass the sine generator without clicks. You'll need to invert the behaviour for this button by changing this line in the `onControl` callback:

```javascript
MuteRingOff.setAttribute(MuteRingOff.ScriptedParameters.ignoreButton, value);
```

Just insert a `!` before `value` and it should use the inverted value.

The other button changes the note off behaviour (if set to ringing, it'll ignore the note off message and the sample can fully decay). This can be achieved by using the `OneShot` property of the sampler module.

That`s it. The interface is fully functional and the instrument is ready to be exported as VST / AU plugin, which will be the last chapter of this tutorial.
