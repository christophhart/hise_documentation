---
keywords: Add UI customisations
summary:  How to add customizable UI LookAndFeels
author:   Christoph Hart
modified: 10.07.2020
---

This guide tries to break down the process of taking (almost) any stock UI rendering in HISE and replace it with a Javascript-customisable LookAndFeel method.

You will be working on the C++ codebase of HISE for this, but this task doesn't require deep knowledge of the language, so if you know the simple basics of C++ you should be able to pull this off.

At the end you will have a function that you can define in your script just like the ones listed here.

The process that you need to do can be torn down into X steps:

1. Refactor the existing code into a LookAndFeel class
2. Implement a wrapper for the `ScriptedLookAndFeel` class
3. Make the UI component use that `ScriptedLookAndFeel`
4. Be a good boy and add it to the documenation

### Introduction to the LookAndFeel concept


The [LookAndFeel](https://docs.juce.com/master/classLookAndFeel.html) concept in the JUCE framework offers a very nice encapsulation of the actual UI logic and its appearance. With a little bit of extra work, the UI skin gets completely interchangeable without having to mess with the actual class.

Some UI components in HISE already use that concept by forwarding their UI rendering to an attached LookAndFeel object, but if it doesn't, you can refactor the code pretty easily to put it in this format.

Let's take an example component which has this code:

```cpp
struct SomeComponent: public Component
{
	// ... anything

	void paint(Graphics& g)
	{
	    // The UI rendering code has been moved here
	    g.fillAll(Colours::pink);
	    g.setColour(myFunkyColour)
	    g.drawEllipse(getLocalBounds());
	}

	Colour myFunkyColour;
}
```

Now what we want it to look like is something like this:

```cpp
struct SomeComponent: public Component
{
	struct LookAndFeelMethods
	{
		// The LookAndFeelMethods subclass needs to be a virtual 
		// interface class, so make sure you add a virtual destructor.
		virtual ~LookAndFeelMethods() {}; // *1

		// the function that contains the UI rendering should be named as 
		// detailed as possible. In the end, this will be subclassed by one // big look and feel implementation, so if you call your method 
		// `draw()`, then you'll get problems with the next subclass.
	    virtual void drawSomeComponent(Graphics& g, Colour c, Rectangle<int> area)
	    {
	        g.fillAll(Colours::pink);

	        // It's important that you pass any variable that is
	        // used in the UI rendering as separate parameter
	        // to this function because you will use the same
	        // parameters in the Javascript function later...
		    g.setColour(c);
		    g.drawEllipse(area);
	    }
	};

	// Now we need to create a default look and feel class. 
	// In order to do so, we just subclass from our LookAndFeelMethods
	// class and one of the stock JUCE look and feel classes.
	struct DefaultLookAndFeel: public LookAndFeel_V3, // *5
							   public LookAndFeelMethods
	{};

	SomeComponent()
	{
		// We need to pass in an instance of this default class to
		// the setLookAndFeel() method. We'll use a pointer to the
		// member we've defined below...
		setLookAndFeel(&dlaf); 
	}

	void paint(Graphics& g) override
	{
		// we'll fetch the look and feel class, cast it to our 
		// LookAndFeelMethods class and call the function there.
	    if(auto slaf = dynamic_cast<LookAndFeelMethods*>(&getLookAndFeel())
	    {
	        slaf->drawSomeComponent(g, myFunkyColour, getLocalBounds());
	    }
	}

	DefaultLookAndFeel dlaf;
}
```

On the first sight it looks a bit scary and much more complicated than the first solution, however on the client side (where you use the class), it becomes really easy to change the appearance.


## Refactor the existing drawing code

So after we've take a look at the basic procedure, all you need to do is to find the UI component in the HISE codebase that you want to change and apply this refactoring to it. Now the big question is **"Where the heck should I know what class I need to change and where it is?"**

Of course it's very hard to find anything in a foreign codebase as big as the HISE codebase, however since you will most likely want to customize either something that is put into a FloatingTile, you can use this as starting point to your journey to the right class.

Take a look at the file `hi_component/floating_layouts/FloatingTileFactoryMethods.cpp`. In there you will find a function called `registerFrontendPanelTypes()` which gives you a list of all available FloatingTiles that you can add to the interface.

Use a proper IDE, hover over one of the template parameters, (eg. `AhdsrGraph::Panel`, then jump to definition) and you've reached your destination.

> Be aware that it might be possible that the component is already using a LookAndFeel class, in that case, you can just skip this step...

Now after you've done this refactoring, recompile HISE and make sure that everything looks exactly the same as before. If it does, we can head over to part II of our task and add a scripting wrapper for that new look and feel function.

## Add the scripting wrapper

Head over to the file `hi_scripting/scripting/api/ScriptingApiObjects.h`. At the end of the file, you'll see the `ScriptedLookAndFeel` class and this is where we have to add our glue code.

1. Subclass the `LAF` class from the LookAndFeelMethods class you've written (just below PresetBrowserLookAndFeel et al)
2. add the function (`drawSomeComponent()`) to the header
3. Implement the function in the cpp file

Now the third step is obviously the most complex one, but if you take a look at the other implementations it will become pretty clear how to do it. Just a few hints here:

- use the `get()` method to actual acquire a pointer to the scripted look and feel
- you don't need to naively forward every single parameter to the javascript function, decide which ones are actually helpful.
- make sure that the fall-through branch is calling the default render function from the base class
- if you want to pass in a rectangle, use the `ApiHelpers::getVarRectangle(Rectangle<float>)` helper function, it will automatically create a var array with [x, y, w, h] for you
- if you want to pass in a colour, use the `Colour::getARGB()` function

## Make the UI component use the Scripted LookAndFeel

So now that we've successfully added the UI render function to the scripted look and feel, all you need to do is to make the UI component use the scripted look and feel. There is one requirement though: you need access to the [`MainController`](/cpp_api/hise/classhise_1_1_main_controller) instance, but most UI components of HISE should give you that option at some point.

Now just create a object of the class `ScriptingObjects::ScriptedLookAndFeel::LAF`, pass in a pointer to the MainController and call `setLookAndFeel()` with the pointer to the look and feel object you've just created. Make sure you properly manage the ownership of the look and feel object so that it has the same lifetime as the component it's being assigned to, for example like this:

```cpp
struct MyInterface: public ControlledObject
{
	MyInterface(MainController* mc):
       ControlledObject(mc),
       laf(new ScriptingObjects::ScriptedLookAndFeel::LAF(mc))
    {
    	sc.setLookAndFeel(laf.get());
    }

	ScopedPointer<LookAndFeel> laf;
	SomeComponent sc;
};
```

## Add the documentation

All functions that are available in the scripted look and feel are documented in the Glossary chapter ["Look and Feel Customisation"](https://docs.hise.dev/glossary/custom_lookandfeel.html). In order to remember how it's being used and tell other users about this, it's pretty important that this reference is being kept up to date, so whenever you add a new method, make sure to edit this doc to reflect the addition. You can use this format template:

```markdown
### `theFunctionNameAsString`

> A brief description of what it does

| Object Property | Description |
| - | ---- |
| `obj.property1` | a description of each `obj` property |

#### Example

``javascript
laf.registerFunction("theFunctionNameAsString", function(g, obj)
{
    // An example code that (more or less) mimics the default appearance so
    // people can pick up from it and customise it
});
``
```

> Use the proper three ticks for the Javascript example, I wrote it like this so that the Markdown renderer doesn't explode...


