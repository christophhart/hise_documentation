### API Class: Array

```javascript
/* Clears the array. */
Array.clear();

/* Creates a deep copy of the array. */
Array.clone();

/* Concatenates (joins) two or more arrays */
Array.concat(var argumentList);

/* Searches for the element in the array. */
Array.contains(var elementToLookFor);

/* Checks if all array elements pass a function test. */
Array.every(var testFunction, var optionalThisObject);

/* Creates a new array filled with elements that pass the function test. */
Array.filter(var testFunction, var optionalThisObject);

/* Returns the value of the first element that passes the function test. */
Array.find(var testFunction, var optionalThisObject);

/* Returns the index of the first element that passes the function test. */
Array.findIndex(var testFunction, var optionalThisObject);

/* Calls a function for each element. */
Array.forEach(var testFunction, var optionalThisObject);

/* Searches the array and returns the first index. */
Array.indexOf(var elementToLookFor, int startOffset, int typeStrictness);

/* Inserts the given arguments at the firstIndex. */
Array.insert(int firstIndex, var argumentList);

/* Checks if the given variable is an array. */
Array.isArray(var variableToTest);

/* Joins the array into a string with the given separator. */
Array.join(var separatorString);

/* Creates a new array from calling a function for every array element. */
Array.map(var testFunction, var optionalThisObject);

/* Removes and returns the last element. */
Array.pop();

/* Adds the given element at the end and returns the size. */
Array.push(var elementToInsert);

/* Adds the given element at the end and returns the size. */
Array.pushIfNotAlreadyThere(var elementToInsert);

/* Removes all instances of the given element. */
Array.remove(var elementToRemove);

/* Removes the element at the given position. */
Array.removeElement(int index);

/* Reserves the space needed for the given amount of elements. */
Array.reserve(int numElements);

/* Reverses the order of the elements in the array. */
Array.reverse();

/* Removes and returns the first element. */
Array.shift();

/* Checks if any array elements pass a function test. */
Array.some(var testFunction, var optionalThisObject);

/* Sorts the array. */
Array.sort();

/* Sorts array of numbers, objects, or strings with "number in string" priority. Can also sort a combination of all types */
Array.sortNatural();


```
### API Class: AudioFile

```javascript
/* Returns the current audio data as array of channels. */
AudioFile.getContent();

/* Returns the current sample position (from 0 to numSamples). */
AudioFile.getCurrentlyDisplayedIndex();

/* Returns the reference string for the currently loaded file. */
AudioFile.getCurrentlyLoadedFile();

/* returns the amount of samples. */
AudioFile.getNumSamples();

/* Returns the samplerate of the audio file. */
AudioFile.getSampleRate();

/* Links this audio file to the other */
AudioFile.linkTo(var other);

/* Loads an audio file from the given reference. */
AudioFile.loadFile( String filePath);

/* Sets a callback that is being executed when a new file is loaded (or the sample range changed). */
AudioFile.setContentCallback(var contentFunction);

/* Sets a callback that is being executed when the playback position changes. */
AudioFile.setDisplayCallback(var displayFunction);

/* Sets a new sample range. */
AudioFile.setRange(int min, int max);

/* Sends an update message to all registered listeners. */
AudioFile.update();


```
### API Class: AudioSampleProcessor

```javascript
/* Checks if the Object exists and prints a error message on the console if not. */
AudioSampleProcessor.exists();

/* Returns the attribute with the given index. */
AudioSampleProcessor.getAttribute(int index);

/* Returns the attribute with the given index. */
AudioSampleProcessor.getAttributeId(int index);

/* Returns the index of the attribute with the given ID. */
AudioSampleProcessor.getAttributeIndex(String id);

/* Creates a ScriptAudioFile reference to the given index. */
AudioSampleProcessor.getAudioFile(int slotIndex);

/* Returns the filename (including wildcard) for the currently loaded file. */
AudioSampleProcessor.getFilename();

/* Returns the number of attributes. */
AudioSampleProcessor.getNumAttributes();

/* Returns the length of the current sample selection in samples. */
AudioSampleProcessor.getSampleLength();

/* Returns the samplerange in the form [start, end]. */
AudioSampleProcessor.getSampleStart();

/* Checks if the audio sample player is bypassed. */
AudioSampleProcessor.isBypassed();

/* Changes one of the Parameter. Look in the manual for the index numbers of each effect. */
AudioSampleProcessor.setAttribute(int parameterIndex, float newValue);

/* Bypasses the audio sample player. */
AudioSampleProcessor.setBypassed(bool shouldBeBypassed);

/* loads the file. You can use the wildcard {PROJECT_FOLDER} to get the audio file folder for the current project. */
AudioSampleProcessor.setFile(String fileName);

/* Sets the length of the current sample selection in samples. */
AudioSampleProcessor.setSampleRange(int startSample, int endSample);


```
### API Class: BackgroundTask

```javascript
/* Call a function on the background thread. */
BackgroundTask.callOnBackgroundThread(var backgroundTaskFunction);

/* Get the progress for this task. */
BackgroundTask.getProgress();

/* Retrieve a property through a thread safe container. */
BackgroundTask.getProperty(String id);

/* Returns the current status message. */
BackgroundTask.getStatusMessage();

/* Kills all voices and calls the given function on the sample loading thread. */
BackgroundTask.killVoicesAndCall(var loadingFunction);

/* Spawns a OS process and executes it with the given command line arguments. */
BackgroundTask.runProcess(var command, var args, var logFunction);

/* Signal that this thread should exit. */
BackgroundTask.sendAbortSignal(bool blockUntilStopped);

/* Set a function that will be called when the task has started / stopped. */
BackgroundTask.setFinishCallback(var newFinishCallback);

/* Forward the state of this thread to the sample loading thread notification system. */
BackgroundTask.setForwardStatusToLoadingThread(bool shouldForward);

/* Set a progress for this task. */
BackgroundTask.setProgress(double p);

/* Set a property to a thread safe container. */
BackgroundTask.setProperty(String id, var value);

/* Sets a status message. */
BackgroundTask.setStatusMessage(String m);

/* Set timeout. */
BackgroundTask.setTimeOut(int ms);

/* Checks whether the task should be aborted (either because of recompilation or when you called abort(). */
BackgroundTask.shouldAbort();


```
### API Class: BeatportManager

```javascript
/* Checks if the beatport access is valid. */
BeatportManager.isBeatportAccess();

/* Sets the product ID dynamically. */
BeatportManager.setProductId( String productId);

/* Requests DRM validation and returns a JSON object with the validation result. */
BeatportManager.validate();


```
### API Class: Broadcaster

```javascript
/* Adds a listener that sets the properties of the given components when the broadcaster receives a message. */
Broadcaster.addComponentPropertyListener(var object, var propertyList, var metadata, var optionalFunction);

/* Adds a listener that will cause a refresh message (eg. repaint(), changed()) to be send out to the given components. */
Broadcaster.addComponentRefreshListener(var componentIds, String refreshType, var metadata);

/* Adds a listener that sets the value of the given components when the broadcaster receives a message. */
Broadcaster.addComponentValueListener(var object, var metadata, var optionalFunction);

/* Adds a listener that will be executed with a delay. */
Broadcaster.addDelayedListener(int delayInMilliSeconds, var obj, var metadata, var function);

/* Adds a listener that is notified when a message is send. The object can be either a JSON object, a script object or a simple string. */
Broadcaster.addListener(var object, var metadata, var function);

/* Adds a listener that will sync module parameters from the attached module parameter source. */
Broadcaster.addModuleParameterSyncer(String moduleId, var parameterIndex, var metadata);

/* Registers this broadcaster to be notified when a complex data object changes. */
Broadcaster.attachToComplexData(String dataTypeAndEvent, var moduleIds, var dataIndexes, var optionalMetadata);

/* Registers this broadcaster to be notified for mouse events for the given components. */
Broadcaster.attachToComponentMouseEvents(var componentIds, var callbackLevel, var optionalMetadata);

/* Registers this broadcaster to be called when one of the properties of the given components change. */
Broadcaster.attachToComponentProperties(var componentIds, var propertyIds, var optionalMetadata);

/* Registers this broadcaster to be called when the value of the given components change. */
Broadcaster.attachToComponentValue(var componentIds, var optionalMetadata);

/* Registers this broadcaster to be called when the visibility of one of the components (or one of its parent component) changes. */
Broadcaster.attachToComponentVisibility(var componentIds, var optionalMetadata);

/* Registers this broadcaster to be notified when a context menu item from the given components was selected. */
Broadcaster.attachToContextMenu(var componentIds, var stateFunction, var itemList, var optionalMetadata, var useLeftClick);

/* Registers this broadcaster to be notified about changes to the EQ (adding / removing / selecting filter bands). */
Broadcaster.attachToEqEvents(var moduleIds, var eventTypes, var optionalMetadata);

/* Registers the broadcaster to be notified when the interface size changes. */
Broadcaster.attachToInterfaceSize(var optionalMetadata);

/* Registers this broadcaster to be notified when a module parameter changes. */
Broadcaster.attachToModuleParameter(var moduleIds, var parameterIds, var optionalMetadata);

/* Attaches this broadcaster to receive realtime / nonrealtime render change events. */
Broadcaster.attachToNonRealtimeChange(var optionalMetadata);

/* Attaches this broadcaster to another broadcaster(s) to forward the messages. */
Broadcaster.attachToOtherBroadcaster(var otherBroadcaster, var argTransformFunction, bool async, var optionalMetadata);

/* Attaches this broadcaster to changes of the audio processing specs (samplerate / buffer size). */
Broadcaster.attachToProcessingSpecs(var optionalMetadata);

/* Registers this broadcaster to be notified when a button of a radio group is clicked. */
Broadcaster.attachToRadioGroup(int radioGroupIndex, var optionalMetadata);

/* Attaches this broadcaster to a routing matrix and listens for changes. */
Broadcaster.attachToRoutingMatrix(var moduleIds, var optionalMetadata);

/* Attaches the broadcaster to events of a samplemap (loading, changing, adding samples). */
Broadcaster.attachToSampleMap(var samplerIds, var eventTypes, var optionalMetadata);

/* Calls a function after a short period of time. This is exclusive, so if you pass in a new function while another is pending, the first will be replaced. */
Broadcaster.callWithDelay(int delayInMilliseconds, var argArray, var function);

/* Checks if the broadcaster is bypassed. */
Broadcaster.isBypassed();

/* If this broadcaster is attached to a context menu, calling this method will update the states for the menu items. */
Broadcaster.refreshContextMenuState();

/* Removes all listeners. */
Broadcaster.removeAllListeners();

/* Removes all sources. */
Broadcaster.removeAllSources();

/* Removes the listener that was assigned with the given object. */
Broadcaster.removeListener(var idFromMetadata);

/* Removes the source with the given metadata. */
Broadcaster.removeSource(var metadata);

/* Resends the current state. */
Broadcaster.resendLastMessage(var isSync);

/* Resets the state. */
Broadcaster.reset();

/* Sends an asynchronous message to all listeners. the length of args must match the default value list. */
Broadcaster.sendAsyncMessage(var args);

/* deprecated function (use sendSyncMessage / sendAsyncMessage instead). */
Broadcaster.sendMessage(var args, bool isSync);

/* Sends a message to all listeners with a delay. */
Broadcaster.sendMessageWithDelay(var args, int delayInMilliseconds);

/* Sends a synchronous message to all listeners (same as the dot assignment operator). the length of args must match the default value list. */
Broadcaster.sendSyncMessage(var args);

/* Deactivates the broadcaster so that it will not send messages. If sendMessageIfEnabled is true, it will send the last value when unbypassed. */
Broadcaster.setBypassed(bool shouldBeBypassed, bool sendMessageIfEnabled, bool async);

/* If this is enabled, the broadcaster will keep an internal queue of all messages and will guarantee to send them all. */
Broadcaster.setEnableQueue(bool shouldUseQueue);

/* Forces every message to be sent synchronously. */
Broadcaster.setForceSynchronousExecution(bool shouldExecuteSynchronously);

/* Guarantees that the synchronous execution of the listener callbacks can be called from the audio thread. */
Broadcaster.setRealtimeMode(bool enableRealTimeMode);

/* This will control whether the `this` reference for the listener function will be replaced with the object passed into `addListener`. */
Broadcaster.setReplaceThisReference(bool shouldReplaceThisReference);

/* Forces the broadcaster to also send a message when a parameter is undefined. */
Broadcaster.setSendMessageForUndefinedArgs(bool shouldSendWhenUndefined);


```
### API Class: Buffer

```javascript
/* Detects the pitch of the given buffer. */
Buffer.detectPitch(double sampleRate, int startSample, int numSamples);

/* Loads the content from the Base64 string (and resizes the buffer if necessary). */
Buffer.fromBase64(String b64String);

/* Returns the magnitude in the given range. */
Buffer.getMagnitude(int startSample, int numSamples);

/* Returns an array with the min and max value in the given range. */
Buffer.getPeakRange(int startSample, int numSamples);

/* Returns the RMS value in the given range. */
Buffer.getRMSLevel(int startSample, int numSamples);

/* Returns the sample index with the highest peak. */
Buffer.indexOfPeak(int startSample, int numSamples);

/* Normalises the buffer to the given decibel value. */
Buffer.normalise(float gainInDecibels);

/* Converts a buffer with up to 44100 samples to a Base64 string. */
Buffer.toBase64();

/* Returns a char from 0 to 255 with the given length and input range. */
Buffer.toCharString(int numChars, var range);

/* Trims a buffer at the start and end and returns a copy of it. */
Buffer.trim(int trimFromStart, int trimFromEnd);


```
### API Class: Builder

```javascript
/* WARNING: Clears all child sound generators, effects and MIDI processor (except for this one obviously). */
Builder.clear();

/* Clears all child processors of the chain in the module with the given build index */
Builder.clearChildren(int buildIndex, int chainIndex);

/* Connects the script processor to an external script. */
Builder.connectToScript(int buildIndex, String relativePath);

/* Creates a module and returns the build index (0=master container). */
Builder.create(var type, var id, int rootBuildIndex, int chainIndex);

/* Sends a rebuild message. Call this after you've created all the processors to make sure that the patch browser is updated accordingly. */
Builder.flush();

/* Returns a typed reference for the module with the given build index. */
Builder.get(int buildIndex, String interfaceType);

/* Adds the existing module to the internal list and returns the index for refering to it. */
Builder.getExisting(String processorId);

/* Set multiple attributes for the given module at once using a JSON object. */
Builder.setAttributes(int buildIndex, var attributeValues);


```
### API Class: ChildSynth

```javascript
/* Adds a and connects a receiver modulator for the given global modulator. */
ChildSynth.addGlobalModulator(var chainIndex, var globalMod, String modName);

/* Adds a modulator to the given chain and returns a reference. */
ChildSynth.addModulator(var chainIndex, var typeName, var modName);

/* Adds and connects a receiving static time variant modulator for the given global modulator. */
ChildSynth.addStaticGlobalModulator(var chainIndex, var timeVariantMod, String modName);

/* Returns a reference as Sampler or undefined if no Sampler. */
ChildSynth.asSampler();

/* Checks if the Object exists and prints a error message on the console if not. */
ChildSynth.exists();

/* Exports the state as base64 string. */
ChildSynth.exportState();

/* Returns the attribute with the given index. */
ChildSynth.getAttribute(int index);

/* Returns the attribute with the given index. */
ChildSynth.getAttributeId(int index);

/* Returns the index of the attribute with the given ID. */
ChildSynth.getAttributeIndex(String id);

/* Returns the child synth with the given index. */
ChildSynth.getChildSynthByIndex(int index);

/* Returns the current peak level for the given channel. */
ChildSynth.getCurrentLevel(bool leftChannel);

/* Returns the ID of the synth. */
ChildSynth.getId();

/* Returns the modulator chain with the given index. */
ChildSynth.getModulatorChain(var chainIndex);

/* Returns the number of attributes. */
ChildSynth.getNumAttributes();

/* Returns a reference to the routing matrix object of the sound generator. */
ChildSynth.getRoutingMatrix();

/* Checks if the synth is bypassed. */
ChildSynth.isBypassed();

/* Restores the state from a base64 string. */
ChildSynth.restoreState(String base64State);

/* Changes one of the Parameter. Look in the manual for the index numbers of each effect. */
ChildSynth.setAttribute(int parameterIndex, float newValue);

/* Bypasses the synth. */
ChildSynth.setBypassed(bool shouldBeBypassed);


```
### API Class: Colours

```javascript
/* Converts a colour from a [h, s, l, a] float array to a uint32 value. */
Colours.fromHsl(var hsl);

/* Converts a colour from a [r, g, b, a] float array to a uint32 value. */
Colours.fromVec4(var vec4);

/* Linear interpolation between two colours. */
Colours.mix(var colour1, var colour2, float alpha);

/* Converts a colour to a [h, s, l, a] array. */
Colours.toHsl(var colour);

/* Converts a colour to a [r, g, b, a] array that can be passed to GLSL as vec4. */
Colours.toVec4(var colour);

/* Returns a colour value with the specified alpha value. */
Colours.withAlpha(var colour, float alpha);

/* Returns a colour with the specified brightness. */
Colours.withBrightness(var colour, float brightness);

/* Returns a colour with the specified hue. */
Colours.withHue(var colour, float hue);

/* Returns a colour with a multiplied alpha value. */
Colours.withMultipliedAlpha(var colour, float factor);

/* Returns a colour with a multiplied brightness value. */
Colours.withMultipliedBrightness(var colour, float factor);

/* Returns a colour with a multiplied saturation value. */
Colours.withMultipliedSaturation(var colour, float factor);

/* Returns a colour with the specified saturation. */
Colours.withSaturation(var colour, float saturation);


```
### API Class: Connection

```javascript
/* Removes this connection. */
Connection.disconnect();

/* Returns the connection type. */
Connection.getConnectionType();

/* Returns the source node. If getSignalSource is true, it searches the node that creates the modulation signal. */
Connection.getSourceNode(bool getSignalSource);

/* Returns the target parameter of this connection. */
Connection.getTarget();

/* Returns the update rate for the modulation connection. */
Connection.getUpdateRate();

/* Checks if the connection is still valid. */
Connection.isConnected();


```
### API Class: Console

```javascript
/* Throws an error message if the values are not equal. */
Console.assertEqual(var v1, var v2);

/* Throws an error message if the value is undefined. */
Console.assertIsDefined(var value);

/* Throws an error message if the value is not an object or array. */
Console.assertIsObjectOrArray(var value);

/* Throws an error message if the value is not a legal number (eg. string or array or infinity or NaN). */
Console.assertLegalNumber(var value);

/* Throws an error message if the value is a string. */
Console.assertNoString(var value);

/* Throws an error message if the condition is not true. */
Console.assertTrue(var condition);

/* Sends a blink message to the current editor. */
Console.blink();

/* Throws an assertion in the attached debugger. */
Console.breakInDebugger();

/* Clears the console. */
Console.clear();

/* Prints a message to the console. */
Console.print(var debug);

/* Stores the current state of the given data into the current sampling session. */
Console.sample( String label, var dataToSample);

/* Starts the benchmark. You can give it a name that will be displayed with the result if desired. */
Console.startBenchmark();

/* Starts a sampling session with the given ID. */
Console.startSampling( String sessionId);

/* Causes the execution to stop(). */
Console.stop(bool condition);

/* Stops the benchmark and prints the result. */
Console.stopBenchmark();


```
### API Class: Content

```javascript
/* Adds a audio waveform display. */
Content.addAudioWaveform(String audioWaveformName, int x, int y);

/* Adds a toggle button to the Content and returns the component index. */
Content.addButton(String buttonName, int x, int y);

/* Adds a comboBox to the Content and returns the component index. */
Content.addComboBox(String boxName, int x, int y);

/* Adds a floating layout component. */
Content.addFloatingTile(String floatingTileName, int x, int y);

/* Adds a image to the script interface. */
Content.addImage(String imageName, int x, int y);

/* Adds a knob to the Content and returns the component index. */
Content.addKnob(String knobName, int x, int y);

/* Adds a text input label. */
Content.addLabel(String label, int x, int y);

/* Adds a multipage dialog component. */
Content.addMultipageDialog(String dialogId, int x, int y);

/* Adds a panel (rectangle with border and gradient). */
Content.addPanel(String panelName, int x, int y);

/* Adds a slider pack. */
Content.addSliderPack(String sliderPackName, int x, int y);

/* Adds a table editor to the Content and returns the component index. */
Content.addTable(String tableName, int x, int y);

/* Adds a viewport. */
Content.addViewport(String viewportName, int x, int y);

/* Creates either a line or rectangle with the given colour. */
Content.addVisualGuide(var guideData, var colour);

/* Adds a web view. */
Content.addWebView(String webviewName, int x, int y);

/* Calls a function after a delay. This is not accurate and only useful for UI purposes!. */
Content.callAfterDelay(int milliSeconds, var function, var thisObject);

/* Checks if the component exists. */
Content.componentExists( String name);

/* Creates a look and feel that you can attach manually to certain components. */
Content.createLocalLookAndFeel();

/* Creates a MarkdownRenderer. */
Content.createMarkdownRenderer();

/* Creates a Path that can be drawn to a ScriptPanel. */
Content.createPath();

/* Creates a screenshot of the area relative to the content's origin. */
Content.createScreenshot(var area, var directory, String name);

/* Creates an OpenGL framgent shader. */
Content.createShader( String fileName);

/* Creates an SVG object from the converted Base64 String. */
Content.createSVG( String base64String);

/* Returns an array of all components that match the given regex. */
Content.getAllComponents(String regex);

/* Returns the reference to the given component. */
Content.getComponent(var name);

/* Returns the ID of the component under the mouse. */
Content.getComponentUnderDrag();

/* Returns the name of the component that is currently hovered. */
Content.getComponentUnderMouse();

/* Returns the current tooltip. */
Content.getCurrentTooltip();

/* Returns an array containing the width and height of the interface. */
Content.getInterfaceSize();

/* Returns the total bounds of the main display. */
Content.getScreenBounds(bool getTotalArea);

/* Checks whether the CTRL key's flag is set. */
Content.isCtrlDown();

/* Returns 1 if the left mouse button is clicked somewhere on the interface and 2 if the right button is clicked. */
Content.isMouseDown();

/* Sets this script as main interface with the given size. */
Content.makeFrontInterface(int width, int height);

/* Sets this script as main interface with the given device resolution (only works with mobile devices). */
Content.makeFullScreenInterface();

/* Calls the paint function of the drag operation again to refresh the image. */
Content.refreshDragImage();

/* Restores all controls from a previously saved XML data file. */
Content.restoreAllControlsFromPreset( String fileName);

/* Sets the colour for the panel. */
Content.setColour(int red, int green, int blue);

/* sets the Tooltip that will be shown if the mouse hovers over the script's tab button. */
Content.setContentTooltip( String tooltipToShow);

/* Sets the height of the content. */
Content.setHeight(int newHeight);

/* Adds a callback that will be performed asynchronously when the key is pressed. */
Content.setKeyPressCallback( var keyPress, var keyPressCallback);

/* Sets the name that will be displayed in big fat Impact. */
Content.setName( String newName);

/* Restore the Component from a JSON object. */
Content.setPropertiesFromJSON( String name,  var jsonData);

/* Sets a callback that will be notified whenever the UI timers are suspended. */
Content.setSuspendTimerCallback(var suspendFunction);

/* Sets the main toolbar properties from a JSON object. */
Content.setToolbarProperties( var toolbarProperties);

/* Set this to true to render all script panels with double resolution for retina or rescaling. */
Content.setUseHighResolutionForPanels(bool shouldUseDoubleResolution);

/* sets the data for the value popups. */
Content.setValuePopupData(var jsonData);

/* Sets the height of the content. */
Content.setWidth(int newWidth);

/* Opens a text input box with the given properties and executes the callback when finished. */
Content.showModalTextInput(var properties, var callback);

/* Saves all controls that should be saved into a XML data file. */
Content.storeAllControlsAsPreset( String fileName,  ValueTree automationData);


```
### API Class: Date

```javascript
/* Returns a fully described string of this date and time in milliseconds or ISO-8601 format (using the local timezone) with or without divider characters. */
Date.getSystemTimeISO8601(bool includeDividerCharacters);

/* Returns the system time in milliseconds. */
Date.getSystemTimeMs();

/* Returns a date string to time in milliseconds. */
Date.ISO8601ToMilliseconds(String iso8601);

/* Returns a time in milliseconds to a date string. */
Date.millisecondsToISO8601(int64 miliseconds, bool includeDividerCharacters);


```
### API Class: DisplayBuffer

```javascript
/* Copies the read buffer into a preallocated target buffer. The target buffer must have the same size. */
DisplayBuffer.copyReadBuffer(var targetBuffer);

/* Creates a path objects scaled to the given bounds and sourceRange */
DisplayBuffer.createPath(var dstArea, var sourceRange, var normalisedStartValue);

/* Returns a reference to the internal read buffer. */
DisplayBuffer.getReadBuffer();

/* Resamples the buffer to a fixed size. */
DisplayBuffer.getResizedBuffer(int numDestSamples, int resampleMode);

/* Enables or disables the ring buffer. */
DisplayBuffer.setActive(bool shouldBeActive);

/* Sets the ring buffer properties from an object (Use the JSON from the Edit Properties popup). */
DisplayBuffer.setRingBufferProperties(var propertyData);


```
### API Class: DisplayBufferSource

```javascript
/* Returns a reference to the display buffer at the given index. */
DisplayBufferSource.getDisplayBuffer(int index);


```
### API Class: Download

```javascript
/* Aborts the download and deletes the file that was downloaded. */
Download.abort();

/* Returns the target file if the download has succeeded. */
Download.getDownloadedTarget();

/* Returns the download size in bytes. */
Download.getDownloadSize();

/* Returns the current download speed in bytes / second. */
Download.getDownloadSpeed();

/* Returns the full URL of the download. */
Download.getFullURL();

/* Returns the number of bytes downloaded. */
Download.getNumBytesDownloaded();

/* Returns the progress ratio from 0 to 1. */
Download.getProgress();

/* Returns a descriptive text of the current download state (eg. "Downloading" or "Paused"). */
Download.getStatusText();

/* Checks if the download is currently active. */
Download.isRunning();

/* Resumes the download. */
Download.resume();

/* Stops the download. The target file will not be deleted and you can resume the download later. */
Download.stop();


```
### API Class: DspModule

```javascript
/* Creates a new instance from the given Factory with the supplied name. */
DspModule.DspInstance( DspFactory *f,  String moduleName_);

/* Returns the constant at the given index. */
DspModule.getConstant(int index);

/* Returns the name of the constant. */
DspModule.getConstantId(int index);

/* Returns an informative String. */
DspModule.getInfo();

/* Returns the number of constants. */
DspModule.getNumConstants();

/* Returns the number of parameters. */
DspModule.getNumParameters();

/* Returns the parameter with the given index. */
DspModule.getParameter(int index);

/* Gets the string value. */
DspModule.getStringParameter(int index);

/* Checks if the processing is enabled. */
DspModule.isBypassed();

/* Applies the module on the data. */
DspModule.operator >>( var data);

/* Applies the module on the data. */
DspModule.operator<<( var data);

/* Calls the setup method of the external module. */
DspModule.prepareToPlay(double sampleRate, int samplesPerBlock);

/* Calls the processMethod of the external module. */
DspModule.processBlock( var data);

/* Enables / Disables the processing. */
DspModule.setBypassed(bool shouldBeBypassed);

/* Sets the float parameter with the given index. */
DspModule.setParameter(int index, float newValue);

/* Sets a String value. */
DspModule.setStringParameter(int index, String value);


```
### API Class: DspNetwork

```javascript
/* Removes all nodes. */
DspNetwork.clear(bool removeNodesFromSignalChain, bool removeUnusedNodes);

/* Creates and returns a node with the given path (`factory.node`). If a node with the id already exists, it returns this node. */
DspNetwork.create(String path, String id);

/* Creates a node, names it automatically and adds it at the end of the given parent. */
DspNetwork.createAndAdd(String path, String id, var parent);

/* Creates multiple nodes from the given JSON object. */
DspNetwork.createFromJSON(var jsonData, var parent);

/* Creates a test object for this network. */
DspNetwork.createTest(var testData);

/* Deletes the node if it is not in a signal path. */
DspNetwork.deleteIfUnused(String id);

/* Returns a reference to the node with the given id. */
DspNetwork.get(var id);

/* Initialise processing of all nodes. */
DspNetwork.prepareToPlay(double sampleRate, double blockSize);

/* Process the given channel array with the node network. */
DspNetwork.processBlock(var data);

/* Defines whether the UI controls of this script control the parameters or regular script callbacks. */
DspNetwork.setForwardControlsToParameters(bool shouldForward);

/* Sets the parameters of this node according to the JSON data. */
DspNetwork.setParameterDataFromJSON(var jsonData);

/* Undo the last action. */
DspNetwork.undo();


```
### API Class: Effect

```javascript
/* Adds a and connects a receiver modulator for the given global modulator. */
Effect.addGlobalModulator(var chainIndex, var globalMod, String modName);

/* Adds a modulator to the given chain and returns a reference. */
Effect.addModulator(var chainIndex, var typeName, var modName);

/* Adds and connects a receiving static time variant modulator for the given global modulator. */
Effect.addStaticGlobalModulator(var chainIndex, var timeVariantMod, String modName);

/* Checks if the Object exists and prints a error message on the console if not. */
Effect.exists();

/* Export the control values (without the script). */
Effect.exportScriptControls();

/* Exports the state as base64 string. */
Effect.exportState();

/* Returns the attribute with the given index. */
Effect.getAttribute(int index);

/* Returns the ID of the attribute with the given index. */
Effect.getAttributeId(int index);

/* Returns the index of the attribute with the given ID. */
Effect.getAttributeIndex(String id);

/* Returns the current peak level for the given channel. */
Effect.getCurrentLevel(bool leftChannel);

/* Returns the ID of the effect. */
Effect.getId();

/* Returns the Modulator chain with the given index. */
Effect.getModulatorChain(var chainIndex);

/* Returns the number of attributes. */
Effect.getNumAttributes();

/* Checks if the effect is bypassed. */
Effect.isBypassed();

/* Checks if the effect is currently suspended (= no audio running through it and suspension enabled). */
Effect.isSuspended();

/* Restores the control values for scripts (without recompiling). */
Effect.restoreScriptControls(String base64Controls);

/* Restores the state from a base64 string. */
Effect.restoreState(String base64State);

/* Changes one of the Parameter. Look in the manual for the index numbers of each effect. */
Effect.setAttribute(int parameterIndex, float newValue);

/* Bypasses the effect. */
Effect.setBypassed(bool shouldBeBypassed);


```
### API Class: Engine

```javascript
/* Adds an entire module to the user preset system. */
Engine.addModuleStateToUserPreset(var moduleId);

/* Sends an allNotesOff message at the next buffer. */
Engine.allNotesOff();

/* Removes all entries from the MIDi file pool. */
Engine.clearMidiFilePool();

/* Removes all entries from the samplemap pool */
Engine.clearSampleMapPool();

/* Clears the undo history. */
Engine.clearUndoHistory();

/* Compresses a JSON object as Base64 string using zstd. */
Engine.compressJSON(var object);

/* Copies the given text to the clipboard. */
Engine.copyToClipboard(String textToCopy);

/* Creates a audio file holder and registers it so you can access it from other modules. */
Engine.createAndRegisterAudioFile(int index);

/* Creates a ring buffer and registers it so you can access it from other modules. */
Engine.createAndRegisterRingBuffer(int index);

/* Creates a SliderPack Data object and registers it so you can access it from other modules. */
Engine.createAndRegisterSliderPackData(int index);

/* Creates a Table object and registers it so you can access it from other modules. */
Engine.createAndRegisterTableData(int index);

/* Creates a background task that can execute heavyweight functions. */
Engine.createBackgroundTask(String name);

/* Creates a beatport manager object. */
Engine.createBeatportManager();

/* Creates a broadcaster that can send messages to attached listeners. */
Engine.createBroadcaster(var defaultValues);

/* Creates a BX Licenser object (requires the proprietary SDK). */
Engine.createBXLicenser();

/* Creates a Dsp node network. */
Engine.createDspNetwork(String id);

/* Creates an error handler that reacts on initialisation errors. */
Engine.createErrorHandler();

/* Creates (and activates) the expansion handler. */
Engine.createExpansionHandler();

/* Creates an FFT object. */
Engine.createFFT();

/* Creates a fix object factory using the data layout. */
Engine.createFixObjectFactory(var layoutDescription);

/* Creates a (or returns an existing ) script look and feel object. */
Engine.createGlobalScriptLookAndFeel();

/* Creates a reference to the script license manager. */
Engine.createLicenseUnlocker();

/* Creates a macro handler that lets you programmatically change the macro connections. */
Engine.createMacroHandler();

/* Creates a storage object for Message events. */
Engine.createMessageHolder();

/* Creates a MIDI Automation handler. */
Engine.createMidiAutomationHandler();

/* Creates a MIDI List object. */
Engine.createMidiList();

/* Creates a modulation matrix object that handles dynamic modulation using the given Global Modulator Container as source. */
Engine.createModulationMatrix(String containerId);

/* Creates a neural network with the given ID. */
Engine.createNeuralNetwork(String id);

/* Creates a NKS manager object (requires the proprietary SDK). */
Engine.createNKSManager();

/* Creates a thread safe storage container. */
Engine.createThreadSafeStorage();

/* Creates a new timer object. */
Engine.createTimerObject();

/* Creates an object that can listen to transport events. */
Engine.createTransportHandler();

/* Creates a unordered stack that can hold up to 128 float numbers. */
Engine.createUnorderedStack();

/* Creates an user preset handler. */
Engine.createUserPresetHandler();

/* Decodes an Base64 encrypted valuetree (eg. HiseSnippets). */
Engine.decodeBase64ValueTree( String b64Data);

/* Returns a string of the value with the supplied number of digits. */
Engine.doubleToString(double value, int digits);

/* Exports an object as JSON. */
Engine.dumpAsJSON(var object, String fileName);

/* Extends the compilation timeout. Use this if you have a long task that would get cancelled otherwise. This is doing nothing in compiled plugins. */
Engine.extendTimeOut(int additionalMilliseconds);

/* Returns the current maximum processing block size. */
Engine.getBufferSize();

/* Returns the clipboard content. */
Engine.getClipboardContent();

/* Returns a reference to a complex data type from the given module. */
Engine.getComplexDataReference(String dataType, String moduleId, int index);

/* Returns the downsampling factor for the modulation signal (default is 8). */
Engine.getControlRateDownsamplingFactor();

/* Returns the current CPU usage in percent (0 ... 100) */
Engine.getCpuUsage();

/* Returns the currently loaded user preset (without extension). */
Engine.getCurrentUserPresetName();

/* Converts gain factor (0.0 .. 1.0) to decibel (-100.0 ... 0). */
Engine.getDecibelsForGainFactor(double gainFactor);

/* Returns the full screen resolution for the current device. */
Engine.getDeviceResolution();

/* Returns the mobile device that this software is running on. */
Engine.getDeviceType();

/* Creates a reference to the DSP network of another script processor. */
Engine.getDspNetworkReference(String processorId, String id);

/* Creates a list of all available expansions. */
Engine.getExpansionList();

/* Returns the platform specific extra definitions from the Project settings as JSON object. */
Engine.getExtraDefinitionsInBackend();

/* Returns an object that contains all filter modes. */
Engine.getFilterModeList();

/* Converts midi note number 0 ... 127 to Frequency 20 ... 20.000. */
Engine.getFrequencyForMidiNoteNumber(int midiNumber);

/* Converts decibel (-100.0 ... 0.0) to gain factor (0.0 ... 1.0). */
Engine.getGainFactorForDecibels(double decibels);

/* Returns the global pitch factor (in semitones). */
Engine.getGlobalPitchFactor();

/* Returns a reference to the global routing manager. */
Engine.getGlobalRoutingManager();

/* Returns the Bpm of the host. */
Engine.getHostBpm();

/* Returns the latency of the plugin as reported to the host. Default is 0. */
Engine.getLatencySamples();

/* Returns a reference to the global Loris manager. */
Engine.getLorisManager();

/* Returns the name for the given macro index. */
Engine.getMacroName(int index);

/* Returns the current peak volume (0...1) for the given channel. */
Engine.getMasterPeakLevel(int channel);

/* Returns the current memory usage in MB. */
Engine.getMemoryUsage();

/* Converts MIDI note name to MIDI number ("C3" for middle C). */
Engine.getMidiNoteFromName(String midiNoteName);

/* Converts MIDI note number to Midi note name ("C3" for middle C). */
Engine.getMidiNoteName(int midiNumber);

/* Converts quarter beats to milliseconds using the current tempo. */
Engine.getMilliSecondsForQuarterBeats(double quarterBeats);

/* Converts quarter beats to milliseconds using the given tempo. */
Engine.getMilliSecondsForQuarterBeatsWithTempo(double quarterBeats, double bpm);

/* Converts samples to milli seconds. */
Engine.getMilliSecondsForSamples(double samples);

/* Returns the millisecond value for the supplied tempo (HINT: Use "TempoSync" mode from Slider!) */
Engine.getMilliSecondsForTempo(int tempoIndex);

/* Returns the product name (not the HISE name!). */
Engine.getName();

/* Returns the amount of output channels. */
Engine.getNumPluginChannels();

/* Returns the amount of currently active voices. */
Engine.getNumVoices();

/* Returns the current operating system ("OSX", "LINUX", or ("WIN"). */
Engine.getOS();

/* Converts a semitone value to a pitch ratio (-12 ... 12) -> (0.5 ... 2.0) */
Engine.getPitchRatioFromSemitones(double semiTones);

/* Allows access to the data of the host (playing status, timeline, etc...). */
Engine.getPlayHead();

/* Returns the current preload message if there is one. */
Engine.getPreloadMessage();

/* Returns the preload progress from 0.0 to 1.0. Use this to display some kind of loading icon. */
Engine.getPreloadProgress();

/* Returns project and company info from the Project's preferences. */
Engine.getProjectInfo();

/* Converts milliseconds to quarter beats using the current tempo. */
Engine.getQuarterBeatsForMilliSeconds(double milliSeconds);

/* Converts milliseconds to quarter beats using the given tempo. */
Engine.getQuarterBeatsForMilliSecondsWithTempo(double milliSeconds, double bpm);

/* Converts samples to quarter beats using the current tempo. */
Engine.getQuarterBeatsForSamples(double samples);

/* Converts samples to quarter beats using the given tempo. */
Engine.getQuarterBeatsForSamplesWithTempo(double samples, double bpm);

/* Returns an array with all matches. */
Engine.getRegexMatches(String stringToMatch, String regex);

/* Iterates the given sub-directory of the Samples folder and returns a list with all references to audio files. */
Engine.getSampleFilesFromDirectory( String relativePathFromSampleFolder, bool recursive);

/* Returns the current sample rate. */
Engine.getSampleRate();

/* Converts milli seconds to samples */
Engine.getSamplesForMilliSeconds(double milliSeconds);

/* Converts quarter beats to samples using the current tempo. */
Engine.getSamplesForQuarterBeats(double quarterBeats);

/* Converts quarter beats to samples using the given tempo. */
Engine.getSamplesForQuarterBeatsWithTempo(double quarterBeats, double bpm);

/* Converts a pitch ratio to semitones (0.5 ... 2.0) -> (-12 ... 12) */
Engine.getSemitonesFromPitchRatio(double pitchRatio);

/* Returns a object that contains the properties for the settings dialog. */
Engine.getSettingsWindowObject();

/* Returns the width of the string for the given font properties. */
Engine.getStringWidth(String text, String fontName, float fontSize, float fontSpacing);

/* Returns info about the current hardware and OS configuration. */
Engine.getSystemStats();

/* Returns a fully described string of this date and time in ISO-8601 format (using the local timezone) with or without divider characters. */
Engine.getSystemTime(bool includeDividerCharacters);

/* Returns the tempo name for the given index */
Engine.getTempoName(int tempoIndex);

/* Returns the uptime of the engine in seconds. */
Engine.getUptime();

/* Returns a list of all available user presets as relative path. */
Engine.getUserPresetList();

/* Returns the product version (not the HISE version!). */
Engine.getVersion();

/* Returns the list of wavetables of the current expansion (or factory content). */
Engine.getWavetableList();

/* Returns the current Zoom Level. */
Engine.getZoomLevel();

/* Returns a number as string in hexadecimal format (0xFFFFFFFF). */
Engine.intToHexString(int value);

/* Checks if the given CC number (single number) or channel / CC number (JS Array: [channel, CC]) is used for parameter automation and returns the index of the control. */
Engine.isControllerUsedByAutomation(var controllerNumber);

/* Returns true if the project is running inside HISE. You can use this during development to simulate different environments. */
Engine.isHISE();

/* Checks if the global MPE mode is enabled. */
Engine.isMpeEnabled();

/* Returns true if running as VST / AU / AAX plugin. */
Engine.isPlugin();

/* Checks if the user preset is read only. */
Engine.isUserPresetReadOnly(var optionalFile);

/* Loads a file and returns its content as array of Buffers. */
Engine.loadAudioFileIntoBufferArray(String audioFileReference);

/* Calling this makes sure that all audio files are loaded into the pool and will be available in the compiled plugin. Returns a list of all references. */
Engine.loadAudioFilesIntoPool();

/* Loads a font file. This is deprecated, because it might result in different names on various OS. Use loadFontAs() instead. */
Engine.loadFont( String fileName);

/* Loads the font from the given file in the image folder and registers it under the fontId. This is platform agnostic. */
Engine.loadFontAs(String fileName, String fontId);

/* Imports a JSON file as object. */
Engine.loadFromJSON(String fileName);

/* Loads an image into the pool. You can use a wildcard to load multiple images at once. */
Engine.loadImageIntoPool( String id);

/* Loads the next user preset. */
Engine.loadNextUserPreset(bool stayInDirectory);

/* Loads the previous user preset. */
Engine.loadPreviousUserPreset(bool stayInDirectory);

/* Loads a user preset with the given relative path (use `/` for directory separation) or the given ScriptFile object. */
Engine.loadUserPreset(var relativePathOrFileObject);

/* This warning will show up in the console so people can migrate in the next years... */
Engine.logSettingWarning( String methodName);

/* Matches the string against the regex token. */
Engine.matchesRegex(String stringToMatch, String regex);

/* launches the given URL in the system's web browser. */
Engine.openWebsite(String url);

/* Performs an action that can be undone via Engine.undo(). */
Engine.performUndoAction(var thisObject, var undoAction);

/* Previews a audio buffer with a callback indicating the state. */
Engine.playBuffer(var bufferData, var callback, double fileSampleRate);

/* Signals that the application should terminate. */
Engine.quit();

/* Rebuilds the entries for all cached pools (MIDI files and samplemaps). */
Engine.rebuildCachedPools();

/* Redo the last controller change. */
Engine.redo();

/* Forces a full (asynchronous) reload of all samples (eg. after the sample directory has changed). */
Engine.reloadAllSamples();

/* Renders a MIDI event list as audio data on a background thread and calls a function when it's ready. */
Engine.renderAudio(var eventList, var finishCallback);

/* Asks for a preset name (if presetName is empty) and saves the current user preset. */
Engine.saveUserPreset(var presetName);

/* Sets whether the samples are allowed to be duplicated. Set this to false if you operate on the same samples differently. */
Engine.setAllowDuplicateSamples(bool shouldAllow);

/* Sets the active expansion and updates the preset browser. */
Engine.setCurrentExpansion( String expansionName);

/* Sets the Streaming Mode (0 -> Fast-SSD, 1 -> Slow-HDD) */
Engine.setDiskMode(int mode);

/* Enables the macro system to be used by the end user. */
Engine.setFrontendMacros(var nameList);

/* Sets the font that will be used as default font for various things. */
Engine.setGlobalFont(String fontName);

/* Sets the global pitch factor (in semitones). */
Engine.setGlobalPitchFactor(double pitchFactorInSemitones);

/* Overwrites the host BPM. Use -1 for sync to host. */
Engine.setHostBpm(double newTempo);

/* Sets a key of the global keyboard to the specified colour (using the form 0x00FF00 for eg. of the key to the specified colour. */
Engine.setKeyColour(int keyNumber, int colourAsHex);

/* sets the latency of the plugin as reported to the host. Default is 0. */
Engine.setLatencySamples(int latency);

/* Changes the lowest visible key on the on screen keyboard. */
Engine.setLowestKeyToDisplay(int keyNumber);

/* Sets the maximum buffer size that is processed at once. If the buffer size from the audio driver / host is bigger than this number, it will split up the incoming buffer and call process multiple times. */
Engine.setMaximumBlockSize(int numSamplesPerBlock);

/* Sets the minimum sample rate for the global processing (and adds oversampling if the current samplerate is lower). */
Engine.setMinimumSampleRate(double minimumSampleRate);

/* Sets the preload message. */
Engine.setPreloadMessage(String message);

/* Sets the tags that appear in the user preset browser. */
Engine.setUserPresetTagList(var listOfTags);

/* Sets the new zoom level (1.0 = 100%) */
Engine.setZoomLevel(double newLevel);

/* Shows a error message on the compiled plugin (or prints it on the console). Use isCritical if you want to disable the "Ignore" Button. */
Engine.showErrorMessage(String message, bool isCritical);

/* Shows a message with an overlay on the compiled plugin with an "OK" button in order to notify the user about important events. */
Engine.showMessage(String message);

/* Shows a message box with an OK button and a icon defined by the type variable. */
Engine.showMessageBox(String title, String markdownMessage, int type);

/* Shows a message with a question and executes the function after the user has selected his choice. */
Engine.showYesNoWindow(String title, String markdownMessage, var callback);

/* Sorts an array with a given comparison function. */
Engine.sortWithFunction(var arrayToSort, var sortFunction);

/* Expands a compressed JSON object. */
Engine.uncompressJSON( String b64);

/* Reverts the last controller change. */
Engine.undo();


```
### API Class: ErrorHandler

```javascript
/* Clear all states. */
ErrorHandler.clearAllErrors();

/* Clears a state. If there is another error, it will send it again. */
ErrorHandler.clearErrorLevel(int stateToClear);

/* Returns the current error level (and -1 if there is no error). */
ErrorHandler.getCurrentErrorLevel();

/* Returns the current error message. */
ErrorHandler.getErrorMessage();

/* Returns the number of currently active errors. */
ErrorHandler.getNumActiveErrors();

/* Overrides the default HISE error messages with custom text. */
ErrorHandler.setCustomMessageToShow(int state, String messageToShow);

/* Sets a function with two arguments (int state, String message) that will be notified at error events. */
ErrorHandler.setErrorCallback(var errorCallback);

/* Causes an error event to be sent through the system (for development purposes only). */
ErrorHandler.simulateErrorEvent(int state);


```
### API Class: Expansion

```javascript
/* Returns a list of all available audio files in the expansion. */
Expansion.getAudioFileList();

/* Returns a list of all available data files in the expansion. */
Expansion.getDataFileList();

/* returns the expansion type. Use the constants of ExpansionHandler to resolve the integer number. */
Expansion.getExpansionType();

/* Returns a list of all available images in the expansion. */
Expansion.getImageList();

/* Returns a list of all available MIDI files in the expansion. */
Expansion.getMidiFileList();

/* Returns an object containing all properties of the expansion. */
Expansion.getProperties();

/* Returns the root folder for this expansion. */
Expansion.getRootFolder();

/* Returns the folder where this expansion looks for samples. */
Expansion.getSampleFolder();

/* Returns a list of all available sample maps in the expansion. */
Expansion.getSampleMapList();

/* Returns a list of all available user presets in the expansion. */
Expansion.getUserPresetList();

/* Returns a valid wildcard reference ((`{EXP::Name}relativePath`) for the expansion. */
Expansion.getWildcardReference(var relativePath);

/* Attempts to parse a JSON file in the AdditionalSourceCode directory of the expansion. */
Expansion.loadDataFile(var relativePath);

/* Reextracts (and overrides) the user presets from the given expansion. Only works with intermediate / encrypted expansions. */
Expansion.rebuildUserPresets();

/* Sets whether the samples are allowed to be duplicated for this expansion. Set this to false if you operate on the same samples differently. */
Expansion.setAllowDuplicateSamples(bool shouldAllowDuplicates);

/* Changes the sample folder of that particular expansion. */
Expansion.setSampleFolder(var newSampleFolder);

/* Unloads this expansion so it will not show up in the list of expansions until the next restart. */
Expansion.unloadExpansion();

/* Writes the given data into the file in the AdditionalSourceCode directory of the expansion. */
Expansion.writeDataFile(var relativePath, var dataToWrite);


```
### API Class: ExpansionHandler

```javascript
/* Encrypts the given hxi file. */
ExpansionHandler.encodeWithCredentials(var hxiFile);

/* Returns the currently active expansion (if there is one). */
ExpansionHandler.getCurrentExpansion();

/* Returns the expansion with the given name */
ExpansionHandler.getExpansion(var name);

/* Checks if the expansion is already installed and returns a reference to the expansion if it exists. */
ExpansionHandler.getExpansionForInstallPackage(var packageFile);

/* Returns a list of all available expansions. */
ExpansionHandler.getExpansionList();

/* Returns a list of all expansions that aren't loaded properly yet. */
ExpansionHandler.getUninitialisedExpansions();

/* Decompresses the samples and installs the .hxi / .hxp file. */
ExpansionHandler.installExpansionFromPackage(var packageFile, var sampleDirectory);

/* Call this to refresh the expansion list. */
ExpansionHandler.refreshExpansions();

/* Sets a list of allowed expansion types that can be loaded. */
ExpansionHandler.setAllowedExpansionTypes(var typeList);

/* Set a credentials object that can be embedded into each expansion. */
ExpansionHandler.setCredentials(var newCredentials);

/* Sets the current expansion as active expansion. */
ExpansionHandler.setCurrentExpansion(var expansionName);

/* Set a encryption key that will be used to encrypt the content (deprecated). */
ExpansionHandler.setEncryptionKey(String newKey);

/* Sets a error function that will be executed. */
ExpansionHandler.setErrorFunction(var newErrorFunction);

/* Calls the error function specified with setErrorFunction. */
ExpansionHandler.setErrorMessage(String errorMessage);

/* Set a function that will be called whenever a expansion is being loaded. */
ExpansionHandler.setExpansionCallback(var expansionLoadedCallback);

/* Set a function that will be called during installation of a new expansion. */
ExpansionHandler.setInstallCallback(var installationCallback);

/* Sets whether the installExpansionFromPackage function should install full dynamics. */
ExpansionHandler.setInstallFullDynamics(bool shouldInstallFullDynamics);


```
### API Class: FFT

```javascript
/* Returns the JSON data for the spectrum parameters. */
FFT.getSpectrum2DParameters();

/* Allocates the buffers required for processing. */
FFT.prepare(int powerOfTwoSize, int maxNumChannels);

/* Process the given data (either a buffer or a array of buffers. */
FFT.process(var dataToProcess);

/* This enables the inverse transform that will reconstruct the signal from the processed FFT. */
FFT.setEnableInverseFFT(bool shouldApplyReverseTransformToInput);

/* Enables the creation of a 2D spectrograph image. */
FFT.setEnableSpectrum2D(bool shouldBeEnabled);

/* Sets a function that will be executed with the amplitude information of the FFT bins. */
FFT.setMagnitudeFunction(var newMagnitudeFunction, bool convertToDecibels);

/* Sets an overlap (from 0...1) for the chunks. */
FFT.setOverlap(double percentageOfOverlap);

/* Sets a function that will be executed with the phase information of the FFT bins. */
FFT.setPhaseFunction(var newPhaseFunction);

/* Sets the spectrum data from the JSON object. */
FFT.setSpectrum2DParameters(var jsonData);

/* This forces the FFT object to use the fallback engine. */
FFT.setUseFallbackEngine(bool shouldUseFallback);

/* Flushes the given spectrum list to a file. */
FFT.setUseSpectrumList(int numRows);

/* Sets a window function that will be applied to the data chunks before processing. */
FFT.setWindowType(int windowType);


```
### API Class: File

```javascript
/* Copies the file. The target isn't the directory to put it in, it's the actual file to create. */
File.copy(var target);

/* Recursively copies the directory. The target is the actual directory to create, not the directory into which the new one should be placed. */
File.copyDirectory(var target);

/* Returns the new directory created at the file location, if directory doesn't already exist */
File.createDirectory(String directoryName);

/* Deletes the file or directory WITHOUT confirmation. */
File.deleteFileOrDirectory();

/* Extracts the ZIP archive if this file is a .zip file. */
File.extractZipFile(var targetDirectory, bool overwriteFiles, var callback);

/* Returns the number of bytes free on the drive that this file lives on. */
File.getBytesFreeOnVolume();

/* Returns a child file if this is a directory. */
File.getChildFile(String childFileName);

/* Reads a file and generates the hash of its contents. */
File.getHash();

/* Returns a sibling file that doesn't exist. */
File.getNonExistentSibling();

/* Returns the number of items in the zip file. */
File.getNumZippedItems();

/* Returns the parent directory as File. */
File.getParentDirectory();

/* If this file is a folder that contains a HISE redirection file (LinkWindows / LinkOSX file), then it will return the redirection target, otherwise it will return itself. */
File.getRedirectedFolder();

/* Returns a relative path from the given other file. */
File.getRelativePathFrom(var otherFile);

/* Returns the size of the file in bytes. */
File.getSize();

/* true if it's possible to create and write to this file. If the file doesn't already exist, this will check its parent directory to see if writing is allowed. */
File.hasWriteAccess();

/* Checks if this file is a child file of the other file. */
File.isChildOf(var otherFile, bool checkSubdirectories);

/* Checks if this file exists and is a directory. */
File.isDirectory();

/* Checks if this file exists and is a file. */
File.isFile();

/* Checks if the file matches the other file (the object comparison might not work reliably). */
File.isSameFileAs(var otherFile);

/* Loads the given file as audio file. */
File.loadAsAudioFile();

/* Loads the binary file, compresses it with zstd and returns a Base64 string. */
File.loadAsBase64String();

/* Loads the track (zero-based) of the MIDI file. If successful, it returns an object containing the time signature and a list of all events. */
File.loadAsMidiFile(int trackIndex);

/* Loads the given file as object. */
File.loadAsObject();

/* Loads the given file as text. */
File.loadAsString();

/* Tries to parse the metadata from the audio file (channel amount, length, samplerate, etc) and returns a JSON object if sucessful. */
File.loadAudioMetadata();

/* Loads the encrypted object using the supplied RSA key pair. */
File.loadEncryptedObject(String key);

/* Loads the XML file and tries to parse it as JSON object. */
File.loadFromXmlFile();

/* Tries to parse the metadata of the MIDI file and returns a JSON object if successful. */
File.loadMidiMetadata();

/* Moves the file. The target isn't the directory to put it in, it's the actual file to create. */
File.move(var target);

/* Renames the file. */
File.rename(String newName);

/* Changes the execute-permissions of a file. */
File.setExecutePermission(bool shouldBeExecutable);

/* Changes the read/write permission for the given file. */
File.setReadOnly(bool shouldBeReadOnly, bool applyRecursively);

/* Opens a Explorer / Finder window that points to the file. */
File.show();

/* Launches the file as a process. */
File.startAsProcess(String parameters);

/* Returns a reference string with a wildcard. */
File.toReferenceString(String folderType);

/* Returns a String representation of that file. */
File.toString(int formatType);

/* Replaces the XML file with the JSON content (needs to be convertible). */
File.writeAsXmlFile(var jsonDataToBeXmled, String tagName);

/* Writes the given data (either a Buffer or Array of Buffers) to a audio file. */
File.writeAudioFile(var audioData, double sampleRate, int bitDepth);

/* Encrypts an JSON object using the supplied key. */
File.writeEncryptedObject(var jsonData, String key);

/* Writes the array of MessageHolders as MIDI file using the metadataObject to determine time signature, tempo, etc. */
File.writeMidiFile(var eventList, var metadataObject);

/* Replaces the file content with the JSON data. */
File.writeObject(var jsonData);

/* Replaces the file content with the given text. */
File.writeString(String text);


```
### API Class: FileSystem

```javascript
/* Opens a file browser to choose a file. */
FileSystem.browse(var startFolder, bool forSaving, String wildcard, var callback);

/* Opens a file browser to choose a directory. */
FileSystem.browseForDirectory(var startFolder, var callback);

/* Decrypts the given string using a RSA public key. */
FileSystem.decryptWithRSA( String dataToDecrypt,  String publicKey);

/* Convert a file size in bytes to a neat string description. */
FileSystem.descriptionOfSizeInBytes(int64 bytes);

/* Encrypts the given string using a RSA private key. */
FileSystem.encryptWithRSA( String dataToEncrypt,  String privateKey);

/* Returns a list of all child files of a directory that match the wildcard. */
FileSystem.findFiles(var directory, String wildcard, bool recursive);

/* Returns a list of all root drives of the current computer. */
FileSystem.findFileSystemRoots();

/* Returns a file object from an absolute path (eg. C:/Windows/MyProgram.exe). */
FileSystem.fromAbsolutePath(String path);

/* Returns a file object for the given location type and the reference string which can either contain a wildcard like `{PROJECT_FOLDER}` or a full file path. */
FileSystem.fromReferenceString(String referenceStringOrFullPath, var locationType);

/* Returns the number of free bytes on the volume of a given folder. */
FileSystem.getBytesFreeOnVolume(var folder);

/* Returns the current sample folder as File object. */
FileSystem.getFolder(var locationType);

/* Returns a unique machine ID that can be used to identify the computer. */
FileSystem.getSystemId();

/* Loads a bunch of dummy assets (audio files, MIDI files, filmstrips) for use in snippets & examples. */
FileSystem.loadExampleAssets();


```
### API Class: FixObjectArray

```javascript
/* Clears the array (resets all objects to their default. */
FixObjectArray.clear();

/* checks if the array contains the object. */
FixObjectArray.contains(var obj);

/* Copies the property from each element into a buffer (or array). */
FixObjectArray.copy(String propertyName, var target);

/* Fills the array with the given object. */
FixObjectArray.fill(var obj);

/* Restores an array from a previously exported state. */
FixObjectArray.fromBase64( String b64);

/* Returns the index of the first element that matches the given object. */
FixObjectArray.indexOf(var obj);

/* Returns the size of the array. */
FixObjectArray.size();

/* Sorts the array with the given compare function. */
FixObjectArray.sort();

/* Exports the memory region of the entire array as Base64 encoded string. */
FixObjectArray.toBase64();


```
### API Class: FixObjectFactory

```javascript
/* Creates a single object from the prototype layout. */
FixObjectFactory.create();

/* Creates a fixed size array with the given number of elements. */
FixObjectFactory.createArray(int numElements);

/* Creates an unordered stack. */
FixObjectFactory.createStack(int numElements);

/* Returns the hash code for the memory layout which factors in member IDs, order and type. */
FixObjectFactory.getTypeHash();

/* Registers a function that will be used for comparison. If you pass in a string it will only compare the given property. */
FixObjectFactory.setCompareFunction(var newCompareFunction);


```
### API Class: FixObjectStack

```javascript
/* Clears the stack. */
FixObjectStack.clear() override;

/* Clears the stack by moving the end pointer to the start (leaving its elements in the same state). */
FixObjectStack.clearQuick();

/* checks if the array contains the object. */
FixObjectStack.contains(var obj);

/* Copies the property from each element into a buffer (or array). */
FixObjectStack.copy(String propertyName, var target);

/* Fills the array with the given object. */
FixObjectStack.fill(var obj);

/* Restores an array from a previously exported state. */
FixObjectStack.fromBase64( String b64);

/* Returns the index of the first element that matches the given object. */
FixObjectStack.indexOf(var obj);

/* Inserts a element to the stack. */
FixObjectStack.insert(var obj);

/* Checks whether the stack is empty. */
FixObjectStack.isEmpty();

/* Removes the element from the stack and fills up the gap. */
FixObjectStack.remove(var obj);

/* Removes the element at the given index and fills the gap. */
FixObjectStack.removeElement(int index);

/* Replaces the object if it exists or inserts it at the end. */
FixObjectStack.set(var obj);

/* Returns the number of used elements in the stack. */
FixObjectStack.size()  override;

/* Sorts the array with the given compare function. */
FixObjectStack.sort();

/* Exports the memory region of the entire array as Base64 encoded string. */
FixObjectStack.toBase64();


```
### API Class: GlobalCable

```javascript
/* Connects the cable to a global LFO modulation output as source. */
GlobalCable.connectToGlobalModulator( String lfoId, bool addToMod);

/* Connects the cable to a macro control. */
GlobalCable.connectToMacroControl(int macroIndex, bool macroIsTarget, bool filterRepetitions);

/* Connects the cable to a module parameter using a JSON object for defining the range. */
GlobalCable.connectToModuleParameter( String processorId, var parameterIndexOrId, var targetObject);

/* Deregisteres a callback from the cable. */
GlobalCable.deregisterCallback(var callbackFunction);

/* Returns the value (converted to the input range). */
GlobalCable.getValue();

/* Returns the normalised value between 0...1 */
GlobalCable.getValueNormalised();

/* Registers a function that will be executed whenever a value is sent through the cable. */
GlobalCable.registerCallback(var callbackFunction, var synchronous);

/* Registers a function that will be executed asynchronously when the data receives a JSON data chunk. */
GlobalCable.registerDataCallback(var dataCallbackFunction);

/* Sends any type of data (JSON, string, buffers) to the target. */
GlobalCable.sendData(var dataToSend);

/* Set the input range using a min and max value (no steps / no skew factor). */
GlobalCable.setRange(double min, double max);

/* Set the input range using a min and max value and a mid point for skewing the range. */
GlobalCable.setRangeWithSkew(double min, double max, double midPoint);

/* Set the input range using a min and max value as well as a step size. */
GlobalCable.setRangeWithStep(double min, double max, double stepSize);

/* Sends the value to all targets (after converting it from the input range. */
GlobalCable.setValue(double inputWithinRange);

/* Sends the normalised value to all targets. */
GlobalCable.setValueNormalised(double normalisedInput);


```
### API Class: GlobalRoutingManager

```javascript
/* Register a scripting callback to be executed when a OSC message that matches the subAddress is received. */
GlobalRoutingManager.addOSCCallback(String oscSubAddress, var callback);

/* Allows the global routing manager to send and receive OSC messages through the cables. */
GlobalRoutingManager.connectToOSC(var connectionData, var errorFunction);

/* Returns a scripted reference to the global cable (and creates a cable with this ID if it can't be found. */
GlobalRoutingManager.getCable(String cableId);

/* Returns the double value that is written to the data slot using setEventData. If the event ID wasn't written, it will return undefined. */
GlobalRoutingManager.getEventData(int eventId, int dataSlot);

/* Removes a OSC callback for the given address. */
GlobalRoutingManager.removeOSCCallback(String oscSubAddress);

/* Send an OSC message to the output port. */
GlobalRoutingManager.sendOSCMessage(String oscSubAddress, var data);

/* Writes a value into the given slot that can be retrieved using the event ID. */
GlobalRoutingManager.setEventData(int eventId, int dataSlot, double value);


```
### API Class: Graphics

```javascript
/* Adds a drop shadow based on the alpha values of the current image. */
Graphics.addDropShadowFromAlpha(var colour, int radius);

/* Adds noise to the current layer. */
Graphics.addNoise(var noiseAmount);

/* Applies a gamma correction to the current layer. */
Graphics.applyGamma(float gamma);

/* Applies a gradient map to the brightness level of the current layer. */
Graphics.applyGradientMap(var darkColour, var brightColour);

/* Applies a HSL grading on the current layer. */
Graphics.applyHSL(float hue, float saturation, float lightness);

/* Applies a mask to the current layer. */
Graphics.applyMask(var path, var area, bool invert);

/* Applies an oldschool sepia filter on the current layer. */
Graphics.applySepia();

/* Applies an OpenGL shader to the panel. Returns false if the shader could not be compiled. */
Graphics.applyShader(var shader, var area);

/* Applies a sharpen / soften filter on the current layer. */
Graphics.applySharpness(int delta);

/* Applies a vignette (dark corners on the current layer. */
Graphics.applyVignette(float amount, float radius, float falloff);

/* Begins a new layer that will use the given blend effect. */
Graphics.beginBlendLayer(String blendMode, float alpha);

/* Starts a new Layer. */
Graphics.beginLayer(bool drawOnParent);

/* Applies a box blur to the current layer. */
Graphics.boxBlur(var blurAmount);

/* Removes all colour from the current layer. */
Graphics.desaturate();

/* Draws a text with the given alignment (see the Label alignment property). */
Graphics.drawAlignedText(String text, var area, String alignment);

/* Renders a (blurred) shadow for the text. */
Graphics.drawAlignedTextShadow(String text, var area, String alignment, var shadowData);

/* Draws a drop shadow around a rectangle. */
Graphics.drawDropShadow(var area, var colour, int radius);

/* Draws a drop shadow from a path. */
Graphics.drawDropShadowFromPath(var path, var area, var colour, int radius, var offset);

/* Draws a ellipse in the given area. */
Graphics.drawEllipse(var area, float lineThickness);

/* Draws the spectrum of the FFT object to the panel. */
Graphics.drawFFTSpectrum(var fftObject, var area);

/* Tries to draw a text string inside a given space. */
Graphics.drawFittedText(String text, var area, String alignment, int maxLines, float scale);

/* Draws a (non interpolated) horizontal line. */
Graphics.drawHorizontalLine(int y, float x1, float x2);

/* Draws a image into the area. */
Graphics.drawImage(String imageName, var area, int xOffset, int yOffset);

/* Draws a line. */
Graphics.drawLine(float x1, float x2, float y1, float y2, float lineThickness);

/* Draws the text of the given markdown renderer to its specified area. */
Graphics.drawMarkdownText(var markdownRenderer);

/* Break to new lines when the text becomes wider than maxWidth. */
Graphics.drawMultiLineText(String text, var xy, int maxWidth, String alignment, float leading);

/* Draws the given path. */
Graphics.drawPath(var path, var area, var strokeStyle);

/* Draws a rectangle. */
Graphics.drawRect(var area, float borderSize);

/* fills the entire component with a random colour to indicate a UI repaint. */
Graphics.drawRepaintMarker( String label);

/* Draws a rounded rectangle. cornerData can be either a float number (for the corner size) or a JSON object for more customization options. */
Graphics.drawRoundedRectangle(var area, var cornerData, float borderSize);

/* Draws a SVG object within the given bounds and opacity. */
Graphics.drawSVG(var svgObject, var bounds, float opacity);

/* Draws a centered and vertically stretched text. */
Graphics.drawText(String text, var area);

/* Draws a triangle rotated by the angle in radians. */
Graphics.drawTriangle(var area, float angle, float lineThickness);

/* Draws a (non interpolated) vertical line. */
Graphics.drawVerticalLine(int x, float y1, float y2);

/* flushes the current layer. */
Graphics.endLayer();

/* Fills the whole area with the given colour. */
Graphics.fillAll(var colour);

/* Fills a ellipse in the given area. */
Graphics.fillEllipse(var area);

/* Fills a Path. */
Graphics.fillPath(var path, var area);

/* Fills a rectangle with the given colour. */
Graphics.fillRect(var area);

/* Fills a rounded rectangle. cornerData can be either a float number (for the corner size) or a JSON object for more customization options. */
Graphics.fillRoundedRectangle(var area, var cornerData);

/* Fills a triangle rotated by the angle in radians. */
Graphics.fillTriangle(var area, float angle);

/* Flips the canvas at the center. */
Graphics.flip(bool horizontally, var totalArea);

/* Applies gaussian blur to the current layer. */
Graphics.gaussianBlur(var blurAmount);

/* Returns the width of the string using the current font. */
Graphics.getStringWidth(String text);

/* Rotates the canvas around center `[x, y]` by the given amount in radian. */
Graphics.rotate(var angleInRadian, var center);

/* Sets the current colour. */
Graphics.setColour(var colour);

/* Sets the current font. */
Graphics.setFont(String fontName, float fontSize);

/* Sets the current font with the specified spacing between the characters. */
Graphics.setFontWithSpacing(String fontName, float fontSize, float spacing);

/* Sets the current gradient via an array [Colour1, x1, y1, Colour2, x2, y2] */
Graphics.setGradientFill(var gradientData);

/* Sets a global transparency level. */
Graphics.setOpacity(float alphaValue);


```
### API Class: LorisManager

```javascript
/* Analyse a file. */
LorisManager.analyse(var file, double estimatedRootFrequency);

/* Creates a list of path of every channel from the envelope of the given parameter and harmonic index. */
LorisManager.createEnvelopePaths(var file, String parameter, int harmonicIndex);

/* Creates an audio rate envelope from the given parameter and harmonic index. */
LorisManager.createEnvelopes(var file, String parameter, int harmonicIndex);

/* Creates a parameter value list for each harmonic at the given time. */
LorisManager.createSnapshot(var file, String parameter, double time);

/* Returns the setting value for the Loris algorithm. */
LorisManager.get(String optionId);

/* Processes the partial list using predefined commands. */
LorisManager.process(var file, String command, var data);

/* Processes the partial list using the given function. */
LorisManager.processCustom(var file, var processCallback);

/* set a option for the Loris algorithm. */
LorisManager.set(String optionId, var newValue);

/* Resynthesise the file from the partial lists. Returns an array of variant buffers. */
LorisManager.synthesise(var file);


```
### API Class: MacroHandler

```javascript
/* Returns an object that contains the macro connection data. */
MacroHandler.getMacroDataObject();

/* Enables the "exclusive" mode for MIDI automation (only one active parameter for each controller). */
MacroHandler.setExclusiveMode(bool shouldBeExclusive);

/* Rebuilds the macro connections from the JSON object. */
MacroHandler.setMacroDataFromObject(var jsonData);

/* Set a callback to be notified when a macro connection changes. */
MacroHandler.setUpdateCallback(var callback);


```
### API Class: MarkdownRenderer

```javascript
/* Returns the current style data. */
MarkdownRenderer.getStyleData();

/* Creates an image provider from the given JSON data that resolves image links. */
MarkdownRenderer.setImageProvider(var data);

/* Sets the style data for the markdown renderer. */
MarkdownRenderer.setStyleData(var styleData);

/* Set the markdown text to be displayed. */
MarkdownRenderer.setText( String markdownText);

/* Parses the text for the specified area and returns the used height (might be more or less than the height of the area passed in). */
MarkdownRenderer.setTextBounds(var area);


```
### API Class: Math

```javascript
/* Returns the absolute (unsigned) value. */
Math.abs(var value);

/* Calculates the acosine value (radian based). */
Math.acos(var value);

/* Calculates the acosh value (radian based). */
Math.acosh(var value);

/* Calculates the asine value (radian based). */
Math.asin(var value);

/* Calculates the asinh value (radian based). */
Math.asinh(var value);

/* Calculates the atan value (radian based). */
Math.atan(var value);

/* Calculates the atanh value (radian based). */
Math.atanh(var value);

/* Rounds up the value. */
Math.ceil(var value);

/* Calculates the cosine value (radian based). */
Math.cos(var value);

/* Calculates the cosh value (radian based). */
Math.cosh(var value);

/* Calculates the exp value. */
Math.exp(var value);

/* Rounds down the value. */
Math.floor(var value);

/* Returns the remainder when dividing value with limit. */
Math.fmod(var value, var limit);

/* Converts a normalised value (between 0 and 1) to a range defined by the JSON data in rangeObj. */
Math.from0To1(var value, var rangeObj);

/* Checks for infinity. */
Math.isinf(var value);

/* Checks for NaN (invalid floating point value). */
Math.isnan(var value);

/* Calculates the log value (with base E). */
Math.log(var value);

/* Calculates the log value (with base 10). */
Math.log10(var value);

/* Returns the bigger number. */
Math.max(var first, var second);

/* Returns the smaller number. */
Math.min(var first, var second);

/* Calculates the power of base and exponent. */
Math.pow(var base, var exp);

/* Returns a random integer between the low and the high values. */
Math.randInt(var low, var high);

/* Returns a random number between 0.0 and 1.0. */
Math.random();

/* Limits the value to the given range. */
Math.range(var value, var lowerLimit, var upperLimit);

/* Rounds the value to the next integer. */
Math.round(var value);

/* Sets infinity & NaN floating point numbers to zero. */
Math.sanitize(var value);

/* Returns the sign of the value. */
Math.sign(var value);

/* Calculates the sine value (radian based). */
Math.sin(var value);

/* Calculates the sinh value (radian based). */
Math.sinh(var value);

/* Returns the skew factor for the given mid point. */
Math.skew(var start, var end, var midPoint);

/* Calculates a smooth transition between the lower and the upper value. */
Math.smoothstep(var input, var lower, var upper);

/* Calculates the square (x*x) of the value. */
Math.sqr(var value);

/* Calculates the square root of the value. */
Math.sqrt(var value);

/* Calculates the tan value (radian based). */
Math.tan(var value);

/* Calculates the tanh value (radian based). */
Math.tanh(var value);

/* Converts a value inside a range defined by the JSON data in range obj to a normalised value. */
Math.to0To1(var value, var rangeObj);

/* Converts radian (0...2*PI) to degree (0...3600). */
Math.toDegrees(var value);

/* Converts degree (0...3600) to radian (0...2*PI). */
Math.toRadians(var value);

/* Wraps the value around the limit (always positive). */
Math.wrap(var value, var limit);


```
### API Class: Message

```javascript
/* Delays the event by the sampleAmount. */
Message.delayEvent(int samplesToDelay);

/* Returns the MIDI Channel from 1 to 16. */
Message.getChannel();

/* Returns the coarse detune amount in semitones. */
Message.getCoarseDetune();

/* returns the controller number or 'undefined', if the message is neither controller nor pitch wheel nor aftertouch. */
Message.getControllerNumber();

/* Returns the value of the controller. */
Message.getControllerValue();

/* Returns the event id of the current message. */
Message.getEventId();

/* Returns the fine detune amount int cents. */
Message.getFineDetune();

/* Returns the volume of the note. */
Message.getGain();

/* Returns the aftertouch value of the monophonic aftertouch message. */
Message.getMonophonicAftertouchPressure();

/* Return the note number. This can be called only on midi event callbacks. */
Message.getNoteNumber();

/* Returns the polyphonic aftertouch note number. */
Message.getPolyAfterTouchNoteNumber();

/* Checks if the message is a POLYPHONIC aftertouch message (Use isChannelPressure() for monophonic aftertouch). */
Message.getPolyAfterTouchPressureValue();

/* Returns the program change number or -1 if it isn't a program change message. */
Message.getProgramChangeNumber();

/* Returns the timestamp of the message. */
Message.getTimestamp();

/* Gets the tranpose value. */
Message.getTransposeAmount();

/* Returns the Velocity. */
Message.getVelocity();

/* Ignores the event. */
Message.ignoreEvent(bool shouldBeIgnored=true);

/* Checks if the event was created by a script earlier. */
Message.isArtificial();

/* Checks if the message is a MONOPHONIC aftertouch message. */
Message.isMonophonicAfterTouch();

/* Checks if the message is a POLYPHONIC aftertouch message (Use isChannelPressure() for monophonic aftertouch). */
Message.isPolyAftertouch();

/* Checks if the message is a program change message. */
Message.isProgramChange();

/* Creates a artificial copy of this event and returns the new event ID. If the event is already artificial it will return the event ID. */
Message.makeArtificial();

/* Creates a artificial copy of this event and returns the new event ID. If the event is artificial it will make a new one with a new ID. */
Message.makeArtificialOrLocal();

/* This will forward the message to the MIDI out of the plugin. */
Message.sendToMidiOut();

/* Sets a callback that will be performed when an all notes off message is received. */
Message.setAllNotesOffCallback(var onAllNotesOffCallback);

/* Changes the MIDI channel from 1 to 16. */
Message.setChannel(int newChannel);

/* Sets the coarse detune amount in semitones. */
Message.setCoarseDetune(int semiToneDetune);

/* Changes the ControllerNumber. */
Message.setControllerNumber(int newControllerNumber);

/* Changes the controller value (range 0 - 127). */
Message.setControllerValue(int newControllerValue);

/* Sets the fine detune amount in cents. */
Message.setFineDetune(int cents);

/* Sets the volume of the note (-100 = silence). */
Message.setGain(int gainInDecibels);

/* Sets the pressure value of the monophonic aftertouch message */
Message.setMonophonicAfterTouchPressure(int pressure);

/* Changes the note number. */
Message.setNoteNumber(int newNoteNumber);

/* Copied from MidiMessage. */
Message.setPolyAfterTouchNoteNumberAndPressureValue(int noteNumber, int aftertouchAmount);

/* Sets the start offset for the given message. */
Message.setStartOffset(int newStartOffset);

/* Transposes the note on. */
Message.setTransposeAmount(int tranposeValue);

/* Changes the velocity (range 1 - 127). */
Message.setVelocity(int newVelocity);

/* Stores a copy of the current event into the given holder object. */
Message.store(var messageEventHolder);


```
### API Class: MessageHolder

```javascript
/* Adds the given sample amount to the current timestamp. */
MessageHolder.addToTimestamp(int deltaSamples);

/* Returns a copy of this message holder object. */
MessageHolder.clone();

/* Creates a info string for debugging. */
MessageHolder.dump();

/* Returns the MIDI Channel from 1 to 16. */
MessageHolder.getChannel();

/* Returns the coarse detune amount in semitones. */
MessageHolder.getCoarseDetune();

/* returns the controller number or 'undefined', if the message is neither controller nor pitch wheel nor aftertouch. */
MessageHolder.getControllerNumber();

/* Returns the value of the controller. */
MessageHolder.getControllerValue();

/* Returns the event id of the current message. */
MessageHolder.getEventId();

/* Returns the fine detune amount int cents. */
MessageHolder.getFineDetune();

/* Returns the volume of the note. */
MessageHolder.getGain();

/* Returns the aftertouch value of the monophonic aftertouch message. */
MessageHolder.getMonophonicAftertouchPressure();

/* Return the note number. This can be called only on midi event callbacks. */
MessageHolder.getNoteNumber();

/* Returns the polyphonic aftertouch note number. */
MessageHolder.getPolyAfterTouchNoteNumber();

/* Checks if the message is a POLYPHONIC aftertouch message (Use isChannelPressure() for monophonic aftertouch). */
MessageHolder.getPolyAfterTouchPressureValue();

/* Returns the current timestamp. */
MessageHolder.getTimestamp();

/* Gets the tranpose value. */
MessageHolder.getTransposeAmount();

/* Returns the Velocity. */
MessageHolder.getVelocity();

/* Ignores the event. */
MessageHolder.ignoreEvent(bool shouldBeIgnored=true);

/* Returns true if the event is a CC controller event. */
MessageHolder.isController();

/* Checks if the message is a MONOPHONIC aftertouch message. */
MessageHolder.isMonophonicAfterTouch();

/* Returns true if the event is a note-off event. */
MessageHolder.isNoteOff();

/* Returns true if the event is a note-on event. */
MessageHolder.isNoteOn();

/* Checks if the message is a POLYPHONIC aftertouch message (Use isChannelPressure() for monophonic aftertouch). */
MessageHolder.isPolyAftertouch();

/* Changes the MIDI channel from 1 to 16. */
MessageHolder.setChannel(int newChannel);

/* Sets the coarse detune amount in semitones. */
MessageHolder.setCoarseDetune(int semiToneDetune);

/* Changes the ControllerNumber. */
MessageHolder.setControllerNumber(int newControllerNumber);

/* Changes the controller value (range 0 - 127). */
MessageHolder.setControllerValue(int newControllerValue);

/* Sets the fine detune amount in cents. */
MessageHolder.setFineDetune(int cents);

/* Sets the volume of the note (-100 = silence). */
MessageHolder.setGain(int gainInDecibels);

/* Sets the pressure value of the monophonic aftertouch message */
MessageHolder.setMonophonicAfterTouchPressure(int pressure);

/* Changes the note number. */
MessageHolder.setNoteNumber(int newNoteNumber);

/* Copied from MidiMessage. */
MessageHolder.setPolyAfterTouchNoteNumberAndPressureValue(int noteNumber, int aftertouchAmount);

/* Sets the start offset. */
MessageHolder.setStartOffset(int offset);

/* Sets the timestamp in samples. */
MessageHolder.setTimestamp(int timestampSamples);

/* Transposes the note on. */
MessageHolder.setTransposeAmount(int tranposeValue);

/* Sets the type of the event. */
MessageHolder.setType(int type);

/* Changes the velocity (range 1 - 127). */
MessageHolder.setVelocity(int newVelocity);


```
### API Class: MidiAutomationHandler

```javascript
/* Returns an object that contains the MIDI automation data. */
MidiAutomationHandler.getAutomationDataObject();

/* Sets the MIDI automation from the automation data object. */
MidiAutomationHandler.setAutomationDataFromObject(var automationData);

/* Sets whether a automated MIDI CC message should be consumed by the automation handler (default is enabled). */
MidiAutomationHandler.setConsumeAutomatedControllers(bool shouldBeConsumed);

/* Replaces the names in the popup. */
MidiAutomationHandler.setControllerNumberNames(var ccName, var nameArray);

/* Sets the numbers that are displayed in the MIDI automation popup. */
MidiAutomationHandler.setControllerNumbersInPopup(var numberArray);

/* Enables the "exclusive" mode for MIDI automation (only one active parameter for each controller). */
MidiAutomationHandler.setExclusiveMode(bool shouldBeExclusive);

/* Set a function (with one parameter containing the automation data as JSON) that will be executed whenever the MIDI automation changes. */
MidiAutomationHandler.setUpdateCallback(var callback);


```
### API Class: MidiList

```javascript
/* Clears the MidiList to -1. */
MidiList.clear();

/* Fills the MidiList with a number specified with valueToFill. */
MidiList.fill(int valueToFill);

/* Encodes all values into a base64 encoded string for storage. */
MidiList.getBase64String();

/* Returns the first index that contains this value. */
MidiList.getIndex(int value);

/* Returns the number of values that are not -1. */
MidiList.getNumSetValues();

/* Returns the value at the given number. */
MidiList.getValue(int index);

/* Returns the number of occurences of 'valueToCheck' */
MidiList.getValueAmount(int valueToCheck);

/* Checks if the list contains any data. */
MidiList.isEmpty();

/* Restore the values from a String that was created with getBase64String(). */
MidiList.restoreFromBase64String(String base64encodedValues);

/* Sets a range of items to the same value. */
MidiList.setRange(int startIndex, int numToFill, int value);

/* Sets the number to something between -127 and 128. */
MidiList.setValue(int index, int value);


```
### API Class: MidiPlayer

```javascript
/* Returns a typed MIDI processor reference (for setting attributes etc). */
MidiPlayer.asMidiProcessor();

/* Removes all sequences and tracks. */
MidiPlayer.clearAllSequences();

/* Connects this MIDI player to the given metronome. */
MidiPlayer.connectToMetronome(var metronome);

/* Connect this to the panel and it will be automatically updated when something changes. */
MidiPlayer.connectToPanel(var panel);

/* Converts a given array of Message holders to a rectangle list. */
MidiPlayer.convertEventListToNoteRectangles(var eventList, var targetBounds);

/* Creates an empty sequence with the given length. */
MidiPlayer.create(int nominator, int denominator, int barLength);

/* Writes the given array of MessageHolder objects into the current sequence. This is undoable. */
MidiPlayer.flushMessageList(var messageList);

/* Writes the given array of MessageHolder objects into the sequence with the given (one-based!) index. This is undoable. */
MidiPlayer.flushMessageListToSequence(var messageList, int sequenceIndexOneBased);

/* Creates an array containing all MIDI messages wrapped into MessageHolders for processing. */
MidiPlayer.getEventList();

/* Creates an array containing all MIDI messages from the sequence with the given (one-based!) index into Message Holders. */
MidiPlayer.getEventListFromSequence(int sequenceIndexOneBased);

/* Returns the position of the last played note. */
MidiPlayer.getLastPlayedNotePosition();

/* Returns a list of all MIDI files that are embedded in the plugin. */
MidiPlayer.getMidiFileList();

/* Returns an array containing all notes converted to the space supplied with the target bounds [x, y, w, h]. */
MidiPlayer.getNoteRectangleList(var targetBounds);

/* Returns the number of loaded sequences. */
MidiPlayer.getNumSequences();

/* Returns the number of tracks in the current sequence. */
MidiPlayer.getNumTracks();

/* Returns the playback position in the current loop between 0.0 and 1.0. */
MidiPlayer.getPlaybackPosition();

/* Returns the play state (0 = stop, 1 = play, 2 = recording. */
MidiPlayer.getPlayState();

/* Returns the tick resolution for a quarter note. */
MidiPlayer.getTicksPerQuarter();

/* Returns an object with properties about the length of the current sequence. */
MidiPlayer.getTimeSignature();

/* Returns an object with properties about the length of the sequence with the given index. */
MidiPlayer.getTimeSignatureFromSequence(int index);

/* Checks if the MIDI player contains a sequence to read / write. */
MidiPlayer.isEmpty();

/* Returns true if the sequence with the given (one-based!) index doesn't contain any midi data. */
MidiPlayer.isSequenceEmpty(int indexOneBased);

/* Starts playing. Use the timestamp to delay the event or use the currents event timestamp for sample accurate playback. */
MidiPlayer.play(int timestamp);

/* Starts recording (not yet implemented). Use the timestamp to delay the event or use the currents event timestamp for sample accurate playback. */
MidiPlayer.record(int timestamp);

/* Redo the last edit. */
MidiPlayer.redo();

/* Resets the current sequence to the last loaded file. */
MidiPlayer.reset();

/* Saves the current sequence into the given file at the track position. */
MidiPlayer.saveAsMidiFile(var file, int trackIndex);

/* This will send any CC messages from the MIDI file to the global MIDI handler. */
MidiPlayer.setAutomationHandlerConsumesControllerEvents(bool shouldBeEnabled);

/* Loads a MIDI file and switches to this sequence if specified. */
MidiPlayer.setFile(var fileName, bool clearExistingSequences, bool selectNewSequence);

/* Sets a global playback ratio (for all MIDI players). */
MidiPlayer.setGlobalPlaybackRatio(double globalRatio);

/* Attaches a callback with two arguments (timestamp, playState) that gets executed when the play state changes. */
MidiPlayer.setPlaybackCallback(var playbackCallback, var synchronous);

/* Sets the playback position in the current loop. Input must be between 0.0 and 1.0. */
MidiPlayer.setPlaybackPosition(var newPosition);

/* Sets a inline function that will process every note that is about to be recorded. */
MidiPlayer.setRecordEventCallback(var recordEventCallback);

/* If true, the panel will get a repaint() call whenever the playback position changes. */
MidiPlayer.setRepaintOnPositionChange(var shouldRepaintPanel);

/* Enables the (previously loaded) sequence with the given (one-based!) index. */
MidiPlayer.setSequence(int sequenceIndex);

/* Attaches a callback that gets executed whenever the sequence was changed. */
MidiPlayer.setSequenceCallback(var updateFunction);

/* Syncs the playback of this MIDI player to the master clock (external or internal). */
MidiPlayer.setSyncToMasterClock(bool shouldSyncToMasterClock);

/* Sets the timing information of the current sequence using the given object. */
MidiPlayer.setTimeSignature(var timeSignatureObject);

/* Sets the timing information of the sequence with the given index using the given object. */
MidiPlayer.setTimeSignatureToSequence(int index, var timeSignatureObject);

/* Sets the track index (starting with one). */
MidiPlayer.setTrack(int trackIndex);

/* If enabled, it uses the global undo manager for all edits (So you can use Engine.undo()). */
MidiPlayer.setUseGlobalUndoManager(bool shouldUseGlobalUndoManager);

/* Uses Ticks instead of samples when editing the MIDI data. */
MidiPlayer.setUseTimestampInTicks(bool shouldUseTicksAsTimestamps);

/* Starts playing. Use the timestamp to delay the event or use the currents event timestamp for sample accurate playback. */
MidiPlayer.stop(int timestamp);

/* Undo the last edit. */
MidiPlayer.undo();


```
### API Class: MidiProcessor

```javascript
/* Returns a reference of type ScriptedMidiPlayer that can be used to control the playback. */
MidiProcessor.asMidiPlayer();

/* Checks if the Object exists and prints a error message on the console if not. */
MidiProcessor.exists();

/* Export the control values (without the script). */
MidiProcessor.exportScriptControls();

/* Exports the state as base64 string. */
MidiProcessor.exportState();

/* Returns the attribute with the given index. */
MidiProcessor.getAttribute(int index);

/* Returns the ID of the attribute with the given index. */
MidiProcessor.getAttributeId(int index);

/* Returns the index of the attribute with the given ID. */
MidiProcessor.getAttributeIndex(String id);

/* Returns the ID of the MIDI Processor. */
MidiProcessor.getId();

/* Returns the number of attributes. */
MidiProcessor.getNumAttributes();

/* Checks if the MidiProcessor is bypassed. */
MidiProcessor.isBypassed();

/* Restores the control values for scripts (without recompiling). */
MidiProcessor.restoreScriptControls(String base64Controls);

/* Restores the state from a base64 string. */
MidiProcessor.restoreState(String base64State);

/* Sets the attribute of the MidiProcessor. If it is a script, then the index of the component is used. */
MidiProcessor.setAttribute(int index, float value);

/* Bypasses the MidiProcessor. */
MidiProcessor.setBypassed(bool shouldBeBypassed);


```
### API Class: Modifiers

```javascript

```
### API Class: Modulator

```javascript
/* Adds a and connects a receiver modulator for the given global modulator. */
Modulator.addGlobalModulator(var chainIndex, var globalMod, String modName);

/* Adds a modulator to the given chain and returns a reference. */
Modulator.addModulator(var chainIndex, var typeName, var modName);

/* Adds and connects a receiving static time variant modulator for the given global modulator. */
Modulator.addStaticGlobalModulator(var chainIndex, var timeVariantMod, String modName);

/* Returns a reference as table processor to modify the table or undefined if no table modulator. */
Modulator.asTableProcessor();

/* Connects a receive modulator to a global modulator. */
Modulator.connectToGlobalModulator(String globalModulationContainerId, String modulatorId);

/* Checks if the Object exists and prints a error message on the console if not. */
Modulator.exists();

/* Export the control values (without the script). */
Modulator.exportScriptControls();

/* Exports the state as base64 string. */
Modulator.exportState();

/* Returns the attribute with the given index. */
Modulator.getAttribute(int index);

/* Returns the ID of the attribute with the given index. */
Modulator.getAttributeId(int index);

/* Returns the index of the attribute with the given ID. */
Modulator.getAttributeIndex(String id);

/* Returns the current peak value of the modulator. */
Modulator.getCurrentLevel();

/* Returns the id of the global modulation container and global modulator this modulator is connected to */
Modulator.getGlobalModulatorId();

/* Returns the ID of the modulator. */
Modulator.getId();

/* Returns the intensity of the Modulator. Ranges: Gain: 0...1, Pitch: -12...12. */
Modulator.getIntensity();

/* Returns the Modulator chain with the given index. */
Modulator.getModulatorChain(var chainIndex);

/* Returns the number of attributes. */
Modulator.getNumAttributes();

/* Returns the Type of the modulator. */
Modulator.getType();

/* Returns true if the modulator works in bipolar mode. */
Modulator.isBipolar();

/* Checks if the modulator is bypassed. */
Modulator.isBypassed();

/* Restores the control values for scripts (without recompiling). */
Modulator.restoreScriptControls(String base64Controls);

/* Restores the state from a base64 string. */
Modulator.restoreState(String base64State);

/* Sets the attribute of the Modulator. You can look up the specific parameter indexes in the manual. */
Modulator.setAttribute(int index, float value);

/* Bypasses the Modulator. */
Modulator.setBypassed(bool shouldBeBypassed);

/* Changes the Intensity of the Modulator. Ranges: Gain Mode 0 ... 1, PitchMode -12 ... 12. */
Modulator.setIntensity(float newIntensity);

/* Sets the modulator to a bipolar range (if applicable). */
Modulator.setIsBipolar(bool shouldBeBipolar);


```
### API Class: ModuleIds

```javascript
/* Returns the name. */
ModuleIds.getObjectName()  override;


```
### API Class: NetworkTest

```javascript
/* Sets a function that will be executed at the given time to simulate live user input. */
NetworkTest.addRuntimeFunction(var f, int timestamp);

/* Checks whether the hash code of all compiled nodes match their network file. */
NetworkTest.checkCompileHashCodes();

/* Creates a ASCII diff with 'X' as error when the datas don't match. */
NetworkTest.createAsciiDiff(var data1, var data2, int numLines);

/* Creates a string that vaguely represents the buffer data content. */
NetworkTest.createBufferContentAsAsciiArt(var buffer, int numLines);

/* Creates a XML representation of the current network. */
NetworkTest.dumpNetworkAsXml();

/* Compares the two data types and returns a error message if they don't match. */
NetworkTest.expectEquals(var data1, var data2, float errorDb);

/* Returns an object containing the information about the project dll. */
NetworkTest.getDllInfo();

/* Returns the exception that was caused by the last test run (or empty if fine). */
NetworkTest.getLastTestException();

/* Returns the list of all nodes that can be compiled. */
NetworkTest.getListOfAllCompileableNodes();

/* Returns the list of all compiled nodes. */
NetworkTest.getListOfCompiledNodes();

/* runs the test and returns the buffer. */
NetworkTest.runTest();

/* Set the processing specifications for the test run. */
NetworkTest.setProcessSpecs(int numChannels, double sampleRate, int blockSize);

/* Sets a test property. */
NetworkTest.setTestProperty(String id, var value);

/* Sets a time to wait between calling prepare and processing the data. */
NetworkTest.setWaitingTime(int timeToWaitMs);


```
### API Class: NeuralNetwork

```javascript
/* Create a network using the given JSON for the layer setup. */
NeuralNetwork.build( var modelJSON);

/* Destroys the model and allows rebuilding using a different layout JSON. */
NeuralNetwork.clearModel();

/* Connects the network to a input and output global cable. */
NeuralNetwork.connectToGlobalCables(String inputId, String outputId);

/* Helper function to create a JSON model definition from the Pytorch print(model) output. */
NeuralNetwork.createModelJSONFromTextFile(var fileObject);

/* Returns the model JSON. */
NeuralNetwork.getModelJSON();

/* Loads the model from a NAM file. */
NeuralNetwork.loadNAMModel( var modelJSON);

/* Loads the ONNX runtime model for spectral analysis. */
NeuralNetwork.loadOnnxModel( var base64Data, int numOutputValues);

/* Loads the model layout and weights from a Pytorch model JSON. */
NeuralNetwork.loadPytorchModel( var modelJSON);

/* Loads the model layout and weights from a tensorflow model JSON. */
NeuralNetwork.loadTensorFlowModel( var modelJSON);

/* Loads the weights from the JSON object. */
NeuralNetwork.loadWeights( var weightData);

/* Runs inference on the given input and returns either a single float or a reference to the output buffer. */
NeuralNetwork.process(var input);

/* Processes the FFT spectrum and returns the output tensor as array of float numbers. */
NeuralNetwork.processFFTSpectrum(var fftObject, int numFreqPixels, int numTimePixels);

/* Resets the network pipeline. */
NeuralNetwork.reset();


```
### API Class: Node

```javascript
/* Connects this node to the given parameter target. sourceInfo is either the parameter name (String) or output slot (integer). */
Node.connectTo(var parameterTarget, var sourceInfo);

/* Connects the bypass button of this node to the given source info ("NodeId.ParameterId"). */
Node.connectToBypass(var sourceInfo);

/* Returns a property of the node. */
Node.get(var id);

/* Returns a list of child nodes if this node is a container. */
Node.getChildNodes(bool recursive);

/* Returns the index in the parent. */
Node.getIndexInParent();

/* Not necessarily the DSP network. */
Node.getNodeHolder();

/* Returns the number of parameters. */
Node.getNumParameters();

/* Returns a reference to a parameter. */
Node.getParameter(var indexOrId);

/* Checks if the node is inserted into the signal path. */
Node.isActive(bool checkRecursively);

/* Checks if the node is bypassed. */
Node.isBypassed();

/* Reset the node's internal state (eg. at voice start). */
Node.reset()=0;

/* Sets the property of the node. */
Node.set(var id, var value);

/* Bypasses the node. */
Node.setBypassed(bool shouldBeBypassed);

/* Sets the complex data type at the dataSlot to the given index and data (if embedded). */
Node.setComplexDataIndex(String dataType, int dataSlot, int indexValue);

/* Inserts the node into the given parent container. */
Node.setParent(var parentNode, int indexInParent);


```
### API Class: Path

```javascript
/* Adds an arc to the path. */
Path.addArc(var area, var fromRadians, var toRadians);

/* Adds an arrow to the path from start [x, y] and end [x, y]. */
Path.addArrow(var start, var end, var thickness, var headWidth, var headLength);

/* Adds an ellipse to the path. */
Path.addEllipse(var area);

/* Adds a polygon to the path from the center [x, y]. */
Path.addPolygon(var center, var numSides, var radius, var angle);

/* Adds a addQuadrilateral to the path. */
Path.addQuadrilateral(var xy1, var xy2, var xy3, var xy4);

/* Adds a rectangle to the path. */
Path.addRectangle(var area);

/* Adds a rounded rectangle to the path. */
Path.addRoundedRectangle(var area, var cornerSize);

/* Adds a fully customisable rounded rectangle to the path. area[x,y,w,h], cornerSizeXY[x,y], boolCurves[bool,bool,bool,bool] */
Path.addRoundedRectangleCustomisable(var area, var cornerSizeXY, var boolCurves);

/* Adds a star to the path from the center [x, y]. */
Path.addStar(var center, var numPoints, var innerRadius, var outerRadius, var angle);

/* Adds a triangle to the path. */
Path.addTriangle(var xy1, var xy2, var xy3);

/* Clears the Path. */
Path.clear();

/* Closes the Path. */
Path.closeSubPath();

/* Checks whether a point lies within the path. This is only relevant for closed paths. */
Path.contains(var point);

/* Creates a fillable path using the provided strokeData (with optional dot. */
Path.createStrokedPath(var strokeData, var dotData);

/* Adds a cubic bezier curve with two sets of control point arrays [cx1,cy1] and [cx2,cy2], and the end point [x,y]. */
Path.cubicTo(var cxy1, var cxy2, var x, var y);

/* Restores a path that has been converted into a string. */
Path.fromString(String stringPath);

/* Returns the area ([x, y, width, height]) that the path is occupying with the scale factor applied. */
Path.getBounds(var scaleFactor);

/* Returns the point where a line ([x1, y1], [x2, y2]) intersects the path when appropriate. Returns false otherwise. */
Path.getIntersection(var start, var end, bool keepSectionOutsidePath);

/* Returns the length of the path. */
Path.getLength();

/* Returns the point at a certain distance along the path. */
Path.getPointOnPath(var distanceFromStart);

/* Adds a line to [x,y]. */
Path.lineTo(var x, var y);

/* Loads a path from a data array. */
Path.loadFromData(var data);

/* Adds a quadratic bezier curve with the control point [cx,cy] and the end point [x,y]. */
Path.quadraticTo(var cx, var cy, var x, var y);

/* Creates a version of this path where all sharp corners have been replaced by curves. */
Path.roundCorners(var radius);

/* Rescales the path to make it fit neatly into a given space. preserveProportions keeps the w/h ratio. */
Path.scaleToFit(var x, var y, var width, var height, bool preserveProportions);

/* Starts a new Path. It does not clear the path, so use 'clear()' if you want to start all over again. */
Path.startNewSubPath(var x, var y);

/* Creates a base64 encoded representation of the path. */
Path.toBase64();

/* Creates a string representation of this path. */
Path.toString();


```
### API Class: Rectangle

```javascript
/* Override this method and assign the new value to the given id. */
Rectangle.assign( String id,  var newValue) override;

/* Tries to fit this rectangle within a target area, returning the result. */
Rectangle.constrainedWithin(var targetArea);

/* Returns true if this other rectangle is completely inside this one. */
Rectangle.contains(var otherRectOrPoint);

/* Returns a rectangle that is larger than this one by a given amount. */
Rectangle.expanded(double x, double optionalY);

/* Returns the intersection of both rectangles (the largest rectangle that fits into both rectangles. */
Rectangle.getIntersection(var otherRect);

/* Returns the smallest rectangle that contains both this one and the one passed-in. */
Rectangle.getUnion(var otherRect);

/* Returns true if any part of another rectangle overlaps this one. */
Rectangle.intersects(var otherRect);

/* Returns true if the rectangle's width or height are zero or less. */
Rectangle.isEmpty();

/* Returns a rectangle that is smaller than this one by a given amount. */
Rectangle.reduced(double x, double optionalY);

/* Removes a strip from the bottom of this rectangle, reducing this rectangle by the specified amount and returning the section that was removed. */
Rectangle.removeFromBottom(double numToRemove);

/* Removes a strip from the left of this rectangle, reducing this rectangle by the specified amount and returning the section that was removed. */
Rectangle.removeFromLeft(double numToRemove);

/* Removes a strip from the right of this rectangle, reducing this rectangle by the specified amount and returning the section that was removed. */
Rectangle.removeFromRight(double numToRemove);

/* Removes a strip from the top of this rectangle, reducing this rectangle by the specified amount and returning the section that was removed. */
Rectangle.removeFromTop(double numToRemove);

/* Returns a rectangle with the position and size being scaled by the given factors. */
Rectangle.scaled(double factorX, double optionalFactorY);

/* Changes the position of the rectangle's centre (leaving its size unchanged). */
Rectangle.setCentre(double centerX, double centerY);

/* Changes the position of the rectangle's top-left corner (leaving its size unchanged). */
Rectangle.setPosition(double x, double y);

/* Changes the rectangle's size, leaving the position of its top-left corner unchanged. */
Rectangle.setSize(double width, double height);

/* Returns a standard JS array with the position [x, y, w, h]. */
Rectangle.toArray();

/* Returns a rectangle which is the same as this one moved by a given amount. */
Rectangle.translated(double deltaX, double deltaY);

/* Returns the biggest rectangle that fits in this rectangle using the aspect ratio of the other rectangle. */
Rectangle.withAspectRatioLike(var otherRect);

/* Returns a new rectangle with a different bottom edge position, but the same top edge as this one. */
Rectangle.withBottom(double newBottom);

/* Returns a rectangle which has the same size and x-position as this one, but whose bottom edge has the given position. */
Rectangle.withBottomY(double newBottomY);

/* Returns a rectangle with the same size as this one, but a new centre position. */
Rectangle.withCentre(double newWidth, double newHeight);

/* Returns a rectangle which has the same position and width as this one, but with a different height. */
Rectangle.withHeight(double newHeight);

/* Returns a new rectangle with a different x position, but the same right-hand edge as this one. */
Rectangle.withLeft(double newLeft);

/* Returns a new rectangle with a different right-hand edge position, but the same left-hand edge as this one. */
Rectangle.withRight(double newRight);

/* Returns a rectangle with the same top-left position as this one, but a new size. */
Rectangle.withSize(double newWidth, double newHeight);

/* Returns a rectangle with the same centre position as this one, but a new size. */
Rectangle.withSizeKeepingCentre(double newWidth, double newHeight);

/* Returns a version of this rectangle with the given amount removed from its bottom edge. */
Rectangle.withTrimmedBottom(double amountToRemove);

/* Returns a version of this rectangle with the given amount removed from its left-hand edge. */
Rectangle.withTrimmedLeft(double amountToRemove);

/* Returns a version of this rectangle with the given amount removed from its right-hand edge. */
Rectangle.withTrimmedRight(double amountToRemove);

/* Returns a version of this rectangle with the given amount removed from its top edge. */
Rectangle.withTrimmedTop(double amountToRemove);

/* Returns a rectangle which has the same position and height as this one, but with a different width. */
Rectangle.withWidth(double newWidth);

/* Returns a rectangle which has the same size and y-position as this one, but with a different x-position. */
Rectangle.withX(double newX);

/* Returns a rectangle which has the same size and x-position as this one, but with a different y-position. */
Rectangle.withY(double newY);


```
### API Class: RoutingMatrix

```javascript
/* adds a connection to the given channels. */
RoutingMatrix.addConnection(int sourceIndex, int destinationIndex);

/* adds a send connection to the given channels. */
RoutingMatrix.addSendConnection(int sourceIndex, int destinationIndex);

/* Removes all connections. */
RoutingMatrix.clear();

/* Returns the output channel that is mapped to the given input channel (or -1). */
RoutingMatrix.getDestinationChannelForSource(var sourceIndex);

/* Gets the amount of destination channels. */
RoutingMatrix.getNumDestinationChannels();

/* Gets the amount of source channels. */
RoutingMatrix.getNumSourceChannels();

/* Returns one or multiple input channels that is mapped to the given output channel (or -1). */
RoutingMatrix.getSourceChannelsForDestination(var destinationIndex);

/* Gets the current peak value of the given channelIndex. */
RoutingMatrix.getSourceGainValue(int channelIndex);

/* Removes the connection from the given channels. */
RoutingMatrix.removeConnection(int sourceIndex, int destinationIndex);

/* removes the send connection. */
RoutingMatrix.removeSendConnection(int sourceIndex, int destinationIndex);

/* Sets the amount of channels (if the matrix is resizeable). */
RoutingMatrix.setNumChannels(int numSourceChannels);


```
### API Class: Sample

```javascript
/* Deletes the sample from the Sampler (not just this reference!). */
Sample.deleteSample();

/* Duplicates the sample. */
Sample.duplicateSample();

/* Returns the sample property. */
Sample.get(int propertyIndex);

/* Returns an object that can hold additional properties. */
Sample.getCustomProperties();

/* Returns the ID of the property (use this with the setFromJSONMethod). */
Sample.getId(int id);

/* Returns the value range that the given property can have (eg. the loop end might not go beyond the sample end. */
Sample.getRange(int propertyIndex);

/* Loads the sample into a array of buffers for analysis. */
Sample.loadIntoBufferArray();

/* Checks if the otherSample object refers to the same sample as this. */
Sample.refersToSameSample(var otherSample);

/* Writes the content of the audio data (array of buffers) into the audio file. This is undoable!. */
Sample.replaceAudioFile(var audioData);

/* Sets the sample property. */
Sample.set(int propertyIndex, var newValue);

/* Sets the properties from a JSON object. */
Sample.setFromJSON(var object);


```
### API Class: Sampler

```javascript
/* Clears the current samplemap. */
Sampler.clearSampleMap();

/* Returns a list of the sounds selected in the samplemap. */
Sampler.createListFromGUISelection();

/* Returns a list of the sounds selected by the selectSounds() method. */
Sampler.createListFromScriptSelection();

/* Returns an array with all samples that match this regex. */
Sampler.createSelection(String regex);

/* Returns an array with all samples from the index data (can be either int or array of int, -1 selects all.). */
Sampler.createSelectionFromIndexes(var indexData);

/* Returns an array with all samples that match the filter function. */
Sampler.createSelectionWithFilter(var filterFunction);

/* Enables / Disables the automatic round robin group start logic (works only on samplers). */
Sampler.enableRoundRobin(bool shouldUseRoundRobin);

/* Returns the currently (single) active RR group. */
Sampler.getActiveRRGroup();

/* Returns the RR group that is associated with the event ID. */
Sampler.getActiveRRGroupForEventId(int eventId);

/* Gets the attribute with the given index (use the constants for clearer code). */
Sampler.getAttribute(int index);

/* Returns the ID of the attribute with the given index. */
Sampler.getAttributeId(int index);

/* Returns the index of the attribute with the given ID. */
Sampler.getAttributeIndex(String id);

/* Converts the user preset data of a audio waveform to a base 64 samplemap. */
Sampler.getAudioWaveformContentAsBase64(var presetObj);

/* Returns the currently loaded sample map. */
Sampler.getCurrentSampleMapId();

/* Returns the name of the channel with the given index (Multimic samples only. */
Sampler.getMicPositionName(int channelIndex);

/* Returns the number of currently active groups. */
Sampler.getNumActiveGroups();

/* Returns the number of attributes. */
Sampler.getNumAttributes();

/* Returns the number of mic positions. */
Sampler.getNumMicPositions();

/* Returns the amount of selected samples. */
Sampler.getNumSelectedSounds();

/* Returns the current release start options as JSON object. */
Sampler.getReleaseStartOptions();

/* Returns the amount of actual RR groups for the notenumber and velocity */
Sampler.getRRGroupsForMessage(int noteNumber, int velocity);

/* Returns a base64 compressed string containing the entire samplemap. */
Sampler.getSampleMapAsBase64();

/* Returns an array with all available sample maps. */
Sampler.getSampleMapList();

/* Returns the property of the sound with the specified index. */
Sampler.getSoundProperty(int propertyIndex, int soundIndex);

/* Returns the current timestretching options as JSON object. */
Sampler.getTimestretchOptions();

/* Loads a few samples in the current samplemap and returns a list of references to these samples. */
Sampler.importSamples(var fileNameList, bool skipExistingSamples);

/* Checks if the mic position is purged. */
Sampler.isMicPositionPurged(int micIndex);

/* Checks whether the note number is mapped to any samples. */
Sampler.isNoteNumberMapped(int noteNumber);

/* Loads the content of the given sample into an array of VariantBuffers that can be used for analysis. */
Sampler.loadSampleForAnalysis(int indexInSelection);

/* Loads a new samplemap into this sampler. */
Sampler.loadSampleMap( String fileName);

/* Loads a base64 compressed string with the samplemap. */
Sampler.loadSampleMapFromBase64( String b64);

/* Loads a samplemap from a list of JSON objects. */
Sampler.loadSampleMapFromJSON(var jsonSampleMap);

/* Loads an SFZ file into the sampler. */
Sampler.loadSfzFile(var sfzFile);

/* Creates a JSON object from the sample file that can be used with loadSampleMapFromJSON. */
Sampler.parseSampleFile(var sampleFile);

/* Purges all samples of the given mic (Multimic samples only). */
Sampler.purgeMicPosition(String micName, bool shouldBePurged);

/* Purges the array of sampler sounds (and unpurges the rest). */
Sampler.purgeSampleSelection(var selection);

/* Refreshes the interface. Call this after you changed the properties. */
Sampler.refreshInterface();

/* Recalculates the RR Map. Call this at compile time if you want to use 'getRRGroupForMessage()'. */
Sampler.refreshRRMap();

/* Saves (and loads) the current samplemap to the given path (which should be the same string as the ID). */
Sampler.saveCurrentSampleMap(String relativePathWithoutXml);

/* Selects samples using the regex string as wildcard and the selectMode ("SELECT", "ADD", "SUBTRACT") */
Sampler.selectSounds(String regex);

/* Enables the group with the given index (one-based). Works only with samplers and `enableRoundRobin(false)`. */
Sampler.setActiveGroup(int activeGroupIndex);

/* Enables the group with the given index (one-based) for the given event ID. Works only with samplers and `enableRoundRobin(false)`. */
Sampler.setActiveGroupForEventId(int eventId, int activeGroupIndex);

/* Enable / disables the release start feature for the given event. */
Sampler.setAllowReleaseStart(int eventId, bool shouldBeAllowed);

/* Sets a attribute to the given value. */
Sampler.setAttribute(int index, var newValue);

/* Sets the currently selected samples on the interface to the given list. */
Sampler.setGUISelection(var sampleList, bool addToSelection);

/* Enables the group with the given index (one-based). Allows multiple groups to be active. */
Sampler.setMultiGroupIndex(var groupIndex, bool enabled);

/* Enables the group with the given index (one-based) for the given event id. Allows multiple groups to be active. */
Sampler.setMultiGroupIndexForEventId(int eventId, var groupIndex, bool enabled);

/* Sets the options for the release start behaviour. */
Sampler.setReleaseStartOptions(var newOptions);

/* Sets the volume of a particular group (use -1 for active group). Only works with disabled crossfade tables. */
Sampler.setRRGroupVolume(int groupIndex, int gainInDecibels);

/* Enables a presorting of the sounds into RR groups. This might improve the performance at voice start if you have a lot of samples (> 20.000) in many RR groups. */
Sampler.setSortByRRGroup(bool shouldSort);

/* Sets the property for the index within the selection. */
Sampler.setSoundProperty(int soundIndex, int propertyIndex, var newValue);

/* Sets the property for all samples of the sampler. */
Sampler.setSoundPropertyForAllSamples(int propertyIndex, var newValue);

/* Sets the property of the sampler sound for the selection. */
Sampler.setSoundPropertyForSelection(int propertyIndex, var newValue);

/* Sets the timestretching options from a JSON object. */
Sampler.setTimestretchOptions(var newOptions);

/* Sets the timestretch ratio for the sampler depending on its timestretch mode. */
Sampler.setTimestretchRatio(double newRatio);

/* Disables dynamic resizing when a sample map is loaded. */
Sampler.setUseStaticMatrix(bool shouldUseStaticMatrix);


```
### API Class: ScriptAudioWaveform

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptAudioWaveform.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptAudioWaveform.changed();

/* Returns a local look and feel if it was registered before. */
ScriptAudioWaveform.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptAudioWaveform.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptAudioWaveform.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptAudioWaveform.getAllProperties();

/* Returns list of component's children */
ScriptAudioWaveform.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptAudioWaveform.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptAudioWaveform.getGlobalPositionY();

/* Returns the height of the component. */
ScriptAudioWaveform.getHeight();

/* Returns the ID of the component. */
ScriptAudioWaveform.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptAudioWaveform.getLocalBounds(float reduceAmount);

/* Returns the current range end. */
ScriptAudioWaveform.getRangeEnd();

/* Returns the current range start. */
ScriptAudioWaveform.getRangeStart();

/* Returns the current value. */
ScriptAudioWaveform.getValue();

/* Returns the normalized value. */
ScriptAudioWaveform.getValueNormalized();

/* Returns the width of the component. */
ScriptAudioWaveform.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptAudioWaveform.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptAudioWaveform.loseFocus();

/* Connects this AudioFile to an existing ScriptAudioFile object. -1 sets it back to its internal data object. */
ScriptAudioWaveform.referToData(var audioData);

/* Registers this waveform to the script processor to be acessible from the outside. */
ScriptAudioWaveform.registerAtParent(int pIndex);

/* Manually sends a repaint message for the component. */
ScriptAudioWaveform.sendRepaintMessage();

/* Sets the property. */
ScriptAudioWaveform.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptAudioWaveform.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptAudioWaveform.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptAudioWaveform.setControlCallback(var controlFunction);

/* Set the folder to be used when opening the file browser. */
ScriptAudioWaveform.setDefaultFolder(var newDefaultFolder);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptAudioWaveform.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptAudioWaveform.setLocalLookAndFeel(var lafObject);

/* Sets the playback position. */
ScriptAudioWaveform.setPlaybackPosition(double normalisedPosition);

/* Sets the position of the component. */
ScriptAudioWaveform.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptAudioWaveform.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptAudioWaveform.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptAudioWaveform.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptAudioWaveform.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptAudioWaveform.setTooltip( String tooltip);

/* Sets the current value */
ScriptAudioWaveform.setValue(var newValue);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptAudioWaveform.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptAudioWaveform.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptAudioWaveform.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptAudioWaveform.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptAudioWaveform.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptAudioWaveform.updateValueFromProcessorConnection();


```
### API Class: ScriptButton

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptButton.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptButton.changed();

/* Returns a local look and feel if it was registered before. */
ScriptButton.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptButton.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptButton.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptButton.getAllProperties();

/* Returns list of component's children */
ScriptButton.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptButton.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptButton.getGlobalPositionY();

/* Returns the height of the component. */
ScriptButton.getHeight();

/* Returns the ID of the component. */
ScriptButton.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptButton.getLocalBounds(float reduceAmount);

/* Returns the current value. */
ScriptButton.getValue();

/* Returns the normalized value. */
ScriptButton.getValueNormalized();

/* Returns the width of the component. */
ScriptButton.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptButton.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptButton.loseFocus();

/* Manually sends a repaint message for the component. */
ScriptButton.sendRepaintMessage();

/* Sets the property. */
ScriptButton.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptButton.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptButton.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptButton.setControlCallback(var controlFunction);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptButton.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptButton.setLocalLookAndFeel(var lafObject);

/* Sets a FloatingTile that is used as popup. */
ScriptButton.setPopupData(var jsonData, var position);

/* Sets the position of the component. */
ScriptButton.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptButton.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptButton.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptButton.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptButton.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptButton.setTooltip( String tooltip);

/* Sets the current value */
ScriptButton.setValue(var newValue);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptButton.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptButton.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptButton.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptButton.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptButton.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptButton.updateValueFromProcessorConnection();


```
### API Class: ScriptComboBox

```javascript
/* Adds an item to a combo box. */
ScriptComboBox.addItem( String newName);

/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptComboBox.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptComboBox.changed();

/* Returns a local look and feel if it was registered before. */
ScriptComboBox.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptComboBox.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptComboBox.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptComboBox.getAllProperties();

/* Returns list of component's children */
ScriptComboBox.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptComboBox.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptComboBox.getGlobalPositionY();

/* Returns the height of the component. */
ScriptComboBox.getHeight();

/* Returns the ID of the component. */
ScriptComboBox.getId();

/* Returns the currently selected item text. */
ScriptComboBox.getItemText();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptComboBox.getLocalBounds(float reduceAmount);

/* Returns the current value. */
ScriptComboBox.getValue();

/* Returns the normalized value. */
ScriptComboBox.getValueNormalized();

/* Returns the width of the component. */
ScriptComboBox.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptComboBox.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptComboBox.loseFocus();

/* Manually sends a repaint message for the component. */
ScriptComboBox.sendRepaintMessage();

/* Sets the property. */
ScriptComboBox.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptComboBox.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptComboBox.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptComboBox.setControlCallback(var controlFunction);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptComboBox.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptComboBox.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptComboBox.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptComboBox.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptComboBox.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptComboBox.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptComboBox.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptComboBox.setTooltip( String tooltip);

/* Sets the current value */
ScriptComboBox.setValue(var newValue);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptComboBox.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptComboBox.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptComboBox.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptComboBox.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptComboBox.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptComboBox.updateValueFromProcessorConnection();


```
### API Class: ScriptedViewport

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptedViewport.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptedViewport.changed();

/* Returns a local look and feel if it was registered before. */
ScriptedViewport.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptedViewport.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptedViewport.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptedViewport.getAllProperties();

/* Returns list of component's children */
ScriptedViewport.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptedViewport.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptedViewport.getGlobalPositionY();

/* Returns the height of the component. */
ScriptedViewport.getHeight();

/* Returns the ID of the component. */
ScriptedViewport.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptedViewport.getLocalBounds(float reduceAmount);

/* Returns the index of the original data passed into setTableRowData. */
ScriptedViewport.getOriginalRowIndex(int rowIndex);

/* Returns the current value. */
ScriptedViewport.getValue();

/* Returns the normalized value. */
ScriptedViewport.getValueNormalized();

/* Returns the width of the component. */
ScriptedViewport.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptedViewport.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptedViewport.loseFocus();

/* Manually sends a repaint message for the component. */
ScriptedViewport.sendRepaintMessage();

/* Sets the property. */
ScriptedViewport.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptedViewport.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptedViewport.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptedViewport.setControlCallback(var controlFunction);

/* Specify the event types that should trigger a setValue() callback. */
ScriptedViewport.setEventTypesForValueCallback(var eventTypeList);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptedViewport.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptedViewport.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptedViewport.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptedViewport.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptedViewport.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptedViewport.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptedViewport.setStyleSheetPseudoState( String pseudoState);

/* Set a function that is notified for all user interaction with the table. */
ScriptedViewport.setTableCallback(var callbackFunction);

/* Define the columns of the table. This can only be done in the onInit callback. */
ScriptedViewport.setTableColumns(var columnMetadata);

/* Turns this viewport into a table with the given metadata. This can only be done in the onInit callback. */
ScriptedViewport.setTableMode(var tableMetadata);

/* Update the row data for the table. */
ScriptedViewport.setTableRowData(var tableData);

/* Sets a custom function that can be used in order to sort the table if the user clicks on a column header. */
ScriptedViewport.setTableSortFunction(var sortFunction);

/* Shows a informative text on mouse hover. */
ScriptedViewport.setTooltip( String tooltip);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptedViewport.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptedViewport.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptedViewport.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptedViewport.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptedViewport.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptedViewport.updateValueFromProcessorConnection();


```
### API Class: ScriptFloatingTile

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptFloatingTile.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptFloatingTile.changed();

/* Returns a local look and feel if it was registered before. */
ScriptFloatingTile.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptFloatingTile.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptFloatingTile.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptFloatingTile.getAllProperties();

/* Returns list of component's children */
ScriptFloatingTile.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptFloatingTile.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptFloatingTile.getGlobalPositionY();

/* Returns the height of the component. */
ScriptFloatingTile.getHeight();

/* Returns the ID of the component. */
ScriptFloatingTile.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptFloatingTile.getLocalBounds(float reduceAmount);

/* Returns the normalized value. */
ScriptFloatingTile.getValueNormalized();

/* Returns the width of the component. */
ScriptFloatingTile.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptFloatingTile.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptFloatingTile.loseFocus();

/* Manually sends a repaint message for the component. */
ScriptFloatingTile.sendRepaintMessage();

/* Sets the property. */
ScriptFloatingTile.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptFloatingTile.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptFloatingTile.setConsumedKeyPresses(var listOfKeys);

/* Sets the JSON object for the given floating tile. */
ScriptFloatingTile.setContentData(var data);

/* Pass a inline function for a custom callback event. */
ScriptFloatingTile.setControlCallback(var controlFunction);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptFloatingTile.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptFloatingTile.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptFloatingTile.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptFloatingTile.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptFloatingTile.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptFloatingTile.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptFloatingTile.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptFloatingTile.setTooltip( String tooltip);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptFloatingTile.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptFloatingTile.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptFloatingTile.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptFloatingTile.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptFloatingTile.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptFloatingTile.updateValueFromProcessorConnection();


```
### API Class: ScriptImage

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptImage.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptImage.changed();

/* Returns a local look and feel if it was registered before. */
ScriptImage.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptImage.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptImage.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptImage.getAllProperties();

/* Returns list of component's children */
ScriptImage.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptImage.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptImage.getGlobalPositionY();

/* Returns the height of the component. */
ScriptImage.getHeight();

/* Returns the ID of the component. */
ScriptImage.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptImage.getLocalBounds(float reduceAmount);

/* Returns the current value. */
ScriptImage.getValue();

/* Returns the normalized value. */
ScriptImage.getValueNormalized();

/* Returns the width of the component. */
ScriptImage.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptImage.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptImage.loseFocus();

/* Manually sends a repaint message for the component. */
ScriptImage.sendRepaintMessage();

/* Sets the property. */
ScriptImage.set(String propertyName, var value);

/* Sets the transparency (0.0 = full transparency, 1.0 = full opacity). */
ScriptImage.setAlpha(float newAlphaValue);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptImage.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptImage.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptImage.setControlCallback(var controlFunction);

/* Sets the image file that will be displayed. */
ScriptImage.setImageFile( String absoluteFileName, bool forceUseRealFile);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptImage.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptImage.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptImage.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptImage.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptImage.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptImage.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptImage.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptImage.setTooltip( String tooltip);

/* Sets the current value */
ScriptImage.setValue(var newValue);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptImage.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptImage.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptImage.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptImage.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptImage.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptImage.updateValueFromProcessorConnection();


```
### API Class: ScriptLabel

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptLabel.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptLabel.changed();

/* Returns a local look and feel if it was registered before. */
ScriptLabel.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptLabel.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptLabel.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptLabel.getAllProperties();

/* Returns list of component's children */
ScriptLabel.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptLabel.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptLabel.getGlobalPositionY();

/* Returns the height of the component. */
ScriptLabel.getHeight();

/* Returns the ID of the component. */
ScriptLabel.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptLabel.getLocalBounds(float reduceAmount);

/* Returns the current value. */
ScriptLabel.getValue()  override;

/* Returns the normalized value. */
ScriptLabel.getValueNormalized();

/* Returns the width of the component. */
ScriptLabel.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptLabel.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptLabel.loseFocus();

/* Manually sends a repaint message for the component. */
ScriptLabel.sendRepaintMessage();

/* Sets the property. */
ScriptLabel.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptLabel.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptLabel.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptLabel.setControlCallback(var controlFunction);

/* makes a label `editable`. */
ScriptLabel.setEditable(bool shouldBeEditable);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptLabel.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptLabel.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptLabel.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptLabel.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptLabel.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptLabel.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptLabel.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptLabel.setTooltip( String tooltip);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptLabel.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptLabel.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptLabel.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptLabel.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptLabel.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptLabel.updateValueFromProcessorConnection();


```
### API Class: ScriptLookAndFeel

```javascript
/* Checks if the image has been loaded into the look and feel obkect */
ScriptLookAndFeel.isImageLoaded(String prettyName);

/* Loads an image that can be used by the look and feel functions. */
ScriptLookAndFeel.loadImage(String imageFile, String prettyName);

/* Registers a function that will be used for the custom look and feel. */
ScriptLookAndFeel.registerFunction(var functionName, var function);

/* Set a global font. */
ScriptLookAndFeel.setGlobalFont( String fontName, float fontSize);

/* Parses CSS code and switches the look and feel to use the CSS renderer. */
ScriptLookAndFeel.setInlineStyleSheet( String cssCode);

/* Parses CSS code from a style sheet file in the scripts folder and switches the look and feel to use the CSS renderer. */
ScriptLookAndFeel.setStyleSheet( String fileName);

/* Sets a variable that can be queried from a style sheet. */
ScriptLookAndFeel.setStyleSheetProperty( String variableId, var value,  String type);

/* Unload all images from the look and feel object. */
ScriptLookAndFeel.unloadAllImages();


```
### API Class: ScriptModulationMatrix

```javascript
/* Adds a global modulator at the given mod chain for sample accurate modulation. */
ScriptModulationMatrix.addModulatorTarget(var targetData);

/* Adds a (low resolution) parameter modulation slot. */
ScriptModulationMatrix.addParameterTarget(var targetData);

/* Checks whether the modulation connection can be made. */
ScriptModulationMatrix.canConnect(String source, String target);

/* Removes all connections. */
ScriptModulationMatrix.clearAllConnections();

/* Adds (or removes) a connection from the source to the target. */
ScriptModulationMatrix.connect(String sourceId, String targetId, bool addConnection);

/* Loads the state from a previously exported Base64 string. */
ScriptModulationMatrix.fromBase64(String b64);

/* Get the component ID for the given modulation target ID. */
ScriptModulationMatrix.getComponentId(String targetId);

/* Get the connection data for the given component. */
ScriptModulationMatrix.getConnectionData(String componentId);

/* Creates a range object that can be passed into setTableRowData to update the slider range. */
ScriptModulationMatrix.getIntensitySliderData(String sourceId, String targetId);

/* Get the current modulation value for the connected component. */
ScriptModulationMatrix.getModValue(var component);

/* Return a list of all sources. */
ScriptModulationMatrix.getSourceList();

/* Get the target ID for the given component. */
ScriptModulationMatrix.getTargetId(String componentId);

/* Return a list of all targets. */
ScriptModulationMatrix.getTargetList();

/* Creates a JSON object that can be passed into the setTableRowData to update the combobox. */
ScriptModulationMatrix.getValueModeData(String sourceId, String targetId);

/* Set a callback that will be executed whenever the matrix state changes. */
ScriptModulationMatrix.setConnectionCallback(var updateFunction);

/* Set a callback that will be executed when the user clicks on "Edit connections". */
ScriptModulationMatrix.setEditCallback(var editFunction);

/* Sets the amount of modulation targets created for each [voice start, time-variant, envelope] modulation type. */
ScriptModulationMatrix.setNumModulationSlots(var numSlotArray);

/* Enables the undo manager for all modulation edit actions. */
ScriptModulationMatrix.setUseUndoManager(bool shouldUseUndoManager);

/* Creates a Base64 string of all connections. */
ScriptModulationMatrix.toBase64();

/* Update the connections in the list. */
ScriptModulationMatrix.updateConnectionData(var connectionList);

/* Update the intensity for the given connection. */
ScriptModulationMatrix.updateIntensity(String source, String target, float intensityValue);

/* Update the value mode from the combobox item ID. */
ScriptModulationMatrix.updateValueMode(String source, String target, String valueMode);


```
### API Class: ScriptMultipageDialog

```javascript
/* Adds an element to the parent with the given type and properties. */
ScriptMultipageDialog.add(int parentIndex, String type,  var properties);

/* Adds a modal page to the dialog that can be populated like a normal page and shown using showModalPage(). */
ScriptMultipageDialog.addModalPage();

/* Adds a page to the dialog and returns the element index of the page. */
ScriptMultipageDialog.addPage();

/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptMultipageDialog.addToMacroControl(int macroIndex);

/* Registers a callable object to the dialog and returns the codestring that calls it from within the dialogs Javascript engine. */
ScriptMultipageDialog.bindCallback(String id, var callback, var notificationType);

/* Closes the dialog (as if the user pressed the cancel button). */
ScriptMultipageDialog.cancel();

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptMultipageDialog.changed();

/* Returns a local look and feel if it was registered before. */
ScriptMultipageDialog.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Exports the entire dialog. */
ScriptMultipageDialog.exportAsMonolith(var optionalFile);

/* Toggles the visibility and fades a component using the global animator. */
ScriptMultipageDialog.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptMultipageDialog.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptMultipageDialog.getAllProperties();

/* Returns list of component's children */
ScriptMultipageDialog.getChildComponents();

/* Returns the value for the given element ID. */
ScriptMultipageDialog.getElementProperty(int elementId, String propertyId);

/* Returns the absolute x-position relative to the interface. */
ScriptMultipageDialog.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptMultipageDialog.getGlobalPositionY();

/* Returns the height of the component. */
ScriptMultipageDialog.getHeight();

/* Returns the ID of the component. */
ScriptMultipageDialog.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptMultipageDialog.getLocalBounds(float reduceAmount);

/* returns the state object for the dialog. */
ScriptMultipageDialog.getState();

/* Returns the normalized value. */
ScriptMultipageDialog.getValueNormalized();

/* Returns the width of the component. */
ScriptMultipageDialog.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptMultipageDialog.grabFocus();

/* Loads the dialog from a file (on the disk). */
ScriptMultipageDialog.loadFromDataFile(var fileObject);

/* Call this method in order to give away the focus for this component. */
ScriptMultipageDialog.loseFocus();

/* Navigates to the given page index. */
ScriptMultipageDialog.navigate(int pageIndex, bool submitCurrentPage);

/* Clears the dialog. */
ScriptMultipageDialog.resetDialog();

/* Sets the property. */
ScriptMultipageDialog.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptMultipageDialog.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptMultipageDialog.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptMultipageDialog.setControlCallback(var controlFunction);

/* Sets the property for the given element ID and updates the dialog. */
ScriptMultipageDialog.setElementProperty(int elementId, String propertyId,  var newValue);

/* Sets the value of the given element ID and calls the callback. */
ScriptMultipageDialog.setElementValue(int elementId, var value);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptMultipageDialog.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptMultipageDialog.setLocalLookAndFeel(var lafObject);

/* Registers a function that will be called when the dialog is finished. */
ScriptMultipageDialog.setOnFinishCallback(var onFinish);

/* Registers a function that will be called when the dialog shows a new page. */
ScriptMultipageDialog.setOnPageLoadCallback(var onPageLoad);

/* Sets the position of the component. */
ScriptMultipageDialog.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptMultipageDialog.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptMultipageDialog.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptMultipageDialog.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptMultipageDialog.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptMultipageDialog.setTooltip( String tooltip);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptMultipageDialog.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptMultipageDialog.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptMultipageDialog.setZLevel(String zLevel);

/* Shows the dialog (with optionally clearing the state. */
ScriptMultipageDialog.show(bool clearState);

/* Hides / Shows the control. */
ScriptMultipageDialog.showControl(bool shouldBeVisible);

/* Shows a modal page with the given index and the state object. */
ScriptMultipageDialog.showModalPage(int pageIndex, var modalState, var finishCallback);

/* This updates the internal content data object from the script processor. */
ScriptMultipageDialog.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptMultipageDialog.updateValueFromProcessorConnection();


```
### API Class: ScriptPanel

```javascript
/* Adds a child panel to this panel. */
ScriptPanel.addChildPanel();

/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptPanel.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptPanel.changed();

/* Closes the popup manually. */
ScriptPanel.closeAsPopup();

/* Returns a local look and feel if it was registered before. */
ScriptPanel.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptPanel.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptPanel.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptPanel.getAllProperties();

/* Returns a JSON object containing the data of the animation object. */
ScriptPanel.getAnimationData();

/* Returns list of component's children */
ScriptPanel.getChildComponents();

/* Returns a list of all panels that have been added as child panel. */
ScriptPanel.getChildPanelList();

/* Returns the absolute x-position relative to the interface. */
ScriptPanel.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptPanel.getGlobalPositionY();

/* Returns the height of the component. */
ScriptPanel.getHeight();

/* Returns the ID of the component. */
ScriptPanel.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptPanel.getLocalBounds(float reduceAmount);

/* Returns the panel that this panel has been added to with addChildPanel. */
ScriptPanel.getParentPanel();

/* Returns the current value. */
ScriptPanel.getValue();

/* Returns the normalized value. */
ScriptPanel.getValueNormalized();

/* Returns the width of the component. */
ScriptPanel.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptPanel.grabFocus();

/* Checks if the image has been loaded into the panel */
ScriptPanel.isImageLoaded(String prettyName);

/* Returns true if the popup is currently showing. */
ScriptPanel.isVisibleAsPopup();

/* Loads a image which can be drawn with the paint function later on. */
ScriptPanel.loadImage(String imageName, String prettyName);

/* Call this method in order to give away the focus for this component. */
ScriptPanel.loseFocus();

/* Removes the panel from its parent panel if it was created with addChildPanel(). */
ScriptPanel.removeFromParent();

/* Triggers an asynchronous repaint. */
ScriptPanel.repaint();

/* Calls the paint routine immediately. */
ScriptPanel.repaintImmediately();

/* Sets the property. */
ScriptPanel.set(String propertyName, var value);

/* Sets an JSON animation. */
ScriptPanel.setAnimation(String base64LottieAnimation);

/* Sets a frame to be displayed. */
ScriptPanel.setAnimationFrame(int numFrame);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptPanel.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptPanel.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptPanel.setControlCallback(var controlFunction);

/* If `allowedDragging` is enabled, it will define the boundaries where the panel can be dragged. */
ScriptPanel.setDraggingBounds(var area);

/* Sets a file drop callback. */
ScriptPanel.setFileDropCallback(String callbackLevel, String wildcard, var dropFunction);

/* Disables the paint routine and just uses the given (clipped) image. */
ScriptPanel.setImage(String imageName, int xOffset, int yOffset);

/* If this is set to true, the popup will be modal with a dark background that can be clicked to close. */
ScriptPanel.setIsModalPopup(bool shouldBeModal);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptPanel.setKeyPressCallback(var keyboardFunction);

/* Sets a loading callback that will be called when the preloading starts or finishes. */
ScriptPanel.setLoadingCallback(var loadingCallback);

/* Attaches the local look and feel to this component. */
ScriptPanel.setLocalLookAndFeel(var lafObject);

/* Sets a mouse callback. */
ScriptPanel.setMouseCallback(var mouseCallbackFunction);

/* Sets a Path as mouse cursor for this panel. */
ScriptPanel.setMouseCursor(var pathIcon, var colour, var hitPoint);

/* Sets a paint routine (a function with one parameter). */
ScriptPanel.setPaintRoutine(var paintFunction);

/* Sets a new value, stores this action in the undo manager and calls the control callbacks. */
ScriptPanel.setPanelValueWithUndo(var oldValue, var newValue, var actionName);

/* Sets a FloatingTile that is used as popup. The position is a array [x , y, width, height] that is used for the popup dimension */
ScriptPanel.setPopupData(var jsonData, var position);

/* Sets the position of the component. */
ScriptPanel.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptPanel.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptPanel.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptPanel.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptPanel.setStyleSheetPseudoState( String pseudoState);

/* Sets a timer callback. */
ScriptPanel.setTimerCallback(var timerCallback);

/* Shows a informative text on mouse hover. */
ScriptPanel.setTooltip( String tooltip);

/* Sets the current value */
ScriptPanel.setValue(var newValue);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptPanel.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptPanel.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptPanel.setZLevel(String zLevel);

/* Opens the panel as popup. */
ScriptPanel.showAsPopup(bool closeOtherPopups);

/* Hides / Shows the control. */
ScriptPanel.showControl(bool shouldBeVisible);

/* Starts dragging an external file (or a number of files). */
ScriptPanel.startExternalFileDrag(var fileOrFilesToDrag, bool moveOriginalFiles, var finishCallback);

/* Starts dragging something inside the UI. */
ScriptPanel.startInternalDrag(var dragData);

/* Unload all images from the panel. */
ScriptPanel.unloadAllImages();

/* This updates the internal content data object from the script processor. */
ScriptPanel.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptPanel.updateValueFromProcessorConnection();


```
### API Class: ScriptShader

```javascript
/* Compiles the code from the given base64 string. */
ScriptShader.fromBase64(String b64);

/* Returns a JSON object with the current OpenGL statistics. */
ScriptShader.getOpenGLStatistics();

/* Sets the blend mode for the shader. */
ScriptShader.setBlendFunc(bool enabled, int sFactor, int dFactor);

/* If this is enabled, the shader will create a buffered image of the last rendering result. */
ScriptShader.setEnableCachedBuffer(bool shouldEnableBuffer);

/* Loads a .glsl file from the script folder. */
ScriptShader.setFragmentShader(String shaderFile);

/* Adds a preprocessor definition before the code and recompiles the shader (Empty string removes all preprocessors). */
ScriptShader.setPreprocessor(String preprocessorString, var value);

/* Sets an uniform variable to be used in the shader code. */
ScriptShader.setUniformData( String id, var data);

/* Compresses the GLSL code and returns a encoded string snippet. */
ScriptShader.toBase64();


```
### API Class: ScriptSlider

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptSlider.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptSlider.changed();

/* Checks if the given value is within the range. */
ScriptSlider.contains(double value);

/* Returns a local look and feel if it was registered before. */
ScriptSlider.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Creates a object with constants for setModifiers(). */
ScriptSlider.createModifiers();

/* Toggles the visibility and fades a component using the global animator. */
ScriptSlider.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptSlider.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptSlider.getAllProperties();

/* Returns list of component's children */
ScriptSlider.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptSlider.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptSlider.getGlobalPositionY();

/* Returns the height of the component. */
ScriptSlider.getHeight();

/* Returns the ID of the component. */
ScriptSlider.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptSlider.getLocalBounds(float reduceAmount);

/* Returns the upper range end. */
ScriptSlider.getMaxValue();

/* Returns the lower range end. */
ScriptSlider.getMinValue();

/* Returns the current value. */
ScriptSlider.getValue();

/* Returns the normalized value. */
ScriptSlider.getValueNormalized()  override;

/* Returns the width of the component. */
ScriptSlider.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptSlider.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptSlider.loseFocus();

/* Manually sends a repaint message for the component. */
ScriptSlider.sendRepaintMessage();

/* Sets the property. */
ScriptSlider.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptSlider.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptSlider.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptSlider.setControlCallback(var controlFunction);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptSlider.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptSlider.setLocalLookAndFeel(var lafObject);

/* Sets the upper range end to the given value. */
ScriptSlider.setMaxValue(double max);

/* Sets the value that is shown in the middle position. */
ScriptSlider.setMidPoint(double valueForMidPoint);

/* Sets the lower range end to the given value. */
ScriptSlider.setMinValue(double min);

/* Sets the knob to the specified mode. */
ScriptSlider.setMode(String mode);

/* Sets the modifiers for different actions using a JSON object. */
ScriptSlider.setModifiers(String action, var modifiers);

/* Sets the position of the component. */
ScriptSlider.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptSlider.setPropertiesFromJSON( var jsonData);

/* Sets the range and the step size of the knob. */
ScriptSlider.setRange(double min, double max, double stepSize);

/* Sets the style Knob, Horizontal, Vertical. */
ScriptSlider.setStyle(String style);

/* Sets the given class selectors for the component stylesheet. */
ScriptSlider.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptSlider.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptSlider.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptSlider.setTooltip( String tooltip);

/* Sets the current value */
ScriptSlider.setValue(var newValue);

/* Set the value from a 0.0 to 1.0 range */
ScriptSlider.setValueNormalized(double normalizedValue) override;

/* Pass a function that takes a double and returns a String in order to override the popup display text. */
ScriptSlider.setValuePopupFunction(var newFunction);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptSlider.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptSlider.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptSlider.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptSlider.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptSlider.updateValueFromProcessorConnection();


```
### API Class: ScriptSliderPack

```javascript
/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptSliderPack.addToMacroControl(int macroIndex);

/* Returns a local look and feel if it was registered before. */
ScriptSliderPack.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptSliderPack.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptSliderPack.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptSliderPack.getAllProperties();

/* Returns list of component's children */
ScriptSliderPack.getChildComponents();

/* Returns a Buffer object containing all slider values (as reference). */
ScriptSliderPack.getDataAsBuffer();

/* Returns the absolute x-position relative to the interface. */
ScriptSliderPack.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptSliderPack.getGlobalPositionY();

/* Returns the height of the component. */
ScriptSliderPack.getHeight();

/* Returns the ID of the component. */
ScriptSliderPack.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptSliderPack.getLocalBounds(float reduceAmount);

/* Returns the number of sliders. */
ScriptSliderPack.getNumSliders();

/* Returns the value at the given index. */
ScriptSliderPack.getSliderValueAt(int index);

/* Returns the normalized value. */
ScriptSliderPack.getValueNormalized();

/* Returns the width of the component. */
ScriptSliderPack.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptSliderPack.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptSliderPack.loseFocus();

/* Connects this SliderPack to an existing SliderPackData object. -1 sets it back to its internal data object. */
ScriptSliderPack.referToData(var sliderPackData);

/* Registers this sliderpack to the script processor to be acessible from the outside. */
ScriptSliderPack.registerAtParent(int pIndex);

/* Manually sends a repaint message for the component. */
ScriptSliderPack.sendRepaintMessage();

/* Sets the property. */
ScriptSliderPack.set(String propertyName, var value);

/* Enables or disables the control callback execution when the SliderPack is changed via setAllValues. */
ScriptSliderPack.setAllValueChangeCausesCallback(bool shouldBeEnabled);

/* Sets all slider values to the given value. If value is a number it will be filled with the number. If it's a buffer (or array) it will set the values accordingly (without resizing the slider packs). */
ScriptSliderPack.setAllValues(var value);

/* Like setAllValues, but with undo support (if useUndoManager is enabled). */
ScriptSliderPack.setAllValuesWithUndo(var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptSliderPack.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptSliderPack.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptSliderPack.setControlCallback(var controlFunction);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptSliderPack.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptSliderPack.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptSliderPack.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptSliderPack.setPropertiesFromJSON( var jsonData);

/* sets the slider value at the given index. */
ScriptSliderPack.setSliderAtIndex(int index, double value);

/* Sets the given class selectors for the component stylesheet. */
ScriptSliderPack.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptSliderPack.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptSliderPack.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptSliderPack.setTooltip( String tooltip);

/* Sets a preallocated length that will retain values when the slider pack is resized below that limit. */
ScriptSliderPack.setUsePreallocatedLength(int numMaxSliders);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptSliderPack.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptSliderPack.setValueWithUndo(var newValue);

/* Sets a non-uniform width per slider using an array in the form [0.0, ... a[i], ... 1.0]. */
ScriptSliderPack.setWidthArray(var normalizedWidths);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptSliderPack.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptSliderPack.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptSliderPack.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptSliderPack.updateValueFromProcessorConnection();


```
### API Class: ScriptTable

```javascript
/* Adds a new table point (x and y are normalized coordinates). */
ScriptTable.addTablePoint(float x, float y);

/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptTable.addToMacroControl(int macroIndex);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptTable.changed();

/* Returns a local look and feel if it was registered before. */
ScriptTable.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Toggles the visibility and fades a component using the global animator. */
ScriptTable.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptTable.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptTable.getAllProperties();

/* Returns list of component's children */
ScriptTable.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptTable.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptTable.getGlobalPositionY();

/* Returns the height of the component. */
ScriptTable.getHeight();

/* Returns the ID of the component. */
ScriptTable.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptTable.getLocalBounds(float reduceAmount);

/* Returns the table value from 0.0 to 1.0 according to the input value from 0.0 to 1.0. */
ScriptTable.getTableValue(float inputValue);

/* Returns the current value. */
ScriptTable.getValue();

/* Returns the normalized value. */
ScriptTable.getValueNormalized();

/* Returns the width of the component. */
ScriptTable.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptTable.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptTable.loseFocus();

/* Connects it to a table data object (or UI element in the same interface). -1 sets it back to its internal data object. */
ScriptTable.referToData(var tableData);

/* Registers this table (and returns a reference to the data) with the given index so you can use it from the outside. */
ScriptTable.registerAtParent(int index);

/* Resets the table with the given index to a 0..1 line. */
ScriptTable.reset();

/* Manually sends a repaint message for the component. */
ScriptTable.sendRepaintMessage();

/* Sets the property. */
ScriptTable.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptTable.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptTable.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptTable.setControlCallback(var controlFunction);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptTable.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptTable.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptTable.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptTable.setPropertiesFromJSON( var jsonData);

/* Connects the table to an existing Processor. Makes the table snap to the given x positions (from 0.0 to 1.0). */
ScriptTable.setSnapValues(var snapValueArray);

/* Sets the given class selectors for the component stylesheet. */
ScriptTable.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptTable.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptTable.setStyleSheetPseudoState( String pseudoState);

/* Sets the point with the given index to the values. */
ScriptTable.setTablePoint(int pointIndex, float x, float y, float curve);

/* Pass a function that takes a double and returns a String in order to override the popup display text. */
ScriptTable.setTablePopupFunction(var newFunction);

/* Shows a informative text on mouse hover. */
ScriptTable.setTooltip( String tooltip);

/* Sets the current value */
ScriptTable.setValue(var newValue);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptTable.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptTable.setValueWithUndo(var newValue);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptTable.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptTable.showControl(bool shouldBeVisible);

/* This updates the internal content data object from the script processor. */
ScriptTable.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptTable.updateValueFromProcessorConnection();


```
### API Class: ScriptWebView

```javascript
/* Adds a buffer to be synchronised through the websocket. */
ScriptWebView.addBufferToWebSocket(int bufferIndex, var buffer);

/* Adds the knob / button to a macro controller (from 0 to 7). */
ScriptWebView.addToMacroControl(int macroIndex);

/* Binds a HiseScript function to a Javascript callback id. */
ScriptWebView.bindCallback( String callbackId,  var functionToCall);

/* Calls the JS function (in the global scope) with the given arguments. */
ScriptWebView.callFunction( String javascriptFunction,  var args);

/* Call this to indicate that the value has changed (the onControl callback will be executed. */
ScriptWebView.changed();

/* Returns a local look and feel if it was registered before. */
ScriptWebView.createLocalLookAndFeel(ScriptContentComponent *contentComponent, Component *componentToRegister);

/* Evaluates the code in the web view. You need to pass in an unique identifier so that it will initialise new web views correctly. */
ScriptWebView.evaluate( String identifier,  String jsCode);

/* Toggles the visibility and fades a component using the global animator. */
ScriptWebView.fadeComponent(bool shouldBeVisible, int milliseconds);

/* returns the value of the property. */
ScriptWebView.get(String propertyName);

/* Returns a list of all property IDs as array. */
ScriptWebView.getAllProperties();

/* Returns list of component's children */
ScriptWebView.getChildComponents();

/* Returns the absolute x-position relative to the interface. */
ScriptWebView.getGlobalPositionX();

/* Returns the absolute y-position relative to the interface. */
ScriptWebView.getGlobalPositionY();

/* Returns the height of the component. */
ScriptWebView.getHeight();

/* Returns the ID of the component. */
ScriptWebView.getId();

/* Returns a [x, y, w, h] array that was reduced by the given amount. */
ScriptWebView.getLocalBounds(float reduceAmount);

/* Returns the current value. */
ScriptWebView.getValue();

/* Returns the normalized value. */
ScriptWebView.getValueNormalized();

/* Returns the width of the component. */
ScriptWebView.getWidth();

/* Call this method in order to grab the keyboard focus for this component. */
ScriptWebView.grabFocus();

/* Call this method in order to give away the focus for this component. */
ScriptWebView.loseFocus();

/* Resets the entire webview. */
ScriptWebView.reset();

/* Manually sends a repaint message for the component. */
ScriptWebView.sendRepaintMessage();

/* Sends the data to the websocket. */
ScriptWebView.sendToWebSocket(String id, var data);

/* Sets the property. */
ScriptWebView.set(String propertyName, var value);

/* sets the colour of the component (BG, IT1, IT2, TXT). */
ScriptWebView.setColour(int colourId, int colourAs32bitHex);

/* Registers a selection of key presses to be consumed by this component. */
ScriptWebView.setConsumedKeyPresses(var listOfKeys);

/* Pass a inline function for a custom callback event. */
ScriptWebView.setControlCallback(var controlFunction);

/* Enables Websocket communication between HISE and the webview. */
ScriptWebView.setEnableWebSocket(int port);

/* Sets the HTML content to be used by the webview. */
ScriptWebView.setHtmlContent( String htmlCode);

/* Sets the file to be displayed by the WebView. */
ScriptWebView.setIndexFile(var indexFile);

/* Adds a callback to react on key presses (when this component is focused). */
ScriptWebView.setKeyPressCallback(var keyboardFunction);

/* Attaches the local look and feel to this component. */
ScriptWebView.setLocalLookAndFeel(var lafObject);

/* Sets the position of the component. */
ScriptWebView.setPosition(int x, int y, int w, int h);

/* Restores all properties from a JSON object. */
ScriptWebView.setPropertiesFromJSON( var jsonData);

/* Sets the given class selectors for the component stylesheet. */
ScriptWebView.setStyleSheetClass( String classIds);

/* Sets a variable for this component that can be queried from a style sheet. */
ScriptWebView.setStyleSheetProperty( String variableId,  var value,  String type);

/* Programatically sets a pseudo state (:hover, :active, :checked, :focus, :disabled) that will be used by the CSS renderer. */
ScriptWebView.setStyleSheetPseudoState( String pseudoState);

/* Shows a informative text on mouse hover. */
ScriptWebView.setTooltip( String tooltip);

/* Sets the current value */
ScriptWebView.setValue(var newValue);

/* Sets the current value from a range 0.0 ... 1.0. */
ScriptWebView.setValueNormalized(double normalizedValue);

/* Sets the current value and adds it to the undo list. Don't call this from onControl! */
ScriptWebView.setValueWithUndo(var newValue);

/* Registers a callable object to be notified for incoming messages from the websocket. */
ScriptWebView.setWebSocketCallback(var callbackFunction);

/* Changes the depth hierarchy (z-axis) of sibling components (Back, Default, Front or AlwaysOnTop). */
ScriptWebView.setZLevel(String zLevel);

/* Hides / Shows the control. */
ScriptWebView.showControl(bool shouldBeVisible);

/* Sends the buffer to the webview through the websocket connection. */
ScriptWebView.updateBuffer(int bufferIndex);

/* This updates the internal content data object from the script processor. */
ScriptWebView.updateContentPropertyInternal(int propertyId,  var newValue);

/* Updates the value from the processor connection. Call this method whenever the module state has changed and you want to refresh the knob value to show the current state. */
ScriptWebView.updateValueFromProcessorConnection();


```
### API Class: Server

```javascript
/* Calls a sub URL and executes the callback when finished. */
Server.callWithGET(String subURL, var parameters, var callback);

/* Calls a sub URL with POST arguments and executes the callback when finished. */
Server.callWithPOST(String subURL, var parameters, var callback);

/* Removes all finished downloads from the list. */
Server.cleanFinishedDownloads();

/* Downloads a file to the given target and returns a Download object. */
Server.downloadFile(String subURL, var parameters, var targetFile, var callback);

/* Returns a list of all pending Calls. */
Server.getPendingCalls();

/* Returns a list of all pending Downloads. */
Server.getPendingDownloads();

/* Checks if given email address is valid - not fool proof. */
Server.isEmailAddress(String email);

/* Returns true if the system is connected to the internet. */
Server.isOnline();

/* Resends the last call to the Server (eg. in case that there was no internet connection). */
Server.resendLastCall();

/* Sets the base URL for all server queries. */
Server.setBaseURL(String url);

/* Sets whether to append a trailing slash to each POST call (default is true). */
Server.setEnforceTrailingSlash(bool shouldAddSlash);

/* Adds the given String to the HTTP POST header. */
Server.setHttpHeader(String additionalHeader);

/* Sets the maximal number of parallel downloads. */
Server.setNumAllowedDownloads(int maxNumberOfParallelDownloads);

/* This function will be called whenever there is server activity. */
Server.setServerCallback(var callback);

/* Sets a string that is parsed as timeout message when the server doesn't respond. Default is "{}" (empty JSON object). */
Server.setTimeoutMessageString(String timeoutMessage);


```
### API Class: Settings

```javascript
/* Clears all MIDI CC assignments. */
Settings.clearMidiLearn();

/* Calls abort to terminate the program. You can use this to check your crash reporting workflow. */
Settings.crashAndBurn();

/* Returns available buffer sizes for the selected audio device. */
Settings.getAvailableBufferSizes();

/* Returns names of available audio devices. */
Settings.getAvailableDeviceNames();

/* Returns available audio device types. */
Settings.getAvailableDeviceTypes();

/* Returns array of available output channel pairs. */
Settings.getAvailableOutputChannels();

/* Returns array of available sample rate. */
Settings.getAvailableSampleRates();

/* Gets the current audio device name */
Settings.getCurrentAudioDevice();

/* Returns the current audio device type. */
Settings.getCurrentAudioDeviceType();

/* Returns the current buffer block size. */
Settings.getCurrentBufferSize();

/* Returns current output channel pair. */
Settings.getCurrentOutputChannel();

/* Returns the current output sample rate (-1 if no audio device selected) */
Settings.getCurrentSampleRate();

/* Returns current voice amount multiplier setting. */
Settings.getCurrentVoiceMultiplier();

/* Gets the Streaming Mode (0 -> Fast-SSD, 1 -> Slow-HDD) */
Settings.getDiskMode();

/* Returns array of MIDI input device names. */
Settings.getMidiInputDevices();

/* Returns an array of the form [width, height]. */
Settings.getUserDesktopSize();

/* Returns the UI Zoom factor. */
Settings.getZoomLevel();

/* Returns enabled state of midi channel (0 = All channels). */
Settings.isMidiChannelEnabled(int index);

/* Returns enabled state of midi input device. */
Settings.isMidiInputEnabled( String midiInputName);

/* Returns whether OpenGL is enabled or not. The return value might be out of sync with the actual state (after you changed this setting until the next reload). */
Settings.isOpenGLEnabled();

/* Sets the current audio device */
Settings.setAudioDevice(String name);

/* Sets the current audio device type */
Settings.setAudioDeviceType(String deviceName);

/* Sets the buffer block size for the selected audio device. */
Settings.setBufferSize(int newBlockSize);

/* Sets the Streaming Mode (0 -> Fast-SSD, 1 -> Slow-HDD) */
Settings.setDiskMode(int mode);

/* Enables or disables debug logging */
Settings.setEnableDebugMode(bool shouldBeEnabled);

/* Enable OpenGL. This setting will be applied the next time the interface is rebuild. */
Settings.setEnableOpenGL(bool shouldBeEnabled);

/* Sets the output channel pair */
Settings.setOutputChannel(int index);

/* Changes the sample folder. */
Settings.setSampleFolder(var sampleFolder);

/* Sets the output sample rate */
Settings.setSampleRate(double sampleRate);

/* Sets the voice limit multiplier (1, 2, 4, or 8). */
Settings.setVoiceMultiplier(int newVoiceAmount);

/* Changes the UI zoom (1.0 = 100%). */
Settings.setZoomLevel(double newLevel);

/* Starts the perfetto profile recording. */
Settings.startPerfettoTracing();

/* Stops the perfetto profile recording and dumps the data to the given file. */
Settings.stopPerfettoTracing(var traceFileToUse);

/* Enables or disables MIDI channel (0 = All channels). */
Settings.toggleMidiChannel(int index, bool value);

/* Enables or disables named MIDI input device. */
Settings.toggleMidiInput( String midiInputName, bool enableInput);


```
### API Class: SliderPackData

```javascript
/* Restores the data from the B64 string. */
SliderPackData.fromBase64( String b64);

/* Returns the currently displayed slider index. */
SliderPackData.getCurrentlyDisplayedIndex();

/* Returns a Buffer object containing all slider values (as reference). */
SliderPackData.getDataAsBuffer();

/* Returns the amount of sliders. */
SliderPackData.getNumSliders();

/* Returns the step size. */
SliderPackData.getStepSize();

/* Returns the value at the given position. */
SliderPackData.getValue(int index);

/* Links the sliderpack to the other slider pack. */
SliderPackData.linkTo(var other);

/* Sets all values. */
SliderPackData.setAllValues(var value);

/* Sets all values with an undo operation. */
SliderPackData.setAllValuesWithUndo(var value);

/* Enables undo support for []-operator assignments. */
SliderPackData.setAssignIsUndoable(bool shouldBeUndoable);

/* Sets a callback that is being executed when a point is added / removed / changed. */
SliderPackData.setContentCallback(var contentFunction);

/* Sets a callback that is being executed when the ruler position changes. */
SliderPackData.setDisplayCallback(var displayFunction);

/* Sets the amount of sliders. */
SliderPackData.setNumSliders(var numSliders);

/* Sets the range. */
SliderPackData.setRange(double minValue, double maxValue, double stepSize);

/* Sets a preallocated length that will retain values when the slider pack is resized below that limit. */
SliderPackData.setUsePreallocatedLength(int length);

/* Sets the value at the given position. */
SliderPackData.setValue(int sliderIndex, float value);

/* Sets a single value at the given position with undo support. */
SliderPackData.setValueWithUndo(int sliderIndex, float value);

/* Exports the data to a B64 string. */
SliderPackData.toBase64();


```
### API Class: SliderPackProcessor

```javascript
/* Creates a data reference to the given index. */
SliderPackProcessor.getSliderPack(int sliderPackIndex);


```
### API Class: SlotFX

```javascript
/* Clears the slot (loads a unity gain module). */
SlotFX.clear();

/* Checks if the Object exists and prints a error message on the console if not. */
SlotFX.exists();

/* Returns a reference to the currently loaded effect. */
SlotFX.getCurrentEffect();

/* Returns the ID of the effect that is currently loaded. */
SlotFX.getCurrentEffectId();

/* Returns the list of all available modules that you can load into the slot (might be empty if there is no compiled dll present). */
SlotFX.getModuleList();

/* Returns a JSON object containing all parameters with their range properties. */
SlotFX.getParameterProperties();

/* Bypasses the effect. This uses the soft bypass feature of the SlotFX module. */
SlotFX.setBypassed(bool shouldBeBypassed);

/* Loads the effect with the given name and returns a reference to it. */
SlotFX.setEffect(String effectName);

/* Swaps the effect with the other slot. */
SlotFX.swap(var otherSlot);


```
### API Class: String

```javascript
/* Converts a string to start case (first letter of every word is uppercase). */
String.capitalize();

/* Returns the character at the given index. */
String.charAt(int index);

/* Returns the character at the given position as ASCII number. */
String.charCodeAt(var index);

/* Joins two or more strings, and returns a new joined strings. */
String.concat(var stringlist);

/* Checks if the string contains the given substring. */
String.contains(String otherString);

/* Decrypt a string from Blowfish encryption. */
String.decrypt(var key);

/* Encrypt a string using Blowfish encryption. */
String.encrypt(var key);

/* Attempts to parse the string as integer number. */
String.getIntValue();

/* Attempts to parse a integer number at the end of the string. */
String.getTrailingIntValue();

/* Creates a unique hash from the string. */
String.hash();

/* Returns the position of the first found occurrence of a specified value in a string. */
String.indexOf(var substring);

/* Returns the position of the last found occurrence of a specified value in a string. */
String.lastIndexOf(var substring);

/* Returns a copy of the string and replaces all occurences of `a` with `b`. */
String.replace(var substringToLookFor, var replacement);

/* Splits the string into an array with the given separator. */
String.split(var separatorString);

/* Splits the string at uppercase characters (so MyValue becomes ["My", "Value"]. */
String.splitCamelCase();

/* Returns the substring in the given range. */
String.substring(int startIndex, int endIndex);

/* Converts a string to lowercase letters. */
String.toLowerCase();

/* Converts a string to uppercase letters. */
String.toUpperCase();

/* Returns a copy of this string with any whitespace characters removed from the start and end. */
String.trim();


```
### API Class: Synth

```javascript
/* Adds a controller to the buffer. */
Synth.addController(int channel, int number, int value, int timeStampSamples);

/* Adds a effect (index = -1 to append it at the end). */
Synth.addEffect( String type,  String id, int index);

/* Adds the event from the given holder and returns a event id for note ons. */
Synth.addMessageFromHolder(var messageHolder);

/* Adds a Modulator to the synth's chain. If it already exists, it returns the index. */
Synth.addModulator(int chainId,  String type,  String id);

/* Adds a note off to the buffer. */
Synth.addNoteOff(int channel, int noteNumber, int timeStampSamples);

/* Adds a note on to the buffer. */
Synth.addNoteOn(int channel, int noteNumber, int velocity, int timeStampSamples);

/* Adds a pitch fade to the given event ID. */
Synth.addPitchFade(int eventId, int fadeTimeMilliseconds, int targetCoarsePitch, int targetFinePitch);

/* Adds the interface to the Container's body (or the frontend interface if compiled) */
Synth.addToFront(bool addToFront);

/* Fades all voices with the given event id to the target volume (in decibels). */
Synth.addVolumeFade(int eventId, int fadeTimeMilliseconds, int targetVolume);

/* Attaches an artificial note to be stopped when the original note is stopped. */
Synth.attachNote(int originalNoteId, int artificialNoteId);

/* Creates a Builder object that can be used to create the module tree. */
Synth.createBuilder();

/* Defers all callbacks to the message thread (midi callbacks become read-only). */
Synth.deferCallbacks(bool makeAsynchronous);

/* Returns an array of all effects that match the given regex. */
Synth.getAllEffects(String regex);

/* Returns an array of all modulators that match the given regex. */
Synth.getAllModulators(String regex);

/* Returns the attribute of the parent synth. */
Synth.getAttribute(int attributeIndex);

/* Returns the child synth with the supplied name. */
Synth.getAudioSampleProcessor( String name);

/* Returns the child synth with the supplied name. */
Synth.getChildSynth( String name);

/* Returns the child synth with the given index. */
Synth.getChildSynthByIndex(int index);

/* Returns a reference to a processor that holds a display buffer. */
Synth.getDisplayBufferSource( String name);

/* Returns the Effect with the supplied name. Can only be called in onInit(). It looks also in all child processors. */
Synth.getEffect( String name);

/* Searches the child processors and returns a list with every ID of the given type. */
Synth.getIdList( String type);

/* Creates a reference to the given MIDI player. */
Synth.getMidiPlayer( String playerId);

/* Returns the MidiProcessor with the supplied name. Can not be the own name! */
Synth.getMidiProcessor( String name);

/* Returns the Modulator with the supplied name. Can be only called in onInit. It looks also in all child processors. */
Synth.getModulator( String name);

/* Returns the index of the Modulator in the chain with the supplied chainId */
Synth.getModulatorIndex(int chainId,  String id);

/* Returns the number of child synths. Works with SynthGroups and SynthChains. */
Synth.getNumChildSynths();

/* Returns the number of pressed keys (!= the number of playing voices!). */
Synth.getNumPressedKeys();

/* Creates a reference to the routing matrix of the given processor. */
Synth.getRoutingMatrix( String processorId);

/* Returns the first sampler with the name name. */
Synth.getSampler( String name);

/* Returns the sliderpack processor with the given name. */
Synth.getSliderPackProcessor( String name);

/* Returns the first slot with the given name. */
Synth.getSlotFX( String name);

/* Returns the table processor with the given name. */
Synth.getTableProcessor( String name);

/* Returns the current timer interval in seconds. */
Synth.getTimerInterval();

/* Checks if the artificial event is active */
Synth.isArtificialEventActive(int eventId);

/* Checks if the given key is pressed. */
Synth.isKeyDown(int noteNumber);

/* Checks if any key is pressed. */
Synth.isLegatoInterval();

/* Returns true if the sustain pedal is pressed. */
Synth.isSustainPedalDown();

/* Checks if the timer for this script is running. */
Synth.isTimerRunning();

/* Sends a note off message. The envelopes will tail off. */
Synth.noteOff(int noteNumber);

/* Sends a note off message for the supplied event ID. This is more stable than the deprecated noteOff() method. */
Synth.noteOffByEventId(int eventId);

/* Sends a note off message for the supplied event ID with the given delay in samples. */
Synth.noteOffDelayedByEventId(int eventId, int timestamp);

/* Injects a note off to the incoming MIDI buffer (similar to playNoteFromUI). */
Synth.noteOffFromUI(int channel, int noteNumber);

/* Plays a note and returns the event id. Be careful or you get stuck notes! */
Synth.playNote(int noteNumber, int velocity);

/* Injects a note on to the incoming MIDI buffer (just as if the virtual keyboard was pressed. */
Synth.playNoteFromUI(int channel, int noteNumber, int velocity);

/* Plays a note and returns the event id with the given channel and start offset. */
Synth.playNoteWithStartOffset(int channel, int number, int velocity, int offset);

/* Removes the given effect. */
Synth.removeEffect(var effect);

/* Removes the modulator. */
Synth.removeModulator(var mod);

/* Sends a controller event to the synth. */
Synth.sendController(int number, int value);

/* The same as sendController (for backwards compatibility) */
Synth.sendControllerToChildSynths(int controllerNumber, int controllerValue);

/* Sets an attribute of the parent synth. */
Synth.setAttribute(int attributeIndex, float newAttribute);

/* Sets the internal clock speed. */
Synth.setClockSpeed(int clockSpeed);

/* Adds a few additional safe checks to prevent stuck notes from note offs being processed before their note-on message. */
Synth.setFixNoteOnAfterNoteOff(bool shouldBeFixed);

/* Sets one of the eight macro controllers to the newValue. */
Synth.setMacroControl(int macroIndex, float newValue);

/* Sets a ModulatorAttribute. */
Synth.setModulatorAttribute(int chainId, int modulatorIndex, int attributeIndex, float newValue);

/* If set to true, this will kill retriggered notes (default). */
Synth.setShouldKillRetriggeredNote(bool killNote);

/* Use a uniform voice index for the given container. */
Synth.setUseUniformVoiceHandler(String containerId, bool shouldUseUniformVoiceHandling);

/* Applies a gain factor to a specified voice. */
Synth.setVoiceGainValue(int voiceIndex, float gainValue);

/* Applies a pitch factor (0.5 ... 2.0) to a specified voice. */
Synth.setVoicePitchValue(int voiceIndex, double pitchValue);

/* Starts the timer of the synth. */
Synth.startTimer(double seconds);

/* Stops the timer of the synth. You can call this also in the timer callback. */
Synth.stopTimer();


```
### API Class: Table

```javascript
/* Adds a new table point (x and y are normalized coordinates). */
Table.addTablePoint(float x, float y);

/* Returns the current ruler position (from 0 to 1). */
Table.getCurrentlyDisplayedIndex();

/* Returns an array containing all table points ([[x0, y0, curve0], ...]). */
Table.getTablePointsAsArray();

/* Returns the value of the table at the given input (0.0 ... 1.0). */
Table.getTableValueNormalised(double normalisedInput);

/* Makes this table refer to the given table. */
Table.linkTo(var otherTable);

/* Resets the table with the given index to a 0..1 line. */
Table.reset();

/* Sets a callback that is being executed when a point is added / removed / changed. */
Table.setContentCallback(var contentFunction);

/* Sets a callback that is being executed when the ruler position changes. */
Table.setDisplayCallback(var displayFunction);

/* Sets the point with the given index to the values. */
Table.setTablePoint(int pointIndex, float x, float y, float curve);

/* Sets the table points from a multidimensional array ([x0, y0, curve0], ...]). */
Table.setTablePointsFromArray(var pointList);


```
### API Class: TableProcessor

```javascript
/* Adds a new table point (x and y are normalized coordinates). */
TableProcessor.addTablePoint(int tableIndex, float x, float y);

/* Checks if the Object exists and prints a error message on the console if not. */
TableProcessor.exists();

/* Exports the state as base64 encoded string. */
TableProcessor.exportAsBase64(int tableIndex);

/* Creates a ScriptTableData object for the given table. */
TableProcessor.getTable(int tableIndex);

/* Resets the table with the given index to a 0..1 line. */
TableProcessor.reset(int tableIndex);

/* Restores the state from a base64 encoded string. */
TableProcessor.restoreFromBase64(int tableIndex,  String state);

/* Sets the point with the given index to the values. */
TableProcessor.setTablePoint(int tableIndex, int pointIndex, float x, float y, float curve);


```
### API Class: Threads

```javascript
/* Returns the thread ID of the thread that is calling this method. */
Threads.getCurrentThread();

/* Returns the name of the current thread (for debugging purposes only!). */
Threads.getCurrentThreadName();

/* Returns the thread ID of the thread the locks the given thread ID. */
Threads.getLockerThread(int threadThatIsLocked);

/* Returns true if the audio callback is running or false if it's suspended during a load operation. */
Threads.isAudioRunning();

/* Returns true if the audio exporter is currently rendering the audio on a background thread. */
Threads.isCurrentlyExporting();

/* Returns true if the given thread is currently locked. */
Threads.isLocked(int thread);

/* Returns true if the given thread is currently locked by the current thread. */
Threads.isLockedByCurrentThread(int thread);

/* Kills all voices, suspends the audio processing and calls the given function on the loading thread. Returns true if the function was executed synchronously. */
Threads.killVoicesAndCall( var functionToExecute);

/* Starts a profiling session and calls the finishCallback when ready. */
Threads.startProfiling(var options, var finishCallback);

/* Returns the name of the given string (for debugging purposes only!). */
Threads.toString(int thread);


```
### API Class: ThreadSafeStorage

```javascript
/* Clears the data. If another thread tries to read the value, it will block until that operation is done. */
ThreadSafeStorage.clear();

/* Loads the data. If the data is currently being written, this will lock and wait until the write operation is completed. */
ThreadSafeStorage.load();

/* Writes the given data to the internal storage. If another thread tries to read the value, it will block until that operation is done. */
ThreadSafeStorage.store(var dataToStore);

/* Creates a copy of the data and writes the copy to the data storage. If another thread tries to read the value, it will block until that operation is done. */
ThreadSafeStorage.storeWithCopy(var dataToStore);

/* Loads the data if the lock can be gained or returns a given default value if the data is currently being written. */
ThreadSafeStorage.tryLoad(var returnValueIfLocked);


```
### API Class: Timer

```javascript
/* Returns the duration from the last counter reset. */
Timer.getMilliSecondsSinceCounterReset();

/* Checks if the timer is active. */
Timer.isTimerRunning();

/* Resets the internal counter. */
Timer.resetCounter();

/* Sets the function that will be called periodically. */
Timer.setTimerCallback(var callbackFunction);

/* Starts the timer. */
Timer.startTimer(int intervalInMilliSeconds);

/* Stops the timer. */
Timer.stopTimer();


```
### API Class: TransportHandler

```javascript
/* This will return true if the DAW is currently bouncing the audio to a file. You can use this in the transport change callback to modify your processing chain. */
TransportHandler.isNonRealtime();

/* sends a message on the next grid callback to resync the external clock. */
TransportHandler.sendGridSyncOnNextCallback();

/* Enables a high precision grid timer. */
TransportHandler.setEnableGrid(bool shouldBeEnabled, int tempoFactor);

/* If enabled, this will link the internal / external BPM to the sync mode. */
TransportHandler.setLinkBpmToSyncMode(bool shouldPrefer);

/* Registers a callback to changes in the musical position (bars / beats). */
TransportHandler.setOnBeatChange(var sync, var f);

/* Registers a callback that will be executed asynchronously when the plugin's bypass state changes. */
TransportHandler.setOnBypass(var f);

/* Registers a callback to changes in the grid. */
TransportHandler.setOnGridChange(var sync, var f);

/* Registers a callback to time signature changes. */
TransportHandler.setOnSignatureChange(var sync, var f);

/* Registers a callback to tempo changes. */
TransportHandler.setOnTempoChange(var sync, var f);

/* Registers a callback to transport state changes (playing / stopping). */
TransportHandler.setOnTransportChange(var sync, var f);

/* Sets the sync mode for the global clock. */
TransportHandler.setSyncMode(int syncMode);

/* Starts the internal master clock. */
TransportHandler.startInternalClock(int timestamp);

/* Stops the internal master clock. */
TransportHandler.stopInternalClock(int timestamp);

/* Sets the internal clock to stop when the external clock was stopped. */
TransportHandler.stopInternalClockOnExternalStop(bool shouldStop);


```
### API Class: Unlocker

```javascript
/* Checks if the unlocker's license system has an expiration date. */
Unlocker.canExpire();

/* If the unlocker has an expiration date, it will check it against the RSA encoded time string from the server. */
Unlocker.checkExpirationData( String encodedTimeString);

/* If you use the MuseHub SDK this will try to activate the plugin using their SDK. */
Unlocker.checkMuseHub(var resultCallback);

/* Checks if the string contains the given substring. */
Unlocker.contains(String otherString);

/* Returns the license key file as File object. */
Unlocker.getLicenseKeyFile();

/* Returns the machine ID that is encoded into the license file. This does not look in the encrypted blob, but just parses the header string. */
Unlocker.getRegisteredMachineId();

/* Returns the user email that was used for the registration. */
Unlocker.getUserEmail();

/* Checks if the registration went OK. */
Unlocker.isUnlocked();

/* Checks if the possibleKeyData might contain a key file. */
Unlocker.isValidKeyFile(var possibleKeyData);

/* Checks whether the key file exists. */
Unlocker.keyFileExists();

/* This checks if there is a key file and applies it. */
Unlocker.loadKeyFile();

/* Sets a function that performs a product name check and expects to return true or false for a match. */
Unlocker.setProductCheckFunction(var f);

/* Writes the key data to the location. */
Unlocker.writeKeyFile( String keyData);


```
### API Class: UnorderedStack

```javascript
/* Returns a buffer that refers the data. */
UnorderedStack.asBuffer(bool getAllElements);

/* Clears the stack. */
UnorderedStack.clear();

/* checks if the number is in the stack. */
UnorderedStack.contains(var value);

/* Copies the stack into the given container. */
UnorderedStack.copyTo(var target);

/* Inserts a number at the end of the stack. */
UnorderedStack.insert(var value);

/* Checks if any number is present in the stack. */
UnorderedStack.isEmpty();

/* removes the given number and fills the gap. */
UnorderedStack.remove(var value);

/* Removes the element at the given number and fills the gap. */
UnorderedStack.removeElement(int index);

/* Removes the matching event from the stack and puts it in the holder. */
UnorderedStack.removeIfEqual(var holder);

/* Sets this stack to hold HISE events rather than floating point numbers. */
UnorderedStack.setIsEventStack(bool shouldBeEventStack, var eventCompareFunction);

/* Returns the number of values in the stack. */
UnorderedStack.size();

/* Stores the event into the message holder. */
UnorderedStack.storeEvent(int index, var holder);


```
### API Class: UserPresetHandler

```javascript
/* Attaches a callback to automation changes. Pass a non-function as updateCallback to remove the callback for the given automation ID. */
UserPresetHandler.attachAutomationCallback(String automationId, var updateCallback, var isSynchronous);

/* Clears all attached callbacks. */
UserPresetHandler.clearAttachedCallbacks();

/* Creates an object containing the values for every automation ID. */
UserPresetHandler.createObjectForAutomationValues();

/* Creates an object containing all values of components with the `saveInPreset` flag. */
UserPresetHandler.createObjectForSaveInPresetComponents();

/* Returns the automation index. */
UserPresetHandler.getAutomationIndex(String automationID);

/* Returns the amount of seconds since the last preset has been loaded. */
UserPresetHandler.getSecondsSinceLastPresetLoad();

/* Returns true if this is called somewhere inside a preset load. This takes the thread ID into account to avoid false positives when calling this on another thread. */
UserPresetHandler.isCurrentlyLoadingPreset();

/* Returns true if the user preset that is about to be loaded is a DAW state (or initial state). This function is only useful during the pre / post load callbacks. */
UserPresetHandler.isInternalPresetLoad();

/* Checks if the given version string is a older version than the current project version number. */
UserPresetHandler.isOldVersion( String version);

/* Loads the default user preset (if it's defined in the project). */
UserPresetHandler.resetToDefaultUserPreset();

/* Runs a few tests that catches data persistency issues. */
UserPresetHandler.runTest();

/* Sends a parameter gesture change message to the host. Returns true if the parameter exists. */
UserPresetHandler.sendParameterGesture(int automationType, int indexWithinType, bool gestureActive);

/* Sends an automation value change for the given index. */
UserPresetHandler.setAutomationValue(int automationIndex, float newValue);

/* Enables host / MIDI automation with the custom user preset model. */
UserPresetHandler.setCustomAutomation(var automationData);

/* Enables a preprocessing of every user preset that is being loaded. */
UserPresetHandler.setEnableUserPresetPreprocessing(bool processBeforeLoading, bool shouldUnpackComplexData);

/* Attaches a callback to the begin and end of parameter gestures. */
UserPresetHandler.setParameterGestureCallback(var callbackFunction);

/* Sets the available group names for plugin parameter groups. */
UserPresetHandler.setPluginParameterGroupNames(var pluginParameterGroupNames);

/* Sets a custom sort function for the plugin parameter order. */
UserPresetHandler.setPluginParameterSortFunction(var customSortFunction);

/* Sets a callback that will be executed after the preset has been loaded. */
UserPresetHandler.setPostCallback(var presetPostCallback);

/* Sets a callback that will be executed after a preset has been saved. */
UserPresetHandler.setPostSaveCallback(var presetPostSaveCallback);

/* Sets a callback that will be executed synchronously before the preset was loaded */
UserPresetHandler.setPreCallback(var presetPreCallback);

/* Disables the default user preset data model and allows a manual data handling. */
UserPresetHandler.setUseCustomUserPresetModel(var loadCallback, var saveCallback, bool usePersistentObject);

/* Enables Engine.undo() to restore the previous user preset (default is disabled). */
UserPresetHandler.setUseUndoForPresetLoading(bool shouldUseUndoManager);

/* Updates the given automation values and optionally sends out a message. */
UserPresetHandler.updateAutomationValues(var data, var sendMessage, bool useUndoManager);

/* Restores the values for all UI elements that are connected to a processor with the `processorID` / `parameterId` properties. */
UserPresetHandler.updateConnectedComponentsFromModuleState();

/* Restores all values of components with the `saveInPreset` flag. */
UserPresetHandler.updateSaveInPresetComponents(var obj);


```
