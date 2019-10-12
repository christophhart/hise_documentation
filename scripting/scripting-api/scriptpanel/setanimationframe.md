Once you've loaded an animation into the panel with [`setAnimation`](/scripting/scripting-api/scriptpanel#setanimation),
 you can call this method and supply the frame index you want to display.  
Calling this method will pick the frame and immediately repaint the panel.

In order to find out, which frame you want to display, use the [`getAnimationData`](/scripting/scripting-api/scriptpanel#getanimationdata) method which returns an object with the animation specs.



