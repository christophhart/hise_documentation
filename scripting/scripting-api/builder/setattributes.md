This function can be used to set module attributes using a JSON object that contains the attribute IDs as key and the float number as value.

```
// Add the AHDSR (we need to save the return value for the next call)
var ahdsr = builder.create(builder.Modulators.AHDSR,    // the module type
	               "GainAHDSR " + (i+1),        // the ID 
	               sampler,                     // the parent module
	               builder.ChainIndexes.Gain);  // the slot type
	
	
builder.setAttributes(ahdsr, {
  "Attack": 8000,
  "Release": 100.0
});
```

You don't need to specify all parameters, just the ones that you want to be non-default.