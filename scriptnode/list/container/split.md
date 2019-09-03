---
keywords: split
summary:  Splits the signal sums the output of its children
author:   Christoph Hart
modified: 24.06.2019
icon:     /images/icon_split
---

The split node can be used to create parallel signal chains: it copies the signal for each child node and sums the signals together at the end.

A common use case for this node is a Dry / Wet mixer:

![drywet](/images/scriptnode/drywet.png) 

```snippet
ScriptNode583.3oc6UFraSCDDFd1T1JfhDBAbOO.nnRTPbiDHAphTRHpNkJNgVbFYaUauVqWSpKW4NmgK7Ff3JGPhW.NwS.uA7F.yZ2j5X2nlKUUUfOXkc2Yl862y+tYjbJBrq1uG8hOUkNC0vyD1ZoJcrP6BrawskgZgWHpZDG46ogQIAccEggneLv3rZ..Cj1GrzzrMFQEtqzWlnLAQw.ckAAXnFX03y+89dSM6AmcOJBKW4rwBkH.0nxTiZ4UIFnTFcBmawIHeksKwzpQMe4yKTeRZjHNdWQPzDu.bHUkqcEH6oUmUAsv2Qp7ztAm6PWm2OLFU55ozp06YMt9h8ttKpvxRhe+s2d8jDTn+PCTxHZa7xVofVudVCxoR+YKRpJrgyEWmYnbZhuP6ICmHTNntrJX0NdTJv1vHkav2EiQ8KD9IHj+dQAoTSdsumsATnTd2juWLttoV3aJAv7QTz8CeCUSbpIrgdgkJxK+9PwgUJ7.4LTMvKfNnVHx8hhpLKchSiQVdGkk+G+f44qssN.mk20Ly9H6u8Cmub2NFMsIeGSmqBEv5iL.UPty66bZHCvofLE6Yi7eR+z3a26msyO0YEHkZWuPmxb2py5ZloaE+uY9eCybwa3tDalYrBpXy7b2G0ONPlPts0RIvuaWjt2dmOuyuN5cknadjUJGi0UR9dai4LyHbxPxFZNHze5R+OwBdMyebugxI6yuZY7edzjzHzjs0bC4Et0h+fFsZ1r4CgmdXjBiiyzIcnFVgtWbkxYp6dpzKi5doaS+KYTtr9.
```