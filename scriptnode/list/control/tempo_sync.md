---
keywords: tempo_sync
summary:  send out a tempo-synced time value
author:   Christoph Hart
modified: 04.07.2022
parameters:
  - Tempo: an integer from 0 to 18 that is using the default HISE tempo indexes
  - Multiplier: multiplies the tempo index and allows odd tempo rates like 3/16
  - Enabled: switches between tempo synced time and unsynced time
  - UnsyncedTime: if tempo syncing is disabled, this can be used to determine the unsynched time
---

A lot of time based effects need to be synched to an external clock and this is where this node comes in handy. A new value is send out:

- whenever the tempo changes (and the sync is enabled)
- whenever one of the parameters that will change the synched time changes

The value that is send out is calculated as milliseconds, but if you need it in another domain (eg. Hz), you might want to use the [converter](/scriptnode/list/control/converter) with the **Ms2Freq** converter.
  
