---
keywords: MidiList
summary:  Please enter a brief description.
author:   Christoph Hart
modified: 21.06.2019
---
  
A `MidiList` is an array with 128 numbers that is particularly useful for MIDI processing.

It offers a slight performance advantage as well as some handy methods which makes it the 
preferred data type when you need to store a list of numbers:

```!javascript
/** MidiList Benchmark

    Performs a set of operations to show the performance
    benefit of using a MidiList over a standard array.

    On my system it's 733ms vs. 4ms. Be aware that this is a 
    highly artificial benchmark, real world use cases will not
    show this kind of performance gain!
*/

// Set this to true to use the MidiList, then run the code again and watch
// the benchmark result.
const var MEASURE_FAST = false;

// Create a (fast) MidiList and a (slow) Javascript array.
const var fast = Engine.createMidiList();
const var slow = [];

// preallocate so that the array has at least a tiny chance (JK, doesn't).
slow.reserve(128);

// Initialise the array and the MidiList with the same values.
for(i = 0; i < 128; i++)
{
    var v = Math.random() * 12;
    fast.setValue(i, v);
    slow[i] = v;
}

// Normal Array
if(!MEASURE_FAST) Console.start();
for(i = 0; i < 10000; i++)
{
    // find a item
    slow.indexOf(8);

    // search number of occurences
    var slowCounter = 0;
    for(j = 0; j < 128; j++)
    {
        if(slow[j] == 5)
            slowCounter++;
    }

    // fill with constant
    for(j = 0; j < 128; j++)
        slow[j] = 12; 
}
if(!MEASURE_FAST) Console.stop();

// MidiList
if(MEASURE_FAST) Console.start();
for(i = 0; i < 10000; i++)
{
    // find an item
    fast.getIndex(8);

    // fill with constant
    fast.fill(12); 

    // search number of occurences
    var fastCounter = fast.getValueAmount(5);
}
if(MEASURE_FAST) Console.stop();
```