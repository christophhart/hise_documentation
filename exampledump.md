const var arr = []; // Declare an array

// preallocate 10 elements, do this if you
// know how many elements you are about to insert
arr.reserve(10); 

for(i = 0; i < 10; i++)
{
	// Add an element to the end of the array
	arr.push(Math.randInt(0, 1000);
}

Console.print(trace(arr)); // [ 523, 5, 76, 345, 765, 45, 977, 223, 44, 54]

arr.clear();

Console.print(trace(arr)); // []const arr1 = [0, 1];

var arr2 = arr1;

// Changing any element in arr2 will also change it in arr1
arr2[0] = 22;
Console.print(trace(arr1)); // [22, 1]

// Reset the element 0 back to 0
arr1[0] = 0;

// Cloning the array creates a new dataset in memory, separate from the original array
arr2 = arr1.clone();
Console.print(trace(arr1)); [0, 1]
arr2[0] = 22;
Console.print(trace(arr2)); [22, 1]const var arr1 = [0, 1, [2, 3, 4]];

// note how the array in the array is counted as a single element
Console.print(arr1.length); // 3    

const var arr2 = [5, 6, 7];
const var arr3 = [8, 9, 10];

arr1.concat(arr2);
Console.print(trace(arr1)); // [0, 1, [2, 3, 4], 5, 6, 7]

arr1.concat(arr3);

// the arr1 already contains arr2 
Console.print(trace(arr1)); // [0, 1, [2, 3, 4], 5, 6, 7, 8, 9, 10]     


// set type to array
const var arr4 = []; 
arr4.concat(arr2, arr3, 8726, [11, 12, 13]);

// non-array arguments get ignored // arguments can be arrays themselves
Console.print(trace(arr4)); // [5, 6, 7, 8, 9, 10, 11, 12, 13]const var fruits = ["apple", "banana", "mango", "orange"];

Console.print(fruits.contains("banana")); // true
Console.print(fruits.contains("grape"));  // falseconst var list = [ "Hello", "world", "HISE", "rules" ];

Console.print(list.find(function(element){ return element.contains("H");})); // Hello
Console.print(list.find(function(element){ return element.contains("HI");})); // HISE
```

Using this function can vastly decrease the amount of code you need to write. This is the same logic of the first call with a loop and a custom function to achieve the same thing.

```javascript
const var list = [ "Hello", "world", "HISE", "rules" ];

function findH()
{
	for(element in list)
	{
		if(element.contains("H"))
			return element;
	}
	
	return undefined;
}

Console.print(findH()); // Helloconst var a = [1, 5, 5];
a.indexOf(5); // will return 1
a.indexOf("5"); // will also return 1, the search is not type-strict.const var numbers = [1, 2, 3, 4, 5];

numbers.insert(2, 10);
Console.print(trace(numbers)); // [1, 2, 10, 3, 4, 5]

numbers.insert(0, 20);
Console.print(trace(numbers)); // [20, 1, 2, 10, 3, 4, 5]

numbers.insert(numbers.length, 30);
Console.print(trace(numbers)); // [20, 1, 2, 10, 3, 4, 5, 30]

numbers.insert(3, [101, 102, 103]);
Console.print(trace(numbers));const var trustMeIAmAnArray = 0;
const var notAnArrayTooButNiceTryString = "[1, 2, 3, 4, 5]";
const var list = [1, 2, 3, 4];

Console.print(Array.isArray(notAnArrayTooButNiceTryString)); // false;
Console.print(Array.isArray(trustMeIAmAnArray)); // false
Console.print(Array.isArray(list)); // true (finally)!!javascript
const var list = ["item1", "item2", "item3"];     // Creates a list of all available samplemaps
const var box = Content.addComboBox("box", 0, 0); // Creates a combobox
box.set("items", list.join("\n"));                // sets the list as itemsfunction(element, index, array)
{
	return someValue;
}
```

But you can omit the second and third parameter if you don't need it.

```javascript
const arr1 = ["hello", 2, 3];

arr1.map(function(element, index)
{
	Console.print(index + ": " + element);
});

// Output: 
// Interface: 0: hello
// Interface: 1: 2
// Interface: 2: 3
```
The method returns an array of individual function returns. If no return exists, the element will be undefined/null.

```javascript
const arr1 = [0, 1];

const arr2 = arr1.map(function(element)
{
	return element + 10;
});

Console.print(trace(arr2)); // [10, 11]
```

In order to supply a object that you can reference through `this` in the function call, use the second argument:

```javascript
const test = 10;
const arr1 = [0, 1];

arr1.map(function(element)
{
	Console.print(test); // 10
}, test);const arr1 = [1, 2, 3];
arr1[4] = 5;

Console.print(arr1.pop()); // 5

// we didn't set the 4th element (index 3) so it'll be undefined
Console.print(arr1.pop()); // error: API call with undefined parameter 

arr1[3] = 22;
Console.print(trace(arr1)); // [1, 2, 3, 22]

// we can check ourselves for errors in our logic in this case
if (isDefined(arr1.pop() 
{
    // do stuff
}!javascript
const var a = [];

// Uncomment this to see the performance improvement:
//a.reserve(100);

Console.start();
for(i = 0; i < 100; i++)
{
    a.push(5);
}
Console.stop()if(myArray.indexOf(someElement) == -1)
	myArray.push(someElement);
```

```javascript
const arr1 = [0, 1];

arr1.pushIfNotAlreadyThere(2);
Console.print(trace(arr1)); // [0, 1, 2]

// It won't add an element if it already exists in the array
arr1.pushIfNotAlreadyThere(2);
Console.print(trace(arr1)); // [0, 1, 2]

arr1.pushIfNotAlreadyThere(1);
Console.print(trace(arr1)); // [0, 1, 2]

Console.print(arr1.pushIfNotAlreadyThere(1)); // 3const var arr1 = [1, 2, 3, 4, 2, 5,];
arr1.remove(2);

Console.print(trace(arr1)); // [1, 3, 4, 5]const var arr1 = [1, 5, 3];
Console.print(arr1[1]); // 5

arr1.removeElement(1);
Console.print(arr1[1]); // 3const var array = [];       // create a new array
array.reserve(128);         // allocate 128 items
Console.print(array.length) // will output 0;
array[64] = 190;            // this will not allocate
Console.print(array.length) // will print 65const var arr1 = [1, 2, 3];
arr1.reverse();
Console.print(trace(arr1)); // [3, 2, 1]const var a = [1, 6, 4, 2, 1];
a.sort();

for(i in a)
    Console.print(i); 

// Result: 1, 1, 2, 4, 6const var arr1 = [5.2, 3, "1", "17", 
				  [4, 2], [1, 12], 
				  "word", "with2", "3LittlePigs", 
				  {"prop1": 12, "prop2": 55}];
				  
arr1.sortNatural();

// [[4, 2], [1, 12], "1", 3, 
// "3LittlePigs", 5.2, "17", 
// {"prop1": 12, "prop2": 55} ]
Console.print(trace(arr1));// Assume 'audioFile' is a valid AudioFile object

// Retrieve the current audio content
var audioContent = audioFile.getContent();

// Print the number of channels in the audio file
Console.print("Number of channels: " + audioContent.length);

// Iterate over each channel
for (var i = 0; i < audioContent.length; i++)
{
    var channel = audioContent[i];
    
    // Print the first 10 samples of each channel for inspection
    Console.print("Channel " + (i + 1) + " first 10 samples:");
    for (var j = 0; j < 10; j++)
    {
        Console.print(channel[j]);
    }
}

// Example of processing: Normalize the first channel
var firstChannel = audioContent[0];
var numSamples = firstChannel.length;
var maxSample = 0.0;

// Find the maximum sample value
for (var i = 0; i < numSamples; i++)
{
    if (Math.abs(firstChannel[i]) > maxSample)
    {
        maxSample = Math.abs(firstChannel[i]);
    }
}

// Normalize the first channel
if (maxSample > 0)
{
    for (var i = 0; i < numSamples; i++)
    {
        firstChannel[i] /= maxSample;
    }
    Console.print("First channel has been normalized.");
}
else
{
    Console.print("No need to normalize, max sample is zero.");
}// Assume 'audioFile' is a valid AudioFile object

// Retrieve the current sample position
var currentPosition = audioFile.getCurrentlyDisplayedIndex();

// Retrieve the total number of samples in the audio file
var totalSamples = audioFile.getNumSamples();

// Calculate the normalized position (between 0.0 and 1.0)
var normalizedPosition = currentPosition / totalSamples;

const var slider = Content.getComponent("Knob1");

// Set the slider value based on the normalized position
slider.setValue(normalizedPosition);

// Print the current sample position and normalized slider value to the console
Console.print("Current sample position: " + currentPosition);
Console.print("Normalized slider value: " + normalizedPosition);// Retrieve the reference string for the currently loaded file
const var refString = audioFile.getCurrentlyLoadedFile();

const var actualFile = FileSystem.fromReferenceString(refString, FileSystem.AudioFiles);// Assume 'audioFile' is a valid AudioFile object

// Retrieve the total number of samples in the audio file
const var numSamples = audioFile.getNumSamples();

// Retrieve the sample rate of the audio file
const var sampleRate = audioFile.getSampleRate();

// Calculate the duration of the audio file in seconds
const var durationInSeconds = numSamples / sampleRate;

// Print the total number of samples and the duration to the console
Console.print("Total number of samples: " + numSamples);
Console.print("Sample rate: " + sampleRate + " Hz");
Console.print("Duration of the audio file: " + durationInSeconds + " seconds");

// Further usage: Check if the audio file is longer than a specific duration
const var thresholdDuration = 60; // 60 seconds
if (durationInSeconds > thresholdDuration)
{
    Console.print("The audio file is longer than " + thresholdDuration + " seconds.");
}
else
{
    Console.print("The audio file is not longer than " + thresholdDuration + " seconds.");
}// Assume 'audioFile' is a valid AudioFile object

// Retrieve the sample rate of the audio file
var fileSampleRate = audioFile.getSampleRate();
Console.print("Audio file sample rate: " + fileSampleRate + " Hz");

// Retrieve the sample rate of the audio engine
var engineSampleRate = Engine.getSampleRate();
Console.print("Audio engine sample rate: " + engineSampleRate + " Hz");

// This would be the playback speed that is required to play back
// the file in the original speed (most things in HISE that play 
// back samples will do this for you).
var playbackRatio = fileSampleRate / engineSampleRate;// Assume 'audioFile' is a valid AudioFile object
// Clear the file slot (so that the content callback fires
// if you recompile after loading it the first time)
audioFile.loadFile("");

// Set the callback
audioFile.setContentCallback(function()
{
	// print out some properties (the this object of the
	// function will point to the audio file)...
	Console.print(this.getCurrentlyLoadedFile()); // {PROJECT_FOLDER}breakbeat_44k.wav
	Console.print(this.getSampleRate()); // 44100.0
	Console.print(this.getNumSamples()); // 830117
});

// load the first asset
audioFile.loadFile(firstAsset);// Grab a reference to a looper that is loaded with a sound 
// (we need it to actually play the sample for this example)
const var AudioLoopPlayer1 = Synth.getAudioSampleProcessor("Audio Loop Player1");

// Grab a reference to the loop audio file slot
const var audioFile = AudioLoopPlayer1.getAudioFile(0);

// register a function to be called whenever the playback position changes
audioFile.setDisplayCallback(function(displayValue)
{
	// Print the normalised position using the sample length
	Console.print(displayValue / this.getNumSamples());
});// Paste in the code to load the asset from above...

// clear the audio file (so that it loads the full file again
// when you recompile)
audioFile.loadFile("");

// load the first asset (again)
audioFile.loadFile(firstAsset);

// Define the new sample range
var minSample = 1000;
var maxSample = 5000;

// Grab the full sample data
var fullSample = audioFile.getContent();

Console.print(fullSample[0].length); // 830117

// Set the new sample range using the setRange method
audioFile.setRange(minSample, maxSample);

// Now the getContent() method will only return the slice
// from 1000 to 5000
var slice = audioFile.getContent();

Console.print(slice[0].length); // 4000audioFile.loadFile("");

var counter = 0;

// Set the callback
audioFile.setContentCallback(function()
{
	Console.print(++counter);
});

// load the first asset
audioFile.loadFile(firstAsset);

// The content callback is asynchronous
// so the counter is still 0
Console.print(counter); // 0

// Send the listener again
audioFile.update();

// still zero
Console.print(counter); // 0

// The full console output will show that
// the content callback has been executed twice:
// Interface: 0
// Interface: 0
// Interface: 1
// Interface: 2// Create a background task and give it a name that's descriptive
const var b = Engine.createBackgroundTask("DownloadTest");

// Let's forward the status and progress to the official HISE progress system
// (this will show the status in the main top bar in HISE and you can hook up
//  Panels to a preload callback on your UI)
b.setForwardStatusToLoadingThread(true);

// CURL will spit out a new line roughly every second, so setting the timeout to 2 seconds will ensure 
// that it can be cancelled gracefully.
b.setTimeOut(2000);

// We can use the finish callback to show / hide some elements
b.setFinishCallback(function(isFinished, wasCancelled)
{
	b.setProgress(0.0);

	Console.print("Finished: " + isFinished);
	Console.print("Cancelled: " + wasCancelled);
});

function downloadLogger(thread, isFinished, data)
{
	if(isFinished)
		return;

	// Now let's hack around and format the CURL output to something
	// that we can show in HISE
	
	// Begin of nasty hacking procedure...
	var v = data.split(" ");
	for (i = 0; i < v.length; i++) 
	{
	    if (v[i].length == 0)
	        v.removeElement(i--);
	}
	
	var progress = parseInt(v[0]) / 100.0;
	var m = "Downloading " + v[3] + "B of " + v[1] + "B";
	
	if (progress < 0.01) 
		m = "Start Downloading...";
	// ...End of nasty hacking procedure
	
	thread.setProgress(progress);	
	thread.setStatusMessage(m);
}

// This button will just start and cancel the download
const var button = Content.addButton("Run", 0, 0);
button.set("saveInPreset", false);

inline function onButton(component, value)
{
	if(value)
	{
		local f = FileSystem.getFolder(FileSystem.Desktop).getChildFile("testfile.dat");
		
		// Use CURL to download a test file of 100MB
		b.runProcess("curl", ["https://speed.hetzner.de/100MB.bin",
							  "--output", 
							  f.toString(0)], 
							  downloadLogger);
	}
	else
	{
		// This should gracefully cancel the download
		b.sendAbortSignal(false);
	}
};

Content.getComponent("Run").setControlCallback(onButton);function myTask(thread)
{
	for(i = 0; i < 1000000; i++)
	{
		if(thread.shouldAbort())
			break;
			
		subFunctionThatTakes900MillisecondsPerRun();
	}
}Content.addKnob("Knob1", 0, 0);
Content.addKnob("Knob2", 0, 50);
Content.addKnob("Knob3", 0, 100);
Content.addKnob("Knob4", 0, 150);

/** Create a broadcaster. We need 3 arguments to attach it to component properties. */
const var pb = Engine.createBroadcaster({
	"id": "Property Syncer",
	"colour": -1,
	"args": ["component", "property", "value"]
});

/** Attach it to react on changes of the `x` property of `Knob1`. */
pb.attachToComponentProperties("Knob1", "x", "X-Position Watcher");

/** This function just syncs the `x` property by returning the value but you could calculate any custom value if you need to. */
inline function updateFunction(indexInList, component, property, value)
{
	Console.print(trace({
		"indexInList": indexInList,
		"component": component.get("id"),
		"property": property,
		"value": value
	}));
	
	// something to play around with...
	//return value * (indexInList + 2);
	
	return value ;
};


/** You could also just pass in this instead of the updateFunction, then it will use the "default" behaviour. */
const var defaultUpdateFunction = 0;

/* Add a listener that changes properties when the broadcaster sends out a message. */
pb.addComponentPropertyListener(["Knob2", "Knob3", "Knob4"], // The array of knobs that should be synced
                                "x",                         // the properties that you want to sync
                                "update X position", updateFunction);


/* this will do the same thing but not as elegant. */
pb.addListener([Content.getComponent("Knob2"),
				Content.getComponent("Knob3"),
				Content.getComponent("Knob4")],
				"update X position manually",
function(component, property, value)
{
	//for(c in this)
	//	c.set(property, value);
});
```

This is the visualisation of the code above. You can see that the context awareness of the first listener item yields much more information to be displayed which gives you a quick way to ensure the correct functionality:

![](/images/custom/broadcaster/addcomponentpropertylistener.png)

This will add a target to the broadcaster that will change component properties when the broadcaster receives a message. It can be used for synchronising properties, changing multiple properties of a list of components with all the benefits of the broadcaster system. The function expects these arguments:

| Argument | Type | Description |
| -- | --- | ---- |
| object | Single value or list of strings (component IDs) or script references | the target components which properties are supposed to be changed. |
| propertyList | Single value or list of property IDs | the target properties that are supposed to be changed. |
| metadata | String or JSON object | a metadata object that contains some information for the broadcaster map. |
| optionalFunction | Callable object | An optional function that determines the value that should be sent to each component property (see below). If this argument is not a function, the broadcaster needs to have three properties (component, property, value) and will just send out the incoming value to the targets (which is an easy way of synchronizing properties. |

### The optional function

If you supply a function as last argument, it will be called for every target component and property to figure out which value to send. The function signature needs to have all parameters of the broadcaster and a integer index at the first position that will contain the index of the component in the list that was passed in.

```javascript
const var bc = Engine.createBroadcaster({
	"id": "MyBroadcaster",
	"args": { "firstArg": undefined, "secondArg": undefined, "thirdArg": undefined }
});

// This function needs to have an index parameter and then as much parameters as
// the broadcaster is using (in our case three).
// It will then be called for each property and component with the knobIndex argument
// containing the index of the component to change. The function's return value will 
// be sent as property.
inline function setKnobColours(knobIndex, a1, a2, a3)
{
	if(knobIndex == 0)
	{
		return calculateTheColourForTheFirstKnob();
	}
	if(knobIndex == 1)
	{
		return calculateTheColourForTheSecondKnob();
	}
	// ...
}

bc.addComponentPropertyListener(["Knob1", "Knob2", "Knob3"],      // targets
								["itemColour", "itemColour2"],    // properties
								{ "id": "set both itemColours"}), // metadata
								setKnobColours);				  // optionalFunctionbc.addListener(componentList, "repaint components", function(index)
{
	for(c in this)
		c.sendRepaintMessage();
});
```

but is less to type, a bit faster (because it doesn't have to evaluate the script function) and more versatile. And you get a nice visualisation in the Broadcaster map that blinks everytime the refresh messages are sent.

### Example

This example will send a message when you click a button and causes a list of Panels to repaint themselves.

![](/images/custom/broadcaster/refreshlistener.png)

```javascript
const var button = Content.addButton("Button1", 0, 0);

const var PanelArray = [Content.addPanel("Panel4", 0, 50),
                        Content.addPanel("Panel3", 100, 50),
                        Content.addPanel("Panel2", 200, 50),
                        Content.addPanel("Panel1", 300, 50)];

for(p in PanelArray)
{
	p.setPaintRoutine(function(g)
	{
		g.setColour(Colours.withAlpha(Colours.white, Math.random()));
		g.fillRect(this.getLocalBounds(0));
		
	});
}

const var bc = Engine.createBroadcaster({
	"id": "RepaintBroadcaster",
	"colour": -1,
	"args": ["index"]
});


bc.addComponentRefreshListener(PanelArray, "repaint", "Repaint Panels");

inline function onButton(component, value)
{
	// just send out any value to trigger the broadcaster
	bc.index = Math.random(); 
}

button.setControlCallback(onButton);const var b = Engine.createBroadcaster({
	"id": "My Broadcaster",
	"args": ["index", "isTrue"]
});

b.addListener({"id": "MY_ID"}, "some description about the target",
function(index, isTrue)
{
	Console.print(this.id); // "MY_ID"
});

b.addListener("funky_time", "some other target",
function(index, isTrue)
{
	Console.print(this); // "funky_time";
});


const var Knob = Content.addKnob("Knob1", 0, 0);

/** Here we are using a JSON object instead of a metadata string
	to set the priority. Note how the listener is at the top of the list
	despite being added as last target. 
*/
b.addListener(
Knob, 
{
  "id": "Print the knob value", 
  "colour": 0xFF3388AA, 
  "priority": 10 
},
function(index, isTrue)
{
	Console.print(this.getValue());
});// You need three arguments 
const var bc = Engine.createBroadcaster({
	"id": "Complex Data Listener",
	"colour": -1,
	"args": ["processorId", "dataIndex", "value"]
});

bc.attachToComplexData("Table.Display", 
					   ["LFO Modulator1", "LFO Modulator2"], 
					   0, 
					   "Connect to 2 LFO table rulers");

bc.attachToComplexData("SliderPack.Content",
					   "Arpeggiator1",
					   [0, 1, 2],
					   "Connect to changes for every slider pack of an arp");
	   
bc.attachToComplexData("Table.Content",
					   ["Table Envelope1", "Table Envelope2"],
					   [0, 1],
					   "Connect to table edits for every table 
					   (attack & release) for two table envelopes");function mouseCallback(component, event)
{
	
}function propertyCallback(component, id, value)
{
	
}function valueCallback(component, value)
{
	
}// We'll attach the context menu to this button
const var Button1 = Content.addButton("Button1", 0, 0);
Button1.set("enableMidiLearn", false); // we don't want this to popup too...

/** Let's define a broadcaster with two arguments. */
const var bc = Engine.createBroadcaster({
	"id": "ContextMenu Broadcaster",
	"args": ["component", "selectedIndex"]
});

/** This defines a few items using a markdown-like syntax. */
const var POPUP_MENU_ITEMS = [
  "**Set Value / Properties**", // A header
  "Value is active",			// the first item
  "Set to {DYNAMIC}",			// the second item with a dynamic text
  "___",						// a horizontal separator
  "~~This is always off~~"		// an item that is always disabled
];


inline function popupStateFunction(type, index)
{
	// The this object of this function will always
	// point to the component that was clicked (in our
	// case it's always Button1).
	Console.assertEqual(this, Button1);

	local getEnableState = type == "enabled";
	local getTextValue = type == "text";
	local getActiveState = type == "active";
	
	if(getEnableState) // We don't want to disable any item
		return true; // so let's return true...
		
	if(getTextValue)
	{
		// This function is only called with items
		// that specify the `{DYNAMIC}` wildcard
		// in this case the second item with the index 1
		Console.assertEqual(value, 1);
		
		// Now we can return whatever text we want to show
		// and this is evaluated each time before the popup
		// is shown
		return this.get("width") > 150 ? "small" : "wide";
	}
	
	if(getActiveState)
	{
		// Now we can decide whether the popup menu item
		// should be displayed as active or not

		// the first item checks whether the button is active
		if(index == 0)
			return this.getValue();
			
		// the second item checks whether its wide or not
		if(index == 1)
			return this.get("width") > 150;
	}
};

/** Now we can use the item list and the state function to attach the broadcaster
   to the context menu of the button (you can attach it to multiple components by
   passing in a list. */
bc.attachToContextMenu("Button1", popupStateFunction, POPUP_MENU_ITEMS, "Context Menu");


/** This callback will be executed whenever a popup menu item was selected. */
bc.addListener(Button1, "Menu callback", function(component, index)
{
	// the this object will point to the component
	Console.assertEqual(component, this);

	if(index == 0)
	{
		this.setValue(!component.getValue());
		this.changed();
	}
	if(index == 1)
	{
		this.set("width", component.get("width") > 150 ? 100 : 200);
	}
});attributeIndex = attributeType + bandIndex * bandOffset
```
Adding & Removing bands however cannot be queried by the standard HISE parameter system, but you can use this attachment type to be notified whenever a Band is added / removed.

- `moduleIds` must be either a single string with the EQ ID or a list of strings for multiple EQs
- `eventType` must be one or multiple strings from this selection: `["BandAdded", "BandRemoved", "BandSelected", "FFTEnabled"]`

Once a broadcaster is attached to EQ events, it will fire its callbacks with three parameters:

```javascript
function(eventType, value)
{
   // eventType is one of the strings that define the event
   // value is a context dependent value (eg. the band index at selection)...
}const var bc = Engine.createBroadcaster({
	"id": "My Radio Watcher",
	"colour": -1,
	"args": ["buttonIndex"]
});
```

Be aware that this index is using the same order as the component list shows.

> Also this attached mode is the only mode that is using a "bidirectional" communication. This means that if you send a broadcaster message using `sendMessage()` or the assignment operator, it will also change the currently active button in the radio group.

### Example: Page Handling

One of the most practical use cases for this function is the page handling logic which will show and hide panels when you click on the corresponding buttons

![](/images/custom/broadcaster/attachtoradiogroup.png)

Please note how the entire logic and functionality is represented in the broadcaster map from the state of the buttons to the `visible` property of the panels.

```javascript
const var bc = Engine.createBroadcaster({
	"id": "My Page Handler",
	"colour": -1,
	"comment": "This broadcaster will handle the page logic",
	"args": ["pageIndex"]
});

// Just a dummy function that 
inline function addRadioButton(i)
{
	local b = Content.addButton("RadioButton " + (i+1), 0, i * 30);
	b.set("radioGroup", 90);
	b.set("saveInPreset", false);
	
	local p = Content.addPanel("Page" + (i+1), 150 + i* 100, 0);
	p.set("visible", false);
	return p;
}

// This array will hold 4 panels
const var Pages = [];

// Create 4 radio buttons and 4 panels
for(i = 0; i < 4; i++)
	Pages.push(addRadioButton(i));

bc.attachToRadioGroup(90, "Button Group");

const var PageList = []; //

bc.addComponentPropertyListener(Pages, "visible", "Show Panels", function(indexInList, buttonIndex)
{
	return indexInList == buttonIndex;
});

// Show the first page
bc.pageIndex = 0;const var bc = Engine.createBroadcaster({
	"id": "router",
	"args": ["id", "matrix"]
});

bc.attachToRoutingMatrix("Sine Wave Generator1", "script matrix");

bc.addListener("", "dudel", function(id, matrix)
{
	// this just prints out where the sine wave generator is mapped
	Console.print(trace(matrix.getDestinationChannelForSource([0, 1])));
});const var b = Engine.createBroadcaster({
	id: "sampleListener",
	args: ["eventType", "samplerId", "data"]
});

b.attachToSampleMap("Sampler1", "SampleMapChanged", "");

b.addListener("", "funky", function(eventType, samplerId, data)
{
	Console.print(data);
});
```

> Note that using a broadcaster for listening to sample map changes is the best practice going forward and replaces the usage of the [ScriptPanel.setLoadingCallback()](/scripting/scripting-api/scriptpanel#setloadingcallback) function for this task.

These are the different event types:

| Type | Description | data argument |
| ---- | --- | --- |
| `SampleMapLoaded` | Whenever a sample map is loaded (or cleared). | the reference string as it goes into [Sampler.loadSampleMap()](/scripting/scripting-api/sampler#loadsamplemap) |
| `SamplesAddedOrRemoved` | Whenever a sample was added to (or removed from) the current samplemap | the current number of samples. |
| `SampleChanged` | Whenever a sample property has changed | A JSON object with the sample information (see below). |

The `eventTypes` argument will expect either the `Type` string or an array with multiple type strings from the table above with all event types that the broadcaster should listen to. 

The `samplerIds` argument should be either a String of the sampler ID (or an array of strings for every sampler)  that you want to listen to.

### Sample changes

If you want to listen to sample property changes (like changing the sample start or the low velocity), the values that you should pass into the `eventTypes` argument is not the `"SamplesChanged"` string, but one of the constants of the [Sampler](/scripting/scripting-api/sampler) API object.

In this mode, the `data` argument will be a JSON object with these properties:

- a `sound` property that holds a reference to a [Sample](/scripting/scripting-api/sample) object.
- an `id` property that holds the magic number of the property (query this against the Sampler constants).
- a `value` property that will contain the value of the property change.

```javascript
b.attachToSampleMap("Sampler1", [ Sampler.LoKey, Sampler.HiKey ], "");

b.addListener("", "funky", function(eventType, samplerId, data)
{
	if(data.id == Sampler.LoKey)
	{
		Console.print("Changed low key to " + data.value);
	}
	if(data.id == Sampler.HiKey)
	{
		Console.print("Changed high key to " + data.value);
	}
});bc.sendMessage(0, false);
bc.sendMessage(1, false);// create a typed reference from the build integer index
var asSampler = builder.get(sampler, builder.InterfaceTypes.Sampler)

asSampler.loadSampleMap("MySampleMap");// Add the AHDSR (we need to save the return value for the next call)
var ahdsr = builder.create(builder.Modulators.AHDSR,    // the module type
	               "GainAHDSR " + (i+1),        // the ID 
	               sampler,                     // the parent module
	               builder.ChainIndexes.Gain);  // the slot type
	
	
builder.setAttributes(ahdsr, {
  "Attack": 8000,
  "Release": 100.0
});Console.print(trace(Colours.toVec4(Colours.saddlebrown)));{
	.sample("my session"); // starts a sampling session until the block is done
	
	var x = [1, 2, 3, 4, 5];
	
	// creates a snapshot of the array and stores it as the first label
	Console.sample("first", x);
	
	x[2] = 0;
	
	// creates a snapshot of the array and stores it under the second label
	Console.sample("second", x);
}Content.addVisualGuide([0, 200], Colours.white);       // adds a horizontal line at 200px
Content.addVisualGuide([100, 0], Colours.red);         // adds a vertical line at 100px
Content.addVisualGuide([10, 10, 100, 50], 0xFF00FF00); // adds a rectangle

Content.addVisualGuide(0, 0);                          // clears all visual guides// Save the image to C:\Users\UserName\Documents\myimage.png;
Content.createScreenShot([0, 0, 1024 768], 
                         FileSystem.getFolder(FileSystem.Documents), 
                         "myimage");const var t = Engine.createTimerObject();
const var Label1 = Content.getComponent("Label1");
reg isPending = false;

t.setTimerCallback(function()
{
	var tooltip = Content.getCurrentTooltip();
	
	if(tooltip == "")
	{
		// Now the mouse is over a component without a tooltip
	
		if(Label1.get("text") != "" && !isPending)
		{
			// The tooltip label was not empty so we set the isPending flag
			// and reset the internal counter of the timer object
			isPending = true;
			this.resetCounter(); // [1]
		}
		else if (this.getMilliSecondsSinceCounterReset() > 1000)
		{
			// Now a second has passed since [1] without a new tooltip being
			// set, so we clear the label and reset the isPending flag
			isPending = false;
			Label1.set("text", "");
		}
	}
	else
	{
		// We update the label with the new tooltip and
		// clear the isPending flag
		isPending = false;
		Label1.set("text", tooltip);
	}
});

// We don't need it to be super fast, so 100ms should be fine
t.startTimer(100);Content.setValuePopupData({
    "itemColour":   Colours.forestgreen,    // BG colour TOP
    "itemColour2":  Colours.firebrick, // BG colour BOTTOM
    "bgColour":     Colours.gainsboro,      // In fact the Border colour...
    "borderSize":   6.66,
    "textColour":   Colours.navajowhite,
    "fontSize":     66.6,
    "fontName":     "Comic Sans MS"
});
```

```javascript
Content.setValuePopupData({
    "fontName":"Comic Sans MS",
    "fontSize": 14,
    "borderSize": 1,
    "borderRadius": 1,
    "margin":0,
    "bgColour": 0xFF636363,
    "itemColour": 0xFF000000,
    "itemColour2": 0xFF000000,
     "textColour": 0xFF636363 
});// Oscilloscope:
d.createPath([0, 0, w, h],   // target rectangle 
             [-1, 1, 0, -1], // samplerange 0 - numSamples,
                             // valuerange: from -1 to 1
             0.0);           // start at the center (bipolar)

// Plotter
d.createPath([0, 0, w, h],   // target rectangle 
             [0, 1, 0, -1],  // samplerange 0 - numSamples,
                             // valuerange: from 0 to 1
             0.0);           // start at the bottom (unibipolar)

// Inverted Plotter
d.createPath([0, 0, w, h],   // target rectangle 
             [0, 1, 0, -1],  // samplerange 0 - numSamples,
                             // valuerange: from 0 to 1
             1.0);           // start at the top (negative)/** If you start a comment with `/**` it will get attached to the metadata objects as `comment` property. */
const var bc = Engine.createBroadcaster({
	"id": "My Broadcaster",              // give it a meaningful name
	"colour": -1,                        // assign a colour (-1 just creates a random colour from the ID hash)
	"tags": ["audio", "value-handling"], // assign some tags
	"args": ["myValue", "isPlaying"]
});!!javascript
// Create a filter effect
const var effect = Synth.addEffect("PolyphonicFilter", "filter", 0);

// Create a filter graph
const var display = Content.addFloatingTile("tile", 0, 0);
display.set("width", 200);
display.set("height", 50);
display.setContentData({"Type": "FilterDisplay", 
                        "ProcessorId": "filter"});

// Create a knob for the frequency
const var filterKnob = Content.addKnob("filterKnob", 250, 0);
filterKnob.set("mode", "Frequency");
inline function f(component, value){ effect.setAttribute(effect.Frequency, value); };
filterKnob.setControlCallback(f);

const var modeSelector = Content.addComboBox("modeSelector", 400, 10);

// Create the filter mode list object
const var filterList = Engine.getFilterModeList();

// Pick some values from the object and store it in an array
const var filterModes = [ filterList.StateVariableNotch, 
                          filterList.StateVariableLP ];
                          
// Create an array with a name for each mode
const var filterNames = [ "Notch",
                          "SVF Lowpass"];

// Use the filterNames list as combobox items
modeSelector.set("items", filterNames.join("\n"));


inline function modeCallback(component, value)
{
    // combobox values are starting with 1
    local index = value-1;
    
    if(index >= 0)
    {
        // use the index to get the actual number from the filterModes array.
        effect.setAttribute(effect.Mode, filterModes[index]);
    }
}

modeSelector.setControlCallback(modeCallback);!javascript
Console.print(Engine.getOS());Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");const var myList = [1, 2, 3, 4, 5, 6];

Engine.performUndoAction({
  "obj": myList,				// the object that will be modified
  "newValue": [3, 4, 5, 6, 7],  // the new state
  "oldValue": myList.clone()    // the old state (we need to clone it or it will not keep the old values)
}, function(isUndo)
{
	this.obj.clear();

	// pick the values from the old or new state
	for(v in isUndo ? this.oldValue : this.newValue)
		this.obj.push(v);
});

// new state
Console.print(trace(myList));

Engine.undo();

// old state
Console.print(trace(myList));

Engine.redo();

// new state
Console.print(trace(myList));const var macroNames = ["Volume", "FilterFreq", "FilterQ", "Reverb"];

Engine.setFrontendMacros(macroNames);Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Heebo.ttf", "heebo");
Engine.setGlobalFont("heebo");// Create a wrapper object around the expansion handler
const var expHandler = Engine.createExpansionHandler();

function installExp(hxiFile)
{
    expHandler.encodeWithCredentials(hxiFile);
};

FileSystem.browse(FileSystem.Documents, 
                  false,   // read
                  "*.hxi", // hxi
                  installExp); // callbackExpansionHandler.FileBased
ExpansionHandler.Intermediate
ExpansionHandler.Encryptedconst var t = FileSystem.getFolder(FileSystem.Desktop).getChildFile("test.hr1");
const var e = Engine.createExpansionHandler();

function installCallback(obj)
{
    if(obj.Status == 2 && isDefined(obj.Expansion))
    {
        // make sure the user presets are updated
        obj.Expansion.rebuildUserPresets();
        
        // ask the user if he wants to delete the archive file...
        Engine.showYesNoWindow("Installation sucessful", 
                               "Do you want to delete the archive file", 
        function(ok)
        {
            if(ok)
                t.deleteFileOrDirectory();                
        });
    }
};

e.setInstallCallback(installCallback);
e.installExpansionFromPackage(t, FileSystem.Expansions);inline function dropCallback(f)
{
	local samplePath = f.getReferenceString("Samples");
	
	Sampler.loadSampleMapFromJSON([
	{
		"FileName": samplePath
	}]);
};FileSystem.browse(undefined, false, "*.txt", function(result)
{
    // the parameter is a File object, so we just show it
    // in the OS' file browser.
    result.show();
});const var f1 = Engine.createFixObjectFactory({
	"myValue": 17,
	"someOtherValue": 42.0
});

// Creates a preallocated array with the given size
const var list = f1.createArray(64);

// Creates an object for interacting with the array above
const var obj = f1.create();

Console.print(trace(obj));

// Now we want to push an object with both values zero
// into the list. 
obj.myValue = 0;
obj.someOtherValue = 0.0;

// This will not insert a reference into the array but copy the 
// data values from the current state of obj
list.push(obj);

// You can also call trace with a FixObjectArray and it will dump it like a JSON
Console.print(trace(list));

// this function will perform a bitwise comparison of the data
const var idx = list.indexOf(obj);
Console.print(idx); // => 0

obj.myValue = 90;

// Now it won't find the element because we changed it.
// Note that that's different from the default JS behaviour
// because we are not storing a reference to the object in the 
// array but a copy!
const var idx2 = list.indexOf(obj);

Console.print(idx2); // => -1const var f1 = Engine.createFixObjectFactory({
	"eventId": 0,
	"noteNumber": 0
});

// This will make all indexing functions only look for the eventID
f1.setCompareFunction("eventId");// Create a global routing manager
const var rm = Engine.getGlobalRoutingManager();

// Create the data cable
const var dataCable = rm.getCable("dataCable");


// Register the callback
dataCable.registerDataCallback(function(data)
{
	Console.print("DATA: " + trace(data));
});

// Create some arbitrary data
const var bf = Buffer.create(32);
bf[10] = 90.0;

// Send the data over (this will not fire the callback above
// but other targets)
dataCable.sendData([bf, 100, "a string"]);const var rm = Engine.getGlobalRoutingManager();
const var c = rm.getCable("myDataCable");
c.sendData({ someJson: 1234, also: "strings are supported" });
c.sendData([ 1, 2, 3, 4, 5, 6]);
c.sendData(Buffer.create(128));
```

Note that there is not a data queue for the sender side of this protocol, which means that if you register a target after the data has been sent, it will not be "initialised" with the previously sent value. However if you're using the C++ API in your external node, it will queue the data that is about to be sent if the cable is not connected yet. 

Also it will skip its own callbacks, so if you register a callback using [Global Cable.registerDataCallback()](/scripting/scripting-api/globalcable#registerdatacallback), it will not be executed:

```javascript
const var rm = Engine.getGlobalRoutingManager();

// Create a instance of a cable
const var c1 = rm.getCable("myDataCable");

// Create a duplicate instance
const var c2 = rm.getCable("myDataCable");

// Register two callbacks to both objects
c1.registerDataCallback(x => Console.print("C1 executed: " + trace(x)));
c2.registerDataCallback(x => Console.print("C2 executed: " + trace(x)));

Console.print("Send through cable 1");
c1.sendData("some data");

Console.print("Send through cable 2");
c2.sendData("some data");

// Output:
// Interface: Send through cable 1
// Interface: C2 executed: "some data"
// Interface: Send through cable 2
// Interface: C1 executed: "some data"rm.connectToOSC({"Domain": "/myDomain"});

// React on /myDomain/fader1
rm.addOSCCallback("/fader1", function(id, value) {});

// Catch all - react on every OSC message that starts with /myDomain/
rm.addOSCCallback("/*", function(id, value) {});const var rm = Engine.getGlobalRoutingManager();

inline function printError(message)
{
	Console.print(error);
};

rm.connectToOSC({
	"Domain": "/myDomain",
	"SourcePort": 6666,
	"TargetPort": 6667,
	"Parameters":
	{
		"/fader1":
		{
			"MinValue": -1.0,
			"MaxValue": 1.0,
			"SkewFactor": 0.25
		}
	}
}, printError);

// Create a cable with a OSC subdomain
const var testCable = rm.getCable("/fader1");

// register an async callback that just prints the value
testCable.registerCallback(function(newValue)
{
	Console.print(newValue);
}, false);

// Now you can start sending OSC messages with the domain "/myDomain/fader1" to the port 6666 and
// it should show up in the HISE console...

// Let's add a knob and send its value through the cable
const var Knob1 = Content.addKnob("Knob1", 0, 0);

inline function onKnob1Control(component, value)
{
	// Changing the knob should now update your source OSC app
	// (if the port is set to 6667)
	testCable.setValue(value);
};

Knob1.setControlCallback(onKnob1Control);// Send a message to a fader
rm.sendOSCMessage("/fader1", 0.4);

// Send a message to a 2D XY Pad
rm.sendOSCMessage("xy1", [0.2, 0.3]);


// Send a message to an external display
rm.sendOSCMessage("/label", "Hello World");const var Panel1 = Content.getComponent("Panel1");

Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{		
	g.drawImage("image", this.getLocalBounds(0), 0, 0); 
	g.addDropShadowFromAlpha(Colours.black, 100); // borderShadow from 1 - 100
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(0);
	
	g.addNoise(0.07); // 0 -> 0.999
	
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.setGradientFill([Colours.black, 0, 0,
				   Colours.white, this.getWidth(), 0,
				   false]);
	g.fillRect(this.getLocalBounds(0));
	
	g.applyGamma(1.5); // baseline 1
	
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);

	g.setColour(Colours.grey);
	g.fillRect(this.getLocalBounds(0));
	g.applyGradientMap(Colours.withBrightness(Colours.blue, 0.5), Colours.withBrightness(Colours.red, 0.7));
	
	g.endLayer();

});const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applyHSL(270, 100, 0); // Hue: 0 - 360, Saturation: 0 - 100: Lightness: 0 - 100
		
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

const var c = Content.createPath();

c.startNewSubPath(0.0, 0.0);
c.lineTo(1.0, 1.0);
c.lineTo(1.0, 0.0);

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applyMask(c, this.getLocalBounds(0), 0); // 1 to invert the mask. 
	
	g.endLayer();

});const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(0);
	
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applySepia();
	
	g.endLayer();
});const var Panel1 = Content.addPanel("Panel1", 0, 0);

const var sh = Content.createShader("GLSL/init.glsl");

PAnel1.setPaintRoutine(function(g)
{
	g.applyShader(sh, this.getLocalBounds(0));
});const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applySharpness(1); // apply a sharpness filter
	
	g.endLayer();

});const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.applyVignette(10, 1, 0.5); // 
	
	g.endLayer();

});const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginBlendLayer("Phoenix", 1);
	
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(true); 
	
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");

Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(1);
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.boxBlur(10); // apply box blur 0 - 100
	
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");
Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.beginBlendLayer("Phoenix", 1);
	
	g.drawImage("image", this.getLocalBounds(0),0,0);
	
	g.desaturate();
	
	g.endLayer();
});Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 32);
	g.setColour(Colours.white);
	g.drawAlignedText("Hello World", this.getLocalBounds(0), "top");
	
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
	g.setFontWithSpacing("Comic Sans MS", 40.0, 0.05);
	g.drawAlignedTextShadow("funky", this.getLocalBounds(0), "centred", { "Colour": Colours.red, "Offset": [0, 4], "Radius": 10});
	g.drawAlignedTextShadow("funky", this.getLocalBounds(0), "centred", { "Colour": Colours.green, "Offset": [2, 2], "Radius": 0});
	g.setColour(Colours.white);
	g.drawAlignedText("funky", this.getLocalBounds(0), "centred");
});const var Panel1 = Content.addPanel("Panel1",10,10);

Panel1.setPaintRoutine(function(g)
{	
	g.drawDropShadow(this.getLocalBounds(12), Colours.black, 20);
	g.setColour(Colours.red);
	g.fillRect(this.getLocalBounds(12));
});
```

Additionally, `drawDropShadow()` fills the area of the passed rectangle.

```
HiseSnippet 1125.3ocwW0saaaCElxIJnVacXAXO.b4loLj4Z457yPQwbhcxVvZRMh6JVuYszTTVDglTfhpNdCEXXOY8EYuC6MHiTxxlNwoc0YAwWDD9c9geejmC8wckBLIMUHANduXbBA374t8FyUwsiQTN33N.m0cSPbBKMFEJFoHoJvAiSPoojPfiyJ+nwMmpqBx+7O+vAHFhiIyf.fWJnXxynCopYnca8yTF6HTH4EzgVd2r0wXAusfIxzTZE25fDD9bz.xoHiaUbA+DJMF37stgAMCh1Ci1YuflMv3F6saiueWLAEEQ1IX6catWTyHDtdCfyZGFRUBYOERydfypGHBG2KVLhWrAujlR6yHlEAfd5ct.9HAKzHQCJncLkE1s7rJEnyR2YmbqTbx8UtmPCoSwmcB9k4Ffyhv9.zox7zak4nWfM8paQuEPIGKJsZAkV2sGVRSTyrX3ym4dLWQj5iGxbTovWPk+thaag1Ctp1Pz4jij5ESivem502Bp+ylOwy6QO5qgIblwasXIRO8kWpZNH3SgkIa.Q0VLLQv0K72v1oMrRVur9cMEbvuCdpPAwFcBKJAg8IXTVJAphQpuIEhXRBJbLDoAn7Ay18o4XtMeeFa59mlSfR+x2+HgD5eAjxsyvldUunVJQ0UyS0YhLklt9gRznoN7DupZpCOJiiUTMA7nbl1IXzD.ns29C1z6O7pxDXDSS6mZHdpgaOyfbfHiGl5GTOOoUGTyDZGoHoWdymOZKXQqQZsQTU79rjXjeIReltSYKX8Zau4VvxT7w2hTykhIC9k94uQ+AEParowqA0hz8pmYBjDdFAqP7ALhgLVQHjgD4YnPZVZdTuap7Eb80H44b+bk68NO3UMEEsPalaNofwHxEZ17vg7CEnOOaXehbK3aQrLxTG0MGy2w4dycb1OHfKJjrbTvOlSUOOgvuomI.Sp9z+2ubbGjBYZSmfo8KgHUTCEb5Pdq9Qxhl1ptcHomqDI49NodE37.Ut0GV1RaJm.Tci6W3Z2JAtv9s2w1KFQCUwSAd+e0JlPGDqrQnJxvxWeqtlPHtzXXFZCaXm0rnm2Gjdk0+0soWyVVzqSqDjTmIqTdEgMO8AzqR+Vu4Jz+R8mEP+R3xp7IXEY8SVQA1JheaTTqrqpn+L5VonKWNE03ltizz41dGA9s6CE83aRQ5i7OME8lKtlh32GJp4MU08d1stpC7p6CEsskhZ862l6nVj6j6nqOckdtNQXFColeXOyHwSLn+9n4lvxLEEOkpFaOx7+aS.9ekhq61kpvwKliUV.G0O0eWvwIyM+P2C0CsiUyH3ptG8q2MCICJFgavIHkjpK3bOMaXO8MMln2ctYFSMlSESAbw55l0lSfdDdX9BSAwDiAl0NSLFTZDLDgkhWiKlBwLY9CxQzbhm+qXp5dhYML.jOYh847P8OT30X77o5ZA1XYC7wKafMW1.2dYCbmkMvcW1.26iGn42wselRLrnsA.No6g4i043bHGoq.yqVA+KfJ1wUz
```

Another method is to use a transparent panel as a shadow catcher.

```
HiseSnippet 1080.3ocwW0raaaDDdoroQDaSQMPe.13KkBPUQxwNs.AAU1RVEBM1QvxMn2BVQthbgWtKwxkQVoH.E4PeX549.ji8knuC4MHcW9izpX4+HZg0AAMy7My9M6LC0vQBtGNIgK.V0OadLFX8k1imyjg8BQDFXXef011wHFllDh74yj3DI3v4wnjDrOvxZieRCyp9lfrOe7GODQQLO7RU.vq3DO7KHQD4Rsi59yDJc.xGeFIx.8dcG5wY83TdphRaX2FDi7NGEfOAogUyFXs0Q9DIWLVhTjQg4Pt+7wg7Yrb7uhjPlPwZgNfwp.kqFzKjP8GUltI.f0liVl7ajm7ei8wDexB8KuD95LCvkdXdGXU65nTm6.krLnzl4TZa6wdBRrboEMe9B6gLIVLEotpMoRNVPs+olcOtBAS1JBcNdfPIrvC2m1tcSn5qFOyw4wO9QvXFUiVkrXgi59OQthJ3ygkAK.K6wih4Lkf6Nlf1wHXiSmLR2y.+N3IbIzSmmv7tH3DrGJMACkgH42l.QTAF4OGhTJHrfkm9hXrxge.kt37SxHPItryeJW.cu.RXlQngS8KZkfkiT7TdJOUpnqqu.MaAfm4TWQc3fTlmjnHfCgQUffSKT.MQ6Fzv42bpS4dHph1OWS7DM2dgVyg7Tleham1YAsdPKsq8E73wYyOtnlv7t6jVyHxvCnwgH2RMSnpl8lv1s1uQSXYHt4iHQWTzQvsDm6NSBxUsSCMpfVSUiampcD6eJ1ShXATrlLFdvE9XwoHeRZRlWuaQ5yYpxH9kL2rL24cNvO2zzoq0ltxI3TJVrVy5Yew04nKKMZBVzD9FDMEu.nZ3X0ItstcSbd4MRF.4rgLh7kw3B4AbpudRR+6KOeBJ5DU+5WF1GIQ5Q1BcJbwXgjnoiUe7aTOyKe.ttcebx4RdbF1hdWf0CjYVeX43st0BPTG8WYaNVAtv7QoyMElQ7kgKT7g22MDSBBklZHRbT4CSquEmy+j1vRs6Zp1ZKC54bszqbVnsI81qqA852MFITQxHjeVhUPeaq+VAuj51VueEBp42mTeVCsKUW1oapCbmyjNlYBqhYxYVlYxec+jI6dU0jeeZUqIWb+jIO4pxjto29L4OVol7w6mLYuqp65Czp1c4e+jI6ajIceaEqI+I3+9Zxk2bRsyF2OkhjqtHmdi0BCp+qYksmzaHwRHx4lazdG1tq80tc2skhaaOhH8BWOGqsFNpdz8+GbrXm3GZezzopUFVRvMsG7qUcA3a33yWOK3XjTPTMZ1mjFMVUo8vpSmo2eT2vTS23lK2VKquAFiY9YB5FhBiczxVEF6TZDDg7D7W6kuggdq6GjoQwIV1KYT29XsLrCHaqCy64H0KA7ZOuUC0kbb2p53Sppi6UUG2upN9zp532WUG+ga1Q86ncPpjGkO1..GO5nr0zrrNhgTcfYcqf+EsW3jJconst var Panel = Content.addPanel("Panel", 0, 0);

const var p = Content.createPath();

// pass an array with numbers to load SVG images
p.loadFromData([110,109,0,245,207,67,128,217,36,67,108,0,236,189,67,128,89,69,67,108,0,
                245,207,67,128,217,101,67,108,192,212,207,67,128,53,81,67,98,217,93,211,
                67,51,180,80,67,123,228,219,67,2,123,91,67,128,144,224,67,0,149,101,67,
                98,39,209,224,67,29,247,89,67,79,60,223,67,36,224,61,67,0,245,207,67,0,
                12,54,67,108,0,245,207,67,128,217,36,67,99,109,128,33,193,67,0,168,88,
                67,108,0,66,193,67,0,76,109,67,98,231,184,189,67,77,205,109,67,69,50,
                181,67,126,6,99,67,64,134,176,67,128,236,88,67,98,154,69,176,67,99,138,
                100,67,49,218,177,67,174,80,128,67,128,33,193,67,192,58,132,67,108,128,
                33,193,67,0,212,140,67,108,192,42,211,67,0,40,121,67,108,128,33,193,67,
                0,168,88,67,99,101,0,0]);

Panel.setPaintRoutine(function(g)
{
    g.fillAll(Colours.grey);
    var area = [20, 20, 100, 100];
    
    g.drawDropShadowFromPath(p, area, 0x88000000, 5, [0, 5]);
    g.setColour(Colours.white);
    g.fillPath(p, area);
});
```

```javascript
const var Panel1 = Content.getComponent("Panel1");

// that's a poor circle, but the blur will save us...
var circlePath = Content.createPath();
circlePath.startNewSubPath(0.5, 0);
circlePath.quadraticTo(1.0, 0.0, 1.0, 0.5);
circlePath.quadraticTo(1.0, 1.0, 0.5, 1.0);
circlePath.quadraticTo(0.0, 1.0, 0.0, 0.5);
circlePath.quadraticTo(0.0, 0.0, 0.5, 0.0);

Panel1.set("width", Panel1.get("height"));

Panel1.setPaintRoutine(function(g)
{
	g.drawDropShadowFromPath(circlePath, this.getLocalBounds(50), Colours.black, 50, [0, 0]);
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawEllipse([10,10,80,50], 1.5);
});const var Panel1 = Content.getComponent("Panel1");

const var fft = Engine.createFFT();

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawFFTSpectrum(fft, this.getLocalBounds(0));

});Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 32);
	g.setColour(Colours.white);
	g.drawFittedText("Hello World", this.getLocalBounds(0), "topLeft", 2, 20);
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawHorizontalLine(0, 0, this.getWidth()); // xStart, yStart, length
});const var Panel1 = Content.getComponent("Panel1");

Panel1.loadImage("{PROJECT_FOLDER}image.png", "image"); // Load image.png from the "Images" folder

Panel1.setPaintRoutine(function(g)
{	
	g.drawImage("image", this.getLocalBounds(0), 0, 0); // draw the image in the Panel boundaries.
	
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawLine(0, 100, 50, 100, 1.2); // x1,x2,y1,y2,linewidth
});const var Panel1 = Content.getComponent("Panel1");

const var markd = Content.createMarkdownRenderer();
markd.setTextBounds(Panel1.getLocalBounds(0));

markd.setText("
## Heading
Explain explain explain
");

Panel1.setPaintRoutine(function(g)
{	
	g.drawMarkdownText(markd);
});const var Panel1 = Content.getComponent("Panel1");

const var text = "Lorem ipsum HISEorium explanadum in excelsis christophorum non delandam improprium contenatio cimex."

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawMultiLineText(text, [0,20], this.getWidth(), "left", 2.); // text, width, alignment, lineHeight
});const var c = Content.createPath();

c.startNewSubPath(0.0, 0.0);
c.lineTo(0.0, 1.0);
c.lineTo(1.0, 0.0);
c.lineTo(0.5, 1.0);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
    g.fillAll(0x22FFFFFF);
    g.setColour(Colours.white);
    
    var p = {};               // Pick one of these:
    p.EndCapStyle = "butt";   // ["butt", "square", "rounded"]
    p.JointStyle = "rounded"; // ["mitered", "curved","beveled"]
    p.Thickness = 12.0;
    
	g.drawPath(c, this.getLocalBounds(p.Thickness), p);
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawRect(this.getLocalBounds(0), 3);
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.drawRepaintMarker(""); 
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	
	// area, float value (0-50) for all corners or object with {Cornersize:15, Rounded:[1,1,1,1]}, lineWidth
	g.drawRoundedRectangle([8,8,90,60], {CornerSize:15, Rounded:[0,1,1,0]}, 1.5); 
});const var Panel1 = Content.getComponent("Panel1");

const var svg = Content.createSVG("552.nT6K8CFjCTOD.Xa2dUB7vwL.SvXp6TpBfQoF8BK9fB04advjZYtXueJWWylbAdFn2PtHYAvT.HE.5rS67tttXTRauwfO3CIDiu+uEnPhmjIRhwHzJhQF3KBCMfvDQ7t31dIDgESh.gDAfDfAG.yX3jEmynrvT6sGDhQgIS.mtvWqbE19fR+gS37cSa4dYTpb.jfkyJYy3PyjkcyHqiHkbkmw0xosaVsFbxVQosIEihh9Mv2rJRRobNsgevG537uF5+jOIbpRFgN6kaiccsXO3.R4Cmv1V2Nn01x+OFiaUWLMJ8Bwqzz3Oc91UV8SE5cH4u3PqUGWVebIyRsw48BhlN9rBwrz797idlkWt7DT4p2TTfSTz4L1vT586Bx6wT5los6KELGYsD9l0vxX2Hq2aZ2rpGVVYb..FbwsEgrDMmMuWo0KZZndSzCMpw+ZcoVcYs9Hc4C0.zG4SZc4IxoRn2A3j0CaSoU8met3T+XD9nfkG5I.iKsD8g7mm4CjWcfU+g57voNdPnfPf.C.YHCuCPQ..D.VbASWpJIv.zgSfoDP4fAkPqLUiDXB.n..V7tA3Hb.iq3e.SSDCbUQzX3KnvI9YcxM6fibJgmc42KQ3z.uEElWxrMVBU.J1gKFfMkE9fPWLPtyXTAFX.gIKvPCvjUfnO.FubCO.OzFZEtB9CDBDLLstdfvZ0LokAGD6UR.RFeMvXSxYionq.qoALngCSAwAtBX.Fo.");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawSVG(svg, this.getLocalBounds(0), 1);
});Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 32);
	g.setColour(Colours.white);
	g.drawText("Hello World", this.getLocalBounds(0));
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawTriangle(this.getLocalBounds(0), Math.toRadians(180), 2);
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.drawVerticalLine(this.getWidth()/2, 0, this.getHeight()); // xStart, yStart, length
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(true); 
	
	 // fill the layer.
	
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.fillAll(Colours.grey);	
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.pink);
	g.fillEllipse([0,0,this.getWidth(), this.getHeight()]);
});const var p = Content.createPath();

p.startNewSubPath(0.0, 0.0);
p.lineTo(0, 0);
p.lineTo(0.5, 1);
p.lineTo(1, 0);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.withAlpha(Colours.white, 0.5));	
	g.fillPath(p, this.getLocalBounds(0));
});Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);	
	g.fillRect([0,0,this.getWidth(),this.getHeight()]);
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.fillRoundedRectangle(this.getLocalBounds(10), 25); // area, rounded 0 - 100+
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);	
	g.fillTriangle([0,0,this.getWidth(), this.getHeight()], Math.toRadians(90));
});const var p = Content.createPath();

p.startNewSubPath(0.0, 0.0);
p.lineTo(0, 0);
p.lineTo(0.8, 1);
p.lineTo(1, 0);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.withAlpha(Colours.white, 0.5));	
	g.flip(0, this.getLocalBounds(0));
	g.fillPath(p, this.getLocalBounds(0));
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.beginLayer(true);
	
	g.setColour(Colours.white);
	g.fillRoundedRectangle(this.getLocalBounds(10), 50);
	g.gaussianBlur(12);
	
	g.endLayer();
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	Console.print(g.getStringWidth("Hello"));
});const var Panel1 = Content.getComponent("Panel1");

const var p = Content.createPath();

p.startNewSubPath(0.0, 0.0);
p.lineTo(0, 0);
p.lineTo(0.8, 1);
p.lineTo(1, 0);

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.withAlpha(Colours.white, 0.5));	
	g.rotate(Math.toRadians(180), [this.getWidth()/2,this.getHeight()/2]);
	g.fillPath(p, this.getLocalBounds(0));
});const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.fillEllipse([0,0,50,50]);

});
```



```javascript
const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setColour(Colours.white);
	g.fillEllipse([0,0,50,50]);
	
	g.setColour(Colours.grey);
	g.fillEllipse([55,0,50,50]);
	
	g.setColour(Colours.black);
	g.fillEllipse([110,0,50,50]);
	
	g.setColour(Colours.red);
	g.fillEllipse([0,55,50,50]);
	
	g.setColour(Colours.green);
	g.fillEllipse([55,55,50,50]);
	
	g.setColour(Colours.dodgerblue);
	g.fillEllipse([110,55,50,50]);		
});Engine.loadFontAs("{PROJECT_FOLDER}Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFont("nunito", 48);
	g.setColour(Colours.white);
	g.drawAlignedText("hello", this.getLocalBounds(0), "top");
});Engine.loadFontAs("{PROJECT_FOLDER}fonts/Nunito-Regular.ttf", "nunito");

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{	
	g.setFontWithSpacing("nunito", 36, 0.08); // from 0 to 1 over the whole width of the panel.
	g.setColour(Colours.white);
	g.drawAlignedText("hello", this.getLocalBounds(0), "top");
});// A blurry white ball in the middle
g.setGradientFill([Colours.white, 100.0, 100.0,
				   Colours.black, 50.0, 50.0,
				   true]);

// A top down gradient with a black bar in the middle and white at the edges
g.setGradientFill([Colours.white, 0.0, 0.0,
				   Colours.white, 0.0, 100.0,
				   false,
				   Colours.black, 0.5]);
```


```javascript
Panel1.setPaintRoutine(function(g)
{	
	g.setGradientFill([Colours.white, 0 , 0,
				   Colours.black, this.getWidth()/1.5, 0,
				   false]);
				   
	g.fillRect(this.getLocalBounds(0));
});const var Panel1 = Content.getComponent("Panel1");

Panel1.loadImage("{PROJECT_FOLDER}image.png", "image");

Panel1.setPaintRoutine(function(g)
{	
	g.setOpacity(0.3);	
	g.drawImage("image", this.getLocalBounds(0), 0, 0); 
});const var md = Content.createMarkdownRenderer();

const var p = Content.createPath();

// Create a triangle
p.startNewSubPath(0.0, 0.0);
p.lineTo(1.0, 1.0);
p.lineTo(0.0, 1.0);
p.closeSubPath();

const var imageData = 
[
{
	"URL": "my-path",
	"Type": "Path",
	"Data": p,
	"Colour": Colours.blue
}];

md.setImageProvider(imageData);

md.setText("### Example\n> Please render a path like an icon\n![](/my-path:30%)this is text after the icon");

md.setTextBounds([10, 10, 200, 9000]);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
	g.fillAll(0xFF111111);
	g.drawMarkdownText(md);
});// define a prototype using the scriptnode syntax
reg prototype = {
	"MinValue": 20.0,
	"MaxValue": 20000.0,
	"SkewFactor": 0.6
};

// pass that into the factory to create a fix object
const var f1 = Engine.createFixObjectFactory(prototype);

// create a fix object (think JSON but faster)
const var range = f1.create();

// 9.5% slower than just calling Math.pow() (which is the baseline for this function)
const var x = Math.from0To1(0.5, range);

// 34% slower than just calling Math.pow
const var y = Math.from0To1(0.5, prototype);

// There's a small rounding error because of single precision vs. double precision
// but that shouldn't have a real world impact
Console.assertTrue(Math.abs(x - y) < 0.001);const var skewFactor = Math.skew(0.0, 20000.0, 1000.0);
const var midPoint = Math.pow(0.5, 1.0 / skewFactor) * 20000.0; // => 1000
```

However the most interesting use case for this would be if you want to convert a range object from a mid point to a skew factor based range definition for increased performance:

```javascript
// This is a range how it would come from a UI component
// it defines the curve with a middle position
const var p1 = {
	min: 20.0,
	max: 20000.0,
	middlePosition: 1000.0
}

// Using a skew-based range avoids an additional log calculation
// in the conversion functions
const var p2 = {
	MinValue: p1.min,
	MaxValue: p1.max,
	SkewFactor: Math.skew(p1.min, p1.max, p1.middlePosition)
};

// We're caring about performance here so we use fix objects:
const var f1 = Engine.createFixObjectFactory(p1);
const var f2 = Engine.createFixObjectFactory(p2);
const var o1 = f1.create();
const var o2 = f2.create();

{
	.profile(" - mid point with JSON");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, p1);
}

{
	.profile(" - skew factor with JSON");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, p2);
}

{
	.profile(" - mid point with fix object");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, o1);
}

{
	.profile(" - skew factor with fix object");

	for(i = 0; i < 100000; i++)
		Math.from0To1(0.5, o2);
}

/* Results:
- mid point with JSON: 83.185 ms
- skew factor with JSON: 29.896 ms
- mid point with fix object: 27.032 ms
- skew factor with fix object: 24.955 ms
*/Console.print(Math.toDegrees(Math.PI*2)); // 360.0Console.print(Math.toRadians(360)); // 6.2831.. // PI*2// fmod will not wrap around zero
Console.print(Math.fmod(-1.0, 19.0)); // -> -1.0

// wrap will... wrap around zero
Console.print(Math.wrap(-1.0, 19.0)); // -> 18.0[{
  "Controller": 1,
  "Channel": 0,
  "Processor": "Interface",
  "MacroIndex": -1,
  "Start": 0.0,
  "End": 1.0,
  "FullStart": 0.0,
  "FullEnd": 1.0,
  "Skew": 1.0,
  "Interval": 0.01,
  "Converter": "37.nT6K8CBGgC..VEFa0U1Pu4lckIGckIG.ADPXiQWZ1UF.ADf...",
  "Attribute": "Knob1",
  "Inverted": false
}]function modifySecondController()
{
	// grab the existing list
	var list = mh.getAutomationDataObject();
	
	// set the second range start to 50%
	list[1].Start = 0.5;
	
	// send the list back to the automation handler.
	mh.setAutomationDataObject(list);
}mh.setControllerNumbersInPopup([1, 2, 7]);
mh.setControllerNumberNames("Funky Controller!!!", ["Modwheel", "Breath Controller", "Volume"]);const var mh = Engine.createMidiAutomationHandler();

mh.setUpdateCallback(function(obj)
{
	Console.print(trace(obj));
});
```

> Never call [MidiAutomationHandler.setAutomationDataFromObject()](/scripting/scripting-api/midiautomationhandler#setautomationdatafromobject) inside this function or it will cause an endless loop of callbacks! Note that trying to outsmart this rule by using a simple recursion protection would not work as the update message is asynchronous.

```javascript
const var mh = Engine.createMidiAutomationHandler();

// This freezes your computer.
mh.setUpdateCallback(function(obj)
{
	obj[0].Start = 0.5;
	mh.setAutomationDataFromObject(obj);
});

var recursion = false;

// Good idea and extra points for using scoped statements,
// but this freezes your computer too because the update message
// will be called asynchronously...
mh.setUpdateCallback(function(obj)
{
	if(!recursion)
	{
		.set(recursion, true);
		
		obj[0].Start = 0.5;
		mh.setAutomationDataFromObject(obj);
	}
});inline function getNoteOff(list, noteOn)
{
    for(e in list)
    {
        if(e.isNoteOff() && e.getEventId() == noteOn.getEventId())
            return e;
    }
}// Fetch a Panel
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
});// Do not call this in the audio thread obviously...
inline function sequenceHasNoEvents(player)
{
    return player.getEventList().length == 0;
}{
	.sample("constrainedWithin");
	
	var textPos = Rectangle(200, 20);
	var bounds = Rectangle(100, 100, 400, 300);
	
	Console.sample("bounds", bounds);
	Console.sample("textBounds", textPos);
	Console.sample("fitted", textPos.constrainedWithin(bounds));
}{
	.sample("getUnion");
	
	var r1 = Rectangle(10, 50, 90, 65);
	var r2 = Rectangle(300, 200, 10, 55);
	
	Console.sample("r1", r1);
	Console.sample("r2", r2);
	Console.sample("union", r1.getUnion(r2));
}{
	.sample("reduced");
	
	var x = Rectangle(20, 20, 400, 200);
	
	Console.sample("before", x);
	Console.sample("afterTwoArgs", x.reduced(50, 20));
	Console.sample("afterOneArg", x.reduced(30));
}{
	.sample("slicing");
	
	var r = Rectangle(20, 20, 500, 400);
	
	Console.sample("full", r);
	
	var top = r.removeFromTop(50);
	
	Console.sample("topLeft", top.removeFromLeft(50));
	Console.sample("top", top);
	Console.sample("remaining", r);
};{
	.sample("withAspectRatioLike");
	
	var r = Rectangle(20, 10, 300, 300]);
	var other = Rectangle(500, 80, 100, 50);
	
	Console.sample("target", r);
	Console.sample("other", other);	
	Console.sample("fitted", r.withAspectRatioLike(other));
}{
	.sample("withSizeKeepingCentre");
	
	var x = Rectangle(10, 10, 300, 300);
	
	Console.sample("bounds", x);
	Console.sample("smaller", x.withSizeKeepingCentre(50, 50));
}const selection = Synth.getChildSynth("Sampler1").asSampler().createSelection(".")` //Array of `Sample` objects.
for (sample in selection){
  Console.print(sample.get(Sampler.SamplEnd));
}[
{
	"FileName": "C:\\MyFileName.wav",
	"Root": 64
},
{
	"FileName": "C:\\AnotherSample.wav",
	"SampleStart": 64
}];// A simple example for 2 dynamic layers with 2 RR repetitions.
Sampler.enableRoundRobin(false);

const var g1 = [1, 2, 3];
const var g2 = [4, 5, 6];

reg on = false;

function onNoteOn()
{
    // Calling this function tells the sample to just use
    // the first 3 tables for crossfading
    Sampler.setMultiGroupIndex(g1, on);
	Sampler.setMultiGroupIndex(g2, !on);
	
    on = !on;
}const var obj = Sampler.getReleaseStartOptions();

obj.FadeGamma = 0.5;

Sampler.setReleaseStartOptions(obj);["Selection", "SingleClick", "DoubleClick", "ReturnKey" ]const var ModTable = Content.getComponent("Viewport1");

ModTable.setTableMode({
	"MultiColumnMode": false,
	"HeaderHeight": 32,
	"RowHeight": 32,
	"ScrollOnDrag": false
});

ModTable.setTableRowData([
{
	"Source": "Source",
	"Mode": 
	{
		"items": ["Yes", "No", "Maybe"],
		"Value": "No"
	}
},
{
	"Source": "Other Source",
	"Mode": 
	{
		"items": ["Some other item", "Second"],
		"Value": "Second"
	}
}]);

ModTable.setTableColumns([
{
	"ID": "Source",
	"Type": "Text",
	"MinWidth": 150
},
{
	"ID": "Mode",
	"Type": "ComboBox",
	"MinWidth": 80,
	"Toggle": true,
	"Text": "Default",
	"ValueMode": "Text"
}
]);const var b1 = Content.addButton("b1", 0, 0);
const var laf = Content.createLocalLookAndFeel();

b1.setLocalLookAndFeel(laf);

/** Set the inline style sheet that just colours the button. */
laf.setInlineStyleSheet("button{
	background-color: red;
}");// HiseScript:
// Set myProperty as a pixel value
laf.setStyleSheetProperty("myProperty", "10", "px");

// CSS side
button
{
	/** read the property and use it as border radius. */
	border-radius: var(--myProperty);
}
```

> Note that calling this method will automatically repaint the components so you don't have to explicitely repaint them with `sendRepaintMessage()` or friends.

### Inbuilt colour properties

Be aware that HISE will automatically send changes to any of the colour properties from an UI component to the CSS, so if you eg. want to update the background color based on the `bgColour` property, you don't need to use this method, but just use the variable in your CSS code like this:

```javascript
button
{
	background-color: var(--bgColour);
}
```

### Value converters

The third argument in the function call is a string that can be used to convert the value into a CSS value domain.

| Type | Expected Value | Description |
| = | == | === |
| `""` | any string | does no conversion and just passes the raw string over to CSS |
| `"px"` | a number | uses the number as pixel value |
| `"%"` | a float number between 0.0 and 1.0 | converts the number to a percentage value. |
| `"color"` | a colour value (either int or string) | converts any colour from HiseScript (eg. `Colours.red` or `0xFF00FF00` into a propert CSS string ('#FF00FF00') |
| `path` | a [Path](/scripting/scripting-api/path) object. | Converts the given path into a base64 string which then can be used as `background-image` property to replace the standard background rectangle path. |
| `class` | a string | writes one or multiple class selectors into the component. |

```javascript
// HiseScript:
// Raw string
laf.setStyleSheetProperty("rawString", "bold", "");

// Pixel value (25px)
laf.setStyleSheetProperty("pixelVariable", 25, "px");

// Relative value (80%)
laf.setStyleSheetProperty("percentageVariable", 0.8, "%");

// Colour value (#FF0000FF)
laf.setStyleSheetProperty("colorVariable", Colours.blue, "color");

// Path object (some Base64 gibberish)
const var p = Content.createPath();
p.addEllipse([12, 12, 30, 30]);
laf.setStyleSheetProperty("pathVariable", p, "path");

// set the CSS class
const var b = Content.getComponent("button");
b.setStyleSheetProperty("class", ".someclass", "class");

// CSS side
button
{
	font-weight: var(--bold);
	padding-left: var(--pixelVariable);
	transform: scale(var(--percentageVariable));
	background-color: var(--colorVariable);
	background-image: var(--pathVariable);
}

.someclass 
{
	/* will be applied to the `b` Button only. */
	background: red;
}
```

The last conversion allows you to pass any path in HISE over to CSS and render it with box shadows & different stroke types. 

### Precedence

Using this method from the LAF object will send the value to all objects that use the LAF, however there is another [method](/scripting/scripting-api/scriptbutton#setstylesheetproperty) that you can call on individual UI components in order to use different properties for different components. 

In that case, the properties set by the component method will always override the properties set by this method, even if they are executed in reversed order:

```javascript
const var b1 = Content.addButton("b1", 0, 0);
const var b2 = Content.addButton("b2", 130, 0);

const var laf = Content.createLocalLookAndFeel();

b1.setLocalLookAndFeel(laf);
b2.setLocalLookAndFeel(laf);

/** Set the inline style sheet that just colours the button. */
laf.setInlineStyleSheet("button{
	background-color: var(--c);
}");

/** Set the component specific property. */
b1.setStyleSheetProperty("c", Colours.blue, "color");

/** Set the "global" property for all components. */
laf.setStyleSheetProperty("c", Colours.red, "color");
```

In this code example, the first button will be blue, even if the property for the component was set before setting the global component.

### Debugging properties

In order to check the value of each property for individual components, you can right click on any UI component in the Interface designer that has assigned a CSS LookAndFeel and then choose `Show CSS debugger` in the context menu. Doing so for the second button will show this:

```javascript
Current variable values:
{
  "c": "#FFFF0000",
  "bgColour": "#00000000",
  "itemColour": "#00000000",
  "itemColour2": "#00000000",
  "textColour": "#00000000"
}
==============================

/* CSS for component hierarchy: */

button #b2 .scriptbutton

/** Component stylesheet: */
button #b2 .scriptbutton {
  background-color[]: var(--c)
}


/** Inherited style sheets: */
button {
  background-color[]: var(--c)
}const var mp = Content.addMultipageDialog("mp", 0, 0);

for(i = 0; i < 10; i++)
	mp.addPage();const var panel = Content.addPanel("p", 0, 0);

panel.setConsumedKeyPresses("all");

panel.setKeyPressCallback(function(obj)
{
	Console.print(trace(obj));
});
```

then clicking on the panel (to gain focus) and pressing any key will yield something like this output:

```javascript
Interface: {
  "isFocusChange": false,
  "character": "",
  "specialKey": true,
  "isWhitespace": false,
  "isLetter": false,
  "isDigit": false,
  "keyCode": 63238,
  "description": "shift + F3",
  "shift": true,
  "cmd": false,
  "alt": false
}
```

This JSON object is a bit noisy as it provides additional information that we don't really need so we can reduce the number of required properties and paste it back into our first function call:

```javascript
panel.setConsumedKeyPresses({
  "keyCode": 63238,
  "shift": true,
  "cmd": false,
  "alt": false
});Panel1.setFileDropCallback("All Callbacks", "*.wav", function(f)
{
    if(f.drop)
    {
        // We can't pass in only the filename
        // (a String is forbidden as preset value in order
        // to prevent subtle bugs) so we need to create
        // a simple object with a single property
        var x = {};
        x.fileName = f.fileName;
        
        // We could also just have passed in f to the function,
        // but this reduces the noise a bit
        this.setValue(x);
        this.changed();
    }
});

inline function onPanel1Control(component, value)
{
    // This might be empty (at initialisation or for whatever reason)...
    if(isDefined(value.fileName))
    {
        var myFile = FileSystem.fromAbsolutePath(value.fileName);
        // Do something with myFile...
    }
};const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
	g.fillAll(0x22FFFFFF);
	g.setColour(0x55FFFFFF);

	if(this.data.hasFocus)
		g.drawRect(this.getLocalBounds(0), 1.0);

	g.setColour(Colours.white);
	g.drawAlignedText(this.data.text, this.getLocalBounds(0), "centred");
});

Panel1.setKeyPressCallback(function(obj) 
{
	// Take a look at this in the console
	Console.print(trace(obj));
	
	if(obj.isFocusChange)
	{
		this.data.hasFocus = obj.hasFocus;
	}
	else
	{
		switch(obj.keyCode)
		{
			// ESCAPE: Delete the text
			case 27: this.data.text = ""; 
				     break;
			// RETURN KEY: just lose the focus
			case 13: this.loseFocus();  
					 break;
			// BACKSPACE: Remove the last character
			case 8:  this.data.text = this.data.text.substring(0, this.data.text.length-1);
					 break;
			// Append any non-special character
			default: if(!obj.specialKey)
						this.data.text += obj.character;				
		}
	}
		
	this.repaint();
});!!javascript
// Example: Preloading callback
// this code will add a panel which will flash white during the preloading of new samples.

const var panel = Content.addPanel("Panel", 0, 0);

panel.data.colour = Colours.grey;

panel.setPaintRoutine(function(g)
{
	g.fillAll(this.data.colour);
});

// This function will be executed whenever the preload state changes
panel.setLoadingCallback(function(isPreloading)
{
	if(isPreloading)
        this.data.colour = Colours.white;
    else
        this.data.colour = Colours.grey;
        
    // Update the UI
    this.repaint();
});// Changes the mouse pointer over the ScriptPanel1 to a hand with a pointing finger
ScriptPanel1.setMouseCursor("PointingHandCursor", Colours.white, [0, 0]);const myPanel = Content.addPanel("myPanel",0,0);
myPanel.setPaintRoutine(function(g)
{
  g.fillRect(this.getLocalBounds(0));
});
```

Using an inlined function to paint multiple panels:

```javascript
const panel1 = Content.addPanel("panel1",0,0);
const panel2 = Content.addPanel("panel2",0,60);

inline function paintPanels(g)
{
   g.fillRect(this.getLocalBounds(0));
}

panel1.setPaintRoutine(paintPanels);
panel2.setPaintRoutine(paintPanels);
```

Using a regular function to paint multiple panels:

```javascript
const panel1 = Content.addPanel("panel1",0,0);
const panel2 = Content.addPanel("panel2",0,60);

function paintPanels(g) //The function declaration must come before setPaintRoutine().
{
  g.fillRect(this.getLocalBounds(0));
}

panel1.setPaintRoutine(paintPanels);
panel2.setPaintRoutine(paintPanels);const var shader = Content.createShader("myShader");

// No blending
shader.setBlendFunc(false, shader.GL_ZERO , shader.GL_ZERO);

// Additive blending with alpha
shader.setBlendFunc(true, shader.GL_SRC_ALPHA , shader.GL_ONE);

// Default blending based on alpha value:
shader.setBlendFunc(true, shader.GL_SRC_ALPHA, shader.GL_ONE_MINUS_SRC_ALPHA);

// Additive blending without alpha
shader.setBlendFunc(true, shader.GL_ONE, shader.GL_ONE);

// Additive blending with alpha
shader.setBlendFunc(true, shader.GL_SRC_ALPHA , shader.GL_ONE);cpp
// GLSL side

uniform float myValue;
uniform vec3 myColour;
uniform float myBuffer[128];

void main()
{
    fragColor = pixelAlpha * vec4(myColour, myValue);
}
```

From the script you need to call this:

```javascript
// Javascript side:

const var shader = Content.createShader("MyShader");

// a single number will be parsed as float
shader.setUniformData("myValue", 0.8);

// an array with three elements will be interpreted as vec3 type.
shader.setUniformData("myColour", [0.0, 1.0, 0.0]);

const var buffer = Buffer.create(128);

// A Buffer object (a float array) will be passed on to the GPU as read only
shader.setUniformData("myBuffer", buffer);const var mods = Knob1.createModifiers();

// keyboard modifiers
mods.shiftDown
mods.altDown
mods.ctrlDown
mods.cmdDown

// mouse button modifiers
mods.rightClick
mods.doubleClick

// special modifiers
mods.disabled
mods.noKeyModifierconst var mods = Knob1.createModifiers();

const var doubleClickAndShift = [ mods.doubleClick, mods.shiftDown];
const var rightClickOrAlt = mods.rightClick | mods.altDown;
const var commandOrShift = mods.shiftDown | mods.cmdDown;
const var doubleClickWithoutModifiers = [ mods.doubleClick, mods.noKeyModifiers ];
```

You can just overwrite the function you want to reassign, however you need to make sure that the assignment doesn't create any collision with the default mapping, otherwise the action that will be performed might not be the one you have reassigned (it will just pick the first match that is stored in a arbitrary order internally).

```javascript
const var Knob1 = Content.getComponent("Knob1");
const var mods = Knob1.createModifiers();

// We want to reassign the reset double click to shift + double click
Knob1.setModifiers(mods.ResetToDefault, [ mods.doubleClick, mods.shiftDown ]);

// and the text input to a double click without modifiers.
Knob1.setModifiers(mods.TextInput, [mods.doubleClick, mods.noKeyModifier]);someFunction({"value": Math.random()}).then ((result) => 
{ 
    console.log(result);
});
```

#### HiseScript

```javascript
wv.bindCallback("someFunction", function(args)
{
	Console.print(args.value);
	return args.value * 2.0;
});wv.callFunction("someFunction", {"value": Math.random()});
```

#### Javascript in your webview:

You will need to define a JS function in your webview code somewhere like this:

```javascript
// I'm not a web guy, but tucking it to the window object raises the chances of it being
// resolved correctly...
window.someFunction = function(args)
{
	console.log(args.value); // something between 0 and 1...
};xml
<head>
<script src="hisewebsocket-min.js"></script>
</head>
```

> Note that you don't need to provide the actual `hisewebsocket-min.js` file as it's embedded in the webview wrapper and will automatically be loaded. However if you want to develop your webview through an external IDE, you will have to manually provide that file. Just copy this minified JS beauty into the root directory where your `index.html` file resides:

```javascript
class HiseWebSocketServer{constructor(e){this.port=e,this.eventListeners=[],this.initQueue=[],window.addEventListener("load",this.initialise),window.addEventListener("beforeunload",this.onUnload)}onUnload=()=>{this.socket.close()};onReader=e=>{let t=new Uint8Array(e.target.result),s=this.parseWebSocketMessage(t);for(let i=0;i<this.eventListeners.length;i++)this.eventListeners[i](s.id,s.data)};onMessage=e=>{let t=new FileReader;t.onload=this.onReader,t.readAsArrayBuffer(e.data)};initialise=()=>{console.log("PORT: "+this.port),this.socket=new WebSocket("ws://localhost:"+this.port),this.socket.onmessage=this.onMessage,this.socket.onopen=this.sendInitMessages};sendInitMessages=()=>{for(let e=0;e<this.initQueue.length;e++)console.log("send init message"+this.initQueue[e]),this.send(this.initQueue[e]);this.initQueue=[]};parseWebSocketMessage(e){let t=0,s=1==new DataView(e.buffer,t,1).getUint8(0,!0);t++;let i=new DataView(e.buffer,t,2).getUint16(0,!0);t+=2;let n=new TextDecoder().decode(e.slice(t,t+i-1));t+=i;let o=new DataView(e.buffer,t,4).getUint32(0,!0);t+=4;let r;return r=s?new TextDecoder().decode(e.buffer.slice(t,t+o)):new Float32Array(e.buffer.slice(t,t+o)),{id:n,data:r}}addEventListener(e){this.eventListeners.push(e)}send(e){this.socket?this.socket.send(e):this.initQueue.push(e)}}
```

Now you can use the framework to create a HiseWebSocketServer object. It's recommended to put the initialisation code into a separate function and then call this from HISE to initialise the websocket server after everything has been loaded:

```javascript
<script>
var server;
// this function will be called from HISE when everything is loaded
window.initWebSocket = function(port)
{
	
	// create a new instance of the WebSocket server that connects to HISE
    server = new HiseWebSocketServer(port);

	// Adds a function that receives the id and data that you send to the webview
    server.addEventListener(function(id, data)
    {
		console.log(id, data);
    });
}
</script>
```

Now in HISE you can initialise the websocket like this:

```javascript
const var wv = Content.addWebView("wv", 0, 0);

// just pick a random port and hope that there will be no collisions...
const var PORT = parseInt(Math.random() * 65536);
wv.setEnableWebSocket(PORT);

// we pass in the random port number to the initialisation function that opens
// the server connection on the webview
wv.callFunction("initWebSocket", PORT);
```

> Note that choosing a random port number allows multiple plugin instances to communicate with their interface (while living with the 1/65536 chance of a collision, but that's life). However using a static / constant port number can also be used to implement a cross-instance communication across all plugin instances!

#### Data Types

The `data` parameter that is passed to any callback that you register with `HiseWebSocketServer.addEventListener()` contains the data and is one of two possible data types:

1. A `string` if the data sent from HISE was a [String](/scripting/scripting-api/string). 
2. A [`Float32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) if the data sent from HISE was a [Buffer](/scripting/scripting-api/buffer) object.

Note that the second data type is specifically added for transferring audio buffers between the webview and HISE to implement custom waveforms / oscilloscopes etc. If you want to send a JSON object (or a Array), you will need to convert and parse it yourself:

```javascript
// on the HISE side
ScriptWebview.sendToWebsocket("myobject", trace(obj));

// on the Webview side
function onWebSocketMessage(id, data)
{
	let obj = JSON.parse(data);
}// webview
HiseWebSocketServer.send("send some string");

// HISE
// data will be a plain string
ScriptWebView.setWebSocketCallback(function(data)
{
	Console.print(data) // "send some string"
});

// webview
const x = { "key1": 12, "key2": "some value"};
HiseWebSocketServer.send(JSON.stringify(x));

// HISE
// data will be a JSON object that you can trace to view
ScriptWebView.setWebSocketCallback(function(data)
{
	Console.print(trace(data)) // { key1: 12, key12: "some value" }
});

// webview
const x = new Float32Array(512);
for(i = 0; i < x.length; i++)
	x[i] = Math.random();
HiseWebSocketServer.send(x);

// HISE
// data will be a Buffer object
ScriptWebView.setWebSocketCallback(function(data)
{
	Console.print(data.length) // 512
});Server.setBaseURL("https://forum.hise.audio");

// The GET arguments as JSON object
const var p =
{
    "term": "HISE",
    "in": "titlespost"
};

// => https://forum.hise.audio/api/search?term=HISE&in=titlesposts
Server.callWithGET("api/search", p, function(status, response)
{
    if(status == Server.StatusOK)
    {
        // Just use the response like any other JSON object
        Console.print("There are " + response.matchCount + " results");
    }
});Server.setBaseURL("http://hise.audio");

const var p = 
{
    "first_argument": 9000
};

// This dummy file just returns the `first_argument` as `post_argument`...
Server.callWithPOST("post_test.php", p, function(status, response)
{
    Console.print(response.post_argument);
});Server.setBaseURL("http://hise.audio");
const var target = FileSystem.getFolder(FileSystem.Documents).getChildFile("HISE_1_1_1.exe");

Server.downloadFile("download/HISE_1_1_1.exe", {}, target, function()
{
    var message = "";
    
    message += Engine.doubleToString(this.data.numDownloaded / 1024.0 / 1024.0, 1);
    message += "MB / " + Engine.doubleToString(this.data.numTotal / 1024.0 / 1024.0, 1) + "MB";
    
    Console.print(message);
     
    if(this.data.finished)
         Console.print(this.data.sucess ? "Done" : "Fail");
});


inline function onButton1Control(component, value)
{
	if(value)
        Server.stopDownload("download/HISE_1_1_1.exe", {});
};

Content.getComponent("Button1").setControlCallback(onButton1Control);Server.setBaseURL("https://forum.hise.audio/api");
Server.setServerCallback(function(isWaiting)
{
    Console.print(isWaiting ? "SERVER IS BUSY" : "DONE");
});

function printName(status, obj)
{
    if(status == 200)
        Console.print(" " + obj.username);
};

// Now hammer the queue with the top 5 Posters
Server.callWithGET("user/d-healey", {}, printName);
Server.callWithGET("user/christoph-hart", {}, printName);
Server.callWithGET("user/ustk", {}, printName);
Server.callWithGET("user/Lindon", {}, printName);
Server.callWithGET("user/hisefilo", {}, printName);
```

The output:

```
Interface: SERVER IS BUSY
Interface:  d.healey
Interface:  Christoph Hart
Interface:  ustk
Interface:  Lindon
Interface:  hisefilo
Interface: DONE// Grab your current settings from the profiling options popup
// Just click Export as JSON as paste it in your script. */
const var PROFILE_OPTIONS = {
  "threadFilter": [ "UI Thread" ],
  "eventFilter": [ "Lock", "Script", "Scriptnode", "Callback",
    			   "Broadcaster", "Paint", "DSP", "Trace", "Server", 
    			   "Background Task", "Undefined", "Threads" ],
  "recordingLength": "300 ms",
  "recordingTrigger": 0
};

// Pick whatever file you like
const var PROFILE_TARGET = FileSystem.getFolder(FileSystem.Desktop).getChildFile("profile.dat");

// dumps the profile to the desktop
Threads.startProfiling(PROFILE_OPTIONS, x => PROFILE_TARGET.writeString(x));const var th = Engine.createTransportHandler();

th.setOnBypass(function(isBypassed)
{
	if(isBypassed)
	{
		PeakMeter.clear(); // whatever...
		someTimer.stopTimer();
	}
	else
	{
		// resume the timer that detects the peak
		someTimer.startTimer(30);
	}
});const var automationObject = 
[
{
	"ID": "First Parameter",
	"min": 0.5, 
	"max": 2.0,
	"middlePosition": 1.0,
	"stepSize": 0.0,
	"allowMidiAutomation": true,
	"allowHostAutomation": false,
	"connections": [
	  {
	  	"processorId": "SimpleGain1",
	  	"parameterId": "Gain"
	  },
	  {
	  	"processorId": "SimpleGain2",
	  	"parameterId": "Gain"
	  },
	]
}
]Macro 1
Macro 2
Macro 3
Custom 1
Custom 2
Component 1
Component 2
Component 3
Component 4
```

If you need to change that default order, just pass in a function into this method. This function will be executed whenever the plugin parameters are rebuilt (so in HISE itself after each compilation and in your compiled plugin once at initialisation). It expects two parameters `p1` and `p2` which will be filled with two JSON objects with the following properties:;

| Property | Description |
| -- | ------- |
| `type` | the plugin parameter type. This is a magic number and will be `0` for macro controls, `1` for custom automation slots and `2` for UI components |
| `parameterIndex` | This is the index in the default sorting order. |
| `typeIndex` | This is the index within the type. So for the first custom automation slot it will be 0, no matter how many other parameters of a different type come before that. |
| `group` | If you have assigned this parameter to a group, it will contain the string with the group name, otherwise it will be an empty string. |
| `name` | the plugin parameter name as it will be shown in the host. |

Using the example list above, this would be the JSON object for two of the elements:

```javascript
{
	"Macro 2": {
		type: 0,  // type is macro
		parameterIndex: 1, // index in full list
		typeIndex: 1 // second macro
		group: "", // no group
		name: "Macro 2" // macro name
	},
	"Component 1": {
		type: 2, // type is UI component
		parameterIndex: 5, // index in full list
		typeIndex: 0, // first UI component
		group: "", // no parameterGroupName set
		name: "Component 1" // pluginParameterName property
	}
}

```

You will now have to implement the sorting logic by writing a function that compares the two objects and returns one of the given values:

- `-1` if the first parameter should come before the second
- `1` if the second parameter should come before the first
- `0` if the parameters are supposed to be equal
- `undefined` if you want to resort to the default sorting logic between the two parameters.

> Note that if you use parameter groups it will override this sorting mechanism and always put parameters without a group ID first followed by all parameters of a group (as this is how it's required by the hosts), so be cautious when adding parameter group IDs to an existing project.

### Examples

Here is an example function that will keep the normal sorting logic but move all custom automation data slots at the beginning of the list.

You would use this function if you have added the ability of assigning dynamic plugin parameters in an update and want to ensure that the original order of the custom automation slots are not changed (because by default the macro parameters would be put at the beginning of the list).

```javascript
const var CUSTOM_TYPE = 1;

// This function moves all custom automation parameters at the beginning (so they appear before the macros)
uph.setPluginParameterSortFunction(function(p1, p2)
{
	// If one of the parameters is a custom type, put it before
	// the other element.
	
	if(p1.type == CUSTOM_TYPE && p2.type != CUSTOM_TYPE)
		return -1;
	else if (p2.type == CUSTOM_TYPE && p1.type != CUSTOM_TYPE)
		return 1;
	
	// otherwise return undefined which uses the default sorting
	return undefined;
});
```

> You can always check the order of the parameters in the [Plugin Parameter Simulator](/ui-components/floating-tiles/hise/pluginparametersimulator) which will be rebuilt after each compilation and takes the sorting mechanism into account.

Another example that will put the plugin parameters from a given name list at the end can be used if your update contains new controls that you want to be put at the end of the list:

```javascript
// These are the new controls in your update that you want to put at the end:
const var NEW_CONTROLS = [ "Close 2", "Far 1"];

// This function moves all custom automation parameters at the beginning (so they appear before the macros)
uph.setPluginParameterSortFunction(function(p1, p2)
{
	var c1 = NEW_CONTROLS.contains(p1.name);
	var c2 = NEW_CONTROLS.contains(p2.name);

	if(c1 && !c2) // p1 is a new control and p2 isn't
		return 1;
	else if (c2 && !c1) // p2 is a new control and p1 isn't
		return -1;
	
	// otherwise return undefined which uses the default sorting
	return undefined;
});const var uph = Engine.createUserPresetHandler();



inline function onPresetLoad(var obj)
{
	// do something with `obj`
}

inline function onPresetSave()
{
	return { "MyObject": someContent };
}

uph.setUseCustomUserPresetModel(onPresetLoad, onPresetSave, false);