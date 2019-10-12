This method will return an object containing the properties of the current animation in this panel:

| Property | Description |
| --- | --- |
| `active` | whether an animation is active. This might be false if the animation couldn't be loaded. |
| `currentFrame` | the current frame that is displayed. You can use this in the timer callback to increase it in order to create a moving image. |
| `numFrames` | the total number of frames in this animation. |
| `frameRate` | the suggested framerate. You don't need to use this value, but you might want to call `Panel.startTimer(1000.0 / data.frameRate)` with it. |

These properties will be updated if you load another animation or change the frame, so you just need to call this method once and then access its properties.

