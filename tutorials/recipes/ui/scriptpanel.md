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


```javascript
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
![logo bw](images/custom/logo_bw.png)
save as `logo_bw.png` in the **Images** Folder of your project.

```javascript
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


```javascript
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

## Modulate a circle with LFO

![circlelfo](images/custom/circlelfo.png)

```
HiseSnippet 1431.3oc4X8zaaTDEeV6rU0tDDEpPbfCqhPvFQpkc9SAZEJNwIoJhjFq3zVjpPUSVO16nr6LKyNaZrp5W.DWQHwU9xvEj3.e.p3DWPp24P4M6r163DWGianTDqRb77l2aley7989yllBtGINlKPVkNnWDAY8F1s5wj9M7wTFZ6MPVWw1iGvERRrDsduHbbLoMxxp3sUJXUZFT5yyVccb.l4QxEgP2iS8H6PCoxboMq+EzffsvsIGPCMzd45a6wYMfsJA.SQ6pnHr2Q3tj6fUpUvFYcoMaSkbQKIF.CxZl04s60xm+HlV+6QioGFPTCpgZAKjV7V7f1JDq9NpgOMncy9G5XDxxtY9UPQ8Uv0r2k1lNPd9UwakNgStEl2GVEFG7pYBupSN7JX.uY56gNPfYwQ7XhHCVN4Rbp4LDrFLyZg7Dlgi3CqeZDW7EiXyKzyhRzYA4Usa4InQx7YzbosYRhnCF3IlfTqKpvGUvtAGzfIqDhOhrk.FLvB2UptfyJUm+VyVd1x.WIV5bLV3ryV6sKucR.FNI0b9bmT5aktD4.otyA53jqzbmdIZhYj.ks82bv5F7vHNCF3Nmd5LqzCpDSjMAZgbedhjxHtcRXdRJm41c9GW1Ad5pTQSmc0+ItxinR+0Bh7wtUOwCu3RKs3BCC+zMNQHfscGxwj.24me9aksbcfvlMCBnQwD2GrxBKsvxUge9JX9m.+ZfKUbknANH3PH.JGXY3R5SiqHHQJv6pMd1bqkXg1d2kgK5915vY2gKI6AKR4GWtT4mT14zS0oyHmScgJ3AAvBNpo0a0XLzkkDdHQr.3lBRHCTDnYCScsmLpqm1+ZnHmsMiJ2KhjMdDj6LRA7s6t8FXIFhJsxjA5EQDRpBBVaPNFR2oo+kr2fDejjGkpaFSBYUVlN6r8CNT25HJDBbYasG.chY9ydFCp+HZaoObRs9IXjOg102HXlV+vt8ycV5RKt3u9coRkjPszEUhu4M+9mOrXkzu4a+gToRxIxbo2+9+7epyWelPaHKXeBqYpQU8frI.W3Pg2pPXVLU1yrdwKc9xQ4rrrLvqsFuue1sshrcOrfhY4oFRwtSlBNJMbxTwHew4eVxxeY8a14b3HUPlfb.uY.tmaLNLJfrObTWvQ+83lDw5AbuiNK8OReFRm08vjNcHhWXf2EdL4eyHuounwKWb0jRLupcSpzyezLyBivapJ59O.yDc19Ll0dSv05IyA6L1a8kWrMUbdP4M0P4J1sfpXokNSAx6lN1493iIN2lvHhyFHLb+e+xj1+WzD2+2ddRX6Gz+h4B2hDRO.xoFaJ7twPCCjudekW1TdCNVLxod1paAGxQZSKrLQjRWNcaS.8n3TU6Y37iF5eNc.NyqMMnVaxZ86Ue8gZSW+zk5i2VTUB4MYPGWPdmT791PhlN3j.YeoCS92ky3Q9bF0yjYrOQJnc6RDlmiQd3VSJglyxkbs56SBHXSV9GTeGfchEvcFYb2KScB3gpUNNe26Yqgqt93+503GQ5KaanM5Ld1v85OVL9zeL5OVUE+mPXdF.+oqpxOsMyz2pRE1gKBypCM3HtCoKrQlRNf.86AoRGhZzJjygVuYcGNqGBsCmGsICC2BsMWjl9.Y.pfC8ymK92WsQRrjG1GKouVbKIIJs7o0CruwxUfmNer5yOqA7wR6cwLFcww5JLgrt2I0SNvko7ouFP3NeDOfO8e.DO1liJ9+ylizuQe2cwPtb3swruSRXKnmDOBfDF7NZpJ9VET8UnGWUMV2TBqc5fmCOYSVSM1JaxZ8m7UxdDh8D7G5o6lWE3c4TIv4lk9eTqj8tpwN0Poc3qRhVsRUTHz.wC87TW2WGteFsMKNE1rzTXyxSgMqLE1biovlOYJr4SGqMpd2VKAxuqCEAAM2TmY2ZPEBqhn+BPSxm80
```



## A six state button

The button in HISE can be filmstripped, but just uses two states. Since I am rather lazy about updating the in built widgets, I'd rather use this as an example how to build a really simple UI widget that is virtually indistinguishable from a hardcoded one.

This is the "filmstrip" we'll be using:

![FilmStrip](http://hise.audio/manual/images/panel/SixStateButton.png)

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


## Horizontal List example

This example snippet shows the usage of the [`ScriptPanel.addChildPanel()`](/scripting/scripting-api/scriptpanel#addchildpanel) function in order to implement a dynamic list of items that are aligned vertically (like the list items in a viewport).  
The text from the label will be used as data for each row. Just enter some text and press the Add Line button and it will create a new row.  
Each row has a close button on the right that will remove the item.

This example can be used as starting point for any kind of dynamic list:

- file browser
- custom preset browser
- dynamic signal chains
- etc...

```javascript
Content.makeFrontInterface(600, 250);

// This is the canvas for the list items. It's placed in a viewport and will
// be dynamically resized to match the height of the list.
const var Panel1 = Content.getComponent("Panel1");

const var Label1 = Content.getComponent("Label1");

// This array will contain all list items. It's important to store the child
// panels in a variable or array because they will be deleted when they are
// not referenced anymore
const var list = [];

Panel1.setPaintRoutine(function(g)
{
	g.fillAll(0xFF444444);
});

const var lineHeight = 30;

/** This function will be called whenever the list item changes. */
inline function updateList()
{
    Panel1.set("height", list.length * lineHeight);
    
    local y = 0;
    
    for(c in list)
    {
        c.set("y", y);
        y += lineHeight;
    }
}

/** Adds a close button to a panel. We will call this method with an anonymous panel
    as parent so you can see how to create nested child panel structures. */
inline function addCloseButton(p)
{
    var b = p.addChildPanel();
    p.data.closeButton = b;
    
    // This line would be a big No-No. If you don't know why,
    // read up on cyclic references...
    //b.data.parent = p;
    
    
    b.set("allowCallbacks", "Clicks & Hover");
    b.setPosition(p.getWidth() - lineHeight, 0, lineHeight, lineHeight);
    b.setMouseCallback(function(event)
    {
        this.data.hover = event.hover;
        
        if(event.clicked)
        {
            // we will use the `getParentPanel()` method in order
            // to fetch the parent without creating a cyclic reference
            this.getParentPanel().removeFromParent();
            
            // Remove the parent from the list
            list.remove(this.getParentPanel());
            
            // update all positions
            updateList();
            
        }
        else
            this.repaint();
    });
    
    // Just paints the X icon
    b.setPaintRoutine(function(g)
    {
        var path = Content.createPath();
        path.startNewSubPath(0, 0);
        path.lineTo(1, 1);
        path.startNewSubPath(0, 1);
        path.lineTo(1, 0);
        
        g.setColour(Colours.withAlpha(Colours.white, this.data.hover ? 0.9 : 0.4));
        
        g.drawPath(path, [8, 8, this.getWidth()-16, this.getHeight()-16], 3);
    });
}

inline function createRow(text)
{
    local p = Panel1.addChildPanel();
    p.data.text = text;
    
    // We'll place it inside the panel. The y-position will get updated with 
    // updateList later on, but the other values will remain the same
    p.setPosition(0, list.length * lineHeight, Panel1.getWidth(), lineHeight);
    p.setPaintRoutine(function(g)
    {
        var a = [0, 0, this.getWidth(), this.getHeight() - 1];
        g.setColour(0x44FFFFFF);
        g.drawRect(a, 1);
        g.setFont("Oxygen", 16.0);
        g.setColour(0x88FFFFFF);
        a[0] += 10;
        
        g.drawAlignedText(this.data.text, a, "left"); 
    });
    
    // Add a close button to each row
    addCloseButton(p);
    
    // add the row to the array so it will be referenced
    list.push(p);
    updateList();
}

// on initialisation there will be no rows, so we'll set the height to zero.
Panel1.set("height", 0);

inline function onButton1Control(component, value)
{
    if(value)
        createRow(Label1.getValue());
};

Content.getComponent("Button1").setControlCallback(onButton1Control);
```

### Full Snippet

```
HiseSnippet 2389.3ocsYstaaibElxwJcsacQ118AXfQQCUpLC0FuYcqgwZGG6ttM1QH1MYABB1cD4HoAlbFhgirLyB+m9j0mg9fTz2f1yYlghjRxtoFHDAxjykys46bYNouRFwxykJuVqcQQFyq0up84EB83CGS4BuSdoWqeY69TAK4BVt16EEYz7bVrWqVO3OiKn0Zq5Yd92e2KnITQDqZHOu2J4QrWwS45pQ6u+ekmjbLMlcAOs1p2d+ShjhCkIxIfv7f1gdYznKoiXmQwksRauVO7nXtVpNWS0rbuVq9BYbw4ikSE10+VdNePBC+nm24.grCerLIFkXbTuCGySh6Wpz4d.U5WYBdf0D7UsOkGymMdko3QlIHU6nt8n0J2k30qt3E9oKdspIdqZEuur84QJdltZF6wzIBMSMjBGA0EK6Z8V4e8n1O8IOg78RE+iRgllPdEOWSXWSSyRXar9FqSfmKFyyKGijK3YYLMIGThbhdLiLIGNPHxglODroDZbrUlQHheGxvIhHMWJrTiKHRULSQzRBGIYJSnITRbgflxiHInD.TiqYoHCnvjJFglvGIXwjqXJMOhljTXImeB+Rlg0lMZ2EvCJ4JNaZlTo6DToHvJYWqICUxT6dnCXIjo.3iL.0DfAzbRLUSICkJBiFMlnjSCH+kIncAMljbYJyROCsnhXRlBr4FBdPbLXCELxfIZsTXlkqsbHRw.T.HYnQBopkJ1eOxwJxXP.njnDY9Lh.+CoshOZr1ZQLzSwRkWY0cTsaPtFmYQTQc0KWSAanXDISxASOpnTQA4RNHqfgu9AgyFyFEPFxAJM.jvblpKIBrGfMDUb.LLaXlNBM2O4onI+P.RAlrfT5kriUvGy.i9OOLrK4q+lvN6hK7oO0JubqMDD2q.wDkqlmqAjSzONmjk.jHt4grwPiVEC0.k0oEHPALT47OB6.PboTMXmQxNlYLmNbKxDPvgnM.ythpHFvaOxdjRsXDSenLMSJfO72zN8lV4uZWuBwS29trSuYSslpTzBGBAcBQ8BdeA0FbV.EkBmXfd.Vek8nOBc0LTKCkoRvOUwoPjEBd3ZXv.VDEP.3dJlg3iYILMXYlNlIry.9ZFhIjZvtMjoXBzXC.jTINUktZDv8Hu+CFswZPB.zPePCzuQNAfXL+Ree+QcV+mWesQA.LJ4fjD+vqO93sMOn03lN6tdSZKXeu8.ZOxyBs1KHRkwfURyYZAdJ6TB1Ur4PMfAhJFw.qHhJ4BjzUjXRF3ryvnd9c1X8e1h2qzE+MsvjM6ZQHILwH8XxSpIfn3W42kHAggT.RcXiwAvreDdzfjoicLG2vmHKyJ.9TTRP7of7G1qFubybCXvJsHP.mEhW.3CpEMDPdGyAsPLkFMeoL8XI5r.JBEiPIwy1I41cX4.E+RgAlykjB4DSHjbF30.Qn.x6BkIf7+fg2.AsaG.lpIQ5IpayfiIGPY8EFQ0Oqxpim6C.CWVvbIPbZcV.FWNHpZ2vhGzvJW5RYX4T4DPpFfAbGvGQNSt0YRvUZnQehkhGqIWJ.0Y53hty1NnWw.n.C4FUDk.gAm4DjGDDTttAVYwYi.YtgXX+cf8LEr6xoGB+N.JcIGNf27PfrWlS98PdW.stYo9YVeeYN23ujggNdGOVOFxftUMLPWRX2FetHTzPoSgiTVIeq7CAGDwR.fHxvpSiQgBTIyBseUCPV8FenkVAnU5RVbmpopQWmYcpCE5B.Q9oQXbBz34Ni+oRXYY4AKPB.0MjUF71Y3QLLDnwBGwLZzEN0ZRGiZNOuCrIRgTTo1w8q6B1TqcByapR85DkpRJlk1r7wD4vxC+kJ.+OYmMJkIsPlCfj2bQ0iicqT6lpWgDEKyznXYXz6Yz3lNy6eYJDxrHax5efviJKsavcE9eAHG5umQgfPUYKsgU5SQPeMs.WUfopkyXSOex.yB.ufvEVD5KbgzuWWRuOEBz6NHPChW81HTGs2Hw29m7.DFdPR1XZ0HigTOcWvq56HgA+QxeB9c6N2F4iUzoF4Ckmtj2uSWxNcmAbcQD1p2yqFy57aF7CcIOCRk5N5rYIlOBr0H+F4Ter90p3u1TWYvwgK+2cFF1T66dlRfmGh7N1iQfJVkFV6KWjyiK8UL4jv5vK1pDIaiL.5gCD6RMMibUPanbcr.bonKloyPQI7iBfRISX4ypJFKgBmLmVVodViXqg2d17tkJeksdYQXy9+FoSwRkBMAum6rbwCRHdeuOr6xwbgWu81Gad5r67vl2vhz9z4f0lMerDK+70WWLhIfTP8ddPXmakA6ryhLf99vOf0hzK7NfsGXui1E.lvuB5iPjtDPr1LgMTCo6H2VrE7xSKVJS4kvbUlLe8CySDXA1aKYqTAe0V.LTIS4MwfhBpps0g9Q.Q1j7wUjbtXp23JZGjJt..RvMRyoF.LhAYynrPh7NuKxvoFWA7JR0txAHUejojA0KZtVgltKEMuaqTXU4dXvRkLwOp7dEcs3+JOYH0b4HyJvblSu8NHHb6s3ZrYetY25WXq4kVbrcyNVPhg4ypqXdoBIVMQ9Lol8Zguo1+0uYcx7SMb3RmyQrDlZoSiMIRcWazWLIc.deTqYnbgdsVsY6XZe6siod2hhr1kZKTJNAf.uNiItslz34Llva+sSdI3Gf8swMFrtLrMFnHz5krq3QLaWbVq8KY4WpkY.UmcB305WnMy9ab83gE+V2sd83wXSdJ+rm2006zVQ8OxoWwNQz2becrEPSwfOyVv+3uuuE+UsE99n7NuLrQYelPjqg8egsUf2EuaxKRMd8v+oaI1pnpwu5Zk2hxwu1IGVzmQPVqsCJVWR9c6WTWkl2Jfwl7Zsd6x113wyOUhMjhpf80Zk5b9gMs.F+HmEv5SUmuwM46bVfOtukw+11GYZoD01JILLhm2hM26QsOUFOAR90ruiXyVcS.n+FM3C6zBj1UWTuYreVZF4mp39ks6ygp2Wt7txRjWve4ys75Zs6FsOZ3PH0YkvtZ6i+gO+8w0yV6vnSoZEGvNsOaR54PJ3HFHIBrWNvX.FD2p46P7azxbNSDa93+.OtI6ge2xMYuxI8RoQJ4OFYiKhMO9KLi.xjvzC80ZeJ9MommIVIru1gAgdo7X9OFEglhs.Ye464quG64Y2i8r88XOey8XOO+drmu8drmcty8f+2IbvDsL05l.Cz+HSBjVsNRf8zyfH89uBUMSDA
```
