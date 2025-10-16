This function can be used to add the entire state of a HISE module to the user preset. This function will create the same XML element for the given module as it is stored in the XML file of the project (or if you copy a module using Ctrl+C) and attach it to the user preset's xml data. `moduleId` can be either the ID of the module that you want to attach to the user preset, or it can be a JSON object that provides additional functionality to remove properties and child elements.

> Be aware that this function will only restore the immediate module - child modules are unaffected by this function. This ensures that the module tree is not being modified which might result in unstable behaviour.

Passing in a JSON object as parameter allows you to sanitize the XML element before it gets stored into the user preset XML tree. This has two benefits:

1. Cleaner output
2. Protection against weird side effects - eg. the user could manually edit the routing matrix and cause havoc.

| Property | Type | Description |
| --- | - | ------- |
| `ID` | String | the ID of the HISE module as seen in the Patch Browser (the string you would normally pass into this method). |
| `RemovedProperties` | Array | A list of all properties (as String) that you want to remove from the XML data before saving. Be aware that this only applies to the root XML element. |
| `RemovedChildElements` | Array | A list of all child elements (String of the XML tag) of the XML element that you want to remove before saving. |

If you remove child elements or properties with this method, HISE will create a copy of the data that is about to be deleted BEFORE loading a new preset and then attaches it to the XML data that was loaded to ensure that this data remains static.
