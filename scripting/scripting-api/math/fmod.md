This is usually useful for two use cases:

1. Get the fractional part: `Math.fmod(19.52, 1.0) == 0.52)`
2. Loop around a range limit: `Math.fmod(13.2, 12.0) == 1.2`

Note that if you're using it for the latter use case, the function [Math.wrap()](/scripting/scripting-api/math#wrap) might be a better candidate as it correctly wraps around negative values too.