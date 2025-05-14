---
keywords: Tutorial Project 1: PhaseWizard
summary:  Build a Synth VSTi
index:    01
weight:   70
author:   Dominik Mayer
modified: 10.06.2019
---

The best way to show how these workspaces act together is probably to dig in right away and built a simple virtual instrument from scratch to exportation. 

Panning two oscillators against each other can yield some mesmerizing phase interpolations that can be visualized with a Goniometer.

![gonio](images/custom/gonio3.png)

Let us create a new instrument with the name **PhaseWizard** to explore these interpolations.

![phasewizard_preset](images/custom/phasewizard_preset.png)

This HiseSnippet contains a preset with a [Waveform Generator](/hise-modules/sound-generators/list/wavesynth), some GainModulation, a [Filter]() and an [Analyser FX](/hise-modules/effects/list/analyser) with the setting `Goniometer` in the Master Containers FX-Chain. All that's missing is a frontend for the instrument.. Copy the Snippet and import it to **HISE** with **File > Import HISE Snippet**.

```
HiseSnippet 967.3oc6X0raabCDlqjXQb9oHo0nn81domBRfWYmlzSZsrkBLRT7ZutNMGJBX3NxhnTjpb4pDkS4XeF5k9nD+HTfdI.8ReD5aPK4tqzRknlJCX6FCDdvvyPNjey2Lb3rJRIoPZpTg7V4fIi.j2UwwSD5AaMfvDnc1F4cMbz.RJ7X1KIpDT6IiHooPBxyq98sKwakFHD5US97eqUaBmHnPop7wgRFEdHaHSWocT3CXbdWRBb.anyp2HbGpTrkjKyLvoNdMzHB8GIGAOhXWVMLx6S5jvzRUrlngTjWi1xjIwCjOWTr9CYormwAqP.J1rQEp6J4IVDa0h1Z.imDM0sSQHObTEITufDVE2ikvlouhLtd9D9UV3xGd0devKvEdqszvC4ftFEny.BYRFmnmGY1vQ4DLoXNjsiPChTldREa+Ws9eEt2.GwzzAKFu0V.dMApyZ7VF7uFtS+9.UWA1F3te+oajdsEkH54fEbAVtLdSAgOIET4.wQzENsyL.VEydoysoiCiTvXF77hMZFMF5Ueow9xeIBsuLSyDG0inUrWXf+ixFFatGSACKJD.2bPXuZHqo4xqYks3IFDI4B+sYTNYfU1qbxfoS5FpVsvqtB9wjwPdAqb9Y0b49R0P+6CBPYy4NeKYsKUaPvAJhHcjLEBb14ieq4Z5bY70aC5LwbKGUnpoqJq2003ctqKbpR28qUDQ3rnmbrQ1Y9mD1yFklJ9ms5HHlXdLX7ljcSoFmMm5b2vLt8QfD8f.WCqT2zU8YRR1GqTWB25KGat.FrVz67f+0wwrgi3PGwXfKMZJJOuMzmjw0yz5BxdRgbz.ofQcSN2GL28O5HXtzlE5Oap0lW1qzbuv8ANXZxXlp27ygOjI.hxPSvYCU3sjgquDW.We6Ue+Ondf8RSej3PSLhZO8hhfSE8m4N+2f86RgCH4nwM3MFTZqQtUknrmA74iKlplkGY9drMQSPdeMt4F2d9w3cM+o+Ms+62tUtL5TKfdpz4Q8O14QYYgOCGI4SJtk2kw0kcfrBtPH3e6Y07QWE7SYffVwhg+Z3dkBgqu9u2Z97G+v8xH7JV2+G9k+Xy1rQRNQcFWQrwRl17E3YNk+EntrsQlKN38qvkAceKYewA2eJduKNf01YzK9..tmGexv4wYLjPUxmZ5bVqjbaIkKkqw32h7e3hUv8rx9AnwDdlQAFGz7tngl1SeJkZqweKC+rXaZN0FKetTVr9I1hMlZQC7cZtblbmS7g7MmXKt6I1h68drv9w.alokCKR4MJh5TzlhWw29jm8i9G.tXB9R.
```


## Interface and Sliders


![phasewizard_sliders](images/custom/phasewizard_sliders.png)

When we switch to the [Scripting Workspace](/working-with-hise/hise-interface/code-editor) right now, it looks quite empty. Let's create a new Interface ScriptProcessor by clicking the little house button in the top bar and accept the default settings. Now that we have an interface we can start to add a few sliders to control the Waveform Synthesizers parameters. Let's start with the **Mix** parameter. 

Add a new [Slider](/ui-components/plugin-components/knob) with a **right-click** on the Interface in **edit mode**. Let's change the `ID`  (right on top of the **Property Editor**) from "Knob1" to "Mix" (+ **ENTER** to accept) to match the **ID** with its intended function. We can also change its `text` property to "Mix".

A few properties below, we'll find the `processorId` and `parameterId` selectors. With them we can link the UI Component directly to a Module attribute/parameter. In our case we want to select "Waveform Generator" and "Mix".

That was easy.. the Slider is now hooked to the Mix parameter of the Waveform Generator. Check if it works by opening an **Interface Preview** Window via [View > Add Interface preview](/working-with-hise/menu-reference/view#add-interface-preview) and compare it to the value of the Mix control in the Main-Workingspace. But oh, something is still out of sync. The displayed values don't match each other.

We have to adjust the Sliders value representation to display its values in **%**. Scroll down in the Property Editor to the **Component Specific Properties**. Set the `mode` property to "NormalizedPercentage" to convert the values to a percentage representation. Voilá.

In the next step we want to mirror both Octave, Pan and Detune controls of the Waveform Generator on the interface. This is a good task to get some practice in hooking up sliders. Have a try. You'll need to use a few other Slider properties to adjust the value ranges and representations: `mode`, `defaultValue`, `min`, `max`, `stepSize`, `middlePosition` and `suffix`.

Tip: Create a Slider (e.g. Octave1) and drag it with **Alt+Drag** to create a copy (Octave2).

**Solution:**

```
HiseSnippet 1635.3oc6Y0saaaCElJIrqIsoHsqnX6NcQKPKVWgsS5OC6hn7maMV9wsNMs4hgVFI5XhHQpIQkDmsAzK6yvtYOJM.6EX.8lAra1iPeC1H0OVT1x1xIsAM.yEnHjhGxuuuygGdnTcOlI12m4Azlby1tXf1kgMZS4sVpEhPA0VFnMMrdKjO9EjiPdVfEa6h78wV.MswerbHZSNA..dS6u7OmeQjMhZhi6J72VLhIdUhCgm1qqwOPrsqhrvaRbTF8bF0LYzkX1r.AbFGVB3hL2CsKdcjbXiAAZWXEKBm40fi3Xef1DKxrZ2nE6.Zz32h3S1wFKaTFzPLQQcWkYaIQrrWvRsH1V0SnsO.nAqmJBiGIBWGtFwhzo+TwXlvGnmZgpdnM1ffWYU3Up3vSSAdSDAuqBaX5Qb4oOQhsKAqQ4XulHgKPEVQiEn8GvkXhAP42yAsGtpmnQGCt8CJU5t52uTo678SOUz+ZFPM4DFUmQWmwwaPu8cl5mmZxo90ddRyl48H4h4wrswd48Toq2a.lcaZfyNXu6puOxN.mLNgBjUhg8WhUi.LiHtx.YzZTBeCWLseBOHVsDtfKFCJwP4gNfqD6.ZXSrvd.hPmghHiCAgnMMj9elGT.Su.bCSd4tsEbbgssR219g2ULaqin8rtaebgssm0caihX6jvkw7.JtWJCFEyqbRMeU1A0E6N5xbie2.77ZKi3H4ltXmuHfvE6wIxXMskw6KxlEsETBB+83L2vnCGWFUFpnc4gDebXmkS2wncZiCLNfXwakxkWazBS1skRZymX3Prrrw0Y9D4dE0nLGlkXUuAbclmCxlbD1pN1yTfHQ1SfePylhkVDleKfEtIJvluU2gotIA90rjY+dAZebSwbo+XLE6gDa3D4h8DogEoKp0gL.EhekgEcmxbftByA6Lbl+XCN9PQ6ojyj.Y5kA9braCAOUB4m2gnnIW+XGjxRBLFQFds30ZSOD02k4KBV6m7CNNeUMbCbGAZ5gsENEse3WFQA5ImZ1UAzkb0kXlmdmOq+v65xYUISbxLCKaTehSzaUncHg6CfxYBjgAamMbXai7HT5FkU6uyFLhRcLsxWr193Hw5KjCRu7nnT8MfoXJ0IgEhfjy.8sOJkgpRkMlZ5BbRSeBqdC8SfXktpYznalUitoQhd.g5l7AnHIanhl0tBSlt.mS1mHkWSK1oNChC8G0YY2ITBqzM4KZ1jzS4UH+QJjelChyVbIXUO7OEfolsy5ulyPkqu88CLlVvxmbT+7ghRKxv+IgUI1BlVNKoUQRt6BDySjbLSB6zilHPV+ndd9QPu2iPbaFlUfsT9Uuhi7dcwOPxB06RHuv.Uvt1pZvmj68TT3dUXcB2rU93crbvqn5tO03M9VjSCWoYSrIOErS.q9xS5UFy+FskF1UFgQXYJ3BTjcaebzcEUZpBmEEQyXurw3GaT2ST3K9f3Be6Thf13mRrmqL9LV.mP2cMD2Kbe05ANMXAhhYEpHkhskW5SaLYo9QsKIaKwSCL0Jrw+J9E+vxx1ZwOrbxCUcUWOhUWJLiT3a9HTexMC0Y569nmxOUpqrmh2Tp9J4nGEfjjJUoKI6pJXm53LR5Tc9lOr5Eky4CqCP4XY4EATtHwJTjvm2.KXi0F9lBxFJcpSXfs7sIIxWUV0vztqn18oNHqz4uW4yYWl5wKFbyQAGqdOu4vYfMHNt13Un6isEWaNN87xQmj0oWUPtFixbawnDS0fymgE682cWblvlb4yBbNxbuzddjwyv1Xje5Nq+5sFqRnXj2ZgG1ehjhxCVJzJn65qfQvUWt0W+ypCXuXxgDaI7QlxUOJIXRS8NzY3f8493MQgnQ04sO1iKMRMqjIYGrcV+hHqY7RFNGguMFsaAqL28x9a+MD+WyuQ9me2RgsAezbneTp7X7+uxi3zBWCVmY2NZWdb0pR.kVCbeNVM7WZAwJ0.+z3FFyN66mOa7itwSCP1opt9O9a+8BKRbY1HuSaFwgjFXhBF1bizp70OGUkszyb9AueML1oqKE6yO39Jvmd9ArxJiN7y.3dVbkgyh0vAY5wdkYzmvPlR4hg8H3MM7KfNIbMYa8Ne2DHrbkGJeoCjWYZJyw+sB8Iea57wRj5YgrX1Q1h4RrXB38qTLSt+HuHOXjs3girEOZ.VHuLvBAblSTHuni5qDUlhVzceBi9A+W1TYvf
```

## Keyboard and Visualisation 

![phasewizard_viz](images/custom/phasewizard_viz.png)

A [Floating Tile](/ui-components/floating-tiles/plugin) is a special kind of UI Component that has built-in functionalities for the most common use-cases. Let's add an on-screen [Keyboard](/ui-components/floating-tiles/plugin/keyboard) and an [Audioanalyser](/ui-components/floating-tiles/plugin/audioanalyser) to display our Goniometer.

Right-click on the interface again and add a new **FloatingTile**. In the **Component Specific Properties** you can set it's `ContentType`. Let's select "Keyboard" and change our `ID` accordingly. We can now place it at the bottom of our interface and scale it to our needs. To customize the keyboard, we can change its `Data`-JSON Settings. Change the "LowKey" entry to "36", to set the lowest key on the keyboard to **C1**. Hit **[F5]** to apply the changes.

Next we want to add an **AudioAnalyser**-FloatingTile to connect it to the **Analyser**-FX in the MasterContainers FX-chain. Create another FloatingTile, name(ID) it "AudioViz" and select the `ContentType` "AudioAnalyser". To connect the FloatingTile to the Analyser Module we have to edit its `Data`-Settings and set "ProcessorId": to our Analysers ProcessorId **"Analyser"**, and the "Index": to **"0"**, the Analysers PreviewType (Goniometer) that can be accessed with the Array-Index of the PreviewType-ComboBox. 

Visuals: We want to scale the "AudioViz" up a little for more detail and put it in the background to not overlap with the Sliders. Move the "AudioViz" to the top of the **Widget/Component List** to pull it back. We'll also set its `bgColour`s alpha-value to zero to blend the visualization with the background.  

Uh yeah. Now it's time to [lissajous](https://en.wikipedia.org/wiki/Lissajous_curve) around.

BTW: If you have a MIDI device at hand you can connect it in the **HISE** Audio&MIDI settings. If you don't, you can fall back to play MIDI notes with your keyboard-keys **[a-l]**.

**Solution:**

```
HiseSnippet 1999.3oc0Z8zbabaEGqjfqEcnqRhmLM215IYFmItdHojkSZOnURTzlSrrnMkkiNk.sKnHFuDX6tfRhJMSyzS5CPu2OA8yf08doyjK8X+H3uApOr+gKVxkRKkUbi3AMDOfGvu2O7v68.nZ4KroAABejw7aOvihL9.b6AbY206RXbTy5Hix3VcIAzWwNl36fVafGIHf5fLLl8wpgXL+bHD5mF7w+6UVi3R31zXQge1QvroOk0iISk5Y8MLW2FDG51rdZidIql1B95BWQe.Nyhqf7H1ulrO8YD0vlAiLtwFNLovusjHoAHi4VS3LncWwg7nwuCKfsmKU0nJpMLQQhaHbcTHVIEsdWlqSqDyN.gLvsRIgYiHg6f2j4vFJOkLVHrCyTMz4CiYNO3U8RBOCM3MWD79PbaaelmLsGE1tEtIWR86Pfs.cXEMVjwavqKfAvkOnG40zF9PigJbukqT49lOrRku3OUtT4Rc5yskLA2TvelPR2heuunzOTZ9R+3X8zoSdcoVHegqK0OudUa69miZ2i2u2dT+6ad.wsOMYbf0mkdwEidsiLZsAJ3M4L4VdT9jHcTLSAz+MiAELTYH4e6XxusKyg5iX.GiAuhiPgnM0c9+tBp.pdC7V1xpipK5zBqasQ08suoX51hvGac28zBq6Xq6tVEQ24w0ox9b53lLZZTu1kU8mJNrEbxXD0s9GVnW1rNQRTG3h27AGBOpujo70LpSO.hjEc7SAhfWKEdHiRqK54I3JWEixx3XGQKaCWAQx36uMC7IUKdI7p8cXhcXGiNB7YLpAK7.0W98oNbQKvuMZjqxItCB.nu29IQEm+FKt3hgPlIo8RkdxImbVVo0ThqWudnXI8HY5f+WmFJDEZuF0v+P4Rll2cn+eSm69GMuaxhe26G1aStC8HPdkxk9QsUYQ07YY82CmuCYNxtC4zJ+UqtT19cSi7uvAJWjg70Gbg702PGrmPk0IjuLR3q+owH7k1H0oJGGmbnpyN6rOMGpBDmOUc1PpZFpQLWAK2qTFKPHUWJhfpyB7bICfSjjCnOKL.FzaGha.MZ.fmGnFHawkiD7DVT6p0dTjf06GHE8drOwqKyNHq10ocH8ckq54QI9prrP2R+9w8tlKjoDlsW.LnPsK8fk+5nOQ8usX+8coaJbnYmUUxLH4FmScU.IR3KCn6Psg.s4iDn6FtDYa4.2QmsVajrOLVGPPaeY5RUaXGavczPvxJ2qr9Qm92F5GgMZFcPeTenIFS9ngSiYOqAoMNzJ6hf99QcVQOwpGywwk1RDvT4mzir2CXRjwmfelvuGwkcL0oE02FPDTsBJnemNvRCoV9bjSz11NilZvK8vl5Dvq.elNvbY9XJm5S.tGp8wGJ6ARO2bnwna329hxnjZ4HSMKGs2Ea4O1RcHPcrJxa1rJJPR8ZC1oVZlU5wz3j6bZOh1RhrlRK7ihWqsAm6.OQ.jfXRzO5z7Y0vjliFMdxoMSQ6a+KSIA8j2YqqFZD5ZDxLO9Neq9suYjMqZY7SV3hp.XB9IlcKzIjvyAX0LgxXA6l0cXWq7LnzCJOcxa1nojpiMq7IqcOMhr9MpAYVcZXpI5vTLl5xXEfSx6A9cBLkkNSk0mpbAptaBtU+D+W.xJcUyvQeVVN5yrR3CL1zVdNLRxApnYcD2jxEn1zI3o787hk047rgIi5rV2kjBqMpwWznIoUVqY7GqY7KbXbzhaga3S+y8ob6AY2uVxR2VO4mOWeZvJexwSZODJmOi8OOtAyErzpYMZcjj6o.XdhniERrNynIZjRTLyaeDM981W.Ckf02UQ+5Oof5cTh6PYE52cWcAcNXcCz4fo3cFpT32Ynnv8CwsXR6t4i2YxAuvMp9kFuwuZSY7Fc5.UtlB14vM91q1mnoxE8DM3jqjL71aJfn0TGNqAdyT+r93mZ0xGtrI8v3KaNrDAiYyh8YKF1yg5dgnu5lVaRj9gmkfqqzFtviMMtRb0iqXLipR6n1UTsUXnMk6D1Pcao3Nqlb2LUmUS5Te64NQVxsBiBE95hgbRtQkdu99hiUxoVsjiUvlVEWIoaz.RR3SMQJqqAXc5iyJQn97sRXEKZ41Cy8qkJVU7u1kG1fSf841TvZb1JvFL1PpSeB66pdwVHFUUcESEWSW7nNVWMua4+OdV0q9vcu6QmmsXvMGFblVi857Kfay544R2fe.0U.RhBIG+5.CkpCxMEbgWWAmYq6b9BJb1e+8oYbax0dVUJI1uNUxWY8BpKkDjdx5+bh0SYbJweyvD7WJp37iXk2ifm610uCGAWS0QeyeUkT8lIIF1A1irUqdTPvjllCMmKFruLftMIDM5adGP8kJkziJYy1i5lceAhZFujgyQzq.943ZK8freNXK3Oc9R0W+50Caitx1PuRp1X1qaUab4CEXLdnfOB2R3NH5jcbUoJPjVq6DRkF9IsvWsZcedbCqEW7mWIqOio0y6SbGgoWi4IbI9uqQAufi9yUPWkOIsZdyqQUSq1Yt9f2OEGuoapH6qO3913me8ArppgN5WAv88w0DderF8H19huyN5mGTER4lgR.6lG9eVv73MUsMG9aRhwUq8H0iKv9NaaUb8+.vO4qyveHREeVHMVbp0XoDMlC+vZESkGN0KxxSsFOZp03qNGMTW.X09RQuHWdPPqMhJMwH59Ngd+n+G2qQ78B
```


## ComboBox WaveForm Selector

![phasewizard_selectors](images/custom/phasewizard_selectors.png)

In the next step we want to create drop-down selectors for the wave-forms of both synths. For this task we need a [ComboBox](/ui-components/plugin-components/combobox) and a little bit of scripting. 

The ComboBox can hold a list of `items` that are defined in the **Component Specific Properties**. Each of the inserted strings (separated by a newline) corresponds to a list entry that can be selected in the ComboBox drop-down menu. The index of these items starts with 1 and not 0. 

Let's create a new ComboBox, name it "OSC1Wave", and insert this list of Waveform shapes in the `items` properties. The names match the first five WaveForm types of our Waveform Generator. 

```
Sine
Triangle
Saw
Square
Noise
```

This time we don't have a simple plug&play method at hand to connect the ComboBox to the WaveForm-Selector of the Waveform Generator. Let's do it with scripting.  

If we want to access and manipulate the Waveform Generator by script, we first have to create a [Script Reference](/scripting/scripting-in-hise) to it. This reference is a variable that "references" the Module and let us access it with its methods and current attributes/parameters. 

> A convenient shortcut to auto-generate the script-code for the Script Reference is to select and **right-click** the topbar of the Module in the Main-Workingspace and select **Create generic script reference**. This copies the Script References variable definition to your clipboard. Paste it to the Code Editors `onInit`-Tab and press Compile **[F5]**.

```javascript
 // Script Reference to the Waveform Generator
const var WaveformGenerator = Synth.getChildSynth("Waveform Generator");

```

The Waveform Generator is now accessible with this handle. Start to type `Wav...` in the line underneath and press `ESC` to access the [Autocomplete Popup](/working-with-hise/hise-interface/code-editor#autocomplete-popup-[esc]).

Let's try out to `get` 'n' `set` `Attributes` of the WaveformGenerator:

```javascript
// Print the Waveform Generators current WaveForm1-Attribute index to the console. 
Console.print(WaveformGenerator.getAttribute(WaveformGenerator.WaveForm1)); 
```

```javascript
// Set the Waveform Generators WaveForm1-Attribute index to the fifth item (Noise) 
WaveformGenerator.setAttribute(WaveformGenerator.WaveForm1, 5);
```

Now that we can set the Waveforms via script we have to somehow connect them to our ComboBox to switch the values when we want to select another Waveform. Here the [Custom onControl Callback](/scripting/scripting-in-hise#create-custom-oncontrol-callbacks) comes in. Let's create one (**right-click** on the ComboBox, select **Create custom callback** and paste the code into `onInit`).

Insert the `setAttribute()` line into the callback function and exchange the `5` with the callbacks `value` parameter. Now everytime we select a ComboBox item the `value` gets updated to the items index and the Waveform Attribute changes accordingly.

```javascript
// Custom Callbacks for ComboBox WaveForm Selectors

inline function onOSC1WaveControl(component, value)
{
	WaveformGenerator.setAttribute(WaveformGenerator.WaveForm1, value);
};

Content.getComponent("OSC1Wave").setControlCallback(onOSC1WaveControl);
```

**Solution:**

```
HiseSnippet 2238.3oc0Z07SjbbEuZfx1L6xZryJqjasH1QCJqwyL7sshn4ycQdAlkAyFrjkcQ20vTZ6oq1cWCvfskbxI+ePjykj+DxwbybI2ijuDobwWykn8+fjW0eV8L8.8r1KxzHgn9300u2u2qduWUM083lTeetGRa7C55RQZ2E2nqin05sHLGz1afzl.WuEwm9T1EDOKzZccI99TKjl1nOTNEswGCgPec2ew+bk0H1DGSZTWAOGxYlzGyZyDo85Z7gLa6sHVzCXsUl8bFaaxcVmay6.vYTbEjKw7YjSn6RjSaDLR6U1zhI3dMDDA0GoM1ZbqtMZwOyIb9Gx7YGaSkMphZ.unvt2haaIQrrWz5sX1V0iUaeDRCWOkDFMjDtOdGlEKo+TxXxfAzSkPkOzF4pfWUU3Uo3vSSAdiEBu2.2vzi4JRGQhs6f21QP8ZR.SfJrBmKZjVihWmCyvQLSaxyna4AMRjn7BUp7.84qTY5OXhRxedu2SOTP88oModTvvpK35OkbJsI2qs9CoNTOBnsxIC1Meg9oDujwSFV+2oG3PMyITQfxEzp7T8+hlZ5OPOYsWuiuf2Vechs8wfWfuNLW804sOluF+7fUYKovMn1TSPVeoXLGalCUuYGGSAi6nyc1qw5UkyUp2db6xl71tbGfAd..V6NzomnzWLQow6Czy3SEqJDdri6Hnk6e330uZ76AHsuJf3hYXo1FuXkmJFGSMs7MGglXcqbe3L1FjqBU6koBUq3JTsqQgp0mBAl0CZw70AI70Esn43L4Gz26lw1Jc6jytIqonkNSPaqW1gy7oSCtKJbytbAcOmxSW5KJMdoupuQZ1Lugh.nM0KuQkAn7tBwJ6zo8wTuXRKZdv9zrABvCNPfZbJyPpVYhbmscXh8boNCJ7.Jx9.AJJEAJXphfvDSFElHdaChAwCJgic1PAfNM96jFnh+FpUv2v8hdCMrYVTu.4wPLzy6UzeXkhH5qf2yTTsWYQWVXYq0qrO+6Jlr0IN8stGcYgksu08nBQUii2fJ53P6WkQCi3YW8+529s+mUJl3OleVcHOR1U+qG+eXf9ns2fHHxzSQNffSoK0Svj96ZaPOEx6GlrRBB+mI3tPsEIQPf+VDkoMbY2xlSDLmSNfA6KB8xVsiEieH6Bz4o586azMswhFmwrDsR5nxevnEkcRqzZMpbpwwmDWQwqhqNa0JKhjQPh66t34pszhUmcwkqsjx.0hFo1BKLWkJygDzyEphr7bKOe0pUmOd2Wnl95gPdUGhcWefCCXHsZXHhrt9TI6Z21Zp2Wep3YM0CBFcaGK54P+Uf3tRa6PvSeHs6wbYsYJ7zyWIkm9aWzCO82+i8xSF6qvSxPQ8xQIJbebTxHEiiTfaH87einGn6mJQIvAUmKjS1f46ZS5BaagXM6FDoEFsIw1mFNAv8DDC5a1EB63Qrv1UqsXXGgkQ7POhaKloeVo2f1jzwVrpqKk3IKbEFV30IZz0rgLYvaaeft4RCyLKrbvyRKUYwkqrHnYyubDPOfexI1zc3VzrqfrVQn1QGGpsDT8ZZe0hElVwr9aTb+M9Xi1DXLrFFZIsKvNueMtgrhgRG3wHN.lJ0fbVoFedGhGsztxblkJgbScDk9U8mDd3.Ysd.4O7k27f7tWSxlTzo2VAc5m0yNCzm06NCziLZyrrro049LYxe0TVsAKNR6sv6BHiXytfZUm5YBHBNzBxuSylvRCamdGjUnq1g8ly650RWv0rMEJRe6DkQUwu20kpTw4QWM14wWul+PC4V5.qbvNP8pHeA0sAnmpAZZyT3j6eYf4NIMkwPpguYzZc.rgz2k6CY9FD8itLeVMnZfDBZhqqdfTz97ubHInG8iV6pg5gt5gLyiuyWqe920iwpVF+jW+5JsY.9I5sJzNjf8AX4aBkQCNJq6vQF4oPoaTd7fM1ngjpiTq7IqitbH3lA5hTLt4EA2fawM.iN.twnXAVSKMc.tNelyKA5IcUyvJucVV4sMhY.LV2TbEbvvoqCzUnX55UC4ACxrJyKHikMdvDEnneEc8BEccxyh1ueG7VdzOuC0wraVqwbFpp1278WoOJnTO5hAYgb+SYcPFGuEyFTrpY0QUjjqWswew.0+0nMIFJYqisjyTugO40ZFMfDKpWkl75xb.L1UUSdobseEEtuAtNSX1Je7NRN3ENx1Ka7FcIpSf2rYSpoHErig252eCeio33icjbpLIPTZpBm0.eRpWVO0KMp6AmlkdVzoYSRUqMZVrOZwtjmbnt84cjGoaGhvKXGAbTmFvwnLoQmcPdCRZiHCVE1thrsDCMnNVAM9evSzfUks0hFrZ7fplm6GpI2IHzQvswFvI4FJ4F8596qzOkZ55qvIkJehSIn.j3XdJ23Qxc1pdeUI26oZmAUNnjwMHirRBRYQ3JEwuoCAryMnf1XsmuInrATmRDh5crke.EHAQUUAS6tlZ285XMVwbrR2TT412W43lK57nECt4vfiTuuOVFbpXVaWa5lNmRs4POggjitYgjdUA4NbGtaKtCyT0eceJr2+jSnYbaxUeVUHHlOKsmkL1mZSI9o6r9WeiwigyWS71IHM8KDUb0Qrx6aRkq45WhCgqtbqu9OqRp9ZwIFNDrQlxUOLHXbS8D045A6G4SOfDfFUi2oTOgTH0nRlrio1YsKPTynkL3cDdqXuCt1byj84z8fe072J+ykWOnM5mLC5OIUaL5sspMdwCEn0enf2DWma2MbmcXQpAfHsh0AjJM3Is7Uk6X+IQMLlc1uekr9L5FOoCwNko0+j+7+d00Xtbah2O1nfWyV+wJnqxakVSt9snpokVlaO38WgiL55Rx91CtuG9I2d.qrZny+Y.buINlvMwZzlX5w+Tyvu+nLjxqEzCn2NA+i9LNdGYa8jO5IFWs1hxqHf8ollx35uKvO4KSxW5TxmERhYGZIlKVhwvyWqXhL+PuHKLzRr3PKwRWgDxC.rZGAucnKOzQ8MCKMQK77NAd+n+OPPpNg.
```


## Settings and About

![phasewizard](images/custom/phasewizard.png)


As next step we want to a create [CustomSettings](/ui-components/floating-tiles/plugin/customsettings) to give the user the ability to change the Audio Settings. We'll also add a [MidiSources FloatingTile](/ui-components/floating-tiles/plugin/midisources) to hook up MIDI Devices. They will both be shown when the user clicks on a SettingsButton in the top right of the interface. 

Create both FloatingTiles, name them "Settings" and "MidiSources" and set their `ContentType`s to "CustomSettings" and "MidiSources". You can place them in the middle of the Interface. 

The CustomSettings FloatingTile gives us the option to decide which of its custom settings are going to be shown via its `Data`-Property. For a little tutorial plugin like ours it makes sense to restrict them to the most important ones. 

Here are my `Data`-Properties for the CustomSettings: 

```javascript
{
  "Driver": true,
  "Device": true,
  "Output": true,
  "BufferSize": true,
  "SampleRate": false,
  "GlobalBPM": false,
  "StreamingMode": false,
  "GraphicRendering": false,
  "ScaleFactor": true,
  "SustainCC": false,
  "VoiceAmountMultiplier": false,
  "ClearMidiCC": false,
  "SampleLocation": false,
  "DebugMode": false,
  "ScaleFactorList": [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    2
  ]
}
```

Now we want to create the **SettingsButton** to show and hide the Settings FloatingTiles. We'll put it in the top-right corner. Afterwards we can create a custom callback for it, create script references for both FloatingTiles and set their "visible" property to the Buttons `value` to turn them on and off.


```javascript
// Settings FloatingTiles

const var Settings = Content.getComponent("Settings"); 
const var MidiSources = Content.getComponent("MidiSources");

inline function onSettingsButtonControl(component, value)
{
	// Sets the FloatingTiles property "visible" to the SettingsButton value (On/Off)
    Settings.set("visible", value);
    MidiSources.set("visible", value);
};

Content.getComponent("SettingsButton").setControlCallback(onSettingsButtonControl);
```

In the next step we want to add a Logo that opens an [AboutPagePanel](/ui-components/floating-tiles/plugin/aboutpagepanel) with Plugin information when you click on that Logo. 

First we want to create a new **Logo**-[Label](/ui-components/plugin-components/label) and set its "text" to our plugins name (+ "editable" :false). A **Label** can't do much more that that, though. We can change its Font and FontSize but it doesnt have the capability to react to mouse clicks. We will need a [Panel](/ui-components/plugin-components/panel) for that purpose.

The **Panel**, also known as [ScriptPanel](/ui-components/plugin-components/panel#the-script-panel) has a lot of capabilities. If you plan to do some customized components, graphics and animations you should definitely check it out. For our case we only need its [MouseEvent callback](/ui-components/plugin-components/panel#the-mouseevent-callback) to react to a simple click event. 

Create a new Panel (**LogoPanel**) and get rid of its border by setting its Component Colors to **alpha: 0** (or "BorderSize": 0), and put it right on top of the Logo-Label in the interface. Now we can set the "allowCallbacks" property to "Clicks Only" to activate the Panels MouseCallback capability.

Before we stitch everything together we have to create the [AboutPagePanel](/ui-components/floating-tiles/plugin/aboutpagepanel)(**About**). It has a few `Data`-property entries, in which we just want to show the Version, HISE Version and the Build Date.. We'll put it right below the Logo.

```javascript
{
  "CopyrightNotice": "",
  "ShowLicensedEmail": false,
  "ShowVersion": true,
  "BuildDate": true,
  "WebsiteURL": "",
  "ShowProductName": false,
  "UseCustomImage": false
}
```

Now we can add our final script to the `onInit` Tab. Two references to the **About** and **LogoPanel**, and the LogoPanels **MouseCallback** that sets the "visible" property of the About-FloatingTile to `0` or `1` if we click on it.

```javascript
// About FloatingTile
const var About = Content.getComponent("About");
const var LogoPanel = Content.getComponent("LogoPanel"); 

// Hook a MouseCallback to the LogoPanel that lies transparently over the Logo. 
LogoPanel.setMouseCallback(function(event)
{
    if (event.clicked) {
        // Sets a free definable "LogoPanel.data.variable" to the inverted value of the last value.
        LogoPanel.data.show = (1 - LogoPanel.data.show);
        // Set the About FloatingTile property "visible" to that variables value.
        About.set("visible", LogoPanel.data.show);    
    }
});

```

Yeah!, looks like we're basically finished. In the last step we want to export and compile the plugin to use it as a Standalone. 

**Final PhaseWizard Snippet:**

```
HiseSnippet 3156.3oc0Z07babaEeojW6HZqD6zLYRugQMsibGGERJIKo3IiW8gkslnOXDUjiam1DvcAEw3kKX1ETRzIdF0dxGysdr+Kzom5oFcuWZm1C8X9Kni+OP8Af8CrePIJkXMwzGr1GvC326S7dX259LaRP.y2nzX6zuKwnzMLaz2i2d41XpmwZqXTZby5swAjGSeF12wXo9cwAADGiRkF8ghoTZrqXXXbT+e1+79Kgcwd1jPRxe6xn1j0ocn7Dpcs9Dpq6pXGxNzNZydFq0rYdKybY8.3LpYEitX6mh2irIVLsQLMJc0G3P4L+FbLmDXT5JKwb52nM6.O072kFPa5RDOT0nArPJxqxbcDHVP0X41TWm5QhcfgQIy5IJgQUJg2wbCpCMldhx3lxAPIbnqOJMxoAup5vqxvCuRZv6JJ3cKyF19zt7jQDX65lq4wI9svfIPGVp4ZLxWcMykYvL73S0A+Txp9vCwbL4cqT4NnYqT412a7xh+8geH5w38Iqx76fphvdNnZnkYcZxVhcHpAwkXCRZfXlfQKfi1G6KYnEvvCIdDeLLN5iQRuoo1ivkRl7oImHZhn3YNwsuGB1REVQaSZQ7IfuDhyP4mbLBWtW.m0AsL10sI3qDff4kfxX7mBtTOWpGA0pmmMmx7PLusZrbUwbEZGel6j1rNcYdfd5NfT41ib6wK+0iWdrbR2TAD9hbtOsYONYx7CGs+UiVGP09bo5MxNHTKQa1jSDgiItsXkCQSjrMYNbFYoJTfp8pTfpM7BTsyPfpUf.I7CHbN0au.zptLr3u1g5Rx3sEOmOFU71GMAgukNihP3FPRFH1Yf7pMmIT3JuZNZ8WpGmKRbcpJakPEf3sIoEJTWeVWhOuOZh8UIHlP30KlW5MPsbnI2x6C2pUKXYQvunoHTvSFu.Z1GwjzDlANuSyNlFGCxZVn5PyltXSVOdJYOs8TM9fLHxQklhDNVmsGqN1i3NPthmgxGPhiGwXOEgQav5EPhfejFOYE4swbjKErOberWPWLjOh61Gw1m3GO0of0LlEgVI0hNYjuxjj8AlUNBB6AsERQZJaWp8SIN2FENh3WjmBF0xmPPNjVTOLXsPIRyTNXNdJPEPw59KTO.bbhSnmBqkjpKVpt.JSkrIYVp.3TJPINYUzGTzPQNRIvStx4snCzYFKsXR3FjCLx0IqmYgvPLaIaOG7Xi7szBI2jwIa4M4sK+0kGq7yKixNTqVENVnypKwuvgE0o3eZLNoWuNMI9QgSQSDNvNcEAlCth.8BVrU9xZSj4slGkuUWh2fpSvHL..pX3FgnBlJWVuvMCqWH5jQCJTXPYynySLjnVqrMKigeEpUzJ7x6maEdyvUngK0g3K42DJl5vrr98CEqW0bKad0b.+3gl2Z4f72Mb7Btj412mb7Pyat88IVCCuiYtBg2yijWjMNOrW6hx95rCpCETlgcq+7fAu5T.I6fySpiFFBPLd3prNtIwMT6IRHDwZ5lRL9r0VAxQHJVNLJntJMDUDzUZEx9PWHpRmEZhfmxYcMJ81wmS.gL7v59UaqdJsPW8E64PY6RelwgI.+ir5m7vbVGPc3siIT4OX0lP2qcRmOU12p4dQ82bMypSWsxbFTNoSDswt5KdwKNQL0Dp0DjWYkUjq.mbHOZx2vblZKLyByVsZ0YiB9Ux3ao.6hdX29AfITpaJUyTdFyDwIMVyYhOBMQzrl3NxQWyygbHPuBjeUXVNGZnOgzuISXNNTOQPhF5u7rLZn+1eLqFxZaMMjHSnt1Ik.mRAkZjgSGoAWk54+Epd.xOVfRPGTcFkNYEZPWWbeHqAjpaSYldXzVX2.hZBPzAvFPa56pH7Hp54p0lSQP0nxC8wcaSsCRy8JjV3dt7E61kf8EMPCCy86EN5RtPkDvpsMntYBCyT2cA4u4muxbKTYNPxlcgPftCau8bIavbHo2AQ8ePOrdh5f.Pk0zdsg6TBMy5uRyw252X0ACiYVxLzwEh49ElMDEKWdG3HeO.SkafOnbiupGTEU4MYz.R4xFcSbDE9U4ay67AxZY.42+MW9f7FmwYcInC0QCcnCxDYX7kYiLLdjUGpiiKoNKfJJ9P+DyNfE2nz6ZtIfLrK8YDm5DnXeONdOhQPuVsfsFBm9kFNJWscydj6YKkP8u3NDNQNCkvnK3u4YcRslyCROqYyyVxenkHjVj5VEAV0HfS51.DS87LcnZpj24Xo0Noflyo.91ga0NxR+YAvdNHsuwwEqTk0hDqeF+rpFIAsu7aNm5mG8CV5pYjQckQYVj9tXo9keWZaUsTdIu0YUW0.7RPsGp3CYTfoXkLRI.OIs2vSrJRdRBSVev1ZiyolNTrJVW8jiOG5lA5gLb5lKBtAuhKAM5.zMVCWZ0j5hGfqyW58JP8jrqozJueZsx6aEoALMQ17SQGb9j0A5JLbx5oC4ACxzByETikNev3CQGGZx5yzj0adPX790MW0m7U8Hd18SaMlwRWzdw+9T8QAg5QOaPVnt+ozNHiYtJ0EDrpokQcjTnWspcoXou7v2vjlI5H8SGduviFKGyfQZOfi1MmGvGako4hacqaoNpYuj9PN4DYaHY5NY5omNm+53mYeAwPKQJNlnIEG8vLtsHVVPezSsNazkmZMcxoJ++llpJxiwlrIfQ9qkB6BXEe59xp7SJDW0EYJRa0i2sGOc45fCEwW3lkhbCbmttDnF9LUl+PWVSr6R02HM4FbeBF7l2Kes7g8PrMAZTyGlQFFswtjUwhW1Q58GjVL0a4kSOc4qmawNrdd7M.2UZWWZ1daV1E5JQ1.QFdUhz5LaQiIdYaooYuBvtF5VmFHTb+V0k.VYpYuSzeMWzeVM5+mpVLo34US7e+NQmLIl6o0M26Gc0ZmZZ1A51Nto1klqG+Q08b6ZkxqJMS5drvjOIuG6+33SJpa+HxpFSupvk74Yhq+RZ1Pjieh0YHxim9pUj2spTVutY7cspKoFF80eHM.N92mKwxhV5sdKsDetLuBy2QERnubJpaicn8BRQOcb98xq0hlYFsVDYrqK6f32HnPdWVbI6Ans7b6eZJjb20zvpKNJut39gIlSeOUs.mkF79BSzUMWh4pnnd81ukIfLpMpATSNZiF4tFi4magZyMyLyXPbnbb7qQNsRvrZ0pyOy7UU6TJM9zVETs4.c+ulo7N40UASqevy8xjx96yWowPbUN2ctZKbZWkSlT1RHUG5oU4ppBO96gYrWl0suu.Aax3p7zSzl.tBg2qk3tzWGn6EPbdPGL0Mc5QXzcI9ApDY5YyotNqnxZmP8wjlPEBjOa60E6h1FT2m4zyVZPSm36yBHpyaVqC.+nwDg0qxjliLF+UyY990YBt91u8aOIcZt3..i7ev.2zDRF2yUTWl92xf3C3Hb.Q8N5ez.hOL.OPJ6qWszqjOvggEt2xrNka2tX7NRA30v3UNdGMJu+CfS8s4If8Jlq94WxeaHlQWrY789J.h1i5vIoLkD80wV08gZbHGDdS4w2FPoQSi8QGt2hUAptsg.XQUMXturp6M60QcZY3sSJdEYkFQbrk54JhmEXnATti7A3HgSBGrp34RgCVMZPcyy6njjqKaOQ9omH0IE1txk5G1TtaWR6Zixc2LZWtRTamZ.IpuJMRwe2I5Fw3ucC8.Z4sSn0UurqeslvEWym10D9.46gtAAjFmsBrAgUp5zWvdthS6fiFppyXB4Z5jy5Xckgyw505umqKuryiNbvs.M3H0y8YABsjRE06+.u8ItLfhJkb36tHlpNH2f4w51l4Qs0cN2l.w96sGIkaSgxyhbNTAWBk4s1l.MiDjDY8eeg05TOQ+IxqB3BoJN8LVE802Un458LUvEIB8Q+j5P02H5fgcAajsX2UIAidDEKNmMXgBY1AmpGCgwS8UmjNqjMEplNscAxZFtkx0PU+l3y57GKq0OJkRL5qakRbwiyKkON+sMqyb6qBaU2xkDDIW40.NmT9K49uztxqOM7Aqom9ee+zNDHqOsG1MQSez+4k+qEWh1k4h8+glh6LhquxP5p7tIWpG50nRkEVlWev6O2LzniDJ6Wev8aZ9ou9.VQoNG9S.3dYzCvkwdzAa6y9Ba0GtjHkxaHo.xsm7BcFybCwyn3OYqqYVs1bSUQ7VFnegssHy9G.Znh4J9K0xzrxvxyzW.dlIhmqZNasgkoYu.azcu.7L2Efm4OUdDU6uXONqiJD.HT+Ap5PJoZtQFMX7+gHXXpD
```


##  Export & Compile

If you've followed the [Installation Instructions](/introduction/installation#setting-up-vsti/plugin-compilation) closely, and set up your system for plugin compilation you should be ready to export the VSTi right away. 

But before we proceed with the compilation process we should check the [Project Settings](/working-with-hise/settings/project) again. The projects `Name` setting is going to be the name of the compiled binary and the `Version` setting will show up in the AboutPanel of the exported Standalone. The User Settings: `Company` is also important. It will determine the name of the systems %APPDATA%-Folder to hold plugin-specific settings.

OK... let's do it. Select **Export >**[Export as Standalone Application](/working-with-hise/menu-reference/export#export-as-standalone-application) to start the compilation process. You can choose if you want to compile a 32bit or a 64bit Standalone Version.

A system console will pop up and inform you about current state of the compilation progress. After the compilation has (hopefully successfully) finished, you can find the final executable in your projects `Binaries\Compiled\App\` folder. Check out if it works..

Gratulation!, you've managed to build and compile a full-fledged Standalone Synth plugin with **HISE!**

> If you want to use this plugin in a DAW, just [Export as intrument Vsti / AUi plugin](/working-with-hise/menu-reference/export#export-as-instrument-(vsti-/-aui)-plugin). It will compile the plugin to `.dll`/`.au` in the `Binaries\Compiled\` folder. Put it in your global plugin-folder and use it in your preferred DAW.




