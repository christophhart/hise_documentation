#Scripting API Cheat Sheet

## ChildSynth

```javascript
bool  exists()
```

Checks if the Object exists and prints a error message on the console if not. 

---

```javascript
 setAttribute(int parameterIndex, float newValue)
```

Changes one of the Parameter. Look in the manual for the index numbers of each effect. 

---

```javascript
 setBypassed(bool shouldBeBypassed)
```

Bypasses the effect. 

---

## Console

```javascript
 print(var debug)
```

Prints a message to the console. 

---

```javascript
 start(String title=String::empty)
```

Starts the benchmark. You can give it a name that will be displayed with the result if desired. 

---

```javascript
 stop()
```

Stops the benchmark and prints the result. 

---

## Content

```javascript
ScriptButton *  addButton(String buttonName, int x, int y)
```

Adds a toggle button to the Content and returns the component index.

---

```javascript
ScriptSlider *  addKnob(String knobName, int x, int y)
```

Adds a knob to the Content and returns the component index.

---

```javascript
ScriptTable *  addTable(String tableName, int x, int y)
```

Adds a table editor to the Content and returns the component index. 

---

```javascript
ScriptComboBox *  addComboBox(String boxName, int x, int y)
```

Adds a comboBox to the Content and returns the component index. 

---

```javascript
ScriptLabel *  addLabel(String label, int x, int y)
```

Adds a text input label. 

---

```javascript
ModulatorMeter *  addModulatorMeter(String modulatorName, int x, int y)
```

Adds a peak meter that displays the modulator's output. 

---

```javascript
ScriptedPlotter *  addPlotter(String plotterName, int x, int y)
```

Adds a plotter that plots multiple modulators. 

---

```javascript
ScriptImage *  addImage(String imageName, int x, int y)
```

Adds a image to the script interface. 

---

```javascript
ScriptPanel *  addPanel(String panelName, int x, int y)
```

Adds a panel (rectangle with border and gradient). 

---

```javascript
ScriptAudioWaveform *  addAudioWaveform(String audioWaveformName, int x, int y)
```

Adds a audio waveform display. 

---

```javascript
 setColour(int red, int green, int blue)
```

Sets the colour for the panel. 

---

```javascript
 setHeight(int newHeight)
```

Sets the height of the content. 

---

```javascript
 setWidth(int newWidth)
```

Sets the height of the content. 

---

```javascript
 setContentTooltip( String tooltipToShow)
```

sets the Tooltip that will be shown if the mouse hovers over the script's tab button. 

---

```javascript
 setName( String newName)
```

Sets the name that will be displayed in big fat Impact. 

---

## Effect

```javascript
bool  exists()
```

Checks if the Object exists and prints a error message on the console if not. 

---

```javascript
 setAttribute(int parameterIndex, float newValue)
```

Changes one of the Parameter. Look in the manual for the index numbers of each effect. 

---

```javascript
 setBypassed(bool shouldBeBypassed)
```

Bypasses the effect. 

---

## Engine

```javascript
double  getSampleRate()
```

Returns the current sample rate. 

---

```javascript
double  getSamplesForMilliSeconds(double milliSeconds)
```

Converts milli seconds to samples 

---

```javascript
double  getMilliSecondsForSamples(double samples)
```

Converts samples to milli seconds. 

---

```javascript
double  getGainFactorForDecibels(double decibels)
```

Converts decibel (-100.0 ... 0.0) to gain factor (0.0 ... 1.0). 

---

```javascript
double  getDecibelsForGainFactor(double gainFactor)
```

Converts gain factor (0.0 .. 1.0) to decibel (-100.0 ... 0). 

---

```javascript
double  getFrequencyForMidiNoteNumber(int midiNumber)
```

Converts midi note number 0 ... 127 to Frequency 20 ... 20.000. 

---

```javascript
String  getMidiNoteName(int midiNumber)
```

Converts midi note number to Midi note name ("C3" for middle C). 

---

```javascript
 allNotesOff()
```

Sends an allNotesOff message at the next buffer. 

---

```javascript
double  getUptime()
```

Returns the uptime of the engine in seconds. 

---

```javascript
 setKeyColour(int keyNumber, int colourAsHex)
```

Sets a key of the global keyboard to the specified colour (using the form 0x00FF00 for eg. of the key to the specified colour. 

---

```javascript
double  getMilliSecondsForTempo(int tempoIndex)
```

Returns the millisecond value for the supplied tempo (HINT: Use "TempoSync" mode from Slider!) 

---

```javascript
double  getHostBpm()
```

Returns the Bpm of the host. 

---

```javascript
String  getMacroName(int index)
```

Returns the name for the given macro index. 

---

## Message

```javascript
int  getNoteNumber()
```

Return the note number. This can be called only on midi event callbacks. 

---

```javascript
 delayEvent(int samplesToDelay)
```

Delays the event by the sampleAmount. 

---

```javascript
var  getControllerNumber()
```

returns the controller number or 'undefined', if the message is neither controller nor pitch wheel nor aftertouch.

---

```javascript
var  getControllerValue()
```

Returns the value of the controller. 

---

```javascript
int  getChannel()
```

Returns the MIDI Channel from 1 to 16. 

---

```javascript
 setChannel(int newChannel)
```

Changes the MIDI channel from 1 to 16. 

---

```javascript
 setNoteNumber(int newNoteNumber)
```

Changes the note number. 

---

```javascript
 setVelocity(int newVelocity)
```

Changes the velocity (range 1 - 127). 

---

```javascript
 setControllerNumber(int newControllerNumber)
```

Changes the ControllerNumber. 

---

```javascript
 setControllerValue(int newControllerValue)
```

Changes the controller value (range 0 - 127). 

---

```javascript
int  getVelocity()
```

Returns the Velocity. 

---

```javascript
 ignoreEvent(bool shouldBeIgnored=true)
```

Ignores the event. 

---

```javascript
int  getEventId()
```

Returns the event id of the current message. 

---

## MidiProcessor

```javascript
bool  exists()
```

Checks if the Object exists and prints a error message on the console if not. 

---

```javascript
 setAttribute(int index, float value)
```

Sets the attribute of the MidiProcessor. If it is a script, then the index of the component is used. 

---

```javascript
 setBypassed(bool shouldBeBypassed)
```

Bypasses the MidiProcessor. 

---

## Modulator

```javascript
bool  exists()
```

Checks if the Object exists and prints a error message on the console if not. 

---

```javascript
 setAttribute(int index, float value)
```

Sets the attribute of the Modulator. You can look up the specific parameter indexes in the manual. 

---

```javascript
 setBypassed(bool shouldBeBypassed)
```

Bypasses the Modulator. 

---

```javascript
 setIntensity(float newIntensity)
```

Changes the Intensity of the Modulator. Ranges: Gain Mode 0 ... 1, PitchMode -12 ... 12. 

---

## ModulatorMeter

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setValueNormalized(double normalizedValue)
```

Sets the current value from a range 0.0 ... 1.0. 

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## ScriptButton

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setValueNormalized(double normalizedValue)
```

Sets the current value from a range 0.0 ... 1.0. 

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## ScriptComboBox

```javascript
String  getItemText()
```

Returns the currently selected item text. 

---

```javascript
 addItem( String newName)
```

Adds an item to a combo box. 

---

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setValueNormalized(double normalizedValue)
```

Sets the current value from a range 0.0 ... 1.0. 

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## ScriptedPlotter

```javascript
 addModulatorToPlotter(String processorName, String modulatorName)
```

Searches a processor and adds the modulator to the plotter. 

---

```javascript
 clearModulatorPlotter()
```

Removes all modulators from the plotter. 

---

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setValueNormalized(double normalizedValue)
```

Sets the current value from a range 0.0 ... 1.0. 

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## ScriptImage

```javascript
 setAlpha(float newAlphaValue)
```

Sets the transparency (0.0 = full transparency, 1.0 = full opacity). 

---

```javascript
 setImageFile( String absoluteFileName, bool forceUseRealFile)
```

Sets the image file that will be displayed. If forceUseRealFile is true, then it will reload the file from disk instead of caching it (Disable this for finished interfaces!) 

---

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setValueNormalized(double normalizedValue)
```

Sets the current value from a range 0.0 ... 1.0. 

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## ScriptLabel

```javascript
 setEditable(bool shouldBeEditable)
```

makes a label `editable`. > This is a test. 

---

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setValueNormalized(double normalizedValue)
```

Sets the current value from a range 0.0 ... 1.0. 

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## ScriptSlider

```javascript
 setValueNormalized(double normalizedValue) override
```

Set the value from a 0.0 to 1.0 range 

---

```javascript
 setRange(double min, double max, double stepSize)
```

Sets the range and the step size of the knob. 

---

```javascript
 setMode(String mode)
```

Sets the knob to the specified mode. 

---

```javascript
 setMidPoint(double valueForMidPoint)
```

Sets the value that is shown in the middle position. 

---

```javascript
 setStyle(String style)
```

Sets the style Knob, Horizontal, Vertical. 

---

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## ScriptTable

```javascript
float  getTableValue(int inputValue)
```

Returns the table value from 0.0 to 1.0 according to the input value from 0 to 127. 

---

```javascript
 connectToOtherTable( String id, int index)
```

Connects the table to an existing Processor. 

---

```javascript
var  get(String propertyName)
```

returns the value of the property. 

---

```javascript
 set(String propertyName, var value)
```

Sets the property. 

---

```javascript
var  getValue()
```

Returns the current value. 

---

```javascript
 setValue(var newValue)
```

Sets the current value

---

```javascript
 setValueNormalized(double normalizedValue)
```

Sets the current value from a range 0.0 ... 1.0. 

---

```javascript
 setColour(int colourId, int colourAs32bitHex)
```

sets the colour of the component (BG, IT1, IT2, TXT). 

---

```javascript
 setPropertiesFromJSON( var jsonData)
```

Restores all properties from a JSON object. 

---

```javascript
 setPosition(int x, int y, int w, int h)
```

Sets the position of the component. 

---

```javascript
 showControl(bool shouldBeVisible)
```

Hides / Shows the control. 

---

```javascript
 setTooltip( String tooltip)
```

Shows a informative text on mouse hover. 

---

```javascript
 addToMacroControl(int macroIndex)
```

Adds the knob / button to a macro controller (from 0 to 7). 

---

## Synth

```javascript
 addToFront(bool addToFront)
```

Adds the interface to the Container's body (or the frontend interface if compiled) 

---

```javascript
 deferCallbacks(bool makeAsynchronous)
```

Defers all callbacks to the message thread (midi callbacks become read-only). 

---

```javascript
 allowChildSynth(int synthIndex, bool shouldBeAllowed)
```

Changes the allowed state of one of the child synths. Works only with SynthGroups. 

---

```javascript
 noteOff(int noteNumber)
```

Sends a note off message. The envelopes will tail off. 

---

```javascript
 playNote(int noteNumber, int velocity)
```

Plays a note. Be careful or you get stuck notes! 

---

```javascript
 startTimer(double milliseconds)
```

Starts the timer of the synth. 

---

```javascript
 setAttribute(int attributeIndex, float newAttribute)
```

Sets an attribute of the parent synth. 

---

```javascript
float  getAttribute(int attributeIndex)
```

Returns the attribute of the parent synth. 

---

```javascript
 stopTimer()
```

Stops the timer of the synth. You can call this also in the timer callback. 

---

```javascript
 setMacroControl(int macroIndex, float newValue)
```

Sets one of the eight macro controllers to the newValue.

---

```javascript
 sendController(int controllerNumber, int controllerValue)
```

Sends a controller event to the synth.

---

```javascript
 sendControllerToChildSynths(int controllerNumber, int controllerValue)
```

Sends a controller event to all Child synths. Works only if the script sits in a ModulatorSynthChain. 

---

```javascript
int  getNumChildSynths()
```

Returns the number of child synths. Works with SynthGroups and SynthChains. 

---

```javascript
 setModulatorAttribute(int chainId, int modulatorIndex, int attributeIndex, float newValue)
```

Sets a ModulatorAttribute.

---

```javascript
 enableRoundRobin(bool shouldUseRoundRobin)
```

Enables / Disables the automatic round robin group start logic (works only on samplers). 

---

```javascript
 setActiveGroup(int activeGroupIndex)
```

Enables the group with the given index (one-based). Works only with samplers and `disableRoundRobin(false)`. 

---

```javascript
int  getNumPressedKeys()
```

Returns the number of pressed keys (!= the number of playing voices!). 

---

```javascript
bool  isLegatoInterval()
```

Checks if any key is pressed. 

---

```javascript
int  addModulator(int chainId,  String type,  String id)
```

Adds a Modulator to the synth's chain. If it already exists, it returns the index. 

---

```javascript
ScriptModulator *  getModulator( String name)
```

Returns the Modulator with the supplied name. Can be only called in onInit. It looks also in all child processors. 

---

```javascript
ScriptEffect *  getEffect( String name)
```

Returns the Effect with the supplied name. Can only be called in onInit(). It looks also in all child processors. 

---

```javascript
ScriptMidiProcessor *  getMidiProcessor( String name)
```

Returns the MidiProcessor with the supplied name. Can not be the own name! 

---

```javascript
ScriptSynth *  getChildSynth( String name)
```

Returns the child synth with the supplied name. 

---

```javascript
ScriptAudioSampleProcessor *  getScriptingAudioSampleProcessor( String name)
```

Returns the child synth with the supplied name. 

---

```javascript
int  getModulatorIndex(int chainId,  String id)
```

Returns the index of the Modulator in the chain with the supplied chainId 

---

```javascript
bool  isSustainPedalDown()
```

Returns true if the sustain pedal is pressed. 

---

