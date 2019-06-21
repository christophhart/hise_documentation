---
keywords: Script Processor
summary:  MIDI Processor that allows scripting.
icon:     /images/icon_script
---

The ScriptProcessor is the basic module for injecting scripts in **HISE**. You can add it to the MIDIProcessor Chain of every sound generator and container, and in this way separate scripts according to their dedicated place and use. They are processed top-down in the tree order of the **HISE** preset (parents first).

You can use the ScriptProcessors directly in the Main-Workspace or connect its interface to the Code Editor in the Scripting Workspace for more space and interoperability with the Interface Designer. 

A handy shortcut: When you click on the ScriptProcessors little **open-in** Button it will open in the Scripting Workspace.

There are also a few other modules that use scripting in **HISE**. The Script Modulators and Script FX. 

### Callbacks

![callback-bar](images/scripting/callback-bar.png)

Beneath the top-bar of the ScriptProcessor you can find the **Callback-Tabs**. Each one of them opens a dedicated coding window, prepopulated with a script-function to access these callbacks. 

A [Callback](https://en.wikipedia.org/wiki/Callback_(computer_programming) gives you access to scripting that is triggered by certain events. With this you can react to incoming MIDI Messages or events that are triggered by the user on the User Interface.


## The `onInit`-callback

The `OnInit`-callback is the 'main' callback that is getting executed (initialized) every time the script is compiled **[F5]** or freshly loaded. It is therefore the right place to define variables and script references, especially if you want to use them in other callbacks.

The `OnInit`-Tab is therefore not really a callback, but more like the main script-document to that the other Tabs are (+ scripts can be) attached.  

> There is a compile time-out that will abort the script execution to prevent endless loops. You can adjust this value using the [Compile Timeout](/working-with-hise/settings/development#compile-timeout) setting.

## The `onNoteOn`-callback


If you press any Key on your MIDI-device or receive a MIDI-Message from a DAW, this callback will get executed. You can catch informations of the incoming MIDI messages via the Scripting APIs [Message](/scripting/scripting-api/message) object:

```javascript
function onNoteOn()
{
  Console.print("NoteNumber: " + Message.getNoteNumber());
  Console.print("Velocity: " + Message.getVelocity());
}
```

For a few use-cases of the `onNoteOn()`-callback please have a look at the MIDI-Handling Recipes.

## The `onNoteOff`-callback

This callback will react to MIDI-noteOff messages. Most of the time when you write a `onNoteOn` script, you also have to care about the `onNoteOff` behaviour. If you don't it's pretty easy to get stuck notes.

> Do not rely on the assumption that every noteOff message is preceded by a note on message (for example if you start the playback of your host between a note on and a note off)

## The `onController`-callback

If MIDI controller messages come in (eg. modulation wheel, pitch wheel, aftertouch), this callback will get executed.
You can catch the Controllers with...:

```javascript
function onController()
{
  Console.print(Message.getControllerNumber());
  Console.print(Message.getControllerValue());
}
```

## The `onTimer`-callback

Every sound generator has its own (pretty accurate) timer that runs on the audio thread.

By default, the timer is not running, but there are some API functions (`Synth.startTimer()` and `Synth.stopTimer()`) that provide control over the timer. 

If you start a timer, this callback will be called periodically (depending on the timer frequency).

> The timer frequency is limited to 40ms (this should be enough for almost any case and prevent CPU freezing)


## The `onControl`-callback

The `onControl`-callback is a dedicated callback for handling the interactions of all UIComponents. Whenever you use a UIComponent with a defined script reference, this callback will be executed. The best way to use it, is to catch the component with a `switch` function: 

```javascript
function onControl(number, value)
{
    switch(number) // number selects the component and switches between them in "case" they are used.
    {
        case XKnob:
        {
            Panel1.set("x", value * 100);
        }
        case YKnob:
        {
            var yplace = (value < 0.5) ? 0 : 70; // ternary operator [(if true) ?(do) this :(or) that] to switch between values
            Panel1.set("y", yplace);
            break;
        }
        case Button1:
        {
            
        }
    };
}
```

If you don't want to separate the UI-logic from other parts of your scripting (e.g in support of a more modular approach) consider using [Custom Callbacks](scripting.html#Create-Custom-Callback-for-Selection).


## Audio thread and Deferred callbacks

While the `OnInit`-callback gets executes every time the script gets initialized, and the `OnControl`-callback if an UIComponents has registered an interaction, the other callbacks ( `onNoteOn`, `onNoteOff`, `onController`, `onTimer` ) live in the audio-thread. 

This distinction is important to know, because the audiothread is critical in performing the audio-related tasks of your instrument. That also means: When you do too heavy calculating here, you can crash the audio output or limit the performance of your plugin.

The **audio thread** is a high priority thread that ensures stable real time performance. In a standard plugin setting the host will call a function in the plugin to fill its supplied audio buffer. The size of this buffer determines the time that the plugin has to make its audio-calculations. Whenever the plugins calculations exceed the required buffer-time, a drop out will occur (because the buffer could not be filled in time).

On the other hand, you can be sure that the timing will always be sample accurate and with no delay regardless if the host is playing normally or rendering.

There are some scenarios where you don't need this accuracy. Complex interfaces that react on MIDI input for example don't need this perfect accuracy so the callbacks can safely deferred to the message thread. 

The **message thread** is the thread supplied by the operating system which is used to render the graphical interface and react to user input from mouse or keyboard.

A heavy calculation on this thread does not result in audio drop outs (because it will be yielded to let the higher priority thread do its job). Instead you'll end up with a laggy interface, which is not the nicest thing but definetely the better choice compared to an audio drop out.

For these cases, there is the API call `Synth.deferCallbacks(true);`. But be aware that you can't defer only selected callbacks of a script (there's a "all or none"-policy for deferring).
reflect this.

- if a callback is deferred (= not running on the audio thread), the callback name will have a `(D)` suffix to indicate the threading state.

Be aware that if no interface of your plugin is opened, deferred callbacks will not get executed, because for this case the UI rendering is deliberately bypassed to save up resources. 




## `include` External Files

As your scripts grow larger you can quickly loose oversight over complex scripts. The ScriptProcessor has a inbuilt tool to handle this kind of problem.

If you select a codeblock in the ScriptEditor and **right-click**, you can find an option to **Move selection to external file**.

This command creates a new `.js` file out of your selection and saves it into the [Scripts Folder](/working-with-hise/project-management/projects-folders/scripts), deletes the selected code and includes the newly created external script with the `include("");` command. 

After you have included the external `.js` file you can access it with the Callback-dropdown-selector in the ScriptEditors topbar.

This separation of code blocks is not only great for code clarity but also if you want to reuse certain scripts in your next projects. You just have to drop them in the **Scripts Folder** and `include("");` them in your current project.   


