---
keywords: Documentation
summary:  The folder for the markdown files of your documentation
author:   Christoph Hart
modified: 19.09.2019
index:   04
---

The **Documentation** folder in your project will contain all files related to the documentation of your project. It is the root for all URLs that you'll use to link between pages.

> Be aware that the contents of this folder will not be embedded into the plugin, but have to be compiled separately and shipped to the end user as described [here](/ui-components/floating-tiles/plugin/markdownpanel#-updating-the-documentation).

---

**The file system**
  
The markdown documentation system uses relative paths in order to resolve links. This allows you to create links that will work on HTML pages as well as the embedded docs. The compatibility with HTML URLs oppose some restrictions on the filenames for folders and files inside this directory:

---
**Filename conventions**

In order to be compatible with web URLs, any link has to follow these rules:

- just lowercase
- no space (use `-` as word separator)

In order to find out the link URL of a markdown file you have to:

1. Start with the relative file path from the documentation folder.
2. Replace backslashes (`\`) with slashes (`/`) and make sure it starts with a slash `/`
3. omit the file extension (.md)
4. Add an optional anchor to jump to a location within this page.

> There is one special file: the `readme.md` file, which is used if you just supply an URL to a folder. If you have a little bit of experience with web design, it's similar to the procedure where it appends an `index.html` to a URL that points to a folder.  That means if you want to link to a readme.md file, just omit readme.md and use the path to the parent directory instead.

---


**Example**

 Our project is located at `C:\MyProject` and we want to create a link to the headline **Driver Settings** in the file `C:\MyProject\Documentation\settings-page\audio-settings.md`.

1. the relative path is `settings-page\audio-settings.md`.
2. with the correct slashes it becomes `/settings-page/audio-settings.md`.
3. without file extension it's `/settings-page/audio-settings`.
4. we'll URLify the headline and append it as anchor with a hashtag: `/settings-page/audio-settings#driver-settings`

Another example: we want to point at the file `C:\MyProject\Documentation\effect-page\readme.md`.  

Since it is a readme.md file, we can omit the entire filename and end up with `/effect-page`.

---

**Images**

If you want to show images in your documentation, you need to put them all into the `/images` subfolder of this folder (or you can link to a web URL with an image). Links to images are a little bit different than to text URLs:

1. You don't omit the file extension (since it can be a PNG, a JPG or even a GIF)
2. Every image has to be in the `images` subfolder (so it's guaranteed to start with `/images/`.
3. You can embed all kinds of images - even SVG images. Be aware that they will be scaled to 100% width unless you give them a fixed with using the `url:100px` syntax.

