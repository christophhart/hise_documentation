---
keywords: clock_ramp
summary:  A ramp signal generator that is synchronized to the HISE clock, producing a ramp waveform for modulation purposes.
author:   Christoph Hart
modified: 30.05.2024
parameters:
- Tempo: The tempo synchronization setting, matching musical timing (e.g., 1/4 note, 1/8 note). Default is 1/4 note. It uses the default HISE tempo values that are mapped from 0 to 18.
- Multiplier: A factor that multiplies the base tempo to achieve faster or slower ramp cycles (range: 1.0 to 16.0, default: 1.0).
- AddToSignal: A binary control (0 or 1) that determines whether the ramp signal is added to the existing signal (default: 0).
- UpdateMode: Determines whether the ramp signal is updated continuously or only on sync (0: Continuous, 1: Synced, default: 1).
- Inactive: Sets the ramp signal output when the clock is stopped (0: Last value, 1: Zero, 2: One, default: 0).
---

The `clock_ramp` node generates a ramp signal synchronized to the HISE clock, ensuring that the ramp waveform aligns with the project's tempo. This node is polyphonic, allowing it to handle multiple voices and making it suitable for various time-synced modulation effects.

### Difference Between `ramp` and `clock_ramp`

The [`core.ramp`](/scriptnode/list/core/ramp) node generates a free-running ramp signal based on a specified period time, making it suitable for non-tempo-synced modulation. In contrast, the `clock_ramp` node is synchronized to the HISE clock, aligning its ramp cycles with the project's tempo.  

The `clock_ramp` also offers additional controls for tempo synchronization and behavior when the clock is inactive, providing more flexibility for time-based audio effects.
