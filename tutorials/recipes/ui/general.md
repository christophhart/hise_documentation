---
keywords: General UI Recipes
summary:  General UI Recipes
weight:   70
index:    01
author:   Christoph Hart, David Healey, Dominik Mayer
---


## Lord of the Knobs

>"Yo Dawg I heard you like knobs so put some knobs on your knob page so you can knob your knobs"


### Link Sliders
Two Sliders modify their Gain Value independently but can be linked together. You can easily add new Sliders to be linked.

![2linkedknobs](images/2linkedknobs.png)

```
HiseSnippet 1189.3oc6X0saaaCElxNZcVatncXO.D4hAYz1TYuttBjETW6jTDzlDu4trMTTTPKQYSXJRCIpN6UjGjd2tYOD6t7nrGg8FjwejhkSbbrA1JV.BuHHjmyG424vy4vibmXtONIgGCrp7pIiv.qO2t6DlXP6AHBCr21.qOwtGEM.zZxHTRBN.XYU94JYVUVCnG+8SagnHlOd5R.vQbhO9kjHhX5pcZ9BBktKJ.+JRTAseTy874r1bJOUxix1dfQH+gn93CPJ0JYKIwNADAOtq.IvI.q0ZwClzc.+WYF8OhjP5QwpI0AckajY4c4z.EiUqBZOfPC5jauI.4tzYp0W1X8eo89j.xYqO0KbGs.3TDE8GVkVD8pe0zyadzyp.8VyPu6Z20OlLRLUhhael8dLANNDIuBJRKitfR+QY61boFLwFQng3cikSNCg6i87tOrdCuZaV0opSLtOjn+O4URh.9NTLLbLbK3qeib0vwu16MxI5PjM5iE6DFh8Etq2kDMhhgp.i0qYTr9UoXi0qctCpmf8RBanDWNekHayiFwYxItq2JUH3r5W.2PFuWRNG0SLzb96xKjJX1Cip0Wrp4zLee2HQoBSDyosQTZOYnpqRV6VE2xEqUUGBiRXXXXJyWP3LnQlquAx8klEMEWqpy6q5.kCJ2GQgj.0Mg9H1fvBviOLLGgZWUJZ9KID5l4LUVzQpMysFbqsfd0fO7gvLlk.YbATRjg3.CvriSMjWgxySaHOSHhI8REXWublsoVuiMpioIX3E2.dLzkHIr2lPB76x3MEy5KFHW4d2q1TcK.K+ruzSdVUMNbi1F6rHA0jrHUUCmiOysyYGvE3CYt0bduSEmicNujvv4IJy+QwwySpp5V7Bf4xRi5giyMnL8jI4yVEwd4ph3ahbKnHmsGiHNbDlcYk9.Yg6xpLkyHk7+D5ZL2NqFSWJI.GCHxRI2xVmy.z7Mqt8ec5oO3DvRCtwJ.1jlqAWwNKmeF3lwOt21HARUnLyZjV3HbrfnbdVaiem7EHSYyJ1aiSFJ3izlaV1Mvx4JM3wSOvFMmLcxW0LhDDPwc3ID0caA0NIQfG0k7a4b82+vG9ymFU78xe4jHz3hVRRZXHQthsMLnEHhGjQYeROLUcWszLtQQFi+WjwKlhmydJxX6k3ps.3mTfym78ME3wBUGHpBYx9Gtv6gxWk4AoTjX1mpUutjIPYpEeST8tGS5BlTr+kU38aukt8hkkt20tCQ3OX97szb3qLh++Z9l0MTUayy1SI6Z169yeDZ8oTAtbqy5KU25vyyoRU6B8RbYsmpKzrMlhlw+8Sj.wfBg2MmSCrVkm0vJubF1Uzl4hCDTDGdsIv8Kr0N1qSDVewe8gv2wtC5+CAD+.OUPX82GIaFS8HvAoQckeqlOVRUFS18mbMqRpB+l4dp4JB0EyBzSNUNxDVWM2JSX8bgfkHi+1Ey3abSJ+Mo72jxecNk+iwYDg7i4uM6ijUolepdEocyz+3RUr2WMGd1GXn7MxVkIu02W0tyCjdm4inwJi3qWYDOZkQ7MqLhGuxH91UFwSV.B0uq1yRE7HS7tbgN6n+vNKqcXHYjqNzG7OD.yhd.
```


### Master Slider controls 3 parameters in 3 ranges.
A Master Slider named **MAIN_KNOB** controls three parameters of a SimpleGain in three customizable ranges.

![3parameters3knobs](images/3parameters3knobs.png)

```
HiseSnippet 1935.3oc0Ys0abTCEdljNPyBAUP7HOXsuzMv1vdAnHpPrMWZIpjKpaZKRgnJuy3cGSlwdksmjtTUo9.7+h+I7Wf+Avw1yEuY2rrAIPsahZWe463uywmywG6bjfGRjRtvyesimLl34+9A8mvTwaGioLu81wyuVvgGr6iN3vsZ6s0jwXojD446u5C0i6u1M7Le9yuaKbBlERp5xy6obZH4GnoTUUuG06QzjjGfiHGSScl8WzauPNaadBOC3xpAs7FiCOCOhb.VOsUB77emcinJtnuBqHRO+arEOZR+X9EL67eJURGjPzMZ60GDjs6GvShzLV2q21wzjniJzYoGHkipr.qZs.ebv9zHZY+UVhaYF.Ugv0d3uxhnW6+Y50Zdzy2gd2vRuOLnenfNVUMhlauWvdLEQLDCaAtzxNWuUt86GrMGlASsYJ9LxCDPiRDMtaqVMQs6zZi6sds0q84eNpOQgTbjRjQz++XAkAcDSPmiSxHRyXPKXKSxSHatdM82TvnBzNa8Pz2ZPZDV0.RZ53Dh1uAF23js4HhZ2gCIgpF06WNZcMKpfkBc8HFe..pPC.XaySGyYPiF02+96cvy0Nn0qnOrQPLLbPlRwYHAYHQP.+SIBVdL7qPfmrI53XpDcA3QhzVEDUYfmpQSvxIZ8TRrZdXl.jfJYBJCrsHAlMh3xSSGaYVNIv0SlOYerdVsquQy0qgtxOK.Zm+8P6VeiSm0.Yns0pfFkvGfS.MDGpcsvf+p0PYvrmBAFqzrDEDEjRXRJmgSPWDSCiMlOoQfI7QzPvignTSLFwYLRGNVQyMRnSNA779xVm1DgN4NsMtg5Fmz17kSWntZA2okA..tIpqUPF4zs0xgucN9tEvMKN70SQklqJ2DYogqxePRR.W3JeBAYTwnFCOnnsLRZATwrLPpF8z0ReXFKTakLQZZWSL5jTJqIXnewo1MEjjagQU2VBghoiwJcJFfnpXiPXjKJEjDMfjvuX8ZTVBk4r.LtHEmPAe5i4F51npmmpi1aZ0qMVu1Ksp.r0lIX1dOo0onOCcIDnOE0vNZ6SQ2obh5vyW4ZQK4fwzN.rof2GXGGJ3onA7bs3LcvudjAvIBFvXXyf.HbBvKF2jZxDKqGLkGkAFjwXAbJBjrSZfKUfwCb3kSXgf6KgglvyPgUF+78wKaoxFGA41MZnDRfltsydbiJyCrBixyYXDDv0aKlN+AkMxN2DNP77Xvi4OQp8UbiQNw0OR6NZ8UJVFAdfqunIWo0dYxS6tFlN.oWjNUmgvnJM1XFwRlJW+Pt.higX7RyX4LAWEEAAGxA5XdRCCRq+o1OD3SYGaLEeZCjYVeuyc73rVjbGGGjcVVjsuLxtKKxNmNsUgNrAbtVtB7xpH4syO.zb.Yi5m29aP0g3gyaW.edSpS9j5rnI0MeRcWvjtC7ANzSOhYJuxkxUG2tIbD18UJAEhUHMb5+YzHUbyB1t1RfP+OMyY9xL+cHI3IMMZQsWsnDfyFsAhbp.rvhiyZBwtQjWLU.2SLglSEKXi8fCcn5ywJm4ANdrgPg.vg4FXRv0tLKh0m+bhXRd9kR3XVD5myfSyjtAInASf7Gjvyf.aSuFFhrN+kXK0fhCU08eoCJbqhXSiTNbXkpOSnpidiCUYEw4RaZspTP1jaRKtEmG6dk4nKq74psJPOMDZ8zk24gIBsWgtdDAOY6bQz3R6p1J1t7VeQNpRTN68F8ap89mQr6HZZZ3qU+PPppXdDJFJ7qIDM.E+UUeRI3Xr9fQvVIioC0mgqzyeyk1PY2MJSpNGM9xJiUk0+Tpubl1q7PViMp8xZqU6UyLxvgyan7UJgHl2n56WIV.rFrrzADQgEMedv0Ll9dLAK28XBs0c5LQNaOFUc3XB6pt7kWdwp5qgkSJXpJysb9f7a4zOgFQDdzH8UbJqz2yv4haOtwO8Gem2UI.qOoQ.2LvV8cA5.eyUOWdjc9Wir6zLVegYumr2NXEVeIub6.XaFSDJp1r6uC4b31y1q7sVvND4YJ9X3hvkU0CFskxT8hxE82G2aRYiWeXOOGYcSqrVu3xkXFIIWALeusib7p6HGuF8tPeLRYGnesWLgNJt5R+u9g8FvE.25S+kodf.auOFGQyjt86u5rLaQ6mNTC4RsO4RTy6oyPsd8fpZf0wcAKzXAPL9CE7rwUR3lyypsHOFGy+O9lE255xsQ+2ysYeJiaErut.crZ5WYQW4P9.PFqodNC8SV.W7TMwMR5Z7zKsV5WFZYo6GFbDUEFOe9txb3K3d+eMeyeHq0CrOtREYuQvC9w+me0p2s7YEKqJzPko53JdXwd0d1m1yTBYdGne6rM68ro7Me822aNO8n+pSqWqtb50+vCDtX+.yKa8Vie6GEXLruMQXyF+aOD9V57guAP2GyyTv8R1GC2OCx3GbPVZedlHjnetIHgstHO+UzkyXa2pn9l9DVjoweAexGrstse9fsKF7+k0HEGJ3OOzVykNz7lld.8lY9aDrVv951nx56z1lTZD84gg5Te2ArNyGQmqMhtWaDew0FwWdsQ7UWaD28Zi3qW.B8edj6mo3oV+cnii10Tiqu+tL8svMt9d+syyilH
```


## Collect and link SampleMaps to ComboBox #1

Link the Samplemaps of the `SampleMaps` Folder ans display them in a ComboBox.
You have to fill the ComboBox `items` with the values of the matching Samplemaps.

get converted in the index.

``` js
Content.makeFrontInterface(600, 500);

const var Sampler1 = Synth.getChildSynth("Sampler1");

Sampler1.asSampler().loadSampleMap("Harp");

const var f = Sampler1.asSampler().getSampleMapList();
f.insert(0,"none");

inline function onSampleMapSelectorControl(component, value)
{
	Sampler1.asSampler().loadSampleMap(f[value]);
};

Content.getComponent("SampleMapSelector").setControlCallback(onSampleMapSelectorControl);

```

```
HiseSnippet 1282.3oc4X0saaaCEVxNLqVqtnsqWraFfVv1fCVlgcZR5FFFpic9YAKNwvNsX.CCELxT1DQhTfhJKdE8cZOB6QpuAaGRIYIs3kYk0sNz4KBLO77wyGOGxOdbFH3NjvPtvvr1YyBHFl2EMZFSNs2TLkYbzdFl2C0GGJIB6XScmEfCCIiMLMqdnxfYsULzed8S6h8vLGRlICimyoNjio9TYl0Ac9Npm2A3wjyn947dqNG4vY83d7HfOUQsLBvNWfmPNAqbqBxvb08GSkbwHIVRBMLWoKe7rQS4+DK1+mSCom6QTCZaLBVnXyGv8FqXr56F8lR8FOHceGZXXhFjkEpFmEdDpOcLct8rrw80SXmgHe9vrxMQu12R5YlidqDSuGfF4HnAxrYTb68QGwfBkKFJA4oUruFUNtBpGG7fIa5iufbf.FLGQicZ0ZC6sa0Z8uttUcKnPDJsuDKrGg8C7Hh11eis9jQyIDolj5QMVKc90hAV2J0PSbXxWardSONdb7n93fFq8sXQvb.YwxUEjEAGh4bzGSCkMTXcaRYgDgrQqMViwYjjEjx7nLhsaDyQR4LaNaNzQDOhCTfToAA2qgC2O..xja.g2KhrdcqWV2p1RrCb+AMfeTExWoCaZpUkdRW1zrStPu15MCUdnIPOrm24vY7F+4bTuQy1JmvkjSYMV25kV0rd00lw0cQSkrT58w0mUcITbCvZvh7OmHRSQI9AmEKdXe0k6vtSbZJmib1QLp7z.Rx3rqCsWv0Aij7r5hQBAAWk5qE2O4ZAj+Om2kekAEVlO.csTqgdmjI7bmNFO6n8vRb5hBqODy.3rEUs0L2ibIHiEe2qFZOR3ERdf12jBMr8KIEtJK7eVmYYC1oiOFlCYpFSkDeH9eL5POtyEDVX.k3Yot7X0GKn9misNULAy.M0qoQ.JU7wQdXYQ4KklcxDPUtfNgRKfERkyxqoWBMsVKTSagEwkjtO.MfJcltX9VYA7EJf+Sy2jWHpi120EJkYjcEzAe+s84faGU9nXp7PzHoff8orIIxUZ9XgR0wdS7ncvR+n8.AQqUR+4bt8qc5FA4KQQq+RGcn10mGwJDqDlOjDPvRn7W3x5vgGJ3QA+QTu9o5CKmI.AUHUjehSYDHuKyuG6I3ggtv1QuVg4mZPjXhJWkYYH4RhHrnsSh7gZOiQ7BUWWMASOKjnp0Tm9XofdUdu0Qo0YXc89SQatUyhet7T3Otet5qeUO83XHsKOjMKOjGWdHaUdHaWdH6TdHOoTPlKLqtwTCknpdsG2duk6wMXcFfgSD47rKcx7XDaonBbNWmejTuCx0V6BZJb02B8r9lWe+u+yQUWN59WzVcsTNNhpJU6ytDjv.KJN9P38dWbjmL0ZQ4z9bFOXJmQcJJX.B.SlPD449B2P6JkfdUlkG0YHzh.NLmh2mz4XngVrnnNXoxEsW9bwMUu9PTLcsUuAX+tQaDU+eeaD2Tp6dIMQXCQWH+Odc9tH8K.1ptTdaQ0g7HIz8QZG.HnMgQPqQNj7MKTQ0.R73VpwJBMhvFqG7avmjIam1YgZx1oSZ3jtTvdK465e8hYUBS8zgt6XOnmEu7GoCgFvTTpB5eGV5icD7W3D+azTb8NZK.KY5+eNpWagw1sS+4XprqO7R0KbbTWC9BH+tXDaVZDOtzH1pzH1tzH1ozHdRoQ7k2.BUaA6FI49whhfgA6GePxb+4GjpZ76pRRWUC
```


### Collect and link SampleMaps to ComboBox #2


* tutorial how to load samplemaps in GUI 

Need to create a Sampler with the ID "Sampler" and a [ComboBox](uicomponents.html#combobox) with the ID "ComboBox1". 
The list will catch every saved SampleMap in the **SampleMaps** Folder. 


``` js
// Create a Script Reference for the Sampler Module
const var s = Synth.getSampler("Sampler")

// get the list off all SampleMaps that are saved in the SampleMaps project folder
const var list = Sampler.getSampleMapList();

// Get the Combobox Widget and add all SampleMaps.xmls to the `items` list 
Content.getComponent("ComboBox1").set("items", list.join("\n"));

inline function onComboBox1Control(component, value)
{
    if (value)
        s.loadSampleMap(component.getItemText());
}

Content.getComponent("ComboBox1").setControlCallback(onComboBox1Control);
```



### Color Keys according to the SampleMap

References a Sampler Module and colors all keyboard keys according to if a sample is mapped in its current SampleMap. 

``` js
const var Sampler1 = Synth.getChildSynth("Sampler1");

reg i;

for (i = 0; i < 127; i++)
    {
        if (Sampler1.asSampler().isNoteNumberMapped(i))
            Engine.setKeyColour(i, Colours.withAlpha(Colours.blue, 0.1));
    }

```


The same with multiple Samplers:
``` js

const var samplers = []; // Declare the array
samplers[0] = Synth.getChildSynth("Sampler1"); // Add sampler 1 to the array (index is 0)
samplers[1] = Synth.getChildSynth("Sampler2"); // Add sampler 2 to the array (index is 1)
samplers[2] = Synth.getChildSynth("Sampler3"); // Add sampler 3 to the array (index is 2)

reg i;

for (s in samplers)
{
    for (i = 0; i < 127; i++)
    {
        if (s.asSampler().isNoteNumberMapped(i)) // s is the sampler being checked, we get s from the outer loop
            Engine.setKeyColour(i, Colours.withAlpha(Colours.blue, 0.1));
    }
}

```
