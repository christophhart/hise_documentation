---
keywords: clone_cable
summary:  Send different values to cloned nodes
author:   Christoph Hart
modified: 24.09.2021
parameters:
 - NumClones: The number of clones
 - Value: The (normalised) input value
 - Gamma: An additional parameter that skews the output of certain nodes
---
  
This node can be used to modulate and change parameters of child nodes of a [container.clone](/scriptnode/list/container/clone) node. 

In order to use this node, just drag its modulation source to a parameter of the first clone, set the mode and change the value parameter.

> Be aware that as soon as you have connected the node, the NumClones will be overriden (and updated) by the actual number of clones that is used in the target clone container (so you don't have to keep these in sync manually).

There are several modes available that determine how the value that is being send to each clone is being calculated. 

| Mode | Description | Gamma | Example | Midi |
| -- | ----- | --- | --- | - |
| Spread | spreads the value from the mid point (bipolar) | Changes the curve from linear to something logarithmishly | Detune, Stereo spread | No |  
| Scale | scales the value from zero to value (unipolar) | Changes the curve to a polynomial | delay times | No |
| Random | sends a random value | nothing | phase offset for reducing chorus effect | No |
| Harmonic | sends a multiple of the input value | nothing | frequency for additive synthesis | Yes |
| Fixed | sends a fixed value to all nodes | nothing | anything that needs to be modulated | Yes |
| Nyquist | caps the value once the harmonics exceed the nyquist frequency | the "Q" factor of the filter | antialiasing for additive synthesis | Yes |
| Triangle | reduces the start and end points by a certain amount | skews the curve | attenuation of left / right | No |
| Ducker | a fixed value only determined by the amount of voices | determines the level of attenuation | normalisation of volume for unisono voices | No |

As you can see a few of those modes react to MIDI input (the normalised frequency value of a note on message) if they exist inside a context that processes MIDI messages.

> If you connect them to a frequency parameter, make sure to select the unskewed range from 0-20000Hz (the "Linear 0 - 20kHz" preset in the range drop down menu)