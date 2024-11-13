Instead of `pathIcon`, one of the following standard cursors can also be used as a string:

| Property | Description |
| -------- | ----------- |
| NoCursor | An invisible cursor. |
| NormalCursor | The standard arrow cursor. |
| WaitCursor | The normal hourglass or spinning-beachball 'busy' cursor. |
| IBeamCursor | A vertical I-beam for positioning within text. |
| CrosshairCursor | A pair of crosshairs. |
| CopyingCursor | The normal arrow cursor, but with a "+" on it. |
| PointingHandCursor | A hand with a pointing finger, for clicking on web-links. |
| DraggingHandCursor | An open flat hand for dragging heavy objects around. |
| LeftRightResizeCursor | An arrow pointing left and right. |
| UpDownResizeCursor | An arrow pointing up and down. |
| UpDownLeftRightResizeCursor | An arrow pointing up, down, left and right. |
| TopEdgeResizeCursor | A platform-specific cursor for resizing the top-edge of a window. |
| BottomEdgeResizeCursor | A platform-specific cursor for resizing the bottom-edge of a window. |
| LeftEdgeResizeCursor | A platform-specific cursor for resizing the left-edge of a window. |
| RightEdgeResizeCursor | A platform-specific cursor for resizing the right-edge of a window. |
| TopLeftCornerResizeCursor | A platform-specific cursor for resizing the top-left-corner of a window. |
| TopRightCornerResizeCursor | A platform-specific cursor for resizing the top-right-corner of a window. |
| BottomLeftCornerResizeCursor | A platform-specific cursor for resizing the bottom-left-corner of a window. |
| BottomRightCornerResizeCursor | A platform-specific cursor for resizing the bottom-right-corner of a window. |

```javascript
// Changes the mouse pointer over the ScriptPanel1 to a hand with a pointing finger
ScriptPanel1.setMouseCursor("PointingHandCursor", Colours.white, [0, 0]);
```
