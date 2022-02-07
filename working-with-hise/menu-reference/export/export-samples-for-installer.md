Opens a dialog window that let's you create a sample archive ready to be distributed to the end user.

It will collect all HLAC monoliths of your project and compress it using FLAC into a split archive format with the file extension `.hr1` - `.hrx`

![ExportSamplesForInstaller](/images/custom/exportsamplesforinstaller.png) 

| Name | Description |
| ---- | ------- |
| Split archive size | Choose the file size for the split archive. It will create multiple files if the sample amount exceeds this number. |
| Support Full Dynamics range | If your project uses the [Full Dynamics mode](/hise-modules/sound-generators/list/streamingsampler#full-dynamics) of HLAC, you need to make sure that the FLAC that you export is compressed using 24bits, otherwise you will loose the bit depth. |
| Select Expansion to export | If your project uses expansions, you can encode each expansion into an separate archive using this selector. |
| Resume on existing archive | If the export failed before, this lets you resume the export |
| Choose HXI file to embed | If you want to include the encrypted expansion metadata into the archive, just select the file you want here and it will write it to the metadata of this archive. If you embed an HXI file, you can later just call [`Expansionhandler.installEx...()`](/scripting/scripting-api/expansionhandler#installexpansionfrompackage) for a smooth end user experience. |
| Target Directory | the directory where to put the files. It defaults to the projects folder root. |

> If you press OK, you will get a verbose log printed to the console keeping you track of the current state.

