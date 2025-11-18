The resynthesis step might take a few seconds so in order to increase the loading times of user generated patches (or during development) you can define a cache directory by passing in a file object (either a [File](/scripting/scripting-api/file), a String containing an absolute path or one of the constants of the [FileSystem](/scripting/scripting-api/filesystem) object (eg. `FileSystem.AudioFiles`)).

If this method is called with a directory, any time the wavetable synthesiser has resynthesised an audio file, it will create a cached version from this file and the (currently used Resynthesis options) in the provided directory. If the file is then loaded again with the same settings, it will skip the resynthesis process to speed up the loading time.

> Note that the cache will not contain the post processing functions as they will be executed after loading the wavetable from the cache.

The second argument of this function can be used to clear out the directory (which might be helpful during development).

