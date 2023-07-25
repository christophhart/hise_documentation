If you add a script processor using the builder, you most likely give it some code to compile. The most straight forward solution to this is to use an external script for this:

1. Write a script in any Script processor
2. When you are done, right click in the script editor and choose "Save script to File". This will coallescate all callbacks and save it into one file.
3. In the builder, create a script processor, save it's index and then pass this index together with the file reference of the file you just saved into this method. The syntax for the reference string is exactly like what you put into include statements.

This will load the script content from the file into the given script processor and recompile it giving you the ability of using one script for multiple processors (which you might want to do anyway since you're using the Builder).

If you need to modify the script, just do so - the script processor should detect that it's connected to an external file and then update it accordingly if you make changes. Just be aware that in order to apply those changes to all script processors that might use the script, you have to recompile them (using the Recompile all scripts) function