---
keywords: raw::Positioner
summary:   C++ API Class reference
author:   Christoph Hart
---

A helper class for transferring the position data of a scripted interface to C++.  
The positioning of UI elements is a rather annoying task (aka pixel-pushing). If your interface has a static layout (which is still the case for most plugin projects), you will have to shovel around the component positions, recompile, see if it matches, etc.  
The interface designer in HISE was made to improve the efficiency for this step: you have a WYSIWYG editor where you can select, drag and resize UI elements just like in any other graphic design application. However if you are using the raw API to build your final project in C++, you won't be able to leverage this tool, or even worse, if you have made a prototype with the interface designer, start from scratch or copy / paste all positions manually.  
This is where this helper class comes in. It takes a object that contains the position and hierarchy of every component in your scripted interface and applies it to a C++ Component. It assumes the same child-component hierarchy and naming.  
You can create such a Data object simply by right clicking an UI component in the Component List of the interface designer and choose "Copy C++ position data to clipboard". Then paste the content of the clipboard somewhere in your C++ project and call the [apply()](/cpp_api/raw/classhise_1_1raw_1_1_positioner#apply) method in the resize() callback of the root component:  

```cpp
// This is our main component class
class MainInterface: public Component
{
public:
    MainInterface()
    {
        // We need to set the root name
        setName("Root");

        addAndMakeVisible(slider1);

        // The slider needs to have the exact name as in the data object.
        slider1.setName("Slider1");

        addAndMakeVisible(buttonPanel);
        buttonPanel.setName("ButtonPanel");

        // We add the buttons to the invisible component to match the hierarchy (see below).
        buttonPanel.addAndMakeVisible(leftButton);
        leftButton.setName("LeftButton");

        buttonPanel.addAndMakeVisible(leftButton);
        leftButton.setName("LeftButton");
    }

    void resized()
    {
        // This is pasted from the interface designer.
        // Note how the names and hierarchy matches the component's names and hierarchy.
        raw::Positioner positioner({
         "Root", { 0, 0, 600, 500 },
         {
          { "Slider1", { 227, 96, 140, 70 }, {} },
          {
           "ButtonPanel", { 100, 200, 400, 60 },
           {
            { "LeftButton", { 64, 18, 117, 25 }, {} },
            { "RightButton", { 240, 18, 117, 25 }, {} }
           }
          }
         }
        });

        // Applies the positions from above.
        positioner.apply(*this);

        // Everything should be found here...
        positioner.printSummary();
    }
private:

    juce::Slider slider1;
    juce::Component buttonPanel;
    juce::TextButton leftButton;
    juce::TextButton rightButton;
};
```

  

## Class methods

### Positioner

```cpp
 Positioner(ScriptComponent::Ptr component)
```

Creates a positioner object from a scripted component. You don't need this method in your code, it's used for the creation of the data.   

### Positioner

```cpp
 Positioner(const Data &d)
```

Creates a positioner object from the given data. Just paste the exported data String from the clipboard as argument.   

### toString

```cpp
String toString()
```

Creates a string representation of the UI positioning data ready to be pasted into your C++ project. You won't need to call this method ever manually, just use the drop down menu entry in the Component List.   

### apply

```cpp
void apply(Component &c)
```

Applies the given UI positioning data to the component. The best place to call this is the resized() callback of your main component - it will iterate over all children and set their position (so you can leave the child component's resized() callback alone).   

### applyToChildren

```cpp
void applyToChildren(Component &c)
```

The same as [apply()](/cpp_api/raw/classhise_1_1raw_1_1_positioner#apply), but doesn't change the root component position.   

### printSummary

```cpp
void printSummary()
```

This prints out a statistic of all components that were positioned and those who could not be resolved. This is helpful during development so you can quickly check which components you need to fix.   
