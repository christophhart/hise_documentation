This adds pixelated noise to the current graphics layer. The parameter can either be a double number that will indicate the "gain" of the noise (= the transparency), or you can supply a JSON object that allows more fine grained control over the noise parameters.

| Property | Type | Description |
| --- | --- | ------- |
| `alpha` | double | the transparency of the noise layer. |
| `monochromatic` | bool | whether the noise should be black & white only |
| `scaleFactor` | float | a scale factor that is applied to the noise. |
| `area` | `[x, y, w, h]` | the area that should be painted with the noise. |

> HISE will cache internal images filled with the noise for performance reasons, however this means that using this method increases the memory usage (depending on the noise area size).