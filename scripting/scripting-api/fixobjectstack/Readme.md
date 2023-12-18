---
keywords: FixObjectStack
summary:  A unordered stack that can by used to hold a dynamic amount of elements
author:   Christoph Hart
modified: 18.12.2023
---
  
This data container in an enhancement of the [FixObjectArray](/scripting/scripting-api/fixobjectarray) and keeps track of the amount of "used" elements.

It's special behaviour is that it always guarantees a dense structure: removing elements will just move the last element into the empty position. This will destroy the "order" of elements, but for use cases where the elements are not directly related with each other, this is a good trade-off because it allows very fast insertions & removal operations.

```javascript

// This is the init state of our stack
[0, 1, 2, 3];

// Insert X

[0, 1, 2, 3, X];

// Remove 2, move X into the gap

[0, 1, X, 3];

// Insert Y at the end

[0, 1, X, 3, Y]
```
