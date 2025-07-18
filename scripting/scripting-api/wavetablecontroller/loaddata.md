This function allows you to programmatically create waveforms and send it to the wavetable synth.

The function expects three parameters:

1. the buffer with the wavetable signal
2. the sample rate (just use the current samplerate for the best sound quality).
3. the loop range that defines the length of a single cycle (this way you can create wavetables with more than one cycle)

> Note that a wavetable synthesiser is also a [AudioSampleProcessor](/scripting/scripting-api/audiosampleprocessor) and this function is basically a duplicate / combination of the [Audiofile.loadBuffer()](/scripting/scripting-api/audiofile#loadfile) / [Audiofile.loadFile()](/scripting/scripting-api/audiofile#loadfile) method

```javascript
// Create a buffer with two cycles a 2048 samples
const var bf = Buffer.create(2048 * 2);

// Add a sine waveform in the first cycle
for(i = 0; i < 2048; i++)
	bf[i] = Math.sin(i / 2048.0 * 2.0 * Math.PI);

// Add a saw waveform in the second cycle
for(i = 2048; i < 4096; i++)
	bf[i] = 2.0 * Math.fmod(i / 2048.0 - 0.5, 1.0) - 1.0;
	
// Create a reference to the wavetable controller
const var wt = Synth.getWavetableController("Wavetable Synthesiser1");

// Pass the cycles into the wavetable synthesiser.;
// By supplying the `[0, 2048]` loop range the wavetable synthesiser will
// automatically create two cycles so you can morph between the sine and the saw wave
wt.loadData(bf, Engine.getSampleRate(), [0, 2048]);
```

Thanks to the mip-mapping process of the wavetable synthesiser, you do not need to care about band-limiting or aliasing at all as the wavetable synthesiser will automatically band limit the waveforms for each octave by removing the FFT bins that lie beyond the Nyquist frequency.

You can also use a FFT object to create a harmonic series, then use the inverse FFT to create the wavetable cycle data. This is much more faster than creating the cycles in HiseScript directly and can be used to create any complex harmonic series (eg. by assigning a slider pack to the phase / harmonic buffers)

```javascript
// Create a buffer with two cycles a 2048 samples
const var bf = Buffer.create(2048 * 2);

// Create an FFT object
const var fft = Engine.createFFT();

// This enables the inverse FFT step
fft.setEnableInverseFFT(true);
// We don't need any windowing here as we
// directly synthesise the cycles on the frequency domain
fft.setWindowType(fft.Rectangle);

reg cycleIndex = 0;

// This function will be called on the frequency domain
// and contains a buffer with the frequency bins
fft.setMagnitudeFunction(function(data)
{
	if(cycleIndex++ == 0)
	{
		// Set the second FFT bin to 0dB
		// this will translate to a sine wave
		// with the root frequency
		data[1] = 1.0;
	}
	else
	{
		// create a few harmonics in the second cycle
		data[1] = 0.5;
		data[3] = 0.2;
		data[5] = 0.1;
	}

}, false);

// Here we pass in the cycle length, this means that
// the FFT will be processed twice for the full buffer
fft.prepare(2048, 1);

// Process the (empty) buffer and get the resynthesized
// data back
const var processed = fft.process(bf);
	
// Create a reference to the wavetable controller
const var wt = Synth.getWavetableController("Wavetable Synthesiser1");

// Pass the resynthesised cycles into the wavetable synthesiser.;
wt.loadData(processed, Engine.getSampleRate(), [0, 2048]);
```