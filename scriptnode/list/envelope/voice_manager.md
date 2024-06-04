---
keywords: voice_manager
summary: A node that sends a voice reset message when the `Value` parameter is less than 0.5.
author: Christoph Hart
modified: 30.05.2024
parameters:
  - Kill Voice: Triggers a voice reset when the value is less than 0.5.
---

The `voice_manager` node is designed to manage and reset voices of a HISE sound generator. It sends a voice reset message to a [Scriptnode Voice Killer](/hise-modules/modulators/envelopes/list/scriptnodevoicekiller) when the `Value` parameter is less than 0.5. 

For optimal usage, it is recommended to control the `Kill Voice` parameter using the gate output of an envelope node. This ensures that voice resets are synchronized with the envelope's gate state, providing efficient voice management in a musical context.

### Alternative

The other node that provides the ability of sending voice reset messages is the [silent_killer](/scriptnode/list/envelope/silent_killer) node. That node simply watches the signal and assumes that the voice is done when it falls below a certain threshold. Since this is not mathematically exact and a rather brute force way of handling the voice management, it's recommended to start using `voice_manager` node and only resort to the `silent_killer` node if needed.