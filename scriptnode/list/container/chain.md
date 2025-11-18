---
keywords: chain
summary:  A node that processes its children serially.
author:   Christoph Hart
modified: 24.06.2019
icon:     /images/icon_chain
properties:
  - IsVertical: defines the UI layout arrangement (see below).
---

The chain is the most simple container - it serially processes all its children starting at the top.

If the chain is bypassed, the children will not be processed (this sounds obvious, but be aware that the bypass state of the other containers might vary).

### UI Layout

The default layout of a chain is from top to bottom (this indicates serial processing). However if you have a big DSP network, it might make sense to swap the layout and arrange the child nodes horizontally. Let's take a look at this patch:

![](/images/custom/scriptnode/chain1.png)

As you can see, it takes up a big chunk of screen estate with lots of whitespace. If you want to increase the visual density of the network, you can flip the layout of the first (orange chain) by clicking on the vertical flip button in the menu bar (or changing the `IsVertical` property via script or the property editor):

![](/images/custom/scriptnode/vertical_flip.png)

If you do so, the network will look like this:

![](/images/custom/scriptnode/chain2.png)

This will not affect the actual processing at all, but now the elements are much more closer together so that it fits all on the screen without having to scroll around.