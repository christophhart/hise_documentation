---
keywords: RoutingMatrix
summary:  The RoutingMatrix object
author:   Do Mayer
modified: 31.07.2024
---
The `RoutingMatrix` object with which you can manipulate the channels and connections of each audio modules outputs.  


```javascript
const var MasterChain = Synth.getRoutingMatrix("Master Chain");
MasterChain.setNumChannels(8);

```

# **Multi Output Plugin Tutorial**

## **1. Building HISE Multi Output**

In order to do it, you'll have to build a multi-output version of HISE.

### A. In the projucer file, add these two preprocessor definitions:

```NUM_MAX_CHANNELS = XX```
```HISE_NUM_PLUGIN_CHANNELS = XX```

'XX' being the number of outputs you need in your plugin, and it must be a multiple of 2, obviously.

![3ca5b3b8-b263-41ce-96b8-7205ab5b93ce-image.png](/assets/uploads/files/1736237953796-3ca5b3b8-b263-41ce-96b8-7205ab5b93ce-image.png) 

> I'm using the latest develop build of HISE, but noticed that the ```NUM_MAX_CHANNELS = XX``` preprocessor didn't work properly. I don't know if it's a bug or a problem on my end - or I was really tired at that moment...
I changed the value directly in HISE's source code.
This can be changed in the file: ```{HISE_FOLDER}hi_tools\Marcos.h``` line (49):
```
/** Change this value if you need more than 8 stereo channels in HISE routing. Default: 16*/
#ifndef NUM_MAX_CHANNELS
#define NUM_MAX_CHANNELS XX
#endif
```

### B. Build HISE

Build HISE as usual.

## **2. Setting the outputs in HISE**

1. In HISE, click on the Main channel meter to open the routing popup: 

![0a41c2ca-8e4e-4c5c-8993-93ddc6a16d5d-image.png](/assets/uploads/files/1736238706068-0a41c2ca-8e4e-4c5c-8993-93ddc6a16d5d-image.png) 

![becdbc83-be2d-46bc-9a0d-0780a557e2fb-image.png](/assets/uploads/files/1736238745099-becdbc83-be2d-46bc-9a0d-0780a557e2fb-image.png) 

> My build has 48 channels, that's why there're so many output here. Your setup will be different depending on how many outputs you've configured for your build)

Right-click somewhere in the popup, and change the channel amount (let's say we want 8 outputs) : 

![5b812dd2-6a5b-4617-a2a8-3b5a3d64ec1a-image.png](/assets/uploads/files/1736238916802-5b812dd2-6a5b-4617-a2a8-3b5a3d64ec1a-image.png) 

Now the routing appears like this:

![464f87a6-a230-40e4-8595-a9821772305c-image.png](/assets/uploads/files/1736238972422-464f87a6-a230-40e4-8595-a9821772305c-image.png) 

> Again, it will look a bit different on your version, but all the output of your plugin should be routed to each of HISE's output channels.

2. Edit the project setting

Lastly, you'll have to add those extra definitions in your project's settings:
```
HISE_NUM_PLUGIN_CHANNELS=8
NUM_MAX_CHANNELS=8
```
![562b7413-4f5e-45b0-a8e5-5cf3fdef7d8e-image.png](/assets/uploads/files/1736252864305-562b7413-4f5e-45b0-a8e5-5cf3fdef7d8e-image.png) 

You're all set now to do what you want with your outputs.

Here's a snippet:
```
HiseSnippet 2136.3oc6as0TajbEdDvrAoMYK6s1Zq7XWToJjVKj0Mt3PbYrEfCULFUHXcRQQ4pYlVnNdT2S5oG.U65Gxur7WH+T1WySImSOijFIKqEDdcXoF8.ntO849oO8W2EzTIcXAARkUlbG0ymYk42Z2pmP2oQGJWXs21VYJXePn1OTS5xDgADovqGosTQzcXDWoSHLslp4Rg0K54SCBXtVYxL+KQ1yjcAKyme5Yuf5QENrgSYY88RtC6U7tb8vYat0eg64sK0kcDuahUWeq8bjhFROYHXpyaW1xm57N54rWSwkMms0elFzwJy2YSqUys8ZqswSbcpuZkmzlttqyY0dxpL2p0qwdBy0c8Ztm0tsUluXGWtVpZAVOKvJyBuP51qUG4khHE787.9YdLbPEqVflildWomK5h3rVM5v8ba1OFFXYkYwlCinyGEQ+F684t7AyOLx9.CAxPNRF.yL2nl27iXdURZdkSXdSvjxjvjVHxjdncKGE2WOjBZOeo8dBMS0lB4ojlRzZsl6+rn8ieL4nN7.Rff66yzD3qmQgkAkEjFcT7.szuyxAjk2OzSyAWUHXdjiXA5kI9J4em4nKRnWP4dTv3IbgoLBjH6s5Pva4TOhh4KykqgDrEgtTW56X6pfACrs7aTtbQR0xkKrY1b4.K5kfgfhQwZyTLnJCpRaSXTmNjkgpFMDuYpkQk0CJeH9dgmCeOuoNuHIf102ioJRFrzhDl1oToREPguyELUORfLT3R5JcCAqFjB4Rp.TpjnjgZFg4EbYGP24.YDnImq7azWX6S0J9UjmRNwnuRmyzGB7vEmGQI+RsfkQdC8BF3H.CTHLTYoBEykM5yMfspyFa0lM1puTgS2LWrKevwG073id6qOdevU2XSSdYWXqLgJHTkh1ibIW2gPgYvTU.jKYRhSTAR.LGUCqiMr1.EvaXKCqOLfAzgJs3pEYx1QNfDOCZEDfqeOMnEOrBRGpDQL8GIHEWplF0FC8Kn.AxGm.UQUNsH4jpEI0veWuHYU72qUjr9oCcsIvK5YQSErMCxydA4K.qmK7vvT6PgC1PbhKK2OjKqmDL63XPi9g.vh.clEZslmCCJuIgS9SIhqOtJLyidTgbY+ALYEICvfLbx+NvIfe7nJnLxlcTYWxOLnSdbsfUl884xFGfFcUal68ersSX+dy9ILnGkrtbXto+t.jonMWPGfj6XBhijWPU3dinPx9l7GX682oCEcMjc8kBXP9kfudl7ExqLaEHS4yzYu5si8Z2N1i1hfoTSfCJfG08KPvxAjVo.T.BsR50HtjNuTfKZmqfrjfFWHEuFLO1ms7KE.6K2SzTwfQKUjnUgrBlr43EjSQh4c5a9Eg7jGHggUpbgKCagMpwWxL8AsGxIZUCpKw8nOMRTqTAHjKKTaY1RF0O.9RHdxgFaCvbdGg21TA8pGeXe1GzdfcEbxRPoA6bBcvisvhGzWi73S6qCrd97npQnrSvLtt4HASmGlGLCn2QZoGF.85Lzedy8FFuflGnDGoWXIpqaiAxMOGNG.DkxAx.P3.1EBS3BG3wEFTQlYKfl1X6rGrcNar6bB+znX7XmcbhINe535s3GzX5jnv1offvLQTz3Prn.Cx8OLtxiphEhNvw1XLA5OyTJoJWVd678sjxfk7TRapGrle7G6GuOoxvoiaC8Q8or2.+fG0U584RTm9ZolcfHpcIPgLNo1smHs3hY377IRFAUplFi4EgcOCQ.LbK.tP.3znnwr+3nwRBVzIp6PhEhEDb8A9LwGCBoUbKE.41BwVErTsA21Chws0u+hE2EgsMnWokwrSh615FJhpiKBqstohn13hXwarHpOtHdvVVGu21P8NhmMN.AAMelRyw7QlsYW.2lHBcaV6sYAuCPhZhfw8l.79WyX3UCU6eaqdIGzkBzryfi4ZV2.DHckUplq1J0ys5Jqka8U1.Se2PMVMgF2R94Pi0R5i89bnw5IzX4+4LnwO7NLvsmvd2HRzjWoBu3YLgwuSJdCBQ.W2K4FjOY2y55ZhOztIW6zYx13bSvFgR9eIrw3am96r2ocanW7PCbA6c+q+xbUzjp+qhT+WZi2rvbqCix+V6Iccno7zB+6q6SK3eseZgCbzf5ORQEA9xfjsS+WsXc4GAU9AI01wAvMTY+iCwrYx4aHopIR5md1tfSNQdZQAj4lxhm2E.nnGoLX9o8hEUlwWrXg6buXwuB1rOxipjsuM1hiOkvNhKXdvQSFa7qgyhZSC8z8mczZ48kBoeGof6jLQeHCvKc94LURaehNzy0Z3lBCm4a15P.eKMYQ6eXqWAEaTEDmXyXrnxM9AllX952aGYtDbCH4WuMom+dcS5QRmKN3QgMk1uru5+p3IH3LSq8rk01LO5HAp2vcgl8I..LgF36A6VT5lROpZ7v77epJaW3ZWKftzc65UrMCDluqajlT+cai7A1Mo++JYOx6L.XhecX2VlmVn+Szg3jmCQVDMtLN1fZfIbMC9uvmXhUvwYhIVoOwOK5XFg4U8NBLOzcRg4kBy61.yqZJLuTXd2uf4UMElWJLuTXd2ig4M2zzw7epf4U6txq48rTXdov7tcv7pkByKEl28KXd0Rg4kByKEl28XXdKLMcX+oBlW86Jul2Vov7Rg4c6f4UOElWJLu6Wv7pmByKElWJLu6wv79hooieyOmNd3D0wh2J+HlX0ju0X0wHVK4aMVaLh0SBes9XDWMI70UGi3ZIiHqMFw0SFQVePDoK0QIeqSze5xl+49Ly.UBBy+0gYs2GGS9f+rqsr5BHtdqiynh5CXr5rxXsYkw5yJiqNqLt1rx35yJia7yyHBH94gZY2ntEVV62bGyec4Yxri.+uOyz3v5+wGeMh2
```

Original post on the forum: [Multi Output Tutorial](https://forum.hise.audio/topic/11553/multi-output-tutorial)
