---
keywords: MarkdownEditor
summary:  A full blown MarkDownEditor that is used in the HISE Documentation and can also be used for plugin/vsti onboard documentation.
author:   Christoph Hart
modified: 18.03.2019
---

The markdown editor floating tile is a text editor similar to the [Script Editor](/ui-components/floating-tiles/hise/scripteditor), but focuses on editing markdown files.  
There are plenty of text editors and specialiced markdown editors available, however there are a few reasons to use this one:

#### WYSIWYG

The Markdown parser in HISE is not 100% standard compliant, so there might be a few things that look differently or fail to parse. Writing the markdown inside HISE and previewing at the same time is a good way to check the rendered output.

#### Workflow

The documentation editing workflow in HISE is optimized for working on documentations. You can right click on any link in the preview to create a properly formatted markdown link, or open the currently viewed page in a new editor tab.

#### Inbuilt Markdown generators

The HISE Markdown editor offers some tools that autogenerate links, image links and tables which are guaranteed to 
work in the Markdown parser. If you create new files, it will automatically create 
a [YAML Header](/working-with-hise/project-management/documentation#yaml-header)
that will be used to properly format the TOC and indexes for the search engine.

### The Top Bar

| Icon | Key | Description |
| - | - | ------- |
| ![icon](/images/icon_rebuild:32px) | **F5** | Toggles live preview. If disabled, pressing F5 shows the current editor's content in the connected MarkdownPanel. |
| ![icon](/images/icon_new-samplemap:32px) | - | Creates a new file with a YAML header template. |
| ![icon](/images/icon_load-samplemap:32px) | - | opens a file |
| ![icon](/images/icon_save-samplemap:32px) | Cmd+S | Saves the file. |
| Link | - | Shows the link generator, which takes the current clipboard content and formats it as markdown link. |
| Image | - | Shows the image link generator. You can either choose an embedded icon or select an image which will be copied into the `images` subdirectory. |
| Table | - | A HISE compliant table generator |
| ![icon](/images/icon_settings:32px) | - | Opens the doc settings in HISE to point to the documentation repository. |
 
### The Editor

The editor is the default JUCE text editor with a syntax highlighter for markdown. Please do not ask for line-break support :)