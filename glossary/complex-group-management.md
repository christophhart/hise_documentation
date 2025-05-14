---
keywords: Complex Group management
summary:  A indepth explanation of the new group management system for the HISE sampler module
author:   Christoph Hart
modified: 04.02.2025
---

> Note that this explanation is very technical as it tries to explain the system and how it can work as flexible while maintaining the ultra fast performance of the existing sampler voice start handling. If you do not understand what bitmasking is, you can still extract some useful information out of that document.

This is a new feature in HISE that extends the sample mapping capabilities by reinterpreting the z-Axis of the samplemap which was previously used for storing the RR group:

![](/images/complex_group/original_rr.svg)

You can now replace this z-axis by an arbitrary amount of organizational layers that will perform different functions (eg. xfading, RR cycling, keyswitching). In the sampler UI, you can select / display each layer to edit / assign samples and the scripting API allows you to select the samples to play with combining filters for multiple layers with no computational overhead. This supercharges the default behaviour of the sampler and removes the necessity of scripting for many use cases (legato transitions, choke groups, keyswitches). 

It also allows you to vastly reduce the amount of sampler modules required per project and eases the transition coming from samplers that do not have the ability to use multiple sampler modules (cough....).

For an easy explanation of this system take a look at David Healeys video (upcoming), but here we'll get our hands dirty and I'll walk you through the nitty gritty details and technical specialties that make this system as powerful and versatile as it is.

## Introducing: The Bitmask

Instead of treating it as a linear axis with a single number value from 1 to the amount of RR groups, we'll treat the number value as a bit mask of 64 bits (which is how it's already stored internally).

![](/images/complex_group/rr2bitmask.svg)

Now we can assign bit regions to as much organisational layers as we want. The number of bits required is defined by how many elements we want to store. So with 64 bits there is a theoretical limit of how many layers you can define, but you'll quickly see that the chances of hitting that is rather low.

### Example

We have a sustain sample set with 9 RR layers because recording time didn't matter, 3 XF groups as well as a set of legato intervals that we want to put in a single sampler module. First we calculate the number of bits required for each layer:

- if we have 9 RR groups we need four bits because `2^4 = 16`
- if we have 3 XF groups we need two bits because `2^2 = 4`
- a legato layer needs 7 bits to store the source note information (128 MIDI values)

This will result in the following bitmask for the group layout:

![](/images/complex_group/layers.svg)

Once we have defined the bit layout of our manager, we can then encode the values of each sample into a 64bit number that will be stored as the `RRGroup` property in the samplemap.

> Don't worry, you won't have to touch any bits during this process, the group manager will automatically calculate the bitmask using the supplied token values from the filename:

![](/images/complex_group/sample.svg)

This bitmask is then converted back to a 64bit number and stored as RRGroup property in the sample (so if your samplemap contains RRGroup values like `212491258202` it is because of that).

## Using the bitmask

Now once the bit layout of all our layers is defined and all samples have encoded their assignments to each layer properly, we can use this system to filter samples. This is used at two places:

1. To determine which samples to play (or which Xfade position to use)
2. To determine which samples to show in the editor (or which samples to select)

So if we set the sampler to only play samples from the RR2 group, we'll just look at the bit mask of each sample and check if the encoded RR group value matches. Since it will mask out all other bits for this operation, you can apply **multiple** filters at once, eg:

- play RR2 from the pizzicato keyswitch
- play legato sample C2->D2) from the sustain keyswitch

Basically this can be reduced to a number of logic statements connected with the `AND` operator:

```javascript
playSample = (RR == "RR2") && (Keyswitch == "pizzicato")
playSample = (Legato == "C2") && (Keyswitch == "sustain")
```

Note that all this bit mumbojumbo is used to make the sample selection blazingly fast: the sampler has to iterate all samples at every note to determine which samples to play so the performance is very critical to avoid CPU spikes at the note start: the beauty of using bitmasks is that all those logic statements boil down to a single bitwise AND instruction which is basically for free on modern CPUs.

### Ignore bit

This allows you to filter most group layouts and implement the playback functionality you want, but there are a few use cases where this simple logic connection hits a dead end. For these cases, you can make use of the **Ignore Bit**, which is an optional bit assigned to each layer that you can assign to a sample to tell it to ignore this particular filter:

![](/images/complex_group/ignore.svg)

So in our example, both the RR group layer and the Legato layer have a ignore bit.

> You can define for each layer that you create whether it should have an ignore bit. HISE uses sensible default values for each layer type (eg. legato and RR always have the ignore bit set by default).

This appends another logic check to each filter and lets through every sample that has the ignore bit set:

```javascript
playSample = (RR == "RR2" || RR = 0xFF) && (Keyswitch == "pizzicato")
playSample = (Legato == "C2" || Legato == 0xFF) && (Keyswitch == "sustain")
```

> The magic number `0xFF` is used as the ignore flag value, so if you are using the scripting API to implement custom filtering, you can use this too.

This is highly theoretical and abstract, so let's take a look at a few use cases and how the ignore bit can be applied to implement the desired voice start logic.

#### Sustain samples and legato samples in one sampler

Assuming we have a sampler that contains both the sustain samples as well as the legato interval samples. The legato samples should only be played when there is a legato transition (so one key is held while another key is pressed) but the sustain samples should be played at every note.

For our example, we're playing a D2 which should only play the sustain sample, followed by E2, where we need the legato interval D2-E2 to play as well as the sustain sample E2. If we transform this idea into a logic statement for each note, we'll get this pseudo-code condition:

```javascript
// note 1
playNote = isSustain;

// note 2 
playNote = isSustain || (Legato == 50); // 50 == "D2"
```

So at our first note, the condition will be false for the legato sample, hence only the sustain sample will be played. At the second note, the condition will be true for the sustain sample as well as the legato sample from D2, so it will play both samples. So far so good. 

Now we need to somehow turn the pseudocode `isSustain` condition into something that works within our system, and this is where the ignore flag comes in: **we assign the ignore flag of the legato layer to every sustain sample.**:

```javascript
isSustain = (Legato == 0xFF);

// => note 2
playNote = (Legato == 50) || (Legato == 0xFF);
```

If you compare this condition to the previous example, it looks exactly like the condition with the ignore flag, so we have our desired behaviour. All we need to do in our script is to set the legato filer to `0xFF` if we want to play only sustain samples and to whatever source note in order to play both:

```javascript
// note 1
gm.setFilter(Legato, 0xFF)

// => only the sustain sample
playNote = (Legato == 0xFF); // || (Legato == 0xFF), but this is redundant

// note 2 
gm.setFilter(Legato, 50); // "D2"

// both sustain and legato will play
playNote = (Legato == 0xFF) || (Legato == 50); 
```

By the way: if you have baked in the sustain part into your legato sample and want to avoid playing the sustain sample, all you need to do is to untick the ignore flag for the legato layer, assign another non-zero value (eg. `1`) to your sustain samples and it will only play the legato sample on a interval:

```javascript
// note 1
gm.setFilter(Legato, 1);

// => only the sustain sample
playNote = (Legato == 1); 

// note 2 
gm.setFilter(Legato, 50); // "D2"

// => only the legato sample,
// the sustain sample will be filtered out
playNote = (Legato == 50); 
```

#### Different RR groups per keyswitch

Another use case of the ignore flag is if you have multiple articulations in your samplemap with a different amount of RR layers. Let's say we have two articulations, "pizzicato" and "staccato", but the pizzicato samples only have 4 RR groups while the staccato samples come with 6 RR groups. Obviously we can implement a custom RR behaviour with a script which takes the currently active keyswitch into account:

```javascript
if(keyswitch == "pizz")
{
	calculateRR(4);
}
else if (keyswitch == "stacc")
{
	calculateRR(6);
}
```

but that requires some book keeping and quickly gets messy when you load different samplemaps with different values. With this system and the ignore group flag, it's possible to replicate this behaviour with a 100% no-code solution.

All we need to do is to create 2 RR layers that we'll use for the two keyswitches. Both layers should have the ignore flag set. The first RR layer has 4 groups (let's call it `RR_pizz"`), the second one (`"RR_stacc"`) has 6 groups. Now we'll make use of the ignore flag by:

1. setting the ignore flag of the `RR_pizz` group for every staccato sample.
2. setting the ignore flag of the `RR_stacc` group for every pizzicato sample.
3. setting the actual RR value of the `RR_pizz` group for every pizzicato sample.
4. setting the actual RR value of the `RR_stacc` group for every staccato sample.

> Tip: you can easily set the ignore flag for a given selection by opening the assign popup and choose the ignore flag option.

Done. The voice start logic will now calculate the correct RR group depending on which articulation is active.

## Cache groups (prefilter)

This new system allows to use much less sampler modules than before (good), but on the flipside it will increase the amounts of sounds loaded into a single sampler (bad). This puts additional pressure on the performance of the voice start logic, as it now has to iterate over more samples to figure out what to play.

### Example

Let's consider a use case with two different setups. We have 5.000 staccato samples and 6.000 pizzicato samples. Now consider these solutions: 

1. We'll use two sampler modules, put the staccato samples in the first one and the pizzicato samples in the second one. Then we simply bypass the one that isn't active (either by `Sampler.setBypassed(true)` or `Message.ignoreEvent(true)`, for the voice start performance this doesn't matter as it will both result in the sampler not searching for sounds on the incoming note).
2. We'll use a single sampler with a keyswitch layer, so we put all 11.000 samples into a single module. Now we can just set the filter for the keyswitch layer and it will automatically filter out the sounds that should not be played.

So far so good, both options will do the same thing. However, the second solution has a far worse performance at voice start and will likely cause more CPU spikes at the start of each note. The reason is that it has to look through all 11.000 samples to figure out what samples to play. On the other hand the first solution has at most 6.000 samples to scan because it can exclude the samples from the inactive group in the search at all.

So basically we have traded in the benefits of having one sampler module against the benefits of having them in separate lists that each need less iterations, which would be very disappointing and disqualifying the second solution from a performance perspective. 

### Solution

Luckily there's a solution built in this system that mitigates the problem and this is to just create separate lists for each keyswitch - basically it's doing the same trick as solution 1 by dividing the 11.000 samples into the sub groups. 

Since we know that only one key switch will be played at the time, we can savely assume that there will never be the case where a note will trigger a sample from the staccato and the pizzicato group. Therefore the system will create two lists containing the 5.000 staccato samples and the 6.000 pizzicato samples, and when a note comes in, it will look at the current keyswitch value and just pick the currently used list. Now we're back to the performance of solution 1 but with all the new shiny flexibility of solution 2.

In order to use this solution, you need to set the `cached` flag when creating a layer. For certain layer types this is activated by default (eg. key switches, but also release triggers). RR layers are not precached by default, but you can manually tick that flag if you have lots of samples.

> Note that before this system was introduced, you can apply this trick also with the default RR behaviour [`Sampler.setSortByRRGroup()`](/scripting/scripting-api/sampler#setsortbyrrgroup) which helped with lots of RR samples within a single sampler. This is now deprecated and is optimization benefits can simply be replicated by a single RR layer with the enabled `cached` flag.

You can also enable this flag for multiple groups, then it will analyse the existing samples and create one group for each combination that might play a sample. However there is a tradeoff to take as the amount of precached groups will increase the memory usage and some layers MUST not be cached (eg. the XFade layer should start multiple samples at once so caching it into sub groups would be counterproductive).

## Voice start logic

With the abstraction and the possiblity of having multiple layers, we can now also add more layers that contain some commonly used functions. In addition to crossfades 

- keyswitches






