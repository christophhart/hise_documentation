You can use [Lottie](https://airbnb.design/lottie/) animation files to be displayed in a ScriptPanel.

Just load an animation into the [Lottie Developer Panel](/ui-components/floating-tiles/hise/rlottiedevpanel), compress it to a Base64 string and give it to this method and you can start using the frames inside the animation with [`setAnimationFrame`](/scripting/scripting-api/scriptpanel#setanimationframe).

> Be aware that there is no built in animation functionality, but you can easily create "moving images" by using the [timer callback](/scripting/scripting-api/scriptpanel#settimercallback) for it.