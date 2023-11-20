This creates an object holding constants to be used in [setModifier()](/scripting/scripting-api/scriptslider#setmodifiers). There are two types of constants in there: action IDs and modifier key magic numbers.

### Actions

There are multiple actions that are performed when interacting with a slider based on different modifier keys.

| ID | Default | Description |
| -- | -- | -- |
| TextInput | shift key | Opens the text input |
| ResetToDefault | double click | sets the slider to the default value |
| ContextMenu | right click | opens the context menu that lets you assign CCs etc |
| FineTune | command, ctrl or alt | changes the dragging sensitivity to a finer resolution |

The constants for the Action IDs just hold the same string as value, so it's not 100% required to use them (however it let's you use the autocomplete entries instead of looking up the available actions).

### Modifiers

The other constants in this object are modifier keys and are basically identical to the properties of the event JSON object that is passed into the mouse callback of the panel:

```javascript
const var mods = Knob1.createModifiers();

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
mods.noKeyModifier
```

> Be aware that these constants do not hold string values like the action IDs, but integer flags that use bitwise operators for combining multiple modifiers.

The special modifiers can be used to either disable an action altogether or make sure that the action is only performed if no modifier key is pressed (you will need that if you set two actions to the same mouse click type).


