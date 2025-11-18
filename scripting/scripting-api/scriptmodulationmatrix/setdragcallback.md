If you setup a UI component for dragging modulation connections on a target, you can attach a callback to drag events using that method. This function expects a callable object with 3 parameters:

1. The source modulator ID
2. The target ID if the user drags a connection over a modulatable knob
3. A string with the event type

This function will now get executed with the following string values as third event type parameter:

- `"DragStart"` whenever the user starts dragging a modulation connection with the [ModulationMatrixController](/ui-components/floating-tiles/plugin/modulationmatrixcontroller) or via [ScriptPanel.startInternalDrag()](/scripting/scripting-api/scriptpanel#startinternaldrag) (if the drag data is connected to the modulation system). In that case the `targetId` parameter will be empty.
- `"DragEnd"` if the user stops dragging the source or is dropped on a illegal target.  In that case the `sourceId` and  `targetId` parameters will be empty.
- `"Drop"` whenever the user drops the modulation connection on a valid UI knob. In that case the `targetId` parameter will be the `matrixTargetId` of the hovered knob.

- `"Hover"` if the user drags the connection over a valid target knob (on hover).  In that case the `targetId` parameter will be the `matrixTargetId` of the hovered knob.
- `"DisabledHover"` if the user drags the connection over an invalid target knob (eg. because it has already a connection to that source). In that case the `targetId` parameter will be the `matrixTargetId` of the hovered knob.

