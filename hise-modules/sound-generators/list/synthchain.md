---
keywords: Container
summary:  A container for other Sound Generators.
author:   Christoph Hart
---

> Note: if you're wondering why you come to this random page because you've pressed **F1**, it happened because the root container has the keyboard focus by default and pressing F1 will go to the page of the UI element that has the keyboard focus. So the takeaway is: whenever you want to know more about something, just make sure it has the keyboard focus and press F1. Now back to topic:

The Container is a sound generator that hosts other sound generators and process them serially from the top to the bottom. Every HISE project has at least one Container, but you can use nested containers to group certain sound generators into subgroups.

### Limitations

There are a few specialties about this container, and most if not all of them have something to do with the fact that **it is the only sound generator which does not have a concept of polyphony**. It just passes the audio buffer and MIDI messages to its children so these things will not work in a Container:

- no pitch modulation
- polyphonic FX
- polyphonic modulators

You will not see these modules in the dropdown list if you try to add a new module in one of its chains.

> By the way, there is a container which will group its children on voice level and offers some functionality like unisono detune and frequency modulation. Check out the [Syntesizer Group](/hise-modules/sound-generators/list/synthgroup) if you want to use these things.

### Define the User interface for your project

In order to define a user interface, you need to have at least one script processor in the root container that has called `Content.makeFrontInterface()`.

### Multichannel routing

The Container is one of the few sound generators which allow a dynamic amount of audio channels and has capabilities to create submixes and advanced routing setups.

### Encapsulation

A container can be used to encapsulate the MIDI processing: any processing done in a Container (in fact any sound generator, but for the Container it might be more surprising) copies the MIDI message before processing so you can do the following stuff:

- Container 1: Ignore all note on events
- Container 2: Transpose all events one octave down, then add an Arpeggiator
- Container 3: Change all CC1 messages to CC2

and each container does not need to bother about the others.

> Tip of the day: you can double click on a header of a module to "zoom" in and show it as root (in this case a breadcrumb bar will appear indicating that you're navigated yourself inside something. This might come in helpful if you want to focus on a particular container.