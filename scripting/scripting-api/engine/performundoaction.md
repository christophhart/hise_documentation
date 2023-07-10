This function will perform an undoable action that is defined by the function you pass in as second parameter. The function expects a single parameter that is either `true` when the function should be undone or false if it needs to be performed (or "redone").

The first parameter will be used as `this` object during the execution and can contain the information that the function needs in order to perform the action.

Calling this function will perform the action immediately and will add it to the undo manager that can be controlled with `Engine.undo()`, `Engine.redo()`.

This function can be used in order to implement more complex undoable actions than the native UI widgets provide.

#### Example

This example just operates on an array and changes the values inside an undoable operation.

```javascript
const var myList = [1, 2, 3, 4, 5, 6];

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
Console.print(trace(myList));
```