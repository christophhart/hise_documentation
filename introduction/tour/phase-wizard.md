---
keywords: Tutorial Project 1: Phase Wizard
summary:  Build a Synth VSTi
index:    01
weight:   70
Author:   Dominik Mayer
---

The best way to show how these workspaces act together is probably to dig in right away and built a simple virtual instrument from scratch to exportation. 

Panning two oscillators against each other can yield some mesmerizing phase interpolations that can be visualized with a Goniometer.

![gonio](images/custom/gonio3.png)

Let us create a new instrument with the name **Phase Wizard** to explore these interpolations.

![phasewizard_preset](images/custom/phasewizard_preset.png)

This HiseSnippet contains a preset with a [Waveform Generator](/hise-modules/sound-generators/list/wavesynth), some GainModulation, a [Filter]() and an [Analyser FX](/hise-modules/effects/list/analyser) with the setting `Goniometer` in the Master Containers FX-Chain. All that's missing is a frontend for the instrument.. Copy the Snippet and import it to **HISE** with **File > Import HISE Snippet**.

```
HiseSnippet 967.3oc6X0raabCDlqjXQb9oHo0nn81domBRfWYmlzSZsrkBLRT7ZutNMGJBX3NxhnTjpb4pDkS4XeF5k9nD+HTfdI.8ReD5aPK4tqzRknlJCX6FCDdvvyPNjey2Lb3rJRIoPZpTg7V4fIi.j2UwwSD5AaMfvDnc1F4cMbz.RJ7X1KIpDT6IiHooPBxyq98sKwakFHD5US97eqUaBmHnPop7wgRFEdHaHSWocT3CXbdWRBb.anyp2HbGpTrkjKyLvoNdMzHB8GIGAOhXWVMLx6S5jvzRUrlngTjWi1xjIwCjOWTr9CYormwAqP.J1rQEp6J4IVDa0h1Z.imDM0sSQHObTEITufDVE2ikvlouhLtd9D9UV3xGd0devKvEdqszvC4ftFEny.BYRFmnmGY1vQ4DLoXNjsiPChTldREa+Ws9eEt2.GwzzAKFu0V.dMApyZ7VF7uFtS+9.UWA1F3te+oajdsEkH54fEbAVtLdSAgOIET4.wQzENsyL.VEydoysoiCiTvXF77hMZFMF5Ueow9xeIBsuLSyDG0inUrWXf+ixFFatGSACKJD.2bPXuZHqo4xqYks3IFDI4B+sYTNYfU1qbxfoS5FpVsvqtB9wjwPdAqb9Y0b49R0P+6CBPYy4NeKYsKUaPvAJhHcjLEBb14ieq4Z5bY70aC5LwbKGUnpoqJq2003ctqKbpR28qUDQ3rnmbrQ1Y9mD1yFklJ9ms5HHlXdLX7ljcSoFmMm5b2vLt8QfD8f.WCqT2zU8YRR1GqTWB25KGat.FrVz67f+0wwrgi3PGwXfKMZJJOuMzmjw0yz5BxdRgbz.ofQcSN2GL28O5HXtzlE5Oap0lW1qzbuv8ANXZxXlp27ygOjI.hxPSvYCU3sjgquDW.We6Ue+Ondf8RSej3PSLhZO8hhfSE8m4N+2f86RgCH4nwM3MFTZqQtUknrmA74iKlplkGY9drMQSPdeMt4F2d9w3cM+o+Ms+62tUtL5TKfdpz4Q8O14QYYgOCGI4SJtk2kw0kcfrBtPH3e6Y07QWE7SYffVwhg+Z3dkBgqu9u2Z97G+v8xH7JV2+G9k+Xy1rQRNQcFWQrwRl17E3YNk+EntrsQlKN38qvkAceKYewA2eJduKNf01YzK9..tmGexv4wYLjPUxmZ5bVqjbaIkKkqw32h7e3hUv8rx9AnwDdlQAFGz7tngl1SeJkZqweKC+rXaZN0FKetTVr9I1hMlZQC7cZtblbmS7g7MmXKt6I1h68drv9w.alokCKR4MJh5TzlhWw29jm8i9G.tXB9R.
```


## Interface and Sliders


![phasewizard_sliders](images/custom/phasewizard_sliders.png)

When we switch to the [Scripting Workspace](/working-with-hise/workspaces/scripting-workspace) right now, it looks quite empty. Let's create a new Interface ScriptProcessor by clicking the little house button in the top bar and accept the default settings. Now that we have an interface we can start to add a few sliders to control the Waveform Synthesizers parameters. Let's start with the **Mix** parameter. 

Add a new [Slider](/ui-components/plugin-components/knob) with a **right-click** on the Interface in **edit mode**. Let's change the `ID`  (right on top of the **Property Editor**) from "Knob1" to "Mix" (+ **ENTER** to accept) to match the **ID** with its intended function. We can also change its `text` property to "Mix".

A few properties below, we'll find the `processorId` and `parameterId` selectors. With them we can link the UI Component directly to a Module attribute/parameter. In our case we want to select "Waveform Generator" and "Mix".

That was easy.. the Slider is now hooked to the Mix parameter of the Waveform Generator. Check if it works by opening an **Interface Preview** Window via [View > Add Interface preview](/working-with-hise/menu-reference/view#add-interface-preview) and compare it to the value of the Mix control in the Main-Workingspace. But oh, something is still out of sync. The displayed values don't match each other.

We have to adjust the Sliders value representation to display its values in **%**. Scroll down in the Property Editor to the **Component Specific Properties**. Set the `mode` property to "NormalizedPercentage" to convert the values to a percentage representation. Voilá.

In the next step we want to mirror both Octave, Pan and Detune controls of the Waveform Generator on the interface. This is a good task to get some practice in hooking up sliders. Have a try. You'll need to use a few other Slider properties to adjust the value ranges and representations: `mode`, `defaultValue`, `min`, `max`, `stepSize`, `middlePosition` and `suffix`.

Tip: Create a Slider (e.g. Octave1) and drag it with **Alt+Drag** to create a copy (Octave2).

Solution:

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

BTW: If you have a MIDI device at hand you can connect it in the **HISE** Audio&MIDI settings. If you don't, you can fall back to play MIDI notes with your keyboard-keys [**a-l**].


```
HiseSnippet 1999.3oc0Z8zbabaEGqjfqEcnqRhmLM215IYFmItdHojkSZOnURTzlSrrnMkkiNk.sKnHFuDX6tfRhJMSyzS5CPu2OA8yf08doyjK8X+H3uApOr+gKVxkRKkUbi3AMDOfGvu2O7v68.nZ4KroAABejw7aOvihL9.b6AbY206RXbTy5Hix3VcIAzWwNl36fVafGIHf5fLLl8wpgXL+bHD5mF7w+6UVi3R31zXQge1QvroOk0iISk5Y8MLW2FDG51rdZidIql1B95BWQe.Nyhqf7H1ulrO8YD0vlAiLtwFNLovusjHoAHi4VS3LncWwg7nwuCKfsmKU0nJpMLQQhaHbcTHVIEsdWlqSqDyN.gLvsRIgYiHg6f2j4vFJOkLVHrCyTMz4CiYNO3U8RBOCM3MWD79PbaaelmLsGE1tEtIWR86Pfs.cXEMVjwavqKfAvkOnG40zF9PigJbukqT49lOrRku3OUtT4Rc5yskLA2TvelPR2heuunzOTZ9R+3X8zoSdcoVHegqK0OudUa69miZ2i2u2dT+6ad.wsOMYbf0mkdwEidsiLZsAJ3M4L4VdT9jHcTLSAz+MiAELTYH4e6XxusKyg5iX.GiAuhiPgnM0c9+tBp.pdC7V1xpipK5zBqasQ08suoX51hvGac28zBq6Xq6tVEQ24w0ox9b53lLZZTu1kU8mJNrEbxXD0s9GVnW1rNQRTG3h27AGBOpujo70LpSO.hjEc7SAhfWKEdHiRqK54I3JWEixx3XGQKaCWAQx36uMC7IUKdI7p8cXhcXGiNB7YLpAK7.0W98oNbQKvuMZjqxItCB.nu29IQEm+FKt3hgPlIo8RkdxImbVVo0ThqWudnXI8HY5f+WmFJDEZuF0v+P4Rll2cn+eSm69GMuaxhe26G1aStC8HPdkxk9QsUYQ07YY82CmuCYNxtC4zJ+UqtT19cSi7uvAJWjg70Gbg702PGrmPk0IjuLR3q+owH7k1H0oJGGmbnpyN6rOMGpBDmOUc1PpZFpQLWAK2qTFKPHUWJhfpyB7bICfSjjCnOKL.FzaGha.MZ.fmGnFHawkiD7DVT6p0dTjf06GHE8drOwqKyNHq10ocH8ckq54QI9prrP2R+9w8tlKjoDlsW.LnPsK8fk+5nOQ8usX+8coaJbnYmUUxLH4FmScU.IR3KCn6Psg.s4iDn6FtDYa4.2QmsVajrOLVGPPaeY5RUaXGavczPvxJ2qr9Qm92F5GgMZFcPeTenIFS9ngSiYOqAoMNzJ6hf99QcVQOwpGywwk1RDvT4mzir2CXRjwmfelvuGwkcL0oE02FPDTsBJnemNvRCoV9bjSz11NilZvK8vl5Dvq.elNvbY9XJm5S.tGp8wGJ6ARO2bnwna329hxnjZ4HSMKGs2Ea4O1RcHPcrJxa1rJJPR8ZC1oVZlU5wz3j6bZOh1RhrlRK7ihWqsAm6.OQ.jfXRzO5z7Y0vjliFMdxoMSQ6a+KSIA8j2YqqFZD5ZDxLO9Neq9suYjMqZY7SV3hp.XB9IlcKzIjvyAX0LgxXA6l0cXWq7LnzCJOcxa1nojpiMq7IqcOMhr9MpAYVcZXpI5vTLl5xXEfSx6A9cBLkkNSk0mpbAptaBtU+D+W.xJcUyvQeVVN5yrR3CL1zVdNLRxApnYcD2jxEn1zI3o787hk047rgIi5rV2kjBqMpwWznIoUVqY7GqY7KbXbzhaga3S+y8ob6AY2uVxR2VO4mOWeZvJexwSZODJmOi8OOtAyErzpYMZcjj6o.XdhniERrNynIZjRTLyaeDM981W.Ckf02UQ+5Oof5cTh6PYE52cWcAcNXcCz4fo3cFpT32Ynnv8CwsXR6t4i2YxAuvMp9kFuwuZSY7Fc5.UtlB14vM91q1mnoxE8DM3jqjL71aJfn0TGNqAdyT+r93mZ0xGtrI8v3KaNrDAiYyh8YKF1yg5dgnu5lVaRj9gmkfqqzFtviMMtRb0iqXLipR6n1UTsUXnMk6D1Pcao3Nqlb2LUmUS5Te64NQVxsBiBE95hgbRtQkdu99hiUxoVsjiUvlVEWIoaz.RR3SMQJqqAXc5iyJQn97sRXEKZ41Cy8qkJVU7u1kG1fSf841TvZb1JvFL1PpSeB66pdwVHFUUcESEWSW7nNVWMua4+OdV0q9vcu6QmmsXvMGFblVi857Kfay544R2fe.0U.RhBIG+5.CkpCxMEbgWWAmYq6b9BJb1e+8oYbax0dVUJI1uNUxWY8BpKkDjdx5+bh0SYbJweyvD7WJp37iXk2ifm610uCGAWS0QeyeUkT8lIIF1A1irUqdTPvjllCMmKFruLftMIDM5adGP8kJkziJYy1i5lceAhZFujgyQzq.943ZK8freNXK3Oc9R0W+50Caitx1PuRp1X1qaUab4CEXLdnfOB2R3NH5jcbUoJPjVq6DRkF9IsvWsZcedbCqEW7mWIqOio0y6SbGgoWi4IbI9uqQAufi9yUPWkOIsZdyqQUSq1Yt9f2OEGuoapH6qO3913me8ArppgN5WAv88w0DderF8H19huyN5mGTER4lgR.6lG9eVv73MUsMG9aRhwUq8H0iKv9NaaUb8+.vO4qyveHREeVHMVbp0XoDMlC+vZESkGN0KxxSsFOZp03qNGMTW.X09RQuHWdPPqMhJMwH59Ngd+n+G2qQ78B
```


## ComboBox WaveForm Selector

![phasewizard_selectors](images/custom/phasewizard_selectors.png)

In the next step we want to create drop-down selectors for the wave-forms of both synths. For this task we need a [ComboBox](/ui-components/plugin-components/combobox) and a little bit of scripting. 

The ComboBox can hold a list of `items` that are defined in the **Component Specific Properties**. Each of the inserted lines corresponds to a list entry that can be selected in the ComboBox drop-down menu. 

Let's create a new ComboBox, name it "OSC1Wave", and insert this list of Waveform shapes in the `items` properties. It matches the first five WaveForm types of our Waveform Generator.

```
Sine
Triangle
Saw
Square
Noise
```

This time we don't have a simple plug&play method at hand to connect the ComboBox to the WaveForm-Selector of the Waveform Generator. Let's do it with scripting.  

If we want to access and manipulate the Waveform Generator by script, we first have to create a **Script Reference** to it. This reference is a variable that "references" the Module with its current attributes/parameters. 

> A convenient shortcut to auto-generate the script-code for the Script Reference is to select and **right-click** the Module in the Main-Workingspace and select **Create Script Reference**. This copies the Script References variable definition to your clipboard. Paste it to the Code Editors `onInit`-Tab and press Compile[**F5**].   

```javascript
 // Script Reference to the Waveform Generator
const var WaveformGenerator = Synth.getChildSynth("Waveform Generator");
```

The Waveform Generator is now accessible with this handle. Start to type `Wav...` and press `ESC` for an auto-completion-popup.


and lets us manipulate its attributes/parameters with `getAttribute`- and `setAttribute`-methods.

```javascript
// Print the Waveform Generators WaveForm1-Attribute(index) to the console. 
Console.print(WaveformGenerator.getAttribute(WaveformGenerator.WaveForm1)); 
```

```javascript
// This sets the Waveform Generators WaveForm1 Attribute to the fifth item (Noise) 
WaveformGenerator.setAttribute(WaveformGenerator.WaveForm1, 5);
```

The value of the 
that is accessible with an Array-Index starting with 1.   



```javascript
// Custom Callbacks for ComboBox WaveForm Selectors

inline function onOSC1WaveControl(component, value)
{
	WaveformGenerator.setAttribute(WaveformGenerator.WaveForm1, value);
};

Content.getComponent("OSC1Wave").setControlCallback(onOSC1WaveControl);


inline function onOSC2WaveControl(component, value)
{
	WaveformGenerator.setAttribute(WaveformGenerator.WaveForm2, value);
};

Content.getComponent("OSC2Wave").setControlCallback(onOSC2WaveControl);

```


```
HiseSnippet 2238.3oc0Z07SjbbEuZfx1L6xZryJqjasH1QCJqwyL7sshn4ycQdAlkAyFrjkcQ20vTZ6oq1cWCvfskbxI+ePjykj+DxwbybI2ijuDobwWykn8+fjW0eV8L8.8r1KxzHgn9300u2u2qduWUM083lTeetGRa7C55RQZ2E2nqin05sHLGz1afzl.WuEwm9T1EDOKzZccI99TKjl1nOTNEswGCgPec2ew+bk0H1DGSZTWAOGxYlzGyZyDo85Z7gLa6sHVzCXsUl8bFaaxcVmay6.vYTbEjKw7YjSn6RjSaDLR6U1zhI3dMDDA0GoM1ZbqtMZwOyIb9Gx7YGaSkMphZ.unvt2haaIQrrWz5sX1V0iUaeDRCWOkDFMjDtOdGlEKo+TxXxfAzSkPkOzF4pfWUU3Uo3vSSAdiEBu2.2vzi4JRGQhs6f21QP8ZR.SfJrBmKZjVihWmCyvQLSaxyna4AMRjn7BUp7.84qTY5OXhRxedu2SOTP88oModTvvpK35OkbJsI2qs9CoNTOBnsxIC1Meg9oDujwSFV+2oG3PMyITQfxEzp7T8+hlZ5OPOYsWuiuf2Vechs8wfWfuNLW804sOluF+7fUYKovMn1TSPVeoXLGalCUuYGGSAi6nyc1qw5UkyUp2db6xl71tbGfAd..V6NzomnzWLQow6Czy3SEqJDdri6Hnk6e330uZ76AHsuJf3hYXo1FuXkmJFGSMs7MGglXcqbe3L1FjqBU6koBUq3JTsqQgp0mBAl0CZw70AI70Esn43L4Gz26lw1Jc6jytIqonkNSPaqW1gy7oSCtKJbytbAcOmxSW5KJMdoupuQZ1Lugh.nM0KuQkAn7tBwJ6zo8wTuXRKZdv9zrABvCNPfZbJyPpVYhbmscXh8boNCJ7.Jx9.AJJEAJXphfvDSFElHdaChAwCJgic1PAfNM96jFnh+FpUv2v8hdCMrYVTu.4wPLzy6UzeXkhH5qf2yTTsWYQWVXYq0qrO+6Jlr0IN8stGcYgksu08nBQUii2fJ53P6WkQCi3YW8+529s+mUJl3OleVcHOR1U+qG+eXf9ns2fHHxzSQNffSoK0Svj96ZaPOEx6GlrRBB+mI3tPsEIQPf+VDkoMbY2xlSDLmSNfA6KB8xVsiEieH6Bz4o586azMswhFmwrDsR5nxevnEkcRqzZMpbpwwmDWQwqhqNa0JKhjQPh66t34pszhUmcwkqsjx.0hFo1BKLWkJygDzyEphr7bKOe0pUmOd2Wnl95gPdUGhcWefCCXHsZXHhrt9TI6Z21Zp2Wep3YM0CBFcaGK54P+Uf3tRa6PvSeHs6wbYsYJ7zyWIkm9aWzCO82+i8xSF6qvSxPQ8xQIJbebTxHEiiTfaH87einGn6mJQIvAUmKjS1f46ZS5BaagXM6FDoEFsIw1mFNAv8DDC5a1EB63Qrv1UqsXXGgkQ7POhaKloeVo2f1jzwVrpqKk3IKbEFV30IZz0rgLYvaaeft4RCyLKrbvyRKUYwkqrHnYyubDPOfexI1zc3VzrqfrVQn1QGGpsDT8ZZe0hElVwr9aTb+M9Xi1DXLrFFZIsKvNueMtgrhgRG3wHN.lJ0fbVoFedGhGsztxblkJgbScDk9U8mDd3.Ysd.4O7k27f7tWSxlTzo2VAc5m0yNCzm06NCziLZyrrro049LYxe0TVsAKNR6sv6BHiXytfZUm5YBHBNzBxuSylvRCamdGjUnq1g8ly650RWv0rMEJRe6DkQUwu20kpTw4QWM14wWul+PC4V5.qbvNP8pHeA0sAnmpAZZyT3j6eYf4NIMkwPpguYzZc.rgz2k6CY9FD8itLeVMnZfDBZhqqdfTz97ubHInG8iV6pg5gt5gLyiuyWqe920iwpVF+jW+5JsY.9I5sJzNjf8AX4aBkQCNJq6vQF4oPoaTd7fM1ngjpiTq7IqitbH3lA5hTLt4EA2fawM.iN.twnXAVSKMc.tNelyKA5IcUyvJucVV4sMhY.LV2TbEbvvoqCzUnX55UC4ACxrJyKHikMdvDEnneEc8BEccxyh1ueG7VdzOuC0wraVqwbFpp1278WoOJnTO5hAYgb+SYcPFGuEyFTrpY0QUjjqWswew.0+0nMIFJYqisjyTugO40ZFMfDKpWkl75xb.L1UUSdobseEEtuAtNSX1Je7NRN3ENx1Ka7FcIpSf2rYSpoHErig252eCeio33icjbpLIPTZpBm0.eRpWVO0KMp6AmlkdVzoYSRUqMZVrOZwtjmbnt84cjGoaGhvKXGAbTmFvwnLoQmcPdCRZiHCVE1thrsDCMnNVAM9evSzfUks0hFrZ7fplm6GpI2IHzQvswFvI4FJ4F8596qzOkZ55qvIkJehSIn.j3XdJ23Qxc1pdeUI26oZmAUNnjwMHirRBRYQ3JEwuoCAryMnf1XsmuInrATmRDh5crke.EHAQUUAS6tlZ285XMVwbrR2TT412W43lK57nECt4vfiTuuOVFbpXVaWa5lNmRs4POggjitYgjdUA4NbGtaKtCyT0eceJr2+jSnYbaxUeVUHHlOKsmkL1mZSI9o6r9WeiwigyWS71IHM8KDUb0Qrx6aRkq45WhCgqtbqu9OqRp9ZwIFNDrQlxUOLHXbS8D045A6G4SOfDfFUi2oTOgTH0nRlrio1YsKPTynkL3cDdqXuCt1byj84z8fe072J+ykWOnM5mLC5OIUaL5sspMdwCEn0enf2DWma2MbmcXQpAfHsh0AjJM3Is7Uk6X+IQMLlc1uekr9L5FOoCwNko0+j+7+d00Xtbah2O1nfWyV+wJnqxakVSt9snpokVlaO38WgiL55Rx91CtuG9I2d.qrZny+Y.buINlvMwZzlX5w+Tyvu+nLjxqEzCn2NA+i9LNdGYa8jO5IFWs1hxqHf8ollx35uKvO4KSxW5TxmERhYGZIlKVhwvyWqXhL+PuHKLzRr3PKwRWgDxC.rZGAucnKOzQ8MCKMQK77NAd+n+OPPpNg.
```


## Settings and About

As next step we want to a create [Customsettings](/ui-components/floating-tiles/plugin/customsettings), to give the user the ability to change the Audio Settings and add an [Aboutpagepanel](/ui-components/floating-tiles/plugin/aboutpagepanel)-Floating Tile to show some About informations to the user. 

Create both FloatingTiles, name them "Settings" and "About" and set their `ContentType`s to "CustomSettings" and "AboutPagePanel". Both FloatingTiles give you the option to decide which of their entries are going to be shown and which not via their `Data`-Properties. For a little tutorial plugin like ours it makes sense to restrict a few of those. 

Here are my `Data`-Properties for the CustomSettings and AboutPagePanel: 

```json
{
  "Driver": true,
  "Device": true,
  "Output": true,
  "BufferSize": true,
  "SampleRate": false,
  "GlobalBPM": false,
  "StreamingMode": false,
  "GraphicRendering": false,
  "ScaleFactor": false,
  "SustainCC": false,
  "VoiceAmountMultiplier": false,
  "ClearMidiCC": true,
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

"About" AboutPagePanel.

```json
{
  "CopyrightNotice": "",
  "ShowLicensedEmail": true,
  "ShowVersion": true,
  "BuildDate": true,
  "WebsiteURL": "",
  "ShowProductName": false,
  "UseCustomImage": false
}


```


![phasewizard](images/custom/phasewizard.png)
* Final HISE Snippet:

```
HiseSnippet 3130.3oc6Z0zaabbFdorW4HZqD6zffzaKTSJjacXHWQ8UBB7JQYYKD8AinrbcKZSFt6PwAd4NL6NTRzIAvsmxwbqGaO0yE8T6oneAEEHW5w7KnH+CbemY1Ol8CJQ5FaDCTFfXsyLuy77947LytM8o13f.puVoYNXXerVoqo2ZnGqaitHhm1VanUZV8lcQA3GPdLx2Qa8g8QAAXGsRktzc4CozLWVSS6IC+I+qauNxE4YiCaR76PJwFuMoGgkzZeqOh35tIxAe.omxnqaskM0qA0kN.fykzqp0GY+HzQ3cQ7gMktVoouiCgQ8awPLbfVoKuN0YXqtzS7ji+PR.osKl+PMsVvDIadSpqCGw7V0Zzk35zLRsCzzJo2LwHbIoQ3Mz2g3PhaOwXbcQGFIRnZOJM04AuZpvq53CuRJv6xR3cC8V19j9rjd3X6p5a4wv9cPfKPEVxwpM06+J5MnvH7XU5gdDdSe3gXIleopUukwhUqdyOX1x7+68dOiGfNFuI0umQMCjmigoQCZu1z0omZzB6hsAMMfORvoEvLNF4KDnCHvcwdXeDzuwGZHhlpbDlIzLwSyOWz.MhG4b27CLfkThUi8wcv9XHVxfQMxO3zq5dsZTiOFXwhzO9xQ60m5AOL+bQC3bViXMKYvYVByKZILmjkvLbID14FCBXzdFMPttsgH9.CPaSFdrWHkQm34R7vFcF3YyHTOCpWDv4.zm5NucD5tEnBtCv2b1xe9rkmImOpR.lsFi4SZOfgmOe2Qqesn4ABP9RQPxEYs4ybHZhzs4ygyn3sBUHymmJj43qPlWfBYVfBwCCvLFw6n.iMcoH9ec.wEmN3MdHiJxJZ.gQV9wgTibxKxVFM30GvX7ZrmqEUh7.CVWkUouOsO1mMzXtikkwliGTqND4bGHmJi42y681qSGXJMfeQigaAmOdFx3.3oBTOOHHWt11x7B6PSswIDVW0ULZACy1bvcHdDtBWYTtxzPcTNzBMVJt00ZSGvNGepr+Q4PE8NGe5RjXa5QzlHOr6HkJdDgwAqEp0h1Bw08nTn3AxXG5f.bj9D4kRVBVWDyvkfAirOxKnOBhmXtCMnGi8iGZEiYKGKB2LkZRmOJzZd7wfvx3FtelzwP1TEaWh8ivN2zHrG9un.KjQGeLV5vPPfPB3p3fXnJfIgHZOD6DO.ZLrSXnEsinUWjv5AsTIYIxLSAvtufMc9ZFuaQcw8BJfaMXWN9Lm2AOxveTdHHjNafdgKNezBw9RHAHJ.SIqcWJCum272r7mWdlxeYtd5zontBiWcw9E0Kmxk+4H17dC50F6GkYFNNf4QZpM5ilZiJyKaYrrx.odaA4n60G6MJBOZgI..0mqEBJXnLAwmqGR7IZyQMBvvordzVJZBPqv+zRa7mAyhlgu+14lgWMbFZ4Rbv9B40AVgmlUzuarDcZ88rY0xA7yFaYMyA4uY7jEhFystO7rwV1bq6CsFGYmQeCLafGNuJqMIhaNAhKKiKDG79opsOFyxrgyx1n1X2P0mmLGIZ5iGMd5v1zSZBzyyr5V+IKs6u0FP4ANq+vrflx5NDdRWoMvGCGmRdF.tkH3QLZe33.w6S.oLrvCvHWV0ZXgg5qMvgPOj7XsSSz622ZXxCKacBwg0Mtgp+dqtXxQcSNBW0isZeTzA0thdsEpUcYMBC2KpsqoW2bkkqsvxqZthRGlg8XtzR0qVstFCeJSUjUqu5h0pUawnR.RM80jPdMOj6v.vFJrPkL0EarLWboisbl68MlKZTycKQua44fOEZuJTfk6bl.6zGgG1lx8ompVNHwN8WebF6ze+Oj0NYsuhchWOLqMJVgyYih6Y7rQJvUZd9OglGn4GvQIXCpUWZS1fDz2EMDpc.E71UTtG5sCxM.KG.DdBhAssvRxFtGQ9bMykkMHOwxc8Q86RrCRK8F3NnAtr052Gi742G.zMyePXuq6BzGfYaevbS4NlJKsp32JqTc4UqtLnYKtZHPOfdzQt3cnN3zq.+H3vQx83rg.Pk00dkwauBE25OWI725Wa0CA8oWRGdh6WfLueldKNg5xG.7R7.LUtE5jxs9rA.0ox6RIA3xk05mDHxiqxep0ICjlY.428Eu3A40tfc7RPmQOEzYbRlLCsOMalg18r5QbbbwMoABJ6p6a1C73ZkdS8cAjgbIOF6zD6aCHBcDVKXPmNvRCoSuiliLT6vra7dwZIP5E0CyvhQHUFUE+Uun8qUBdLTqc19h076ZwSoEdYQFnQMs.FteKPOUKzzinXSdiyDt6DdMSnF95gq0ABB+z.X62QY90NqXqpfRRrAZ1KhTRBZ+9uXBMP26+YsyTKi4JiwrH6cwZ82+MYbVlohSdsKhe0HhSL5NVYHh7.c9LokRCdX5vgGZUjBkjnr8nc1ZSnoNTsJ1X8vyl.ayHCQFOayyBtgvhW.VzQXarFuBqI7iGQnym58bv7jrporJucZqxaaEYAz0MrYmiMXxz0QFJLd554C4QCxzJyynEKc8fxi+IOT.4STKP9VwaODIfVZavSNLmM3CsRweblouwMtgrZaL6yYl9oO8oh1T4fNyzKrvB47XydgbiiglhVzQQKdxGk0wQyBZiGYcwnKeqlpMmhB700krRiwlfH7T+sRgLg2vmbrfoaBYT44oR0zdCX8GvRSYEhSv97hAoZtEpWeWLviMC6z65RaibWu4NoatEyGifP0ixymMjG89X3vJ9vHxHnMxEuIhey+Y5.TWDwqQizMKdkaq0iNvisCTGhz2kjkfeCWfZtfEciBToso1bx4dYo02dPAXWAcaSB3Ftei7lvpVYwaE8WKG8m0h92JlwMEONS9+7a4r4Sb2Kn5tON5RlJtPyUSefcwssIhWupd7suoFvpoMT8gzArm86xkkslU5fyHAUOgVBXO+faS0I.45ROI9s+v0fF7KOMvXOO2gEkYNx6jXb0tmjW6tsUGHaJ8VdKDVKJ8cbHFGaH2QLs95TWYKxWR6qoCnkXazBXhYrSqbmdckkW0b450qqgcHLT7KCMsgQGNe6J0WoVQTsFYQoqnKt2UUSvBp0U+fLUj9t7akLFmVeokMW87NsdlJRBH0DN1hL3Sdz7+QXAoFz9C84HXWJSVFZtvasfeeoaCM4EfctSODwMcVJz6gX+.YJpZcJhqyFx5QIs9.baXqO782e6LKPSepy.ageKcJ88CvxJoa0CPdTe77xMoBOQFe7l4ha9EVoyI95u9qeZ5D3oKJAd1w3JyTXJ7XE260OIjs7U02zG+YCvd1CSykotkJwfu5aOWFd.kf683B32TRPY9Olld0L5aRbAZA0RyPPEIExIjeee4e29WWGJxNvky3P8yNf+sVD1AGKpuee96v2Cv3PUM44x2hv3B2an2jvr6VLdmp.7po8bGugeYGypeGX2baVBXur9l+pm0Oiih+JSpdQeFG5QWZW7cZxAhxipvIg9Qh85Lql9.2E7Ig2Eb7AcKcozX+RiG1KvzsOT4hyVAw7EYD6NnWKHc1FGdya7WBToo3IvxmqxeligV.MFwCvtdOMryZ7mKE1YsnNUcOugTStpf3s3qDQXSJjH9KzuAobWbhxMhj6ZGTt2fnCTo.jnSLnzT7GWgpSL9CTPMgVbtakyqJNOqxwK4WgkxUfcGwKVsEFzFm8BrAkUX5TmvAt7szg8DqoJXRylpMmMv5Gljheb+oW8hq57ybZZooZl6K3CNpIgyi+NdGicoPKxRxg2KebqpfbGpGseWpGwVM3beLj6ezQ3TgMEpOqwX.00jVVwZeLbFifjLq+8WYsMwierCw1zOOLEkFS20aoKgqAO023GUap9JQaLbH3ir4qtrHXziFwpyECVfF2AnTGWh67jeHEoqJYSfiQj1u.UMCWRwbHIt9N5l0qj92w6A+uN+R9etZCwyZ+f4P+Agswk9+rMBKK755MotCkY4RBqB.kvdcDaqJ9kPkUg85GG9f0BK7s2Nc7ig0GO.4lX0+y27u7OWacRepKx+4bEwKOlgMuYB+biWhXVy8Lu7f2epdnS2fare4A2up9G+xCX4LiN8GAv8EwQFdQrF8P19zOwV9k7vKo7JhV.81SbIWynuC+Yi3ugIc8ZlKyut.xmXayqw+tf8oXYh+vk31ywRhElXIpGIwk0Wzb7DYwIdQVZhkX4IVhUNGI3GFXsALZOYHOzPy6HooTRd1GQzu1+E0gloZC
```


## Compile & Export

* please check compile requirements @Installation
*  Export Dialog 
  - Project Settings
  - User Settings / company
  - Settings Check
  - Export Format (VSTi/FX/Standalone/)
* Compile ...
* if everything worked out you can find your plugin @project>Binaries>Compiled  / * Plugin Data Folder
* Gratulation, now you know how to compile your own plugins with HISE! 

