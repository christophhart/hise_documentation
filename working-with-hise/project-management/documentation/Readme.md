---
keywords: Project Documentation
summary:  Add embedded Documentation to your project
author:   Christoph Hart
modified: 18.09.2019
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
2. Add a [MarkdownPanel](/ui-components/floating-tiles/plugin/markdownpanel) floating tile on your interface.
3. "Compile" the documentation.
4. Ship the compiled content files to the end user.

Let's take a look at each of these steps in detail.

## Write the documentation

HISE uses [Markdown](https://www.markdownguide.org) for all documentation: it's the most popular markup language and yields beautifully arranged texts with a minimum of boilerplate.

You are of course free to use any text editor or specialised Markdown Editor to write your docs, but HISE also has some editing capabilities that might come in handy. 
Check out the documentation of the [MarkdownEditor](/ui-components/floating-tiles/hise/markdown-editor) for a full feature set. The best way of working with markdown files is to open the editor in a tab of the left side of the scripting workspace, and use the interface designer on the right as preview:

- open the scripting workspace
- click on the `+` button in the tab to create a new tab.
- right click on the new tab and select Markdown Editor.

Now before you start writing, let's first take a look at how the file system works in Markdown - you will need this to correctly embed images and link between markdown pages.

### YAML Header

The markdown files in HISE expect a YAML header in the Front Matter format:

```
---
property: value
list-property:
- key: value
- key: value
---
```


 that contains metadata for the file which is used in the search box and the TOC.

If you create a new file using the Markdown Editor, it will create the basic properties for you, otherwise you will have to fill them in manually.

Below you can find a list of all supported properties. Some of them are exclusive to the HISE documentation and won't affect project documentation.

| Property | Expected Data | Description |
| -- | --- | --------- |
| `keywords` | String (one line) | the title of the page |
| `summary` | String (one line) | a short description that will be shown in the search box popup. |
| `author` | String (one line) | your name (only used in the HISE docs). |
| `modified` | Date (TT.MM.YYYY format) | the last modification date. Only used in the HISE Docs. |
| `index` | number (starting with zero) | overrides the natural sorting of the items in the TOC and can be used to manually setup the order you want the TOC to appear. |
| `weight` | number (0 - 100) | the "importance" of this page. This will have an effect on the search results (pages with higher weight will show up first). Be aware that by default everything starts with 50 and children have 10 weight less than their parents. |
| `colour` | Colour (`#AARRGGBB`) | the colour to show in the search box and TOC for this item and all its children (which don't have a defined colour property themselves) |
| `parameters` | YAML list | Only for HISE modules: a description of every parameter that is used by the autogenerator for the module database. |
| `properties` | YAML list | Only for Floating tiles & Script components: a description of each property that is used by the autogenerator. |

### Markdown File system

The markdown system uses relative paths in order to resolve links. This allows you to create links that will work on HTML pages as well as the embedded docs. The compatibility with HTML URLs oppose some restrictions on the filenames for folders and files inside this directory:

- just lowercase
- no space (use `-` as word separator)

so make sure that every file and folder will follow these rules (or you'll end up with broken links).

In order to find out the link URL of a markdown file you have to:

1. Start with the relative file path from the documentation folder.
2. Replace backslashes (`\`) with slashes (`/`) and make sure it starts with a slash `/`
3. omit the file extension (.md)
4. Add an optional anchor to jump to a location within this page.

> There is one special file: the `readme.md` file, which is used if you just supply an URL to a folder. If you have a little bit of experience with web design, it's similar to the procedure where it appends an `index.html` to a URL that points to a folder.  That means if you want to link to a readme.md file, just omit readme.md and use the path to the parent directory instead.

#### Example

 Our project is located at `C:\MyProject` and we want to create a link to the headline **Driver Settings** in the file `C:\MyProject\Documentation\settings-page\audio-settings.md`.

1. the relative path is `settings-page\audio-settings.md`.
2. with the correct slashes it becomes `/settings-page/audio-settings.md`.
3. without file extension it's `/settings-page/audio-settings`.
4. we'll URLify the headline and append it as anchor with a hashtag: `/settings-page/audio-settings#driver-settings`

Another example: we want to point at the file `C:\MyProject\Documentation\effect-page\readme.md`.  

Since it is a readme.md file, we can omit the entire filename and end up with `/effect-page`.

#### Images

URLs to images work the exact same way with the following modifications:

1. You don't omit the file extension (since it can be a PNG, a JPG or even a GIF)
2. Every image has to be in the `images` subfolder (so it's guaranteed to start with `/images/`.
3. You can embed all kinds 

Now before you proceed with the next step, make sure to create at least one file (the best choice would be the `readme.md` file in the root directory because it will be displayed as default page.





## Add the documentation to your interface

In order to show the documentation in your project, you will need to add a FloatingTile with a `MarkdownPanel` content type. This will automatically point to the `readme.md` file in the documentation root directory. There are numerous ways to customize the appearance, check the 