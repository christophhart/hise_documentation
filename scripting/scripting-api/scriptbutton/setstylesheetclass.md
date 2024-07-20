This will write the given [CSS class selectors](/glossary/css#css-selectors) to the component so that it can change what selectors are applied to the component.

The argument expects a string that follows the syntax of defining class selectors in HTML: a whitespace separated list of class selectors.

> `".classone .classtwo .classthree"`

Calling this method will update the classes for the component and invalidate the style sheet to be recalculated. This can be used to alter the appearance of a UI component.

> For a change of a single property using the [setStyleSheetProperty](/scripting/scripting-api/scriptbutton#setstylesheetproperty) function might be a better tool.


