This function lets you send out an OSC message if there is an `TargetPort` specified in the `connectTOOSC()` call. The first parameter must be the subdomain, which will be merged with the root domain to the full address and the second parameter must be a value that is convertible to a OSC message:

- float
- int
- String
- Array of the three types above

> However the parameter range that is defined in the `connectToOSC` call is not applied to the incoming / outgoing values, so you will get the raw data.

```javascript
// Send a message to a fader
rm.sendOSCMessage("/fader1", 0.4);

// Send a message to a 2D XY Pad
rm.sendOSCMessage("xy1", [0.2, 0.3]);


// Send a message to an external display
rm.sendOSCMessage("/label", "Hello World");
```
