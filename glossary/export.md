---
keywords: Export and Deployment
summary:  How to export your plugin/instrument with HISE
index: 0
---






## Export and Deployment 

If you use the .hr1 resource file (which I highly recommend for distribution), the user has to extract the monolith data to a customizable location, and it will automatically create a link file for you.



### Install Procedure (User)

Let's go through the install procedure in the eyes of a user. 

https://librewave.com/knowledge-base/sample-library-installation-guide/#Installing_the_samples

#### Config directory
During installation of the plugin a **config directory** with the Plugin `Name` (equivalent to the Project Settings `Name` in the **HISE** Settings) will be created on the users computer. The location of this folder will vary depending on your operating system.

GNU/Linux: `/home/<Username>/.config/<Company>/<Name>`
Windows: `Users/<Username>/AppData/Roaming/<Company>/<Name>`
MacOS: `~/Library/Application Support/<Company>/<Name>` or `~/Music/<Company>/<Name>`

It contains these folders:

`AudioFiles`
`Expansions`
`Logs`
`User Presets`
`DeviceSettings.xml`
`GeneralSettings.xml`
`LinkWindows`

