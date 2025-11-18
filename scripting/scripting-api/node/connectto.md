This function can be used to connect the modulation output of this node to a target parameter.

> If you want to connect a parameter of a container to another parameter you will need to use the [Parameter.addConnectionFrom()](/scripting/scripting-api/parameter#addconnectionfrom) method which operates on the target parameter.

You can call this method on any node that has one or more modulation outputs. This modulation output will be the **source** of the connection and the method will create a connection from this output to the targetParameter:

- the parameterTarget parameter must be a [Parameter](/scripting/scripting-api/parameter) object that references the parameter that will be the target of the connection.
- the sourceInfo parameter is providing additional information for certain cases. If the node has multiple modulation outputs (like eg. the [control.xfader](/scriptnode/list/control/xfader) node), you can specify at which output slot it should connect to. For single modulation slots this parameter is ignored.



