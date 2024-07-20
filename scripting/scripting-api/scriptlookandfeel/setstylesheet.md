This method will load (or create) a file with the specified filename in the `Scripts` folder of your project and parse it as CSS code that will be applied to any UI component that is associated with this LookAndFeel object.

The file will then be included (like an external script file or a .glsl file) and you can open it using the drop down in the code editor. 

> The code editor will then switch to CSS mode with proper syntax highlighting & autocomplete of all supported CSS properties. Also pressing F5 while editing the CSS code will **not** recompile the entire script, but just reparse the CSS and update the (currently) visible UI components. This allows a super fast iteration of UI design!

Take a look at the CSS reference guide [here](/glossary/css) for a list of supported properties & language features.