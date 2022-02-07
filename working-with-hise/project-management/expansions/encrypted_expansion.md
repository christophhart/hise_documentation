---
keywords: Encrypted Expansions
author:   Christoph Hart
summary:  A overview over the encrypted expansion modes
index:    02
---

The encryption scheme for Expansions in HISE expands on the FileBased expansion type and offers a reasonably robust protection against loading unauthorized content. 

## Requirements

Before we dive into the implementation and how we get there, let's take a look at the high-level security requirements in ascending complexity:

1. Content must be non-human-readable (and should not be multiple files like the FileBased expansion)
2. Content must not be loaded into an unauthorized version of the plugin.
3. Content must not be loaded into an legit licensed plugin when the content isn't registered to the user

You can decide for yourself which level of protection you want for your project (and skip a few steps if you don't need the full protection). 

## Expansion Types

There are two new ExpansionTypes that are introduced for that:

### Intermediate

The intermediate file format (.hxi) takes all files from the expansion folder and wraps them into one monolithic file (a bit like the processing that is done to embed the factory content into a HISE project on compilation). It also encrypts the data using a project specific Blowfish key you have specified in the project settings.

This file format solves the first two requirements - the content is not plainly readable xml or audio files that you just can take to the next best convolution reverb plus it requires knowledge of the expansion key in order to load the content  

> if it wasn't encrypted a smart evil genius might just create a simple HISE project that loads your expansion but now he needs to get hands on your encryption key which is embedded into the binary and requires at least a basic knowledge of reverse debugging).

However what this expansion type doesn't offer is a protection against sharing content among registered users (all they need to do is to upload these hxi files somewhere and all users that have a legitimate copy of your software can use it).

### Encrypted

Adding a user model restriction to the loading is a bit more complicated and thus it requires a new type called **Encrypted**. This type embeds a user credential object into the expansion and then checks on initialisation whether it matches the user credentials for the current user (so you can't transfer expansions across users because the credentials will mismatch). This step has to be done in the final plugin itself as it requires the existence of a unique user identification object. 

> You will also need some kind of check to determine whether the user is authorized to install the expansion (most likely an online authorization to your license server to query the license state for the given user), otherwise the **Encrypted** expansion type doesn't offer anymore security than the intermediate format.

## Implementation / Steps to do

Now let's take a look at the steps required to use these expansion types. We assume that we already have a FileBased expansion in place that we want to encrypt. You can use the [tutorial](https://github.com/christophhart/hise_tutorial/tree/master/ExpansionTutorial) project in the hise_tutorial repository if you want to skip the steps of setting up a dummy project.

For the **Encrypted** expansion type we assume that we already have a user model that has created a JSON object with the registered user data.

> There are plenty of tools available in HISE to implement a user model, most notably the Server API to call your license server and the file encryption methods to store that information (and retrieve it later).

### Setting up the project for the expansion type

The first thing we need to do is to specify the expansion type and key in the project settings and tell the plugin which expansion types it can load.

1. Go into the **Project Settings**, set the [Expansion Type](/working-with-hise/settings/project#expansion-type) to **Encrypted**.
2. Choose a reasonably safe blowfish key (spoiler alert: "1234" won't be enough) and paste it in the [Encryption Key](/working-with-hise/settings/project#encryption-key) field.

Then in the `onInit` callback of our main script, we'll specify the expansion types:

```javascript
const var expHandler = Engine.createExpansionHandler();

expHandler.setAllowedExpansionTypes([expHandler.FileBased, 
                                     expHandler.Intermediate, 
                                     expHandler.Encrypted]);
```

The last API call enables all types of Expansions to be loaded into the plugin which is required during development, but for the final plugin you might want to limit it to the exact type you want to use.

> If this doesn't make sense now, it will be at the end of the chapter.

### Encoding the intermediate expansion

Now we're ready to take the first step and that is to encode the expansion. 

1. Go into the Sampler workspace and select the expansion you want to encode, then click on the Encode button and press OK. 
2. If everything wents fine, there will be an `info.hxi` file in the expansion folder and the expansion will be reloaded as **Intermediate** (Click on the global properties popup to confirm that the type has changed).

> If you want to revert this step, just delete the .hxi file in the Expansion folder and reload HISE, then it will resort back to the file-based expansion.

If you don't care about user-restrictions, you can take this file and distribute it to the end user - just make sure that it will be copied into the Expansion folder of the AppData directory, and then call [`Expansionhandler.refreshExpansions()`](/scripting/scripting-api/expansionhandler#refreshexpansions) in order to initialise the expansion (of course after setting the Encryption Key).  

And even if you want to continue with the encoding process, this intermediate file will still be the file you distribute to the end user, however it will be encoded to the next format type on the end users system before it's loaded (where it knows which user data object to embed).

> At this point it should be obvious that you will have to call [`Expansionhandler.setAllowedExpansionTypes()`](/scripting/scripting-api/expansionhandler#setallowedexpansiontypes) and restrict the expansion to **Encrypted** only, otherwise the end user could copy in the .hxi file manually and just bypass the entire user model.

In order to implement the encoding logic on the client side follow these steps:

#### Initialise the credentials

There's most likely some logic in place where you initialise your user license object at startup (when you do the license check either by querying the server or loading an encrypted JSON from disk).  
As soon as it's loaded and verified, you need to pass this object to the API call [`Expansionhandler.setCredentials()`](/scripting/scripting-api/expansionhandler#setcredentials).

> This will cause a reinitialisation of all encrypted expansions so if a credential hasn't been set, the existing encrypted expansions are skipped until this call is made.

#### Encode new expansions

If the user wants to install a new expansion let him point to the .hxi file (or do this automatically after the download has finished), then call [`ExpansionHandler.encodeWithCredentials()`](/scripting/scripting-api/expansionhandler#encodewithcredentials). This will encrypt the user object into the .hxi file and copies it to the Expansion folder to a `info.hxp` file. 

> There's also the handy [`ExpansionHandler.installExpansionFromPackage()`](/scripting/scripting-api/expansionhandler#installexpansionfrompackage) function that takes a .hr1 archive that contains the .hxi file in its metadata.
