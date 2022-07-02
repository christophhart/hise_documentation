---
keywords: markdownrenderer
summary:  A Markdown Renderer for rendering markdown text on a Panel
author:   Christoph Hart
modified: 02.07.2022
---
  
The [MarkdownPanel](/ui-components/floating-tiles/plugin/markdownpanel) is a FloatingTile that can be used to display the documentation for your plugin using the markdown syntax. However for some use cases, this is overkill and requires to setup a file directory (unless you give it a custom string to parse).

If you need more customizability, you can now create an object of this type using [`Content.createMarkdownRenderer()`](/scripting/scripting-api/content#createmarkdownrenderer) and use it to render dynamic markdown text directly on a Panel (or any other paint callback with a `Graphics` object like LAF functions).

In order to use it, create an object, give it a string to display, set the width of the render area (so that it can calculate the line breaks and layout) and then call [`Graphics.drawMarkdownText()`](/scripting/scripting-api/graphics#drawmarkdowntext) in order to render it on your panel.


