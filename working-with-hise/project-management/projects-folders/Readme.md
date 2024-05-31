---
keywords: Project Folders
author:   Christoph Hart
summary:  List of all Project Folders
index:    01
---
A list of all sub directories that are present in a new project.

A **HISE Project** also contains a few metadata .xml files. 


- the `project_info.xml` file which contains the project settings like name, plugin code and compiler flags, defined in the [Project Settings](/working-with-hise/settings/project).
- the `user_info.xml` file which contains information about your company. It's separated from the project file so you can duplicate it for all your projects. They are set in the [User Settings](/working-with-hise/settings).
- the `expansion_info.xml` file
- if you're using the copy protection system that's built into HISE, there will be a `RSA.xml` file which contains the private and public key used for the encryption of the license key file. Be aware that this is highly confidential information so if this file is leaked, the entire copy protection system for your product is compromised.