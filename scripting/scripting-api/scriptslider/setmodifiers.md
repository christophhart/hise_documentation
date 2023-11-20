This allows you to override the default modifiers for various actions related to the slider. It expects an ID for the action you want to change and a combination of modifier keys that will be assigned to the action. For both parameters it's highly recommended to use the properties from the Modifier object returned by [createModifiers()](/scripting/scripting-api/scriptslider#createmodifiers) as it provides all available IDs and magic numbers as pretty named properties.

> Be aware that this function is supposed to be called once at initialisation. Also it will keep the assignments from previous compilations, so if you want to reset it to the default you need to rebuild the UI from the interface designer.

#### Combining modifier keys

You can use both logical operators AND / OR in order to combine modifier keys, however the syntax differs a bit:

1. The OR operator can be implemented using the bitwise-or syntax
2. The AND operator must be implemented by passing an array of modifiers (up to three modifiers are supported)

```javascript
const var mods = Knob1.createModifiers();

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
Knob1.setModifiers(mods.TextInput, [mods.doubleClick, mods.noKeyModifier]);
```