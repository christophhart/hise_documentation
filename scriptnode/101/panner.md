---
keywords: Chapter 2: Panner
summary:  A simple stereo panner that introduces the multi container
author:   Matt_SF
index:    02
modified: 18.11.2021
---
  

Let's go a bit further and create a L/R balance knob. This example is only here to demonstrate the L/R signal manipulation. Althoug it will be usable, a proper L/R balance control would need a bit more work than that :) How to split the L/R channels ? Let's start a new network and add a `container.multi` node and rename it "ChanneSplit" : 

![9ef061bd-35d8-4eb1-91fc-40a35dbf3a41-image.png](https://i.imgur.com/WFWB2DZ.png) 

> Reminder : to rename nodes : right click on the title bar

Now, add a gain node and duplicate it with Ctrl/Cmd + D : 

![a2ab24ce-2fc1-4f15-95e5-5a413b7caab8-image.png](https://i.imgur.com/GYzjr9y.png) 

See the cables which connect every nodes ? this is your signal flow. Follow it and you'll never be lost :D

![e83f0611-a612-43d1-b5c3-d2baead6c0a8-image.png](https://i.imgur.com/LOWVbvV.png) 

Now we'll add aparameter control, and set its range to -1...1 : 

![57cba45b-6aba-49f3-a073-e8376a80a4e5-image.png](https://i.imgur.com/9pUZxpo.png) 

Connect the Balance control to the 2 gain parameters : 

![f73dade8-397c-4c3b-a935-22b1ee80edb7-image.png](https://i.imgur.com/1CAJWn2.png) 

But in order for this to work, we have to modify the range of one of the gain parameters since we want the Balance control to handle both the L/R levels. 
Lets give the gain nodes a proper name and invert the rightChannel's gain values - node values AND connection values - from (-100...0) to (0...-100) : 

![9cff57a3-f1ee-43cb-9fb7-5292ede06724-image.png](https://i.imgur.com/7WOgNj9.png) 

And voila again. Now you know how to split the left and right channels.

```snippet
HiseSnippet 1611.3oc6X8zbaTCEWqc1Pi6eFJzNvwcxvA2YJYhCo.yzgIN+s3g5DOwgT3TQYWYaMVqzN6JmDWldiCbiy8FeD3BG3T6GAlgu.v2f9M.dRZsWs1tAGSZZOfOY8jz68Su+7SuUMhE9jjDQLxYgC5GQPNWysYetrylcvTNp1VHma3VGmHIwdFQazOBmjPBPNNEefRfyBygz+d4ZafYXtOISDBcnf5SdHMjJyj1n5WQYrcvAjCngVqd0p07E7MELQO.OEcWFEg86haS1EqVVAWjy7aGPkh3lRrjjfblaCQP+lcDmvMq+PZB8HFQMnBpInHi3cDr.EhURQa1gxBZL3bmfPNtMx7BEMdga4VmFPGJOya7t5I7x1gs+voPd3ULG7pXCuksf2DfjiEjly.oa51zOlFIylQgmq5ViCAmVXvsaCEyZQE9UG2MEvJ3xkBwcI6DCCFtixqbukuqWk6s7cteoRfqOQ5cLN1KMLtyodegmNYXo1D41sZQ7kkWb3jKp1DkynbhWqdbeIUv8D7tbwQoqQY3XAqruHLRvAHbWP8rdj6T56KsvP8rTBQttTFSOpmjTNSb5+Frm6W5of8FbV..s4.sVdQKat3cT5K0xahYrifTnxSBVfFsf8tBIYOdYMzJ8zRdiNUqVSbtTcwHwSbZU9c7Yswx7dgGQhscLpEBA87YRtu5LI6Dcei6wZgBdMNUtWDg+pR+Qo9TUVWJpfkJ04b2HMmqIiFPhQTH055tVtRjF1oUvU+qm7COG8001BKwCTFnWvVQjXIUcLb1hbLvGXRnWvcKRRWoHRu1zfIThOkl9zLhicq1OaPspg4XkddHMHfQZHRnJeuM4DZ7pLn9VDzigk4K5ULcoSnzgcklpZhC5tuMS3nLAyMcLAmMQ0zB2a51fJ86LY7VXB3EhVutwaJu50cM7HYfcN2c9lyjD8bCkokPsTZFFXeCS5PtmIwj57itY0uQwjHbL4.QCFte4DbXDirO.265cDS32sI8IjwK5iLHXC0JJ62Ay4DVxrvML+TeKSky7VFz9hdRJuccLv9BkSt61KrIb2KPQlhNPlSAEEgY7xpwpzklDdfdveC+RmrhZrS5jUFLYF6BZWh7DQbWczH8+PrP45ulah1I+3VmVAsNiINQwGPSSdgXfVVCAqeTGAm5qDYVw.jtdnnmh7v.WmB6JB.Gv76f8AGU+FXYGUYghdDx6HwK4OL+yNrq10f1OLGTvJgZVIn4ibIEf6tANF5KAtJUQrUvonEQmIeSMBpxJXNh0RNTMqOlgNzvZBXUYQiCQCXW0Rutq4P0LhAcM8JOBg8XR54.x4A3PKWHmkYjVxTWZdKeUvxwjkZqbamCaVHmMs7XPN4vQHm2oNken0UIvuu8E0wmNhLH2RRhTUWox94m8reaslcImXvZpzWz9WtcU04YdMuMZLsrdOoHDJdz7gHKbL+33.gFCGU+opSEN9t2eq+XMSNVyPgP1Ap0FELqV8ew9WD9gq4tOA5JxnkwzExJC3Ftwz1cdKIEXBtdvc7+o.uFRArCK4iQN1XSooEFPXhFGou74iizWt1HH0f9QQpdkiALcWjbh9lQMaU1PHkQkEVKXTdqg.VMUZ7+h2ot8oPS.IIZf.o7nIBrQJmlNj8eMseTjsgPzMDqu3cl5N2tMtaal7ptOBeLQ+sg5KQusdbKQbn2CHvkSp9QqbFOUvuOsOUPzT+TA64KAHbPLlmDIRHUr07Hysh8baQj834WtQTtUoNd6.GOq0ckpCDthsvFXdNkAiyoo5TqOb4OWaaNF5UqIANMA6k3CGV7H0DM5wRHOhFH6TwdiYhWwV7WhiCf3hethnhScG0miWMY925d0jKuOm6h4gcVX.FaRUe.w17iILnZTiw2CJ+ZggV7FHMe4TcAWLnW3r.89DnQ91sI4xel3AZcoD62MSxsptOgQvIVkXeT0GB8Yhiqq6NXl7EUN2Ox0DiWenqAtdJN.u2HwsKjO8t3T8o2WHXb1+b6KgpOfB7s6n3G3BTwq3oCkduYhkWFeZ9kgMBw9whG6adQCUQ+UzRfyMW+n9K3VWM1qxfmRz0c4kVFEBWW7XeeU95GC29L48rxLrmOYF1ypyvdt2LrmOcF1ymMC64yOy8ntoN8qiT47ffFaqaZzwwzrhN8G8O.e9J+E
```