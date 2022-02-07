If you want to draw a path using the buffer data (for oscilloscopes or plotters), this function will do the heavy lifting for you and supply you with a [`Path`](/scripting/scripting-api/path) object that you can directly draw on a [ScriptPanel](/scripting/scripting-api/scriptpanel).

The parameters for this function allow a fine-grained control over the appearance of the path:

| Parameter | Type | Description |
| == | == | == |
| `dstArea` | `[x, y, w, h]` | the target rectangle for the path (it will be scaled automatically to fit this rectangle). |
| `sourceRange` | `[x, y, w, h]` | a rectangle that will determine the "input scale". s[0] and s[1] are the min and max values that you want to draw and s[2] and s[3] define the index range if `s[3] == -1` then it will use the entire buffer. |
| `start` | `double` | the normalised start and end value that can be used to control the start and end points of the path. |

Here are a few example use cases:

```javascript
// Oscilloscope:
d.createPath([0, 0, w, h],   // target rectangle 
             [-1, 1, 0, -1], // samplerange 0 - numSamples,
                             // valuerange: from -1 to 1
             0.0);           // start at the center (bipolar)

// Plotter
d.createPath([0, 0, w, h],   // target rectangle 
             [0, 1, 0, -1],  // samplerange 0 - numSamples,
                             // valuerange: from 0 to 1
             0.0);           // start at the bottom (unibipolar)

// Inverted Plotter
d.createPath([0, 0, w, h],   // target rectangle 
             [0, 1, 0, -1],  // samplerange 0 - numSamples,
                             // valuerange: from 0 to 1
             1.0);           // start at the top (negative)

```

> Be aware that the path that is created is not closed (so you need to call [`Path.closeSubPath()`](/scripting/scripting-api/path#closesubpath) manually if you need a closed path.