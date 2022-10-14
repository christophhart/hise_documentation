In addition to OSC messages being piped into global cables, you can also register script callbacks that will react on incoming OSC messages. The first parameter should contain the subdomain of your OSC address and can contain OSC pattern wildcards to catch multiple OSC messages. The callback must be a callable object with 2 parameters, the first will contain the subdomain of the OSC address and the second one the value.

```javascript

rm.connectToOSC({"Domain": "/myDomain"});

// React on /myDomain/fader1
rm.addOSCCallback("/fader1", function(id, value) {});

// Catch all - react on every OSC message that starts with /myDomain/
rm.addOSCCallback("/*", function(id, value) {});
```

Unlike global cables which are limited to single numbers, this system allows you to react on almost every OSC message type:

- floats
- integer values
- Strings
- multiple values (`value` will be an array of one of the types above).

> However the parameter range that is defined in the `connectToOSC` call is not applied to the incoming / outgoing values, so you will get the raw data.