There are two concepts of "states" for a node:

- [Parameters](/scriptnode/manual/glossary#parameter) are single double precision float numbers which can be changed in realtime via modulation slots or parameter connections. They are always dynamic and if you compile the network to a C++ class, you can still modify these through the parameter connections.
- [Properties](/scriptnode/manual/glossary#property) are type-agnostic values that define a static property of a node. If you compile a network to a C++ class, these will be turned into compile-time constants that define the behaviour.

**Examples for parameters:**

- volume parameter of a gain node
- frequency parameter of an oscillator
- filter type of a EQ

**Examples for properties**

- data slot index to an external audio file slot
- crossfade curve of the xfader node
- conversion function of the converter node



