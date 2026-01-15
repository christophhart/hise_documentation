---
keywords: "Chapter 3: Panner"
summary:  A simple stereo panner that introduces the multi container
author:   Matt_SF
index:    03
modified: 21.11.2021
---
  
### Introduction

In this tutorial we'll create a stereo panner effect. This example will demonstrate how to split the signal into Left & Right channels.
For this purpose we'll need a parameter which will control the gain of both L/R channels in an opposite way : increasing the Left channel's gain will decrease the Right channel's and vice-versa.

**The nodes we'll use :** 

- 1x [`container.multi`](/scriptnode/list/container/multi)
- 1x [`control.xfader`](/scriptnode/list/control/xfader)
- 2x [`core.gain`](/scriptnode/list/core/gain)

### Signal Flow

Let's start a new network and add the `container.multi` node and rename it "ChannelSplit" : 
> Reminder : to rename nodes : right click on the title bar

![image](https://user-images.githubusercontent.com/84969276/142730197-73ac1486-9a4f-47e2-a231-fe8507402463.png)

Now, add a gain node and duplicate it with Ctrl/Cmd + D : 

![image](https://user-images.githubusercontent.com/84969276/142757342-8c7940c4-98e6-4daa-be2f-54a2fa6d6cc2.png)

See the cables which connect every nodes ? this is your signal flow. You can easily see whether you're working with mono or stereo signals.

![image](https://user-images.githubusercontent.com/84969276/142757373-dc8f9479-5079-4f4f-b4d8-52f44e527aee.png)

### Connect everything

In order to control both gain the way we want, we'll add now the `control.xfader` before the `container.multi`. 
The default crossfading curves are linear. Since we're dealing with decibel values, we have to set the curves to RMS. Just use the dedicated menu :

![image](https://user-images.githubusercontent.com/84969276/142757400-c009bba1-1601-4721-a644-4c9ba93b21f2.png)

Then create a `Pan` parameter and connect everything like on this picture : 

![image](https://user-images.githubusercontent.com/84969276/142757418-e9c32ed1-14c5-4f3e-bf4f-396c444e0ebd.png)

Now our `Pan` parameter controls the crossfade between two values. The both target icons labelled "1" & "2" are modulation sources which are controlled by the `control.xfader`.

Even if we could leave everything like this, we can do one more thing : here our `Pan` values range is set to (0...1). Since we're making a Panner effect, it would be more logical to set it to (-1...1).
To do so, open the range editor of the `Pan` parameter like we did in the previous tutorial : 

![image](https://user-images.githubusercontent.com/84969276/142757445-12d66873-db3e-4b09-b876-9da9c156b8fb.png)

And don't forget to set the same values to your GUI's Pan knob :

![image](https://user-images.githubusercontent.com/84969276/142757499-b1308b37-75b4-48a3-bf9c-2cabaad6d45c.png)

And voila again. Now you know how to split the left and right channels.

```snippet
HiseSnippet 1321.3oc6X0rbaaCDFTRPwxIoMYZe.zQmYRzPJqDaO8Pc7OJUSic3X55o2x.SBYgQj.bHghsZmduuUsOR8MncW9iHnirislIoWhNYr6hc+v9yG.sahxmmlpRHVcNcdLmX8Hp2bodx9SXBIYzADquk5o4IbUWWlTxSH6MOlklxCHVVMeCZjUmVjre+yOtGKjI84UhHjyTBe9aEQBckT2c+YQX3PV.+TQjg0C1cjuRtuJTMC.TSpMIl4OkcA+XFZVCJwp8gABsJwSyz7ThUq8TAy8lntTla+YhTw4gbbgCwCbTt3gpv.DwnTx9SDgAtkG7TB3E2pzPy7zv2SORDHVHuJc7jLEcq1gY9vpQc30rF7bLgmsA7VBjrLfTqbH8TpmehHVWoAwyCoijP8YLCR6lPI2Vh0eS2WAFH08hXS4CSfEK1vF86a+7tN8se1OLdlzWKTxtJ4wJM+cxMd15+95cV+OVu60UMd7R0ggIQEFxSVpZrRmbaabC4rny4IOu6GXgy3KLDN90yozaNmZVx8yO0FFpjijB86h4xapQfTjpv7eAp.S0YY+uoH66EJBfo.Ajj6PmJUmCiEjLHa10S9kQGvzrRGA9DhSLOQKvif0A7O.SE4k0NzC3oS0p3LaihURDAVctCg8ppPNZ24UKNXWM+JvGqQKlYipMl9WQhffPtqJUfk.SbGWlMFAAZ8hsO7JXNLAFAg1FTNEkCSweTGJLanBlExz0GXPVhBEX3L6RwVQI.i4lrHWeJp0caJ51Gxuqv8oTWg1exxwaikfWnF+4FuEbROld33wbecEXaQG9q2JAz8FJ2Uxn0K5Kg3i.wnUYYjP+IsZfONgCcS7SUtgr4ajxhhC4m.n84cOOT4O0S7a7OlknnubOzhM7mfwJLcUHSZemInctUBZxIpYZg7hiX5DALGROdVjGbskOe+BzAxrZfbJ4qsw0X2hGWFjs3egeEJcv0VEJcJUVQGQNlquTkLMqXT72PoHm++77KcGeE40ggpKQNDQQqKTBxj4pBmGOQIE9nnbKJA5qiTyPBmbzBtWE.m+1CY9PdZtKSOAGJP5TnqimzyeQ22RK5YMVPB0sjwHMOYhts7l87DA.inLpN7d8lnd730HO9TL.qQuZLCo8pAlmjAFnH2qPa8f+IBTKChXPRwJXdtQ9icf5nAzOKmXuIse1.ooosQ1CdoET5IG4A0uKQxiSYIWv0Y92TPwsARdVyZZ8kfCQji7qsou8vgmRbM4bamwhRNRHKB3ZzW3Xa2ylbD6pEX.WCuVKFGhv2vX2CrI6myfcrcbdEzTOkeYd5jX8czW1aP+982xdqsFr8.mMs2o9Q3th3GPOYza9o+2frQACIqJWAE6pfmGIyH6.qwB4Cn4hd8LsJBnEJojqtBXQ8jXzb9XJN.wC8hCg21diiKQyB0h6WK5RmEJZJpEmGBwIg26BLMeuhPiZYrlFYr1e9KW4mlrdiqmxWNPtdoaMJFy6GPPC1z1wdSvfc1Y6A6rksSw6m8hTJ8DfKubVtMsO5cxW9zxinmvS45b2Vy4DSZKy1vxQuu1X70Fi5Lg2rl5bjn+yeRe0YoMbVVBc4hqCsu8KFZUdwvhavqcyPIi6mhct1IH6UnlW.+H5nzyPs9rvRjAugYU9xquHulKh4mndewaWvCzZYRfzoL6euQG5Q35tNkeNYdRA9XMw688wG6+BXRX46o+JrmMWg8LXE1yKWg87pUXOasB6Y6acO3+omBlHrsFD3dXVykk0gRF7cBYejC4+.r0rCQC
```
