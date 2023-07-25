---
keywords: Builder
summary:  A tool class to create the module structure programatically
author:   Christoph Hart
modified: 19.03.2023
---
  
This class is a helper tool that lets you create the module tree programatically. This is useful if you have a rather complex signal architecture with lots of repetition and want to minimize the user error (eg. typos or inconsistent hierarchies).

Example: You have a project with 5 samplers, each having a custom sript processor, an AHDSR as gain modulator, and a simple gain module. Usually you would create all modules by hand (and if you're smart and know what you want at the beginning you would create one sampler module with its child modules and then duplicate it). However if you later decide that you need an LFO in the pitch modulation chain, you would have to do this step manually 5 times. This doesn't sound like too much work, but it scales with the project size up to a point where simple additions / modifications take a lot of time and concentration to avoid making mistakes.

The Builder addresses the problem by allowing you to create all modules with API calls. Upon compilation, the entire module tree can be deleted (with the exception of the interface script that contains this Builder obviously) and then recreated. Every method that creates a module will return an integer index that can be used to reference the module later.

Let's take a look at the previous example and how to achieve it using the Builder:

```javascript
const var builder = Synth.createBuilder();

// Remove all modules except for the interface to get
// a clean slate for the builder (if you omit this call, it
// will create 5 new samplers each time you compile)
builder.clear();

for(i = 0; i < 5; i++)
{
	// Create a sampler
	var sampler = builder.create(
	                builder.SoundGenerators.StreamingSampler, // the module type
	                "Sampler " + (i+1),                       // the ID
	                0,                                        // the parent (root)
	                builder.ChainIndexes.Direct);             // the slot type
	
	// Remove the simple envelope that is inserted by default
	builder.clearChildren(sampler, builder.ChainIndexes.Gain);
	
	// Add the AHDSR
	builder.create(builder.Modulators.AHDSR,    // the module type
	               "GainAHDSR " + (i+1),        // the ID 
	               sampler,                     // the parent module
	               builder.ChainIndexes.Gain);  // the slot type
	
	// Add the simple gain module
	builder.create(builder.Effects.SimpleGain,
	               "Mixer " + (i+1), 
	               sampler, 
	               builder.ChainIndexes.FX);
	
}

// We need to call this so it sends an update message to the HISE UI
builder.flush();
```

Once you've created a script that creates your module tree from scratch everytime you compile, modifying or enhancing it is very straight forward: if we want to add a pitch modulation LFO, all we need to do is to add this single line:

```
builder.create(builder.Modulators.LFO, 
               "Pitch LFO " + (i+1), 
               sampler, 
               builder.ChainIndexes.Pitch);
```

in the loop and it will create the 5 LFOs automatically.

## Workflow Tipps

Here are a few practical considerations when using the Builder class:

### Make it conditional

Make the module creation code conditional with a simple way of deactivating it. Usually you just want to run this code when you actually need to change the module structure. So either put everything into a function and only uncomment the function call when needed, or (which might be even better) write all the builder code into a separate external file  and comment / uncomment the include statement

If you don't do this, then it will rebuild the entire module tree each time you compile which has a huge performance impact (and possible stability implications)

### Don't expect it not to crash

"HISE never crashes" is not something that I would put money down on a bet, but some operations of the builder class (especially those who clear and delete modules) are particularly prone to bringing your system down. This means that you should only run the builder methods 

1. when necessary and
2. when you wouldn't loose any work if the compilation would cause a crash

So instead of complaining when it crashes (ocassionally), just be happy for the times it didn't crash. If it keeps crashing at a particular function call that you need it to go through, let me know.

### Never use this in a compiled plugin

This is connected to the former point: never ever use calls to the Builder in a compiled plugin (in fact, they are deactivated in the compiled plugin so don't expect them to work). The Builder is a helper tool for development, not something that allows you to dynamically change the module tree and make this a core feature of your product.



