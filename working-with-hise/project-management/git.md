# How to use Git LFS with samples

If you use Git for version control for your HISE project, it is heavily recommended to not track the sample files as regular files, because your repository size will exponentially grow with each commit of your samples. This will make the checkout times a serious problem and therefore should be avoided.

This leaves you with two options:

1. Ignore the files by adding filters to `.gitignore`. If you go for this option, you need to upload the files to another cloud storage (eg. Dropbox) and use the **Redirect Sample folder** option in your project.
2. Track the files using Git LFS. This option is a bit more pricey (if you use GitHub you need to purchase storage packs which cost about 5$ / month for 50GB) and for really really large libraries (> 50GB) it might not be worth it, but it offers a pretty convenient workflow, because it automatically pulls the samples and you don't need to keep track of the samples manually.

A nice introduction video for Git LFS can be found here:

[Introduction to LFS](https://www.youtube.com/watch?time_continue=2&v=S03EEusFxoI)

## Initialise a repository with Git LFS

So if you have decided to use Git LFS for your project, you will need to setup the repository to work with LFS.

> If you've previously used the `.gitignore` option, you will have to remove the filters from the file before continuing...

If you use a Git GUI client like [SourceTree](https://www.sourcetreeapp.com/), you can activate LFS by executing the "Initialise LFS" command (in SourceTree it's located at **Repository -> Git LFS -> Initialise Repository**. Then you need to add the file-extension that you want to keep track using LFS.
I recommend adding every audio file extension as well as the .chx extension for HLAC monoliths:

```
*.wav
*.aif
*.aiff
*.ch1
*.ch2
*.ch3
*.ch4
*.ch5
*.ch6
*.ch7
*.ch8
```

Commit the change - it should show the file `.gitattribute` as modified. Now your repository should be ready to handle these files using LFS.

### Test Git LFS

Before adding your entire sample content to Git LFS, I suggest you make a test with one audio file to check if it works. Stage a single sample file, and commit it.

The Git log output will show someting like this:

```
Uploading LFS objects: 100% (1/1), 1.9 MB | 461 KB/s                            
Uploading LFS objects: 100% (1/1), 1.9 MB | 461 KB/s                            
Uploading LFS objects: 100% (1/1), 1.9 MB | 461 KB/s, done
```

If you use GitHub, open the repositories' website in a browser, navigate to the sample file you've just uploaded and confirm that it looks like this:

![success](http://hise.audio/manual/images/lfs_success.png)

The `Stored with LFS` message indicates that the repository successfully detected the file as file being treated as LFS file.

### Best practices and tips

There are a few things to consider when using Git LFS.

#### Modifying files

If you move or rename sample files, it should not reupload the files. However, if you change the file content by changing the gain, or the length of the audio file, it will reupload the entire sample file which adds to your storage. 

#### Avoid empty LFS commits when working with macOS and Windows

macOS and Windows are using two different [line ending characters](https://stackoverflow.com/questions/419291/historical-reason-behind-different-line-ending-at-different-platforms).
If you work on both Windows and macOS systems, it results in changes to text files. Normally, Git is pretty good in removing these changes internally.
However, this might lead to LFS pointer files being flagged as modified. If you commit these "changes", it will reupload the same file, which is annoying. In order to prevent this, make sure that the SHA hashes inside the file have actually changed before committing a pointer file modification.

#### Ignore LFS files when cloning

In some occasions, you might want to ignore the LFS files and just checkout the project as quick as possible: if you're using a build server to create the binaries from your project, you don't need the sample files there. In order to do so, you have to config Git to ignore LFS files:

```
git config --global filter.lfs.smudge "git-lfs smudge --skip"
git clone SERVER-REPOSITORY
```

To undo this configuration, execute:

```
git config --global filter.lfs.smudge "git-lfs smudge -- %f"
```

> Disclaimer: This information is taken from a [Stack overflow question](https://stackoverflow.com/questions/42019529/how-to-clone-pull-a-git-repository-ignoring-lfs) and is not verified, so proceed with caution.

#### Do not use LFS for tracking impulse responses / embedded audio files

~~If you initialise the repository as described above, all audio files will be tracked using Git LFS. However if you follow the last tip and ignore LFS files in your build server, it will not fetch the audio files which are supposed to be embedded into your plugin. In order to do so, you have to manually edit the `gitignore` file and change the wildcards to only work in the `Samples` subfolder:~~

```
Samples/*.ch1 filter=lfs diff=lfs merge=lfs -text
Samples/*.wav filter=lfs diff=lfs merge=lfs -text
```

> Doesn't work yet...


