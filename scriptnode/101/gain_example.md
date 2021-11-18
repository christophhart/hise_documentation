---
keywords: Chapter 1: Gain Example
summary:  The first hello world of scriptnode: a simple gain effect
author:   Matt_SF
index:    01
modified: 18.11.2021
---
  

First thing first : create a DSP network : 

![bf41c6ff-4e8d-41e5-b12a-cfe9e435218c-image.png](https://i.imgur.com/5IyKXNp.png) 
**Create a scriptFx module** 

This popup will show : 

![04f59041-07ad-42b8-a82f-6599eb9f20a0-image.png](https://i.imgur.com/6oStZTJ.png) 
**Create a DSP network** 

Congrats ! You've finally created a DSP network and entered the scriptnode graph editor :

![78a4d524-7dd0-4ea5-8d52-502ba2019dad-image.png](https://i.imgur.com/gm3qwl3.png)

Let's build a "Hello world" Gain Knob : 

Once the DSP network created, click into the graph. You'll get this popup showing : 

![c5319edc-0f60-4bcb-bbfe-426e0fb0aec6-image.png](https://i.imgur.com/ynr9knj.png) 
**Here you have access to all available nodes**

Type in the search bar : "gain" and click on the gain node to add it to the graph :

![6491d540-d9a7-41ac-b786-52faf358a6eb-image.png](https://i.imgur.com/p3w1L3a.png) 

Here we go : 

![3e26bf30-a176-4d1d-a1cf-b56f401ba021-image.png](https://i.imgur.com/VJkzFDU.png) 

Done. But let's make this gain knob available in the script editor so you can manipulate it.

Open the parameter control bar by clicking on the little upper knob, then click the "plus" icon to add a control, and name it "Gain" :

![16d2fcc8-5edb-4073-8f6e-10506572f099-image.png](https://i.imgur.com/M1Dhc5X.png) 
![022cbe1d-511a-4caf-ad00-fc768c719ab5-image.png](https://i.imgur.com/52OL1m9.png) 

> When you add a parameter like this, its range is always 0...1.

Although it's possible to leave the knob's range as it is, the logical thing to do here it to modify the range of the knob.
Right-click on it to access its setup : 
 
![75952ae9-e1ad-4351-b1f5-c2408bec8227-image.png](https://i.imgur.com/KE0bkAo.png) 

And change the min/max values like this, and click outside the box to close it.: 

![b350df1f-e2b9-44d7-96b1-721545bb37e5-image.png](https://i.imgur.com/9IN57j7.png) 

> You can access the setup of every node and parameters by right-clicking on it.

Now click on the target icon to acces the "connect" mode...
 
![d12fe4d8-7b1f-4142-a3dd-1e005a44060a-image.png](https://i.imgur.com/YGTaSon.png) 

... and click'n'drag a cable from the control to the parameter you want to manipulate (here the gain parameter) : 

![af8a1af0-4c37-43cb-bb67-799e42869484-image.png](https://i.imgur.com/3Wv4EfT.png) 

Then click again on the target icon to exit the "connect" mode. Now, how to manipulate the gain via script ? In the script editor, create a generic script reference of the ScriptFX module : 

```javascript
const var ScriptFX1 = Synth.getEffect("Script FX1");
```
Create a slider in the interface editor, and don't forget to make its min/max values the same as the network's parameter (here : -100...0, since it's a gain knob) : 

![e340173c-549d-4690-9e0e-d67130cafc5c-image.png](https://i.imgur.com/Lr3wzP9.png) 
And create a custom callback for this slider.

Now you can access the network's parameter like any other in HISE : 

```javascript
inline function onknobGainControl(component, value)
{
	ScriptFX1.setAttribute(ScriptFX1.Gain, value);
};

Content.getComponent("knobGain").setControlCallback(onknobGainControl);
```
> Here I did it by script to show how it works but you can also do it within the Interface editor.

Voila ! You got yourself a nice little gain knob made with scriptnode. You can now start noodling around. :D

```snippet
HiseSnippet 1567.3oc2X8zbaTCEWqc1PiaggBsCbbmLbvclRFaSKvLcXhSbhKdnNwSbHs8TQYW4XMVqzN6JmDCSuyMNCm3NW3J2xGAlgu.7QfuAvSR6lUqiapw8OLTex58O8SO8zO8z1KV3SRRDwHmU1eRDA4bM29S3xgsFhobTmsPNuiaWbhjD6YDs4jHbRBI.43T99JANqrDR+6uVeSLCy8I4hPnCDTexCngTYtzdM+JJi0FGP1mFZY8cZ1wWvaIXhw.dJ6VCEg8GgOhrCVYVIWjyxaGPkh39RrjjfbVZSQvj9CEmvM1e.MgdHinFTG0GBjQbaAKPgX0+QsFRYA8xV2IHjiau7rPYSV3FtcoAzykmmMdWsBubOryGNkJBuxEfW8mE7lAjbrfzRFHcc299wzHYtFEdtpaGNr4L.CocanXrEU5WbbaI.K3x0BwiHsigAm6Q0F2s1s8pe2Z25dUp.o9Do2w3XOiuseTcuuvSWLr1QD41CFP7kUW0nzCztpxqJTNixIdCFy8kTA2SvGwEGppLTyarfU0WDFI3.BtMDc1Xxsp7cUV474XsDhbCoLld3XIoZtXUDxb3dUdJLUYqC.LsxBY0UylsUukJRoyYKLicHT6T8BnAhkET2QHI6xqpQTkmVwaZUCFLScowhQhmoZUUc7k4XU93vCIw14CkgvVcw5mkmu5GeShwxPAuCmJ2MhjNN+.P8YTsgRyrp5tTDBlJ0UcuSZUWeFMfDinPPp3lkSQZ7aebG80c1BKwYQBBJLQQjXIUsdb1hbLPGXpmWwcKRxHoHRaa59ID84YdOMeN2s4j7AcZFJBRisO8PBCEZyP83yBwmZCWfWKpO8a0Kge5GU+9s0SFOX.Erx00KXSv+f.FomHgp1By8swYnKdDEHGDAiYXYQFCEjSUnhg8wT0QQND6I1znSSirzytLn1LY4l4l7bB2q61iJ8GNa7VZF3E1qeUi2TR4210PBkC1kba+nKkAdo46Dzy4BhYvFWwMipRCjq4lyKNKdXmu2MmGHJlDgiI6K5wvSplfCiXj8.7dauCYB+QpBxKRdDYfvlJKp5ODy4DVxhvwr7Ko6nP6IFKo7i5hAxa04kcFG1Gt41mzJEcfLmRJ5Ey3Zpwp5k9DdfdveC+RUVWM1IUY8Lk4LSncHxSDwizaGo+G1LL49DcR9ICNsNZCFSbhhNglV8B6AZY8DrIQCEbpuRjwhLjtQnXrh6w.WmR6nIQVtM1GRTS5gkCUmKTzrPgGIdM+yK.uh6QveaeJR4RVmKlUILEgZFMnukBUDPttGNFZoAtEVQJVxorEIooZSMBNiUxr95jbfRqOlgNvv3B.UMilrgFstJSWVCGTAfeU.3wj0zJleT5TxFSHK.C0CmOB47Vco7CJdKviOqK9zCl9lg9VTsvveVQ01eD4DCVSkd1Q+5MaZVHZd9KDkMFKEgPgqlLBYgikuHNPnKfil+Py4BGey6u0erto8p9gBgbHTmOMXtSymy7+xHObM28HPaMlnbgXUbawwFNVIwEDYFYSiL8ETS4Jbik51dNQSAkjd4e5PnDQU00I37pyygoQ1KBFujr21mBzrIIZD.01nMEhQgXMAxB0jh88Q2zn7ptODeLQ2grlL3l5wCDwgd2m.7DpKVqeIOX52m2GLEM2OXZWeI.g8iw7jHQBotcjmRWCacaQji4EM2HpfUpkWaX4YY2UZlIrgsvdXdgfAiKDotTq9v9y02lig6b5SfUSvtI9vhEOUIWuwrDxCoAxg0scLWbCaweINN.1W7KzkR4Ep0fhMuYY+L5SX4WUOj70ZGfu3MrVd9f6yoSqUxvXeppCos4GSXvwTMFeO3b4.7XlLSZwyYcEbQ1k84U.6QfNUN5HRgBqYtffGjBudLWxMZtGgQvIVm89nlO.5E.G207fiEIW7u+a.Ly8qOz0.WOE4f2aFOzn7aPOz3UwITf+7+O6zefKvo2vSuc68e+98qi2s75XNBw9whm3adtmhv3JZIv5lq+doq31UM1qd1mow0s1Z0TeQC5S78U0zeLjelsOMV.e9jEvm6r.9b2EvmOcA74yV.e97K0G0M9oufQU+CB5sstSTGGSGP5iBn+A.tUO2.
```