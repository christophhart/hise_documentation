The [parametric EQ](/hise-modules/effects/list/curveeq) in HISE has a dynamic amount of EQ bands which can be addressed using the math formula

```javascript
attributeIndex = attributeType + bandIndex * bandOffset
```
Adding & Removing bands however cannot be queried by the standard HISE parameter system, but you can use this attachment type to be notified whenever a Band is added / removed.

- `moduleIds` must be either a single string with the EQ ID or a list of strings for multiple EQs
- `eventType` must be one or multiple strings from this selection: `["BandAdded", "BandRemoved", "BandSelected", "FFTEnabled"]`

Once a broadcaster is attached to EQ events, it will fire its callbacks with three parameters:

```javascript
function(eventType, value)
{
   // eventType is one of the strings that define the event
   // value is a context dependent value (eg. the band index at selection)...
}
```
