# Build the patch

Now that we've successfully mapped the samples, we can start adding modulators and effects to shape the instrument sound - and finally bring some colour to the patch. By doing this we can look into the most important areas of HISE (after the Sampler, of course): *Modulators*, *Scripting*, *Synthesis* & *Effects*.

This tutorial is a practical guide. For detailed information you can look up the chapter in the manual, I added links for further reading where available.

## 1. Modulators

Modulators create a signal from `0 ... 1` which can be used to dynamically change the parameters of a HISE patch (the range will be converted depending on the modulation target). They are a key feature to add dynamic behaviour to a sampled instrument so let's start with that.

> If you want to know more about the three main modulation types, check out this chapter of the manual. 

### Gain Modulation

Let's add a **Velocity Modulator** to control the volume of our sampler module. The **Modulator Chains** can be hidden and shown using the button bar below the header of each module. Click on the `Gain` button below the Sampler module's header and choose **Voice Start Modulator -> Velocity Modulator**.

![VelocityMod.gif](http://hise.audio/manual/images/VelocityMod.gif)

The gain of each voice is now controlled by the velocity of the incoming note on message. You can define a function that changes the behaviour by clicking on **Use Table** to adjust the curve:

1. Click anywhere to add a new point
2. Drag points around
3. Right click on a point to delete it
4. Ctrl + Mousewheel over a point to change the curve on its left side.

The x-axis will be the input (normalized from the MIDI velocity values 0 - 127) and the y-axis is the resulting modulation value from 0 to 1, which in the case of gain modulation is simply used as gain factor (unless you activate *Decibel Mode*). The default behaviour is linear (= a value of 0.5 is only a 6dB attenuation), so we might want to adjust the curve to make it more "musical". Hover over the right point and `Ctrl + Mousewheel down` until you have a exponential type curve:

![TableCurve.gif](http://hise.audio/manual/images/TableCurve.gif)

When you play a note you'll see a horizontal ruler indicating the last x position. You can see the modulation value of each modulator (as well as the combined result) at the horizontal bar in the headers of the modulators (and the parent modulator chain). Next to the bar is the intensity slider of every modulator which can be used to change its impact on the resulting modulation value (a intensity of 0.0 means no influence and 1.0 is a plain multiplication.

Before we continue, let's rename this modulator. Each module in a HISE patch should have a unique name (that's how they can be accessed via scripting), so let's keep things tidy. Click on the **Velocity Modulator** label on the header, and give it a new name (either "Sampler Gain Velocity" or "Joffrey")

### Sample Start Modulation

In the real world different dynamic ranges have a lot more differences than just volume. A neat trick for mallet type sounds is to alter the start of the sample for softer notes by truncating the sample attack phase.

This can be achieved by modulating the sample start depending on the velocity. However this behaviour will increase the memory usage, because the whole area that is modulated needs to be prebuffered, so its deactivated by default. But to achieve our softened attack we will now activate it, shift the Sample Start, and afterwards modulate the attack with another Velocity Table. Open the sampler (and its sample editor panel), select all sounds, and set the `SampleStartMod` value to 800:

![SampleStartMod.gif](http://hise.audio/manual/images/SampleStartMod.gif)

The sample start is set to the end of the modulated area, so if you press a key, you should hear that the attack phase of the sample is skipped. This is because the default modulation value of 1.0 is used until a modulator is added to the sample start chain. So let's add another velocity modulator there. Instead of creating a new one (as seen above) we can also just copy & paste our previous Velocity Modulator.

> Everything in HISE that is copy & pasteable (tables, scripts, modules) has a white outline when selected so make sure the velocity modulator has the focus (by clicking somewhere on it). 

Press 'Cmd + C' ('Ctrl+C' on Windows). The module is now pasted to the clipboard. Every modulator is saved as a simple XML string (we'll get back to this later on), so if you're curious, paste it into a text editor and see what goes on behind the scenes.activate the Sample Start button in the SAMPLER Ribbon, and select the (now visible) new (green) chain slot at the end of our Sampler chain (this is our paste target). Press 'Cmd+V' ('Ctrl+V') and it should paste the other modulator in the new chain. It's now called **"Joffrey 2"**, so let's give him a better name.

> You'll notice the different colours of the modulators. Their layout is always the same, it will have different colours depending on their modulation target so you can quickly get a idea of what they are doing.

The new modulator should now alter the start position of the sample so that a modulation value of 1 means a start offset of 800 (you can define different offset ranges for each sample, but in our case all samples are set to 800). However, we want a inverted behaviour (soft notes should skip the attack phase). Therefore we need to invert the modulator (by activating the "Inverted" button). It still sounds a bit artificial (we'll do something about that later) but it should work as expected now.

### Pitch Modulation

Let's take a look at another modulation target type as it has some note-worthy differences.
Open the **Pitch Chain** and insert a **Voice Start Modulator -> Constant Modulator**. Change the intensity to `-12 st`. Now everything will be played back an octave lower (which makes it sound more like a Celesta).

Notice how the intensity for pitch modulators changes from `0..1` to `-12 ... 12` (by clicking on it, you can enter a exact pitch intensity). There is also another button (between the modulation bar and the intensity slider) which toggles bipolar mode:

    | Bipolar Mode | Unipolar Mode
--- | ------------ | -------------
**Icon** | ![Bipolar.png](http://hise.audio/manual/images/Bipolar.png) | ![Unipolar.png](http://hise.audio/manual/images/Unipolar.png)
**Input** | `0...1` | `0...1`
**Zero input value** | `0.5`| `0.0`
**Output** |`-intensity ... +intensity`| `0 ... +intensity`
**Use for** | Vibrato, Pitchbend, ... | Envelopes


For this example it makes no difference; a constant modulator always returns `1.0`, but there are some use cases which require a certain mode.

This concludes our introduction to **Modulators**. A tutorial for **HISE** would not be complete without a introduction into scripting so let's continue with a script that processes the incoming MIDI messages.

## 2. Scripting

There is a huge amount of possibilites with scripting in **HISE** (you can even create you own audio effects and modulators with it), but MIDI event processing is where scripting really shines because it allows a maximal amount of flexibility with reasonable performance impact compared to native code.  

We want to control the maximum velocity amount with the mod wheel so when the mod wheel is at mid position, hitting the keys hard gives us velocities < 64.  
Also we want to control the amount of this attenuation by a interface knob (so when the knob is all the way left, the behaviour is unchanged and like described when the knob is all the way to the right).

This feature is pretty random, but it allows us to peak into the most important parts of script development such as *Callbacks*, *API calls* & *Cross script communication*.

> Every sound generator (including the **Master Container**) has a slot for script processors. This is a major difference compared to other sampler platforms, which only have a global slot for scripts and allows a greater encapsulation and enforces a 'one script per task' design.

Nevertheless, we'll want to scale the velocity for all sound generators in the patch, so we need to add a **Script Processor** in the **MIDI** slot of the **Container**. 

Let's take a closer look at this module:

![ScriptProcessorOverview.png](http://hise.audio/manual/images/ScriptProcessorOverview.png)

Area | Info
---- | ----
Header | The usual header but with a `DBG` button that enables some neat debugging features.
Callback Area | A script processor consists of multiple callbacks which are executed at certain events. You can edit a callback by clicking it here and change the callback code in the editor below (the function definition is already typed for you there). It has the same UX as the chain button bar (so if a callback is active, it will be highlighted).
Interface | This empty area can be resized and populated with controls.
Code Editor | The most important component in this module. Press Escape for a Autocomplete Popup with every variable and API call.
Status Bar | Home of the compile button. It will also print out compile results (Runtime errors will be most likely printed to the console).

### Initialise all variables

Below the header of the script processor there is the callback bar that can be used to switch between different callbacks. Select the `onInit` callback (which should be the default already) and add these lines:

```javascript
// This adds a knob to the script interface
const var amount = Content.addKnob("amount");

// This will store the current normalized mod value.
reg modWheelGain = 1.0;

// This will store the current velocity
reg currentVelocity = 127.0;
```

If you do know Javascript a little you might be puzzled about the keyword `reg`. This is a custom variable storage type (inspired by the old school `register` keyword from C / C++) that allows faster (and thread safe) access than the standard `var` keyword. The `var` type is left unchanged for standard Javascript compatibility. For working variables I would always recommend using this variable type.
 The `const` keyword does not mean that you can't change the knob, but that the variable will not be assigned to anything else (this vastly increases performance of calling API methods). It is good practice to declare all interface widgets or connected modules as `const`.

Click on the **Compile** button (or press **F5**) and it will compile the script. You should know see a knob named *amount* and a comforting "Compiled OK" message in the status bar.

### Adding the callback code

Now we need to add code in the callbacks that implement the functionality. Open the `onController` callback editor and add these lines into the given function:

```javascript
	if(Message.getControllerNumber() == 1)
	{
		modWheelGain = Message.getControllerValue() / 127.0;
	}
```

This code checks if the incoming CC message is a modwheel message (Nr. 1) and then stores the value in the previously defined variable `modWheelGain`.

> If you press **Escape** while typing, you'll get a nice autocomplete popup with all API methods and defined variables. There is also a complete list of every Javascript API function on the left panel (right click on a function for a popup with more information).

Now we need to change the velocity using the `modWheelGain` variable and the value of the `amount` knob.

This formula will be used:

```
output = (amount * input * modwheelGain) + ((1.0 - amount) * input)
```

These lines have to be added to the `onNoteOn` callback. We'll be using the working variable `currentVelocity` for it:

```javascript
function onNoteOn()
{
	currentVelocity = amount.getValue() * Message.getVelocity() * modWheelGain + 
    				  (1.0 - amount.getValue()) * Message.getVelocity();
    
    Message.setVelocity(currentVelocity);
}
```

> If you click on the `DBG` button of the script processor, it will open a live watch table which displays all current variables including their current value. If a value changes, it will be marked red for a short time. This is a neat way to check the correct script functionality (the `currentVelocity` variable should be a value between 0 and 127);

Press Compile (or F5) and check if the script works as expected: move the modwheel and increase the amount value and see if the velocity is modified accordingly.

That's it. You created your first script. The next steps would be learning Javascript (the basics are extremely easy and the complex stuff is not really needed in **HISE**) and get to know the **HISE Javascript API**. 

As a last step in the instrument design process we'll be adding some synthesisers to enrich the sound (**HISE** was designed to make hybrid sample libraries as easy as possible).

## 3. Synthesis

The sample set we are using here is rather simple. If we had unlimited resources and time, we probably would have recorded multiple velocity layers, different round robin variations (maybe more mic positions) and a release sample set.  
However, creating sample libraries is always a tradeoff of recording effort (and sample amount) vs. a expressively playable instrument and **HISE** has some features that help us to add expressiveness without additional samples. This chapter is not necessary for getting a basic overview of HISE, but I added it anyhow because I think there are many interesting use cases which people that are coming from a sampler-only platform might not know about.

We'll be adding two sound generators with the following purposes :

1. Simulate the muted ring-off sound by adding a decaying sine wave generator that is triggered on release
2. A short filtered noise click that simulates the sound of the mallets hitting the bars (and masks the truncated sample start).

> You can add as many different sound generators as your CPU can handle. They are completely independant from each other, so I'd recommend using multiple samplers for different sample types.

#### The muted ring-off sound

If you dampen the bars of the real instrument with the mallet, it will decay faster with a muted sound (the harmonics decay much faster than the root note). We can simulate something like this with a single decaying sine wave that is played when the keys are released.  
So We'll leave the sampler alone (you might want to fold it by clicking on the triangle icon) and add a sine generator into the master container (the same way you added the sampler). Be careful, the sine wave generator is pretty loud compared to the samples!

We could implement the release trigger behaviour by another script processor, but there is a ready made module just for this purpose. Open the **MIDI** chain of the **Sine Wave Generator** and choose **Hardcoded Scripts -> Release Trigger**.  
Don't bother about the parameters (for now). It should be already doing what we want. However if you now press a key now, you will get a infinitely ringing sine wave because there is nothing that stops the note triggered by the note off message. **Booh!** There are two ways of solving this. This is a common problem when developing scripts, so better get acquainted with the solutions:

1. Press the power button of the stuck sound generator twice. When a sound generator is unbypassed, it will kill all voices.
2. Press the MIDI panic button (the little `!` symbol) at the status bar on top of the window. This is a little bit more graceful, because it won't cause clicks.

But let's add a envelope to get rid of this problem - pressing the panic button after each note can't be the solution...  
Open the **Gain** chain, delete the **Default Envelope** by pressing the `X` symbol on its header (it is not useful for our purpose because it just adds a fade at the start / stop of the note) and choose **Envelopes -> AHDSR Envelope**. Set the sustain value to `-100 dB` and increase the decay value until you have the sound that you need (I'd recommend something between 500ms and 2s). Also increase the attack time a little bit (to 100ms) to smooth the transition.

> If you take a look at the voice counter (next to the panic button), you'll see that whenever a envelope reaches silence, the voice will be killed (otherwise you would stack up silent notes and increase CPU usage). However this only works when they are added to the **Gain** chain.

Now there is one problem: if you hold notes for a longer time, the release sample still has the same volume and produces a noticable volume bump. Fortunately, we can set up the **Release Trigger** Module to attenuate the velocity of the sound depending on the length of the note. Enable the **TimeAttenuation** knob, set the time value to something like `6`(seconds) and change the table to a decaying function:

![releaseTrigger.png](http://hise.audio/manual/images/releaseTrigger.png)

While it has now a decreased velocity for longer notes, it still won't attenuate nothing, because we haven't added a velocity modulator to the **Sine Wave Generator** yet. If you got so far in this tutorial, you should be familiar with the procedure...

> If you think: "Wow that's redundant, why can't I add one velocity mod to the container instead of every sound generator" please be aware that containers are not polyphonically rendered and don't process MIDI messages individually (That's why MIDI based modulators are greyed out if you try to add them). There is a solution that allows coallescating modulators (it's called the *Global Modulator System*). Check out this blog entry for a detailed description.

You can fine tune all parameters (release decay time, release volume, fade time, etc) to create perfectly balanced transitions. You'll notice when you change one parameter, the other ones need readjustment, so don't get yourself lost in there (knowing how to balance this and knowing when to stop are the most difficult parts of instrument design).


#### The Attack Phase

When the mallet hits the bar it produces a non harmonic click noise which can be pretty noticable depending on the microphone positioning. From a musical perspective, enforcing this sound makes it more suitable for percussive playing styles.

We'll be recreating this effect by adding a filtered noise generator with a fast decay time. We'll be randomly modulating the filter frequency to remove the machine gun effect.

Let's skip the part where you need to add every module and set it's parameter. Instead copy this XML into your clipboard:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<Processor Type="Noise" ID="Mallet Click" Bypassed="0" Gain="0.6839116215705871582"
           Balance="0" VoiceLimit="128" KillFadeTime="20" IconColour="0">
  <EditorStates BodyShown="1" Visible="1" Solo="0" GainModulationShown="1" Folded="0"/>
  <ChildProcessors>
    <Processor Type="MidiProcessorChain" ID="Midi Processor" Bypassed="0">
      <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
      <ChildProcessors/>
    </Processor>
    <Processor Type="ModulatorChain" ID="GainModulation" Bypassed="0" Intensity="1">
      <EditorStates BodyShown="1" Visible="1" Solo="0" Folded="0"/>
      <ChildProcessors>
        <Processor Type="AHDSR" ID="AHDSR Envelope2" Bypassed="0" Intensity="1"
                   AttackCurve="0" DecayCurve="0" Attack="0" AttackLevel="0" Hold="10"
                   Decay="235" Sustain="-100" Release="20">
          <EditorStates BodyShown="1" Visible="1" Solo="0"/>
          <ChildProcessors>
            <Processor Type="ModulatorChain" ID="Attack Time" Bypassed="0" Intensity="1">
              <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
              <ChildProcessors/>
            </Processor>
            <Processor Type="ModulatorChain" ID="Attack Level" Bypassed="0" Intensity="1">
              <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
              <ChildProcessors/>
            </Processor>
            <Processor Type="ModulatorChain" ID="Decay Time" Bypassed="0" Intensity="1">
              <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
              <ChildProcessors/>
            </Processor>
            <Processor Type="ModulatorChain" ID="Sustain Level" Bypassed="0" Intensity="1">
              <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
              <ChildProcessors/>
            </Processor>
            <Processor Type="ModulatorChain" ID="Release Time" Bypassed="0" Intensity="1">
              <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
              <ChildProcessors/>
            </Processor>
          </ChildProcessors>
        </Processor>
        <Processor Type="Velocity" ID="Velocity Modulator4" Bypassed="0" Intensity="1"
                   UseTable="1" Inverted="0" DecibelMode="0" VelocityTableData="24...............vO...f+....9SxLyeO">
          <EditorStates BodyShown="1" Visible="1" Solo="0"/>
          <ChildProcessors/>
        </Processor>
      </ChildProcessors>
    </Processor>
    <Processor Type="ModulatorChain" ID="PitchModulation" Bypassed="0" Intensity="0">
      <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
      <ChildProcessors/>
    </Processor>
    <Processor Type="EffectChain" ID="FX" Bypassed="0">
      <EditorStates BodyShown="1" Visible="1" Solo="0" Folded="0"/>
      <ChildProcessors>
        <Processor Type="PolyphonicFilter" ID="Polyphonic Filter" Bypassed="0" Gain="1.1378916501998901367"
                   Frequency="432" Q="5.5999999046325683594" Mode="6" Quality="0">
          <EditorStates BodyShown="1" Visible="1" Solo="0"/>
          <ChildProcessors>
            <Processor Type="ModulatorChain" ID="Frequency Modulation" Bypassed="0"
                       Intensity="1">
              <EditorStates BodyShown="1" Visible="1" Solo="0" Folded="0"/>
              <ChildProcessors>
                <Processor Type="Random" ID="Random Modulator" Bypassed="0" Intensity="0.21999999880790710449"
                           UseTable="0">
                  <EditorStates BodyShown="1" Visible="1" Solo="0"/>
                  <ChildProcessors/>
                </Processor>
                <Processor Type="Velocity" ID="Velocity Modulator3" Bypassed="0" Intensity="0.30000001192092895508"
                           UseTable="0" Inverted="0" DecibelMode="0">
                  <EditorStates BodyShown="1" Visible="1" Solo="0"/>
                  <ChildProcessors/>
                </Processor>
              </ChildProcessors>
            </Processor>
            <Processor Type="ModulatorChain" ID="Gain Modulation" Bypassed="0" Intensity="1">
              <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
              <ChildProcessors/>
            </Processor>
          </ChildProcessors>
        </Processor>
        <Processor Type="PhaseFX" ID="Phase FX" Bypassed="0" Speed="4625" Range="1600"
                   Feedback="0.69999998807907104492" Mix="1">
          <EditorStates BodyShown="1" Visible="1" Solo="0"/>
          <ChildProcessors>
            <Processor Type="ModulatorChain" ID="Phase Modulation" Bypassed="0" Intensity="1">
              <EditorStates BodyShown="1" Visible="0" Solo="0" Folded="1"/>
              <ChildProcessors/>
            </Processor>
          </ChildProcessors>
          <RoutingMatrix NumSourceChannels="2" Channel0="0" Send0="-1" Channel1="1" Send1="-1"/>
        </Processor>
      </ChildProcessors>
    </Processor>
  </ChildProcessors>
  <RoutingMatrix NumSourceChannels="2" Channel0="0" Send0="-1" Channel1="1" Send1="-1"/>
</Processor>

```

Add the finished module to the master chain - press the `+` symbol and choose **Add Mallet Click from Clipboard**. You are of course free to play around with the sound and change the parameters.

> At some point in the future you might find out that some tasks are quicker done by exporting the patch as XML using a text editor to do batch changes and reimport the modified XML (eg. fixing sample location references or batch module renaming). Also, there is a dedicated function for pasting whole patches as encrypted string which is better pasteable into web sites (**File -> Export as web snippet** and **File -> Replace with clipboard content**). 

## 4. Effects

As last step in the instrument design, we'll add some effects to the patch. There is a simple reverb algorithm effect that we will use. However it has no **Predelay** parameter, so we need to get creative. The multichannel system of HISE can be used to build Send FX routings. By creating a send FX channel for the reverb and adding a **SimpleGain** effect (which has a delay parameter), we can simulate the **Predelay** parameter.

First we need to change the channel amount of the patch to 4 (the default is 2 but we need 2 channels for the send FX). Press on the **Routing Button** of the Master Chain (the icon between level meter and volume slider) and choose 4 channels (via right click menu). Don't forget to connect all channels to the stereo output (there's also a shortcut *All Channels to Stereo* for this in the context menu).

Now add these three effects in this order to the Master Chain's FX slot:

1. **Routing Matrix** - copies the channels 1/2 to 3/4
2. **SimpleGain** - controls the gain and the delay of the channels 3/4
3. **SimpleReverb** - applies the reverb effect on 3/4

Shift click on the first two routing source nodes and connect them to the last two destination nodes (it should have a blue cable). Then set the processed channel's of the other two effects to the second pair. Since this is rather complicated, here is everything in time-lapse:

![ReverbRouting.gif](http://hise.audio/manual/images/ReverbRouting.gif)

Set the wet amount of the reverb to 100% (we'll be controlling the reverb level with the gain parameter from the SimpleGain effect. You can leave the other parameters alone (the rest will get implemented when we build the interface in the next chapter).

In the next chapter we'll build the interface for the instrument. But before we do this, let's rename all modules we'll be addressing from the interface to make it more clear:

1. Rename the Simple Gain module to "ReverbSendGain"
2. Rename the Sampler module to "Musicbox Samples"
3. Rename the Sine Wave Generator to "Ring Off Sound"

As last step, let's save the patch. Basically there are two file types: .hip files which are a binary format or XML files. If you want to use a version control system, I'd highly recommend using the latter one, but for now we are good with the .hip type. Rename the Master Chain to "MusicBox" and choose **File->Save**. It will store a .hip file in the `Presets` subfolder of the project.
