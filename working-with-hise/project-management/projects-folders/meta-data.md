---
keywords: MetaData
author:   Christoph Hart
summary:  Explains the HISE MetaData Folder
index:    08
---

A **HISE Project** is not just a collection of sub directories: there are also a few files in the root directory that contain important information about the project:

- the `ProjectInfo.xml` file which contains the project settings like name, plugin code and compiler flags, defined in the [Project Settings](/working-with-hise/settings/project).
- the `UserInfo.xml` file which contains information about your company. It's separated from the project file so you can duplicate it for all your projects. They are set in the [User Settings](/working-with-hise/settings).
- if you're using the copy protection system that's built into HISE, there will be a `RSA.xml` file which contains the private and public key used for the encryption of the license key file. Be aware that this is highly confidential information so if this file is leaked, the entire copy protection system for your product is compromised.