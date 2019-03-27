---
keywords: ScriptPanel Recipes
summary:  ScriptPanel Recipes
weight:   70
index:    01
author:   Christoph Hart, David Healey, Dominik Mayer
---

If you need any customized Interface Element, the ScriptPanel might be the solution to it.


## Open a Website
You can open an Website with `Engine.openWebsite("")`. The easiest way to implement this is with a ScriptPanel. A click event will open up the website in an external webbrowser.

Please remember to set the ScriptPanels `allowCallbacks` property to "Clicks & Hover".


``` js
const var Panel1 = Content.getComponent("Panel1");

reg link_hover = 0;

Panel1.setPaintRoutine(function(g)
{
    g.setColour(Colours.antiquewhite);
    g.drawText("wikipedia.org", [0,0,100,20]);
    
    if (link_hover == true)
    {
      // handdrawn underline on hovering the text 
      g.drawLine(12, 88, 20, 20, 1.0);
    }
});

Panel1.setMouseCallback(function(event)
{
  if (event.clicked)
  {
    Engine.openWebsite("https://www.wikipedia.org/");
  } 
  else 
  {
    link_hover = event.hover;
    this.repaint();
  }
});

```
```
HiseSnippet 967.3ocsV01aiSDDdcZ8wk.AwIwW3aqxGPNnPpc4tiJPUTZZJDw0dQjxARHT0V6IwqhytFuqatnS82E+s3e.LqW6yIGQkFjvRIsyadelYdlYy3LYHnTxLhSyqVkBDmOvcxJgNdPLiKHiNi37gtWvTZHiZUc5pTlRAQDGm89NiBml6SJd9yu4TVBSDB0pHjWI4gvK3K35ZsiO4G3IImyhfq3KVy6mdxnPoXfLQli3YOWeRJKbNaFbIy3VCWhyiFFw0xrIZlFTDm8OUFsZRrbov5+q3J9MIfQHfLAeQV0mKShLH1nkLHlmDMtJuUD7sLttJrmsJ7wtWvi3uUec03iJLPqiX85gSi6CdA+6vyeavyYM3suEdOwcRXFOUWawfs22cj.aTSYXKXcXY8kz3OZ3NPhdHz8WvlCmmgBuMBum662i9Le+tec6VsagMBkldKKiNlIfj.5wzpXmA5AxEoRAJ30wZtiMpLXFMgKlecr7VjwbL0uPs0m9JPOFqi5eTlq4BvaZtHTykBuYca25MsaQwmYFurT.O6eT8YBM+2ygkwbMXNGqeQYrkWAuFgvR9bdJDwY8kYy5zi9q9876Efoyg9+Vk+1u4Sodqiuio5rbnq0XIBpd2uv.wfC6QO5ndzC8seB5i0mB2tqcq659NY2ExbELfkjbCxaqSO3VrRUkhFHTnneXBObNDUb5km8PwL7T6KSAwOC2nv70qSrVmp9pCNX4xk82HSOnSATtqH2fDEPW6MsQWvddERkkCcLW0OCRMsCOaMxlPUflJEWJ0vKEdca8lVMacWq20xzoayjgjjISRfrsY0LumcOg4IxWbCj0CIdIXeozOj1u4b0idXyUgVB6ZNJEiDb8KwxqU99WLPJY73+8SiNioYlgwRcneoPllafiyYvs3VN6nYS2y.0bsLsv2xwDhy6oKr1tZv0vYHb7nerqk+Pdc8hvO6jU0BAmrjGoiINtNgnXLvmEqMReBJgbM4xJFmxrdZfgUoneJ86MsabY6+X4AtBSFkmvzatWyrLuz.1S1XAhYIg.YiqVeY+Nrry+AuK9gB2m3NlqCi2NdarE7hst+uwa4UGscGNcJDpqA69tm+K+WumXGfhcs5rKX5LNRlbuLewDb+YHfHQfTLkgzzvPqsx9FYSkYBHhJD9K7ozXfQ1ozXPkQxBVXl75P6zp4xoGWnAwjn3N5l3OV.koAjhIXKtWf2XdcXnoP74Hx2dDGtyQ7E6bDOcmi3Y6bDOemi3K24HN5dhv7yS91bsbgcr.ULdXwtKGmgBFxpJXfj+FzAXrRC
```


## Rotate an image

A script to rotate an image with a dedicated ScriptPanel.

Resource:
![logo bw](images/scriptpanel/logo_bw.png)
save as `logo_bw.png` in the **Images** Folder of your project.

``` js
Content.makeFrontInterface(600, 500);

const var Panel1 = Content.getComponent("Panel1");
const var Knob1 = Content.getComponent("Knob1");
const var Button1 = Content.getComponent("Button1");

reg angle = 0;
reg speed = 0;

Panel1.loadImage("{PROJECT_FOLDER}logo_bw.png", "test");

Panel1.setPaintRoutine(function(g){
    g.rotate(Math.toRadians(angle), [this.get("width")/2, this.get("height")/2]);
    g.drawImage("test", [0, 0, this.get("width"), this.get("height")], 0, 0);
});

Panel1.setTimerCallback(function(){
    angle = (angle + speed) % 360;
    this.repaint();
});


// Custom Callbacks for Knob1 and Button1

inline function onKnob1Control(component, value)
{
    speed = value;
};
Content.getComponent("Knob1").setControlCallback(onKnob1Control);


inline function onButton1Control(component, value)
{
    if (value)
    {  
        Panel1.startTimer(40);
    }
    else
    {
        Panel1.stopTimer();
    }
};

Content.getComponent("Button1").setControlCallback(onButton1Control);

```
```
HiseSnippet 1335.3ocyXEsaaaCEkJMpq1adXEXOrG1CDFX.JXYoNpocEnXndwIYHqsIFwcECXnKiQh1lnxjBTzMIKH.8SoeJ8SYeB8OX6RQJKZGaG6VDfICCXdIO7d34dI0ktsTDQyxDRjWkWbdJE48E9cNmq52pOgwQ6uCx6q7amPTJJOKkQSnRz1mmRxxnwHOua8K5Q4UYUT9yGdx1jDBOhVZBgdofEQeFa.SUZscymxRR1iDSeAafyn2p49QBdKQhXHvna42.kRhdMoG8.hdXq3i7t8twLkP1QQTzLj2paKhOuSewoby3eIKicRBU2XSTGXhLl2SjDqYr1JpUeVRb6hUdFBlk1k5vsL5vW6+bVLajcW8P2AtDgqd3sx7n2ltzqwhSOOG5spgd20uSjjkpJ6QysO2eethJ6RfPfKsLiEsxatieKALBtZiAjWS2SBMFgH3gMZrN9AMZr1iqUsVUHPjovugHwsIbZxl3eBWfsGU0RLHUvgFA0McWWiZBLgyGSX8I8zS4hSlsix6cB+nsENWDW0KaOToD7Y6Ga+S3Ii0vqAUg2pUUR6ggMC8Rn.jFO1XP5ZvNlrTJM1cLtFzeLB7FIBR79CfMCA0un8QG9q615EGu2gOamcO5xDQOwwmb5Fo7d0WGWGR8TVdXwlQUsgDX0QhgJFmFzcHORwD7fdqcQspX3o2FRgNoM34DU+MThiHwLBOKvrDVac7en5yxzq4f5mxhU8qu18BWGWZrOk0quRa8UZWalyXI4TKmyIELMPNVCWb1IaZS0qxGJjOV8xIWM5yMjsHIIm.GPTtbJVMiDdK+weuUmWC+c36+vFVBl6RIMUKMAS3lvOAAO7SPvk+uSvCW.AeThsk+ffKWbAW+4d2C2ZXlRL.W3kL7yncU59X7DPDwEdEK34mEn2HJEIAQE6BWG1olLjtVsp.spLZmUtQvQWBem6QK5EpcRGsTG2WE78pLxdpw0vIVWbPQasfbAFa9g9oH8VQjF8NXKcrP20klQQSxnVfSAlH0fpDyk4z8ZNla5q5wWOl08zhQGoSclcPJ7ZDD4xEjBmWPJbACRgexAovOtfT3GYPJb9AI20syh8.ghdHrEs5EUqT8xqzS2tSqK6TknY3U60R8YBKfObvITYgbZGGT0x3kE4O6xhbqZKxHINCTv2myTGlR4ypXIjUG0U0YIELTUdQSeosnoNIrXnPVFTazm4mu6Fky2xBQ+1lnEFb3Dfe6AyFrIdkCthucG1j99COYYfGNE3+196PTDcgiVw.DnTpTwzZu2Nz2.UjaJirh+NzrWC4jPg0ix5feabashhL04t4d8N9lCaPmU5vuo44kMvMye8xHCMiaZd4Ro7DqkmE1UgNt5ccccU8IbE9Jt58Qi4pJWaVvYtWEozUuqWyAN2y4eRe+.xYNMapnmozyRG8YYnLEMsC6uGKljMraWFfw2GKiQKCqbEf+puCqd+MIqt8Bj25nVOxUs3VOeavy.AGOJgNt4x4G20Olsv94s+YSzUu1Db4MQ7P39rieiN80Xsc.GmM1UmzWOhmwTm6pa2HWyaQo6c8ayTQ8mNeWYJ7ENH3llu1KMWye2tcoQpRxtp+d+9M+MjQlxr6AkRKyymOX3fNhgxHJvDNbJh9cNdqne6focCcasxzgxiya7uvisyM0s8rctYQmnAjHo33HyQy5qkembK.m34+6DU7ettMdzA5ZdOfEyNNJRKD+.v7oiHboQb+kFwVKMhGrzHd3Ri3GWZDOZNHz+wL+7Pn7Ty1BvP6cyeSnm2tbBjUkmAh9Ov8xBDj


```

## Loop a filmstrip


``` js
const var Panel1 = Content.getComponent("Panel1");
const var Button1 = Content.getComponent("Button1");

reg index = 0; // index of the filmstrip 
reg total_frames = 24; // total frames in the filmstrip
reg frame_height = 64; // the height(y) of each frame


Panel1.loadImage("{PROJECT_FOLDER}on_off_64_64_24.png", "dot");

Panel1.setPaintRoutine(function(g){
    
    g.drawImage("dot", [0, 0, this.get("width"), this.get("height")], 0, index * frame_height);
});

Panel1.setTimerCallback(function(){
    index = (index + 1) % total_frames;
    this.repaint();
});


// Custom Callback for Button1

inline function onButton1Control(component, value)
{
	if (value)
    {  
        Panel1.startTimer(100);
    }
    else
    {
        Panel1.stopTimer();
    }
};

Content.getComponent("Button1").setControlCallback(onButton1Control);
```
```
HiseSnippet 1090.3ocsV8uaiSDDdcaLbIPPbR7.rJRmjCT5kTxUPpBQn4Gn.WaiZJm3DBEs0dc7pZuqk85qMpJua7Hwa.Lq20INsIkK+QspZ6Ny7sy2L6ryriSDtzzTQBxp5UyioHqO2dxbtLnW.gwQi5ir9R6wgDojxSiYzPZB5z4wjzTpGxxZ+eQYkU0Jn7u+4mNkDR3tzUhPn2IXtz2xhXxURG282XggCIdzqXQkrtS2QtBdOQnHCXz91sPwD2aHynmSTlsmMx5SF3wjhjIRhjlhrpbpva9j.wsbs8uikxtNjpVzFMA1Hs3ghPOEiURQ8BXgdiKh7TDrKiWkG1WmG9J6yXdrkxKmOTJvqPTNeXs2SQu1koWqOd5YUhdUzz6k1SbSXwxUZTb6yrGwkzDeBbDTlVZaQ68pJ18DfEb4gQjanCSfEKQ3bbqVGfeSqVMOods50fChTI9CjD7XBmF1F+i3BrynxdhnXAGV3zPqtgB0JLmlIkB91AYz2P6qD5LLi6QuCru0I3W+ZyJgOVFPw9rvnTIDBXsoRgjDN0OAJJRADG0IGRtTrQJiuNRMvbkSCnrYAR.3wFffgZYNyap7Ik3FnsUQt50zQ3ggBh2nHnZzow8iu7hecPuqlN7h21evkKD7oBe+oG2Q8yQcNLlOqwA3FdBoIBMaQJUNFJjjWJxjLN0wOi6JYBtyrl2WuFF9z+d1gdIjaMNSsKGf+S3vA9QFvRU4RmF2x7jAMZVVjNJZz7uxMUmC+50hZEaV7PJotDlziDFdMbaaEmJnTwIii9e9Fb6l3Ws1gvIZCyIRBMVEgNk7T8ZPVtWVpTDgKbC1WrrJQYAiGBIDbgywBtQop9IQD53VT7b.TfElQaVuFvupLerSwZEGtuHEp9JBQIIQGjNs0k2JkKz+gFlRMP2.PQrFWIPKxio+mxZUZ0v7kI1GFRp8rT7dtPRu.x50tuV0ZKdjFe+MoxrUgJJ9XsFtuUXN7rnqoIEYTicPSl06hYu8tXkax5pSIkLTvGwYxKho7s0aCYxiptbFRAlJy6w8Eldb5rFhAsxpZaRgnbFWdNC52G0mHIEaDrmfehoIRlJDr5S+.LGR27rpceZ5MvYKLRY4gGLZQ615EsVU0.4d8E155AzcqbXqtyKuH+xX4Ab5qakkfdrqdxHbKN6ueeWI8NXO9T675ZzCb8ztnGOt.FZI7xf43qOISM91n.pKVajgZr.OkImWd79yx3sOV59R6wLoavl46dafuPovyMeMOVnt8.eepqbEYqXO7Od9eY.ROGY1YDXFGTuXedVzD3sStTfIbnjUc40ZO00L85Vp0pLyDJ2Kew+BeFksUqsLJaWnDEQbSDSc0WNUOG4E4R.NwyeUVU6yTqwKuSp3cD7FoottpDw2BLeyHNZmQ7c6LhN6Lh2ryHNdmQ786Lhe3IPndP5OmASW0WK.AiGj2KzxZ.m.UU4Ufn+CSrMQs.

```




## A six state button

The button in HISE can be filmstripped, but just uses two states. Since I am rather lazy about updating the in built widgets, I'd rather use this as an example how to build a really simple UI widget that is virtually indistinguishable from a hardcoded one.

This is the "filmstrip" we'll be using:

![FilmStrip](http://hise.audio/manual/images/panel/SixStateButton.png)

It uses the same order as KONTAKT expects, so we can reuse those images here - thanks Dorian for the explanation :) 

### Creating the Panel and set its properties

We need the Panel to be 200 pixels wide, store its value persistently, be non transparent and have a stepsize of 1 (this is important for host automation). Use the interface designer to set its properties and you should end up with a JSON property list like this:

```javascript
// [JSON Panel]
Content.setPropertiesFromJSON("Panel", {
  "width": 200,
  "allowCallbacks": "Clicks & Hover",
  "saveInPreset": true,
  "opaque": true,
  "stepSize": "1"
});
// [/JSON Panel]
```

### The data

Now let's take a look what data we need. The UI data will store the current states (hover and down) as well as the height per filmstrip seperately (so we can use other images). The **Control Value** will store the "on" and "off" state and will be either 1 or 0.

Whenever we change the button value (either when we click on it or when it gets restored from the preset, we'll be calling the `setButtonValue` method to encapsulate the inner behaviour.

```javascript
Panel.data.down = 0; 
Panel.data.hover = 0; 
Panel.data.heightPerFilmStrip = 50; // this will be changed when we use another image

inline function setButtonValue(p, value)
{
    p.setValue(value);
    p.repaint();
}
```

Loading the filmstrip image will be wrapped into a function so it can be easily replaced later:


```javascript
inline function loadFilmStrip(p, image, heightPerFilmstrip)
{
    p.loadImage(image, "filmstrip");
    p.data.heightPerFilmstrip = heightPerFilmstrip;
};

loadFilmStrip(Panel, "{PROJECT_FOLDER}SixStateButton.png", 50);
```

### The Paint Routine

Drawing this panel is pretty easy: just calculate the offset and draw the image:

```javascript
Panel.setPaintRoutine(function(g)
{
    var offset = this.data.heightPerFilmStrip * this.data.yOffset;
    g.drawImage("filmstrip",[0, 0, this.getWidth(), this.getHeight()], 0, offset);
});
```

### The mouse event callback

We told the panel to fire the callback on click and hover events. In the callback we need to distinguish between those two events and handle them accoringly. We'll be changing the value at the mouse release (this makes the example a bit more readable)

```javascript
Panel.setMouseCallback(function(event)
{
    if(event.clicked) // Handle mouse clicks 
    {
        // set the `down` flag and repaint
        this.data.down = true;
        this.repaint();
    }
    else if(event.mouseUp) // Change the value on mouse up
    {
        // set the `down` flag, change the value and call the onControl callback
        this.data.down = false;
        setButtonValue(this, 1 - this.getValue());  
        this.changed();
    }
    else // Handle the hovering
    {
        // set the `hover` flag and repaint
        this.data.hover = event.hover;
        this.repaint();
    }
});
```

### Final Code

That's it. We now have a six state button that we can use. This is the complete code wrapped into a namespace and with some helper methods and example usage:

```javascript
namespace SixStateButton
{
    inline function createWidget(name, x, y)
    {
        local widget = Content.addPanel(name, x, y);
    
        Content.setPropertiesFromJSON(name, {
        "width": 200,
        "saveInPreset": 1,
        "allowCallbacks": "Clicks & Hover",
        "opaque": 1,
        "stepSize": "1"
        });
    
        widget.data.hover = 0;
        widget.data.on = 0; 
        widget.data.down = 0;
        widget.data.heightPerFilmStrip = 50; 
    
        widget.setPaintRoutine(function(g)
        {
            var offset = this.getValue() ? 1 : 0;
            if(this.data.down) offset += 2;
            else if(this.data.hover) offset += 4;
        
            g.drawImage("filmstrip",[0, 0, this.getWidth(), this.getHeight()], 
                                    0, offset * this.data.heightPerFilmstrip);
        });
    
        widget.setMouseCallback(function(event)
        {
            if(event.clicked) 
            {
            
                this.data.down = true;
                this.repaint();
            }
            else if(event.mouseUp) 
            {
                this.data.down = false;
                setButtonValue(this, 1 - this.getValue());  
                this.changed();
            }
            else 
            {
                this.data.hover = event.hover;
                this.repaint();
            }
        });
        
        return widget;
    };
    
    inline function loadFilmStrip(p, image, heightPerFilmstrip)
    {
        p.loadImage(image, "filmstrip");
        p.data.heightPerFilmstrip = heightPerFilmstrip;
    };
    
    inline function update(p, value)
    {
        p.setValue(value);
        p.changed();
        p.repaint();
    }
    
    inline function setButtonValue(p, value)
    {
        p.setValue(value);
        p.repaint();
    }
};

// Create two buttons
const var b1 = SixStateButton.createWidget("b1", 0, 0);
const var b2 = SixStateButton.createWidget("b2", 300, 0);

// Load the image file
SixStateButton.loadFilmStrip(b1, "{PROJECT_FOLDER}SixStateButton.png", 50);
SixStateButton.loadFilmStrip(b2, "{PROJECT_FOLDER}SixStateButton.png", 50);

function onNoteOn(){}
function onNoteOff(){}
function onController(){}
function onTimer(){}

function onControl(number, value)
{
    // Update the buttons in the onControl callback
    SixStateButton.update(number, value);
}
```

## A ButtonPack

![ButtonPack](http://hise.audio/manual/images/panel/ButtonPack.gif)

There is the SliderPack widget for an array of sliders that can represent a lookup table, but what if we need an array of buttons that can be changed by dragging the mouse over them? Setting the SliderPack range to 0...1 does not work to our full satisfaction. Again, it's ScriptPanel time.

We'll be starting with the most naive implementation of this widget and change it until it meets our UX expectations.

We'll keep an array of `N` bool values that contains each button state. Then we'll vertically divide the ButtonPack into `N` equal rectangles (the buttons) and draw them according to their state Whenever we drag the mouse over the area of a button, we'll be toggling the array and update everything. We don't need any filmstrips, instead we render the whole thing completely scalable.

### Creating the Panel and its Properties

```javascript
const var Panel = Content.addPanel("Panel", 0, 0);
// [JSON Panel]
Content.setPropertiesFromJSON("Panel", {
  "width": 380,
  "height": 50,
  "allowCallbacks": "Clicks, Hover & Dragging",
  "opaque": true
});
// [/JSON Panel]

this.data.bgColour = Colours.white;
this.data.offColour = Colours.black;
this.data.onColour = Colours.red;

inline function setNumButtons(p, numButtons)
{
    // Reset the array
    p.data.buttonValues = [];
    
    for(i = 0; i < numButtons; i++)
    {
        // Fill the button values randomly for starters
        p.data.buttonValues[i] = Math.randInt(0, 2);
    }
}

setNumButtons(Panel, 16);
```

We also made a function that allows changing the number of buttons. Notice how we don't define the array outside of the function: the array will created only when calling this function (before it's `undefined`)

We also filled the button states with random values in order to have something for the paint routine. This will be of coursed replaced by zeroing the array later...

### The Paint Routine

This is the most simple implementation of our ButtonPack's paint function:

```javascript
Panel.setPaintRoutine(function(g)
{
    var numButtons = this.data.buttonValues.length;
    var buttonWidth = (this.getWidth()-1) / numButtons;
    
    g.fillAll(this.data.bgColour);
    
    for(i = 0; i < numButtons; i++)
    {
        g.setColour(this.data.buttonValues[i] ? this.data.onColour : this.data.offColour);
        
        // We'll need to subtract 1 on each side to have a "border"
        g.fillRect([1 + i*(buttonWidth), 1, buttonWidth-1, this.getHeight()-2]);
    }
});
```

There is a little issue with this paint routine: the borders get blurred. This is caused by having non-integer button widths which cause some lines to be between two pixels and get antialiased. There are two solutions to the problem:

1. Change the paint routine to round the button widths. This will lead to empty space at the right side of the button pack if you don't use a matching width.
2. Expect the user to use a width that doesn't create blurred lines (in this case, the width must be `x*16 + 1` (eg. 65, 129, 513...)

Solution 1 would not be hard to implement, but it will make the code less readable so for the sake of this tutorial, we'll go with number 2.

### The Mouse Event callback

This time we chose the `"Click, Drag & Hover"` callback level because we want to allow dragging over the ButtonPack and allow multiple buttons to be toggled without clicking each time (this is the whole reason for this widget, otherwise we could just have created an array of buttons).

First we'll create a bunch of helper functions that we need later on:

```javascript
// Returns the button index for the given x position.
inline function getButton(p, x)
{
    // Calculate the proportion of the x position
    local xNormalized = x / p.getWidth();
    
    // Calculate the array index by rounding it down.
    local index = Math.floor(p.data.buttonValues.length * xNormalized);
    return index;
}

// Inverts the button with the given index
inline function toggleButton(p, index)
{
    this.data.buttonValues[index] = 1 - this.data.buttonValues[index];
    handleUpdate(p);
    this.changed();
}

// Sets the array as Control Value and repaints the panel
inline function handleUpdate(p)
{
    this.setValue(this.data.buttonValues);
    this.repaint();
}
```

Now we can write the event callback:

```javascript
Panel.setMouseCallback(function(event)
{
    if(event.clicked)
    {
        // Toggle the button on mouse click
        toggleButton(this, getButton(this, event.mouseDownX));
    }
    else if(event.drag)
    {
        // You'll need to calculate the current position
        var x = event.mouseDownX + event.dragX;
        toggleButton(this, getButton(this, x));
    }
});
```

Now there is one serious problem: the buttons are flickering when you drag the mouse. This is because it toggles the button everytime a mouse drag event is received. In order to fix this behaviour, we'll need to keep track of the most recently changed button and prevent toggling until a new button is used:

```javascript
Panel.data.lastDraggedIndex = -1;

Panel.setMouseCallback(function(event)
{
    if(event.clicked)
    {
        this.data.lastDraggedIndex = getButton(this, event.mouseDownX); 
        toggleButton(this, this.data.lastDraggedIndex);
    }
    else if(event.drag)
    {
        var x = event.mouseDownX + event.dragX;
        var newDraggedIndex = getButton(this, x);
        
        if(newDraggedIndex != this.data.lastDraggedIndex)
        {
            this.data.lastDraggedIndex = newDraggedIndex;
            toggleButton(this, this.data.lastDraggedIndex);
        }
    }
});
```

That's better. We can now drag the mouse to change multiple buttons at once. However the toggle behaviour is a bit irritating, we'd rather want to use the value of the clicked button for all other button values. In order to do this, we'll add another helper function that allows us to set the button value directly and add a `downValue` property to the data object to store the value of the first button:

```javascript
inline function setButtonValue(p, index, value)
{
    p.data.buttonValues[index] = value;
    handleUpdate(p);
}
    
Panel.data.downValue = 0;

Panel.setMouseCallback(function(event)
{
    if(event.clicked)
    {
        this.data.lastDraggedIndex = _getButton(this, event.mouseDownX);    
            
        toggleButton(this, this.data.lastDraggedIndex);
        this.data.downValue = this.data.buttonValues[this.data.lastDraggedIndex];
    }
    else if(event.drag)
    {
        var newDraggedIndex = _getButton(this, event.mouseDownX + event.dragX);
            
        if(newDraggedIndex >= this.data.buttonValues.length)
            return;
            
        if(newDraggedIndex != this.data.lastDraggedIndex)
        {
            this.data.lastDraggedIndex = newDraggedIndex;
            setButtonValue(this, this.data.lastDraggedIndex, this.data.downValue);
        }
    }
});
```

Now we are almost finished. The last thing we want to add is the ability to enable / disable all buttons at once by shift clicking on a button:

```javascript
// Sets all buttons to the given value
inline function setAllButtonValues(p, value)
{
    for(i = 0; i < p.data.buttonValues.length; i++)
    {
        p.data.buttonValues[i] = newValueForAll;
    }
                
    updateInternal(p);
}

// MouseEvent callback:
if(event.clicked)
{
    this.data.lastDraggedIndex = getButton(this, event.mouseDownX); 
            
    if(event.shiftDown)
    {
        var newValueForAll = 1 - this.data.buttonValues[this.data.lastDraggedIndex];
                    
        setAllButtonValues(this, newValueForAll);
        this.data.downValue = newValueForAll;
    }
    else
    {
        toggleButton(this, this.data.lastDraggedIndex);
        this.data.downValue = this.data.buttonValues[this.data.lastDraggedIndex];
    }
}
```

### Handling the **Control Data**

The **Control Data** must be the whole value array in order to allow correct restoring of presets. This makes things a bit more complicated than just using a simple number, but with a little caretaking, this should be no problem.

So whenever we change the button values, we call `setValue()` with the `data.buttonValues` array as argument. Luckily, Javascript doesn't clone the array, but only passes in a reference to the `buttonValue` array, so our update function can do just opposite and store the `value` from the onControl callback in the `data.buttonValue` property. 

> Remember that the restoring of UI controls in HISE works by calling the `onControl` callback of every widget that has its `saveInPreset` property enabled just after compiling or preset load.

However there is one case where it gets complicated and this is when the length of the both arrays don't match which happens at first initialisation:

1. You create a Panel
2. You sets its button amount to eg. 16 which causes the `data.buttonValues` array to grow to 16.
3. After the `onInit` callback, the Panel gets an empty array as `value` from the onControl callback
4. The array gets copied over to the `data.buttonValue` property effectively rendering the `setNumButtons` call useless.

In order to fix this, we'll need to specificly handle this case and copy the values manually when the sizes don't match:

```javascript
/** Call this from the onControl callback. */
inline function update(p)
{
    if(p.getValue().length == p.data.buttonValues.length)
    {
        // Just copy the reference if the sizes match
        p.data.buttonValues = p.getValue();
    }
    else
    {
        // Only copy as much values as the smallest array's size
        local numToCopy = Math.min(p.getValue().length, this.data.buttonValues.length);
        
        for(i = 0; i < numToCopy; i++)
            p.data.buttonValues[i] = p.getValue()[i];
    }
        
    p.repaint();
}
```

### Final Code

This is the complete code for the ButtonPack. Feel free to use, modify and distribute as you like:

```javascript
/** The ButtonPack is a set of horizontally aligned buttons which
*   can be toggled by dragging over them.
*
*   Usage: 
*
*   1. Create the ButtonPack using ButtonPack.createButtonPack(name, x, y);
*   2. Set the number of buttons 
*      (For a optimal appearance, use a width of `numButtons*N + 1`)
*   4. Set the colours using ButtonPack.setColour() and the given colour IDs
*   5. In the onControlCallback, call ButtonPack.update(panelToUpdate) to refresh the
*      display
*   6. The onControl callback will contain the button states as array.
*/
namespace ButtonPack
{
    // Colour IDs:
    
    const var BackgroundColourId = 0;
    const var ButtonOnColourId = 1;
    const var ButtonOffColourId = 2;
    
    /** Creates a ButtonPack. */
    inline function createButtonPack(name, x, y)
    {
        local widget = Content.addPanel(name, x, y);
    
        Content.setPropertiesFromJSON(name, {
        "width": 513,
        "height": 32,
        "allowCallbacks": "Clicks, Hover & Dragging",
        "saveInPreset": true,
        "opaque": 1
        });
    
        widget.data.lastDraggedIndex = -1;
        widget.data.downValue = 0;
    
        widget.setPaintRoutine(function(g)
        {
            var numButtons = this.data.buttonValues.length;
            var buttonWidth = (this.getWidth()-1) / numButtons;
        
            g.fillAll(Colours.white);
        
            for(i = 0; i < numButtons; i++)
            {
                g.setColour(this.data.buttonValues[i] ? Colours.red : Colours.black);
                g.fillRect([1 + i*(buttonWidth), 1, buttonWidth-1, this.getHeight()-2]);
            }
        
            g.setColour(Colours.withAlpha(0xFFFFFFFF, 0.1));
            g.fillRect([1 + this.data.hoverIndex*(buttonWidth), 1, buttonWidth-1, this.getHeight()-2]); 
        });
    
        widget.setMouseCallback(function(event)
        {
            if(event.clicked)
            {
                this.data.lastDraggedIndex = _getButton(this, event.mouseDownX);    
            
                if(event.shiftDown)
                {
                    var newValueForAll = 1 - this.data.buttonValues[this.data.lastDraggedIndex];
                    
                    _setAllButtonValues(this, newValueForAll);
                    this.data.downValue = newValueForAll;
                }
                else
                {
                    _toggleButton(this, this.data.lastDraggedIndex);
                    this.data.downValue = this.data.buttonValues[this.data.lastDraggedIndex];
                }
            }
            else if(event.drag)
            {
                var newDraggedIndex = _getButton(this, event.mouseDownX + event.dragX);
            
                if(newDraggedIndex >= this.data.buttonValues.length)
                    return;
            
                if(newDraggedIndex != this.data.lastDraggedIndex)
                {
                    this.data.lastDraggedIndex = newDraggedIndex;
                    _setButtonValue(this, this.data.lastDraggedIndex, this.data.downValue);
                }
            }
        });
        
        return widget;
    };
    
    /** Sets the amount of buttons. */
    inline function setNumButtons(p, numButtons)
    {
        // Reset the array
        p.data.buttonValues = [];
    
        for(i = 0; i < numButtons; i++)
            p.data.buttonValues[i] = 0;
    }
    
    /** Call this from the onControl callback. */
    inline function update(p)
    {
        if(p.getValue().length == p.data.buttonValues.length)
        {
            p.data.buttonValues = p.getValue();
        }
        else
        {
            local numToCopy = Math.min(p.getValue().length, this.data.buttonValues.length);
            
            for(i = 0; i < numToCopy; i++)
                p.data.buttonValues[i] = p.getValue()[i];
        }
            
        p.repaint();
    }
    
    // Changes the colour for the buttons
    inline function setColour(p, colourId, colour)
    {
        switch(colourId)
        {
            case ButtonPack.BackgroundColourId: p.data.bgColour = colour; break;
            case ButtonPack.ButtonOnColourId: p.data.onColour = colour; break;
            case ButtonPack.ButtonOffColourId: p.data.offColour = colour; break;
        }
    }

    // Sets the array as Control Value and repaints the panel
    inline function _updateInternal(p)
    {
        p.setValue(p.data.buttonValues);
        p.repaint();
        p.changed();
    }
    
    // @internal
    inline function _toggleButton(p, index)
    {
        p.data.buttonValues[index] = 1 - p.data.buttonValues[index];
        _updateInternal(p);
    }

    // @internal
    inline function _setButtonValue(p, index, value)
    {
        p.data.buttonValues[index] = value;
        _updateInternal(p);
    }
    
    // @internal
    inline function _setAllButtonValues(p, value)
    {
        for(i = 0; i < p.data.buttonValues.length; i++)
            p.data.buttonValues[i] = newValueForAll;
                    
        _updateInternal(p);
    }
    
    // @internal
    inline function _getButton(p, x)
    {
        local xNormalized = x / p.getWidth();       
        local index = Math.floor(p.data.buttonValues.length * xNormalized);
        return index;
    }
};
```

## A infinitely rotatable head

![Head](http://hise.audio/manual/images/panel/Head.gif)

A slider has a fixed range but what if you want to implement an infinitely rotatable head? After the last example, this is a rather easy exercise for us, so I'll skip to the final code with some comments where applicable:

```javascript
/** Creates a inifinitely rotatable head. */
inline function createHeadSprite(name, x, y)
{
    local widget = Content.addPanel(name, x, y);
    
    Content.setPropertiesFromJSON(name, {
      "width": 200,
      "height": 200,
      "saveInPreset": true,
      "allowCallbacks": "Clicks, Hover & Dragging"
    });
    
    // Kindly provided by Elan Hickler :)
    widget.loadImage("{PROJECT_FOLDER}headsprite.png", "filmstrip");
    
    widget.setPaintRoutine(function(g)
    {
        // Calculate the index (the filmstrip has 100 slices, each 200px high
        var index = parseInt(this.getValue()*100.0);
        
        g.drawImage("filmstrip", [0, 0, this.getWidth(), this.getHeight()], 0, index * 200);
    });
    
    // This is the sensitivity of the rotation
    widget.data.sensitivity = 300;
    
    // Save the down value as reference for all drag deltas
    widget.data.downValue = 0.0;
    
    widget.setMouseCallback(function(event)
    {
        if(event.clicked)
        {
            // Store the current value for reference when dragging
            widget.data.downValue = this.getValue();
        }
        
        if(event.drag)
        {
            // Use both axis to allow diagonal drag behaviour
            var delta = event.dragX + -1.0 * event.dragY;
            
            // normalize the delta using the given sensitivity
            var deltaNormalized = delta / this.data.sensitivity;
            
            // Calculate the new value and truncate it to 0...1
            var newValue = this.data.downValue + deltaNormalized;
            newValue = newValue - Math.floor(newValue);
            
            // Update the panel
            this.setValue(newValue);
            this.changed();
            this.repaint();
        }
    });
    
    return widget;
};
```

## A vectorized knob

![VectorButton](http://hise.audio/manual/images/vectorbutton.gif)

Using the ScriptPanel with a Path and its new `addArc` method, you can create fully resizable knobs using only vector graphics. 

```javascript
inline function createVectorKnob(name, x, y)
{
    local widget = Content.addPanel(name, x, y);
    
    Content.setPropertiesFromJSON(name, {
      "width": 80,
      "height": 80,
      "saveInPreset": 1,
      "allowCallbacks": "Clicks, Hover & Dragging",
      "enableMidiLearn": true
    });
    
    widget.data.p = Content.createPath();
    
    widget.setPaintRoutine(function(g)
    {
        // this is the start radian
        var startOffset = 2.5;
        
        var arcThickness = 0.15;
        var arcWidth = 1.0 - 2.0 * arcThickness;
        
        // Make sure you reset the path!
        this.data.p.clear();
        
        g.setColour(Colours.white);
        
        // Draw the inner circle
        g.fillEllipse([0.3*this.getWidth(), 0.3*this.getWidth(), 0.4*this.getWidth(), 0.4*this.getWidth()]);
        
        // Calculate the normalized value (in case the range is different from 0...1)
        var min = this.get("min");
        var max = this.get("max");
        var normalizedValue = (this.getValue() - min) / (max - min);
        
        // calculate the end radian from the current value
        var endOffset = -startOffset + 2.0 * startOffset * normalizedValue;
        
        // make sure the zero value draws a tiny fraction of the arc
        endOffset = Math.max(endOffset, -startOffset + 0.1);
        
        // Add the arc with the given area and its offsets in radian (0 ... 2*PI)
        this.data.p.addArc([arcThickness, arcThickness, arcWidth, arcWidth], -startOffset, endOffset);
        g.setColour(Colours.white);
        
        // this new method returns the scaled bounds with the correct ratio
        var pathArea = this.data.p.getBounds(this.getWidth());
        
        // draws the arc (use the area from above to avoid weird rescaling)
        g.drawPath(this.data.p, pathArea, this.getWidth() * arcThickness);
    });
    
    widget.setMouseCallback(function(event)
    {
        if(event.clicked)
        {
            // save the value from the mouse click
            this.data.downValue = this.getValue();
        }
        if(event.drag)
        {
            // Calculate the distance using diagonal drag support
            var dragDistance = event.dragX + -1.0 * event.dragY;
            
            // Calculate the sensitivity value based on the value range
            var dragSensitivity = 200 / (this.get("max") - this.get("min"));
            
            var normalizedDistance = dragDistance / dragSensitivity;
            
            // Calculate the new value (limit it to the given range)
            var newValue = Math.range(this.data.downValue + normalizedDistance, this.get("min"), this.get("max"));
            
            // Ignore the mouse events above the limits
            if(newValue != this.getValue())
            {
                // Change the value
                this.setValue(newValue);
                
                // Call the paint method 
                // unlike repaint, this is a bit faster, but call this only
                // in either the mouse callback or the timer callback of the panel
                this.repaintImmediately();
                
                // this method triggers the control callback
                this.changed();
            }
        }
    });
    
    return widget;
};

// Usage: 
const var Panel = createVectorKnob("Panel", 15, 18);
```
