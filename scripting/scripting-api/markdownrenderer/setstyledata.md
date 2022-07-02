Allows you to style the markdown output. In order to use it, get a JSON object with the default values using [getStyleData()](/scripting/scripting-api/markdownrenderer#getstyledata), then change the properties and call this method.

> It's very likely that these properties will change over time (which is why I don't provide a soon-to-be-deprecated list of available properties). The best "documentation" for the available properties is using `Console.print(trace(md.getStyleData()))`.
