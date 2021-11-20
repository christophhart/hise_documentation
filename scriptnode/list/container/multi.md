---
keywords: multi
summary:  A container that splits the signal into its channels
author:   Christoph Hart
modified: 06.08.2021
---
  
This container will split up the audio channels of the signal and processes each channel with one of its child nodes.

You can use this to implement stereo effect algorithms by separating left and right channel using this container.  
If you want to process the mid and side signal, add a [`routing.ms_encode`](/scriptnode/list/routing/ms_encode) before and a [`rounting.ms_decode`](/scriptnode/list/routing/ms_decode) after this container.