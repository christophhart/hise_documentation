---
keywords: Create a MIDI Sequence
summary:  A short example how to programatically generate MIDI sequences.
author:   Christoph Hart
modified: 29.08.2019
---

This snippet shows you how to programatically create a MIDI sequency that can be played in a [Midi Player](/hise-modules/midi-processors/list/midiplayer)

The API is pretty low-level, so the first thing that we add is a helper function that writes a proper note (including note-on and off).
The arguments are pretty self-explanatory, the only thing to note is that the timing values are expressed as fraction of a quarter beat.

```javascript
function addNote(list, channel, notenumber, velocity, position, length)
{
    var m = Engine.createMessageHolder();
    m.setType(m.NoteOn);
    m.setNoteNumber(notenumber);
    m.setVelocity(velocity);
    m.setChannel(channel);
    m.setTimestamp(Engine.getSamplesForQuarterBeats(position));
    
    var o = Engine.createMessageHolder();
    o.setType(o.NoteOff);
    o.setNoteNumber(notenumber);
    o.setChannel(channel);
    o.setTimestamp(Engine.getSamplesForQuarterBeats(position + length));
    
    list.push(m);
    list.push(o);
}
```

Using this function, we can create a simple array that contains all notes like this:

```javascript
// This will hold our note sequence.
var l = [];

// Add a bunch of notes
addNote(l, 1, 60, 127, 0, 1);
addNote(l, 1, 63, 127, 1, 0.5);
addNote(l, 1, 65, 127, 1.5, 0.2);
addNote(l, 1, 67, 127, 2, 0.5);
addNote(l, 1, 72, 127, 3, 1);
```

Now the rest is similar to what we've seen in the [API Documentation](/hise-modules/midi-processors/list/midiplayer#the-midi-processing-workflow):

```javascript  
// Get a reference to the MIDI player.
const var MIDIPlayer1 = Synth.getMidiPlayer("MIDI Player1");

// If the MIDI player doesn't have any content loaded, we
// need to create a empty sequence first
if(MIDIPlayer1.isEmpty())
{
    // Create one bar with 4/4 time signature
    MIDIPlayer1.create(4, 4, 1);
}

// Now we just pass the list to the MIDI player and let it create
// a proper MIDI sequence from it.
MIDIPlayer1.flushMessageList(l);
```

```
HiseSnippet 1579.3oc4X01aaaCDVJIZXwasncqXXejnX.SAwi01IoN.ECMNN1MdMu3Zm1UzggBFIJKlJQpRQkLug9eb+T5+fsiRx1xspAFdqa.aNeHl2cj744tiGO59RgCMNVHMLW+rwQTCyO2Z3XtxusOgwM5cfg4MsNlDqnRTln8GGQhiotFllq9Hs.y0WyH8yae39j.B2gNSjgwyDLG5QrPlZlz968XVPPWhK8LVXAq2dudNBdaQfHAvypV0LhHNuhLhdBQa1JVFleRGWlRHGpHJZrg4Z6KbGOzWbEOy9mwhYmGP0CpaLDVnLwcEAtZDq+tQaeVfa+I7N1vvzp+LuvpYdg6XcLykMU9LuwsRUflMih9CyUtN3UeIg2JEf2mLIHkBu.xXpbRPp2A8PYRpOGnZmHkTtZH80Iz4BNu8g4pNSBt4hxORHh5vI.TcKJ1b0OBzyPyjtr.plplSF.VqoEDxOfnHFlwV61.yO69Od21CFzqGFe7S57hKZgw3miwsv8wgrACOqWiW.Rviw3KZ1rwHbqCOEFdwlMa340Zqzu2Z2POO7y6iOj+C8O4Wos2uqW6Vdd0a0avlNG1G6e.F2byGiwFZbLKyyTmqNjMhSTIRPl0IIg6S.FTvAchHjA5SOMkK7V6c.kWlXsOFbjRUwSKYN94b5FEh9qkE8us0PGIKRMSi1W8k4RmkaNedPlViUDVVnaTwKg6nXBNh35dhPQsCXwppHGeBmSCph3fLdR34TYUzkz.gCSMtJJRDyzypJJfxGo72nxuUAAetjHQgnuG0gOhwoXGIExPNF.Ab38Pc3WZuwCRsLDGSUZZXGh066o7hJzRNIcWsmAfhF7rbnXOASEU1NC714jXtcDBdwJRXjcNDGQUCggPZWWg7IIPbfJ2GPcr8DNtQ97mRPwBQPwTBJxHnmWQMWGCEeXRHVRRf1bRjpHazwZbTRrucXt3YRDfj2biJ5+t28Pm4yhQWAUqQ9.KQPg4zLCTbd0DbEsmI.7L+zO+fJ5Yzx0EQPmCoW9HgWp0wUlljUEUuJ590f+0nYUj9+v18NZ2JWK78Z3cde86LQOdGsEa89VzL2hF35efEoYibS1JEBS46inJ.8RpGUpoGRIPJeJJs3ZTZwUbE3NpXUZFgVbdIWvCjduoNlLq1r8cKVV9taj4h548tKJxUPi4eqB4StjhH7wHXSfrCEJP.WS5VEcEUOSNk5pwTV9GfTZXjZ7znAxiIiUUXd1EPFlE2Qak8FSNsBKT6rEPvonyAhbES4i19daiTPJFJdRUtTqKtTY6q81UQamE5dSJgNQbE.PzEIfeQWvIkd5TpR7e.6bgbREhoxogdEHnHoHhl4RKvGoHDLDWoHH7Bf7z7ydGAahcfN.NsflfmUWwVS20ADhdWUddkpqM3xkhf.8Y4RTqO8IutIZOsdIIHgN0Pnr87WaVYwt1LOCnfgBdONScZDc53LlNQRMioDrnnY7pnzT5ThYyDUxc0syvD7sm1K8hY3hkbY8SieJllglGPuDZ6K61p0sNfF+JkHxnjqxf1oDtIA5KGK1iktwxbEfKdtqw5o2Mn31345LYwa7pVoclTuL1tfv81V8YJG+xw6JkfWcOcejwadar2vpimG0QMCrqY084KaOqKGTtYFT9LqgvUVo0HSAxWkNF8i5BdOhxoRsSs9077heeQedQzB+7hScTv1Cs+xigKLmagGRCYmAkGiKJ7owztR5qGnixEk2V.MBVlp29vt.IKcNC0UXSSWZEJR3y0F3R1n87mZJXeIOpXs+Edyye+G89qWoX0ECtk3AM6+duc9VPNstcrNbc6ofDMF+Bn9mGIIPMQ57I4GK3hHeAm4TLCX.UIYiFQkEwdoDpkRM2q2tydCnATRwr4uYuifrPhD7SzkzWTew8EWW75qsxfKRexD8eiJ7q9+yJ7CDIJFezwDHQ8WxdN7PnvpCM+ALvFYYtht3X13Z5wYUV4toC9C3Stx55wl4JqOQ4+H6QHwQJdoSVyO5b4OMUBvad5a+W25X8XTciz15f4YUCWyHDpH9RGGs696.+S4yowRLmsVh4r8RLmcVh4b+kXNMWh4r60NG8kQsRThvrihff9cx9UhLm9iVYtpweBedasBA
```