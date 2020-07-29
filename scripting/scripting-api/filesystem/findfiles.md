This will search a given directory and return an [`Array`](/scripting/scripting-api/array) that contains one [`File`](/scripting/scripting-api/file) object per child file.  
You can use it to build up a file browser.

- the `directory` parameter will be the root folder that is going to be searched
- the `wildcard` parameter will filter out the files
- the `recursive` parameter will check whether it should search every sub-folder or just the direct children of this folder.