---
keywords: File
summary:  A object for accessing a file on disk
author: Christoph Hart
modified: 17.07.2020
---

The `File` object refers to a file or directory on disk and can be used to navigate / access the file system.

In order to use it, call the [`Filesystem`](/scripting/scripting-api/filesystem) API class to get a folder from where you navigate to the file you want to modify / load.

> Be aware that there is no possibility of writing / loading files using absolute paths (eg. `C:\MyFolder`) because it is not portable across operating systems (and even computers).

