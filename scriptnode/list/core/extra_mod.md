---
keywords: extra_mod
summary:  Receives the signal from one of the extra modulation slots of the parent module
author:   Christoph Hart
modified: 31.05.2024
parameters:
  - Index: selects the modulation chain to listen to (0 - amount of available modulation slots)
  - ProcessSignal: whether to inject the modulation signal to the audio signal.
---
  
This node is similar to the [pitch_mod](/scriptnode/list/core/pitch_mod) node and can pickup the modulation signal from one of the modulation chains of the module that has loaded the DSP network.

> Note that before HISE 5.0 the usage of this mod was limited to Scriptnode synthesisers, but now they can be used with all module types that allow additional modulation slots.

In order to use this node, you need to define a (per-project) amount of modulation chains per module type using these preprocessor definitions:

```javascript
// number of modulation slots for Script FX
HISE_NUM_SCRIPTNODE_FX_MODS=0

// number of modulation slots for Polyphonic Script FX
HISE_NUM_POLYPHONIC_SCRIPTNODE_FX_MODS=0

// number of modulation slots for Scriptnode Synthesisers
HISE_NUM_SCRIPTNODE_SYNTH_MODS=2
```

> Note how the default amount for scriptnode synthesisers is 2 (while the other modules have no modulation slots by default).

If you plan to compile the DSP network to a C++ node (which is possible with this node since HISE 5.0), you will also need to set the corresponding preprocessor variables for the hardcoded modules:

```javascript
// number of modulation slots for Hardcoded FX modules
NUM_HARDCODED_FX_MODS=0

// number of modulation slots for Hardcoded Polyphonic FX
NUM_HARDCODED_POLY_FX_MODS=0

// number of modulation slots for Hardcoded Synthesiser
NUM_HARDCODED_SYNTH_MODS=2
```

> If you add these preprocessors to your project setting's **ExtraDefinitionPlatform** field, you just have to reload the module to pick up the new value, no recompilation is necessary anymore!

Once this is setup, you will notice that there are as many additional modulation slots for the scriptnode module and the extra_mod node is ready to pickup that signal and process it inside scriptnode.

### Interaction with root parameters

There is a (hidden) feature in the new HISE modulation / scriptnode bridge that allows you to connect extra modulators with root parameters to allow sample accurate modulation of a parameter without connecting it to the root parameter. Instead the root parameter will be "rerouted" to control the "default value" of the modulation signal and you can simply pickup the modulation signal and connect it to your target and the root parameter will "magically" control the base value.

Check out this snippet that contains a minimal example of that concept:

```snippet
HiseSnippet 2085.3oc0Z0zaiabFdnkoSr1jzca1jziBH8fS6VCIRJsqQNXtV1JQn9C0kZcCPO3NlbjEqImgkjxqcB5oVfjCEnGRA5Of9Kn8Wv9CHEH.6w1CsG58s+.ZZeGNjhjVLdkl58ipEPPyGuy7LuuOueLi2AgLaRTDKDoTe3EADjxanZcAMdb2wXWJp+1Hk2RcObTLIrgnqstH.GEQbPJJ09HdGJqtLJ4yS2bKrGlZSx6BgNj4ZS1002MNu2Al+XWOudXGxPW+By1vruMi1k4wl.3olZST.19T7Ij8w7osjJ5iwQiQJ+.01Z51FN20QSq8FcrwcHaLBOZTKcGCiN2aiV5afMtWGRy1HkU1wwMlEZEiiIQvhtEy4BqwrGQEavgtQtG6Q3MZgrfcVzMp6XWOmAYJmHDRQcPtpplPUca08bcbm1etJ6lICzHWhhJMkktJH0ZAfjRAHsr.R2R0xNzMHNeDNdtgZeJXAGgAaSQnHlKR4wpcYvDnwq6iOkzKDZLUf05zr4cZ.e8Ae3nIT6XWFsAitOKlb.csOn9mUe05+p5Mt7PiFU4X7sIj44QBqbXNcH7pDbM5D+iIg2owYXuIjoSDN9k0oqLe5TawotvDYz9T23CBHos6w7b35J9um0BfRUavudX+swwXtQIsOXdAjvXWNbT1lbF3FHLQqptMI5zXV.3HLi8CXNLmId33xzItiV5.f9njMjannQtwWTzQbA3XMuRN17BwaoNvM1db0XboJvHnoddfwTOy2TcmQiH1w4.bY0dehrtgy+1+Vhs+FpVtTRRbzjM+cSZ23mhOiz3iHTRHW405JBk90yanzf4NT5A1wv1OLDSiBXQkVXKhu6PFkqEx67gQPf.xu7AbqYw96xvgUNzS2rGbHqTFKb7jvDZw88YSnY3+u+GC9mapTqrcX44y0srGQg4WQbxkedE5d44iy7LBh7peTfRYZVMCiVt9AdjcnmQ7fPcIX76Bw1Fgm3Em0aYR9dLJKXLi5ZWjc7.Rbn6ImPBKh8JOP2ONFJHHumaa9.hGAWjM+8M2EXg3PPOQjTWr3Ycqzd88TEvsA2yrw+K1sWnzrqLRds4JR90NdeIDUuJyb8zhqf8ju4uQZyF89jVUVV0WnlWBSPHI.GRFxF3guXsHL20AhSRtSii8X1mZ49ojYq6IP.gs3yXM6wXJk3EIS4Qq7hl7+5p6bdbHt0KIxdIbdKANUU2s2AoQRge0XJpmCPl6MHhqnpv6mmqaBgZWXputIOWb+7T4l+NSdZ+QrP+zx+ltn6RNA19h8Lj3GvfxFJEdzxmwhG6ROobF9aatKiErCECJGmhKxfwP.Qn.7HRbokAV1gLwU45xITEGr+ITVHQTTeoj8ShhY9YGfjqfYESBRJ0U4mo1wXc3yneH+6M5Beoev0Saz0W35klSF6amPJlZ84ziWwiTKP7TR3KSD+.1jXfgtGFxjeN3dr+DeKnxSaR2zfVbWlk3DJQ6lYtPVDpSRi+C7IcvV71JoC1JavB20ZeR7iXgml3mm9aHhiHjbTRr2iFcdKz887XOpKyOvMMQFnSR5a.y6hrxPTpIlQFRyJPU.2b+9sxhRmg7OFGMD65wudi0jH3BiNGPsf0IonckZGRBiR1yWSs45v+.h39IgNdsdXaP+ew.Lb4.HaK+NnfEkDtt8TKaoiQQSp3gPJMLeUypyWfL3.4yUTIdqfkc.NDDCb642DcIkZEtYpHPIuEPRVRr08iNjOpM1CcHOMBWnjcQnuSNDqHdUAenTYApKcndmBGp7oL64n3Bb0GiqOP+lpibOWW6njrtkg86U.1Emzr.u7h77D5KUReS34TOxG7yKA7aB.Ojrd9nUopyG8Yf2kKh2Bd.CwgmPhiRehCJwV3Skfv9N77qQmMBMkrw65Fp4oHQEng7nxYs.O28boom77LO6gO+R80zjm5Q3BlGOy5TxiDJiR2dXatiWepC4bzP3jOjkrX.tOCNY7M8FpODFcDXrcPyr4oWhYl9QKNpADtPn96j8NiVtmPAJw0I54Q57Hmm8PUa6FE.Eit0DnnZQQSk5gSPSTfoAf2AJszARBHR9mFTt.8TX+KQL49IdbK957glkUJDYQ7et7YnmX8y+4bg5RTwUJXTWcVipg4LF0u3IUPEgzUW1nZ9q8+KaJ7by8C91Ln4yX5l8Kduy9x+8e3yMqzfBEVd+IPwYPZ7j2X6p3ll55OYyKcLd7W8Uu+7cLPu++5qSNF0T+IKBe7aV62e7F+okqF9.c+Y3Mo83Y8lzlSDm4MsRxal7JXHfJ.8O+s29Iorkok7eMgby+wm9a1TBjeyELj6JpIWO5+uh3tpZ1knVXb+zMe1b6HD5auATNP94q9kCUb8GLBtTNIDRqT30cTpqBwTON43U8owvbAhY8m+x+1m+W+Q+Vy9hoIdTlBELv0.awXm5iSJfWt+tIuHttwKh8vGaGxNxV73Mb5fYROPjVZR9wUU2i2tQKzYWl2yqb9Ha6xK0LBpIqf5xJngrB1VVA6Hqf2UVAumrBtwhJX8LBPSokrkzRpIsj5RKogzR1VZI6Hsj2UZIumzRJMGRSZNjlzbHMo4PZRygzjlCoIMGRSZNjlzbHMo4PZRygzklCoKMGRWZNjtzbHco4P5RygzklCoKMGRWZNjtzbHCo4PFRygLjlCYHMGxPZNjgzbHCo4PFRygLjlCYHMGpszbn1RygZKMGpszbn1RygZKMGpszbn1RygZKMGpszbnNRyg5HMGpizbnNRyg5LGbH9+mmReMQ9aBfP6MXGwKlpL8uvrRMz+EfT15K9
```

> Note that you must have defined `HISE_NUM_SCRIPTNODE_FX_MODS=1` or greater in the current project that you are about to load the snippet in for it to work!

It contains a simple FX network that modulates the filter frequency of a filter node with an extra_mod. Now I would like you to focus your attention on two things:

1. The `Frequency` root parameter shows the modulation value coming from the LFO - and if you connect this to a UI knob on your interface, you'll get all the modulation properties send to your LAF object for displaying the modulation signal.
2. If you change that parameter, it will change the frequency of the filter. Magic.

If you click on the properties of the parameter, you'll see this:

![](/images/custom/scriptnode/externalmodulation.png)

This is a new property and tells HISE that this parameter is supposed to be modulated with the **Combined** modulation mode (which means that you can define per modulator if you want to scale or add the modulation value). As soon as you set this property, there is one of two things happening:

1. If there is no extra_mod node in the network that is associated to the given modulation index, the root parameter will be modulated with the resolution defined by the networks `ModulationBlockSize` property (and if that is zero it defaults to the buffer size) - once every X samples this parameter is called with the current modulation signal value being applied to the parameter value.
2. If the network has a extra_mod that is associated with the given modulation index, the root parameter will be rerouted to control the base value of the modulation chain. This is what we are seeing here

> Note that these two modes are mutually exclusive and you cannot connect a root parameter to a target while having a extra_mod node connected to the same index. If you do so, you'll be greated with this aggressive warning icon:

![](/images/custom/scriptnode/modulationerror.png)
