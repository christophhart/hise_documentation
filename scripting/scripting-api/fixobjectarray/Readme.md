---
keywords: FixObjectArray
summary:  A preallocated data container with a fix memory layout for its items
author:   Christoph Hart
modified: 18.12.2023
---
  
This container is created by a [FixObjectFactory](/scripting/scripting-api/fixobjectfactory) and can be used like a ordinary [Array](/scripting/scripting-api/array). It allows subscript operations for inserting & fetching values and range-based for loops:

```javascript
const var f1 = Engine.createFixObjectFactory({
	"value": 0
});

const var list = f1.createArray(128);

for(s in list)
{
	s.value = 90;
}

list[12].value = 20;

const var x = list[90].value;
```

There are also a few methods copied from the `Array` class, however for dynamic insertion and removal (like with `push()` or `removeElement()`) it's highly recommended to use the [`FixObjectStack`](/scripting/scripting-api/fixobjectstack) class instead.
