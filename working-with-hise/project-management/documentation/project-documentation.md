---
keywords: Project Documentation
summary:  Add embedded Documentation to your project
author:   Christoph Hart
modified: 18.09.2019
index:    01
---
  
You can use the inbuilt HISE documentation system to write a documentation that can be embedded into your project.

This offers some neat advantages over the "traditional" way of shipping a PDF manual along with your plugin:

- write documentation using the most popular markup language (Markdown)
- handy navigation controls including search function & TOC
- open context-based help for dedicated UI components using the `docLink` property (t.b.a).
- connect different topics via links
- auto-update it from a server URL
- create a static HTML website that mirrors the embedded documentation.
- add icons from SVG, links to external websites and even embedded GIFs.

In order to use the project documentation feature, you will need to:

1. Add markdown files in the **Documentation** folder of your project. If you want to add images, put them in the `images/` subfolder of the **Documentation** folder.
2. Add a MarkdownPanel floating tile on your interface.
3. "Compile" the documentation.
4. Ship the compiled content files to the end user.

Let's take a look at each of these steps in detail.

## Write the documentation


You are of course free to use any text editor or specialised Markdown Editor to write your docs, but HISE also has some editing capabilities that might come in handy. 
Check out the documentation of the [MarkdownEditor](/ui-components/floating-tiles/hise/markdown-editor) for a full feature set. The best way of working with markdown files is to open the editor in a tab of the left side of the scripting workspace, and use the interface designer on the right as preview:

- open the scripting workspace
- click on the `+` button in the tab to create a new tab.
- right click on the new tab and select Markdown Editor.

> At this point it's probably best to read the [Markdown](/working-with-hise/project-management/documentation/markdown) specification to learn how to write the documentation

You need to have at least one file called `readme.md` in the **Documentation** subfolder as this will be the one that's being shown on your interface.

## Add the documentation to your interface

In order to show the documentation in your project, you will need to add a FloatingTile with a [MarkdownPanel](/ui-components/floating-tiles/plugin/markdownpanel) content type. This will automatically point to the `readme.md` file in the documentation root directory. There are numerous ways to customize the appearance, check the properties of the floating tile.

## Compile the documentation

If you're done with the documentation, you will need to "compile" it into two files as described [here](/ui-components/floating-tiles/plugin/markdownpanel#-updating-the-documentation). Right click on the MarkdownPanel and select **Export**, then run the "Update local cache file" function in the popup window.

## Distribute the docs to the end user

The documentation is not supposed to be part of the plugin, but needs to be installed separately. This allows you to update the documentation without recompiling the plugins. Just make sure that the two cache files that you've created in the last process end up in the user's app data directory.

In the future there will be a automatic update feature so that you just have to supply a URL where the files are and they will be checked for modifications and automatically updated.