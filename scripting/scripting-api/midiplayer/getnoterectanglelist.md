This converts the MIDI data in the current sequence to a list of rectangles for each note 
scaled to fill the rectangle supplied as argument.

A rectangle in **HISEScript** is always an array of 4 integers:  
`[x, y, width, height]`.

The most simple application of this is to draw a piano-roll content into a Panel.

```javascript
// Fetch a Panel
const var Panel = Content.getComponent("Panel1");

// Fetch a MIDI Player
const var Player = Synth.getMidiPlayer("MIDI Player1");

// Connect the player to the panel to make it update automatically
Player.connectToPanel(Panel);

Panel.setPaintRoutine(function(g)
{
    // create a list of note rectangles.
    // the argument is the boundaries of this panel so it will scale
    // them to the dimensions of the entire panel.
    var entireArea = [0, 0, this.getWidth(), this.getHeight()];
    var list = Player.getNoteRectangleList(entireArea);
    
    g.setColour(Colours.white);

    // Now we can simply iterate over them and paint them
    for(note in list)
    {
        // `note` is a array with 4 numbers and can be passed
        // into all Graphic API functions pretty conveniently.
        g.fillRect(note);
    }
});
```