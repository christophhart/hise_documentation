---
keywords: Wavetable Synthesiser
summary: A two-dimensional wavetable synthesiser.
parameters:
- HqMode: Toggles between linear and cubic interpolation for the wavetable rendering
- LoadedBankIndex: This will store the index of the wavetable in the current list.
- TableIndexValue: The table index from 0...1 that will be used as start value for the table index modulation
- RefreshMipMap: If this is enabled, the wavetable voice will pick another mipmap when the pitch modulation goes outside the original frequency range. This allows extreme pitch shifting without creating aliasing artifacts.
---

This is a generic purpose wavetable synthesiser with a two dimensional wavetable space: note number and table index. The note number that started the voice picks an array of wavetables that can then be modulated using the table index modulation chains (both with intensity and bipolar modulation). The amount of notes and number of different wavetables per note is arbitrary and can range from 1 to whatever value doesn't blow up your hard drive.

The wavetable synthesiser uses a custom data format called `.hwt` (HISE Wavetable), which contains the audio data along with some metadata on how the table layout is defined. The files will either be fetched from the AudioFiles folder, or can be distributed as a big monolith chunk that will reside in the Samples folder using the [Export -> Export Wavetables as monolith](/working-with-hise/menu-reference/export#export-wavetables-to-monolith) option from the menu, so you can pick whatever distribution mode you prefer.

> Be aware that the wavetables will not be embedded into the binary, so if you don't want to use the monolith format, you have to untick the **Embed AudioFiles** option in your project settings. Also the Monolith file takes precedence over the source .hwt files, so as soon as you've created a .hwc file in the sample folder, the list of available wavetables will not reflect the audio file folder content.

You can use the [Tools -> Convert Samplemap to Wavetable Bank](/working-with-hise/menu-reference/tools#convert-samplemap-to-wavetable-bank)** popup to create HWT files. The workflow mandates that you first create samplemaps with the note mapping that you then load into the converter. If the source audio files are already properly formatted wavetable files (with a cycle length that is a power of two), you can just use the "Resample" mode to convert it to a valid .hwt. However you can also use the Resynthesis option, which will analyse and resynthesise the harmonic spectrum of almost every input signal using the Loris library (you will need to install the Loris library obviously).

The wavetable playback engine uses linear or cubic interpolation but in order to remove aliasing at higher notes, the conversion process will create mip maps for each octave (or smaller sub-steps) and then filter all harmonics beyond the nyquist frequency before resampling the wavetable to the new frequency).