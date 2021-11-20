---
keywords: peak
summary:  Sends the maximum input value as control signal
author:   Christoph Hart
modified: 06.08.2021
---
  
This node will analyse the signal input and detect the (absolute) maximum value which is then sent as control value to any connected target.

> Be aware that this will only happen once per buffer, so if you need a fixed periodic update, you will ensure a fixed size processing using either the [`container.fix8_block`](/scriptnode/list/container/fix8_block) or - if you require a sample-accurate control signal - the [`container.frame2_block`](/scriptnode/list/container/frame2_block)