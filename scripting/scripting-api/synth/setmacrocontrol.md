Calling this method will have the same effect as turning the respective [Macro Control](/glossary/macrocontrols) but you can use it for a more fine-grained control about what and when to send the value change.

Unlike everything else in a proper programming language, the range of the `macroIndex` argument starts with 1 (to be consistent with the labels in HISE).

The `value` argument is expected to be in the `0 - 127` value range, but it doesn't need to be an integer.

> It's your responsibility to watch out that this call does not occur in a control that is connected to the same macro control or you might end up getting a recursive loop and freeze your system!