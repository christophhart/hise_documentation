---
keywords: Chapter 1: Gain Example
summary:  The first hello world of scriptnode: a simple gain effect
author:   Matt_SF
index:    01
modified: 18.11.2021
---
  
> **Convention used in these chapters :**
> 
> All nodes will be written like this : `category.node`
> 
> All parameters we'll use will be written like this : `parameter`

In this chapter we'll cover the DSP network creation and the network graph basics, by creating a simple Gain effect.

 **1 - CREATE A DSP NETWORK :**

Create a ScriptFx module : 

![bf41c6ff-4e8d-41e5-b12a-cfe9e435218c-image.png](https://i.imgur.com/5IyKXNp.png) 

This popup will show : 

![04f59041-07ad-42b8-a82f-6599eb9f20a0-image.png](https://i.imgur.com/6oStZTJ.png) 

Click on the left icon "Create an embedded DSP network".

Congrats ! You've finally created a DSP network and entered the scriptnode graph editor :

![78a4d524-7dd0-4ea5-8d52-502ba2019dad-image.png](https://i.imgur.com/gm3qwl3.png)

Before the next step, in order to keep things clean let's rename the scriptFx module to something nicer : 

![image](https://user-images.githubusercontent.com/84969276/142500563-15e8dd97-036f-4795-a3f9-51edc0700715.png)

 **2 - HOW TO ADD AND CONNECT NODES :**

Let's build a "Hello world" Gain Knob : 

**The nodes we'll use :** 

 - 1 [`core.gain`](/scriptnode/list/core/gain)

Once the DSP network created, click into the graph. You'll get this popup showing : 

![c5319edc-0f60-4bcb-bbfe-426e0fb0aec6-image.png](https://i.imgur.com/ynr9knj.png) 
> Here you have access to all available nodes

Type in the search bar : "gain" and click on the gain node to add it to the graph :

![6491d540-d9a7-41ac-b786-52faf358a6eb-image.png](https://i.imgur.com/p3w1L3a.png) 

Let's name it "GainFx" by right-clicking on the title bar : 

![3e26bf30-a176-4d1d-a1cf-b56f401ba021-image.png](https://i.imgur.com/VJkzFDU.png) 
![image](https://user-images.githubusercontent.com/84969276/142492735-bbcbe215-fe17-40f7-8da6-3b134b182734.png)
![image](https://user-images.githubusercontent.com/84969276/142494166-a54632f5-2245-483e-ace1-20b8eeb25f8a.png)

Done. Now let's make this gain knob available in the script editor so you can manipulate it.

Open the parameter control bar by clicking on the little upper knob, then click the "plus" icon to add a parameter, and name it `Gain` :

![image](https://user-images.githubusercontent.com/84969276/142497072-ebdd5708-ca34-4ebd-beb8-6d847bfb8d7c.png)
![image](https://user-images.githubusercontent.com/84969276/142497109-23bb66d1-d534-4fd2-b9a0-8792b496150a.png)

> When you add a parameter like this, its range is always 0...1.

Now click on the target icon to acces the "connect" mode and click'n'drag a cable from the control to the parameter you want to manipulate (here the `Gain`) : 
 
![d12fe4d8-7b1f-4142-a3dd-1e005a44060a-image.png](https://i.imgur.com/YGTaSon.png) 
![af8a1af0-4c37-43cb-bb67-799e42869484-image.png](https://i.imgur.com/3Wv4EfT.png) 

> How to delete a parmeter ? While in the "connect" mode, simply click on it and hit 'Suppr' or 'Del' on your keyboard.

Although it's possible to leave the knob's range as it is, the logical thing to do here it to modify the range of the `Gain`. And while we're at it, why not make it possible to go above 0dB ? Let set the Max value to +24dB.
Open the range editor by clicking on this little icon : 

![image](https://user-images.githubusercontent.com/84969276/142497869-93ebf3f7-71f9-4f34-8d0f-05068551d17b.png)
![image](https://user-images.githubusercontent.com/84969276/142757715-70fc20f8-78e2-4883-b94f-e127928b6eca.png)
![image](https://user-images.githubusercontent.com/84969276/142757754-206a2583-a92f-4443-873a-b3eed4d9fee7.png)

With the range editor you get the ability to drag the min and max value as well as the skew factor with the mouse. With a right-click you can access the context menu which allows you to quickly set it to different presets, or in this case, simple copy the target range to the source range (so that you don't have to edit the range of the main parameter). Now the `Gain` has the correct range.

> Use SHIFT+click on the left/right borders of the graph to enter custom values.
>
> Use CTRL+click and drag the left/right borders to move the values by increments.
>
> Uncheck the "Make sticky" option to go out of the range editor.

Then click again on the target icon to exit the "connect" mode. 

**3 - HOW TO CONNECT THE MAIN CONTROLS TO YOUR GUI ?**

Now that everything is set up, how to manipulate the `Gain via script ? In the script editor, create a generic script reference of the ScriptFX module : 

```javascript
const var GainFX = Synth.getEffect("GainFX");
```
Create a slider in the interface editor, and don't forget to make its min/max values the same as the network's parameter (here : -100...0, since it's a gain knob). Then create a custom callback for this slider. : 

![image](https://user-images.githubusercontent.com/84969276/142501619-a46a3893-18bb-4fba-9ea8-7dd1b5614f91.png) 

Now you can access the network's parameter like any other in HISE. This is the whole script : 

```javascript
const var GainFX = Synth.getEffect("GainFX");

inline function onknobGainControl(component, value)
{
	GainFX.setAttribute(GainFX.Gain, value);
};

Content.getComponent("knobGain").setControlCallback(onknobGainControl);
```
> Here I did it by script to show how it works but you can also do it within the Interface editor, like you would do for any other module parameter.
> 
![image](https://user-images.githubusercontent.com/84969276/142757779-66452f0a-27a9-464a-87c5-0c92e03c4b1f.png)


Voila ! You got yourself a nice little gain knob made with scriptnode. You are now ready to start noodling around. :D

```snippet
HiseSnippet 1544.3ocyX0raabCDlqroarRZPSaBZOtvnGT.RMrbSZKPPgk+SoBMxVvJ0I4TJ8tTVDhK4hcorsZQt2a8bt068Ru1a9Qn.8EnOB8MncH4tZ4Zq3pJ33DcRbFNC+3LC+3vsShLfllJSPdK9jQwTj2MvcGIT82rOgIPs1B4cSbaRphl3aEswnXRZJMD44M2izB7Vbdj42eu1FDNQDPKDgP6KYAzGyhXpBocZ7sLNuIIj9DVjyrueiVARwlRtbHfm4vqfhIACHGR2gnmVELxagsCYJYRWEQQSQdyugLbT29xiE14uOKkc.mpGTG0EbjUbSIOTiXsTzl8Y7vN466TDxC2oHJLmMJbabaVHar7hnwGXT3WXga7vqRY3MWI3U2Edq3.uI.IOGHMuER2B2MHgEqJznwy0wsDPxoGAB6tPwNWTke0CuoDlgPsbDY.sYBLXrE0V8AqbO+5OXk69vpUgPepx+HRhu01lOqt+W6aJFV9PpZ6d8nApZKYU5CZWRaUUlfyDT+dCEAJlT3KECDxCzUF50MQxqEHihkB.A2C7NeH8tU+wpKNdMVNkpVWoRXGLTQqUHV6gbCdX0WBKU99..yl4tr1R4q1R2U6or0bSBme.T6T6bnA7kCT2Qpn6JpYPT0WV0+rp50ah5x7EmlLQ05p5jKxvZhgQGPSbiG5IBo5x0O3We8ia4cfMv3LQonkfo1MlJdcE8nrnotVKCUvTUlJsalUo0kyBoIHFTPUEmGGQFL6dDG8cs1hnH4dBbJrPwzDESuG71hdDPAXqgWDuEMcfRFalaVND79zrtmTrl61XTwfVMhjgY9Nfc.kihbYkd9oQjSbgKvkE2k8C4age4Uu52WKcXudLXVXre3Ff8ggbZGYJSm1Jrc0SQm+XIPHHCGxIpxrDZHmoP6C2il5ieBv2iboNOK0w7SG0wEyrMsv8V3NLUP+Ii2JS.uPt9MMdyHheerk3o.ryia9rqNV2p3bJIyheMShs4IShq06mvEm0iSnwjD5Sjc3jQ0RIQwb5d.9tm+AbYv.cA34IHhsK+F5YTKnOQHn7zYgGYgoNhT+BiHn8jCULwgsI.As97wNCi5B2NGP2LCcfLuJZ5D63Uzi00GcohPyf+A9kortdrWlx54JKXhP6PUGKSFXREY+GRD539Mvolf7K5cRcz5bt7XM8AKqZExAFYcj7Qw8kBVfVjcF4Hc8H4PMWiEtdU1wPZrPSR.DnF0gn5qOGnoRgDLMY4fwEbiy4ZSx6NwtKgkHxvfA8lTph.h0cHIPaKvMsZRvJdy4PJZqzzifyTUr6uVo6q0FP3n8sLr.P0qnMZXPKVO0EvGpQVIfec.3IzkMJldT5UwESHG.C0CiGg7du1Lw9kY8e9osImr+YuIn6DnV6NfdrEqYRO8ve6NMraDCu947x5CUxHnv0P9fbvwBmGGHz4vQietwTgiu+i15OWy1BU2HoT0GpyOKXtei+i0+xHNbC7dTn0EqWNmuJmV7bgiSP7xGYmwT3FJ8s6BpgBJM6x9rgPIhtpqU33pywvzJ6MDF29DflMM0f.n1FsgTNHhXHPlolRbu+4NVkWG+TxQTSWvFxf6XF2SlD4+HJvSnuHs9E7nn+XZeTT7T+nncCT.DdRBQjFKSo0c87YzspqtsnpghxS2Jpzrzaulv1yYdWqQtvUcE1gHJ4LXbIO0l4z20es11BBbmSWJraB2MM.1rjhzooBqyPdJ8orPU+5tFVHdUWweCIIDxKAk5JYtotqj+GuObg24de3UWenWNMSsXNF6xzMBss3HJGNMZv3GBG+5QFxU4RKebpsTHyuSuHQuGEZH4vCokpel3FBdaI7PvBI2twdTNkj5bD6Sa7X3JeRRa66HlkXQ8+2MVNw70mfsv0WyA3+VIuco7lg4lp2Lbofw2BuSX5O8ATfuamE+XLPEupuIU5+1IWdU7Diqh0HhDjHeQf8kY5C8WyHA12BymubQba8X+54eAELdkkWQ+wFXuHHPWu9YvsOS1lUmAa97Yvl6OC17fYvluXFr4KmAa9pKzF8M0YO1PWyCB5rsooQOOayJlxez+BzywjnD
```
