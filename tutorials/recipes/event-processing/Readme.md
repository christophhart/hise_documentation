---
keywords: Event Processing
summary:  Please enter a brief description.
weight:   50
index:    01
---

Recipes that intercept incoming MIDI data, and do stuff with it. 


## Press a Button to play a note

![single-button](/images/custom/single_button.png)

```
HiseSnippet 1016.3oc4W0saaaCElx1bXxcIXcnXXWJTrKT.5LrWSRKvtnNwwtvX0IFQoc6lgBFIZahPQpQQkVih9hr2f8VzGodUuc6PJoX4NmLOCjhgM4q3gme93gemygdrRFRSSkJji6YySnHmu.GLWnm0aFgIPCOB4rMdDIUSUd4hNbdBIMkFgbbp+Ti.G2FH626exgDNQDRWHBgdgjEReFKloWHcb2ejw4CHQzyXwUzd2tCCkhdRtLCvScbaTBI7BxT5wDiZ0vHmOqeDSKUAZhllhbZbnLZdvL4qD45+BVJ6bN0rnCJ.bTt3ARdjAwFondyX7nwkm6TDxAOdQVnddV3d3QrH1UxWjM9R6FdKrnZ9vo1MAuNUgW60GdNUfWib3cWbPnhknWriAa2AOT.WTSHvUPUXkqKp1u4f6IAMD5VwjKnCTvhqrvuydsef2ds24G1po4GSvYBp2jLQnlIEdRwgYZsTzw3Bkj6GJiSjBvYOv6RBOityVMeyVM8fO1DO+RQtFAVFUqDNY9wRM0eeHP6uqIPtTdJsPo9hoP.aQ3biRomLYhuQk2ZwSItmR08Jiq+8KPz82oUpQtEW8.GbNPa7+X.abVkSiIHmH72o4aZ517sM893sLgeE6U3LNUsxsMDZ0MYnuHK9bppLmUpHbytL0Ae8TmpL6v77REEkhgBl9jDp35HTnhjogZUfJPUskXscAwJO0gX.+wEWjGQVHWs3F87gGQzjRGA9DhSBUoYlifyQzKgh+bFqK9HZ5EZYhU2haP3XtFg80KBoe24UWvRGIiA+PTfXmZn+ZgBTtJix3D8x0vlFWEa.2NKUrXJHDoL87pM1tUJrWW3dW7XlNb1pwasUfW3931FuEsI2B2exDZndAXafG7y298DqBksygxcvAP6CamFKP9Z6ZuehbI06oTAUYRpcttwWu6C+xuutiuRV6wWmDpgvelhHRSjoK43.ZL6LnHHspvmmBMko+5ola4px6IIpUt06ex.3PtRaBH5LkktbPrLSnWhdTesuS9GLFsw+pGi9oq4P80Ct+MS5cKwX.KNgS6KtjxgdqVL9UPyzIjLttT5x75QRgLYlTvBqdoeJUqXSmRUUw9JOPGn0v.zERtW2SobJoJA9a69Lf3QTPdhtg4hNqet3ltu9FbNb8LEid+2nod8+e1T+TYllIlNh.DUXnO93r3.nWZHEPhP.OUDjAS4MlZW21rNuYpHxt3OfuhM6XV6TrYmxM+jDiXRnR9xv7mVY3xetUBbtE1+HiK7Opf0dW8hJLtcq1nXni3KCCMo6uCxOq1lueCr4gafM6tA1r2FXy9afMOZCr4w2nMlgQGjokw4khffw8sur0wouf.LYKqG8mffuH.L
```



## Keyswitches / Coloring




## Choke Groups 
![choke groups](/images/custom/choke-groups.png)

A script to let a note ring, and choke it off with another note, like with a open and closed HiHat.

This script makes use of the Artifical Event Type. Learn more about this in [HISE Event](/glossary/hise-event).

```
HiseSnippet 2020.3oc6Y0uabbaDeOIs0QaibR.RA5eR3TfbGfjhVqOr.DLx8shPsrE7oX2hf.Cpc4oiP6QdcWtx5RfQ6aPek5CP+i7nj2f1eC28tcOoyxmJpcKZ5gYE4RNyveb3vgCWcRrNPjjnicpr5oiGIbp7wt8FqLCZMfKUNG01ox8cOlmXDwrrlZNdDOIQD5ToxxGRMTY0Ubr+94utIOhqBDEM437BsLP7D4Poon0Q0+8xnnt7Pwoxgk3dm5GEnUszQ5Tfmkc2xYDO3B94hmxI1Vx0oxupSnzni6Y3FQhSkUZpCG2af90pL9egLQdVjfdw2oGTTVyc0QgDhoVcZMPFEdxj4chiSE2SJrBKmYE9b2ikgxosWXM9TaGrBIJaOprzsAO+xvaqEFdNkP2JYnCfPGlFwMyhLZ4HuCod1UpiTFgJQZFWd45+nv8ybOQZBFLe7tzbvKVndei27E+0b6zuuHvT.1Ub69G9vtRe+Ln7qc6IUB6NRKP9M12YujeofcnPIhIi5srm7m92+dxmEXvneZLWkLRmLih6IFJOUqHCRQieahnar3O8bZQtb6sz73410O+0cwbbtxziaRisdKMFpSUlY7NVdgWRlergslWrgUdeEaX4ECdyARUt4NrOysWPrbjonmrH2sFnuPvx5aFzj2zR+v8baoo8ZlMSDluQHOefo5taU6f07J09KkglAnYa6q4AGhDC6RdLyviOWXXOlMgY7VK8vQvGPYp9frtePsCJKRr77ywoIuUYx5+AWenBEA7wuUor8Zkw6q9JFqgh0HNF7KSX7nDMiyrZhqLqyDWJTLYelzvdM74YmIXizinnPhPF82XlVUZjEWZdhLglke22efU+C4vpljFKHcLfmvDJc54CXIX8EGWwLX.uTKCwXGoCr9qrvzXo5blYffozFwyTr.z6Y3.Nu7AXyXQhH9RQ081o1A8SUAV4zpmZYuZMuezigex9UOFqwXbHa.04SSGdlHtZM1ieLqZt8i56E7nTQ0Za3WqlUxebMaA8ifUTlM0xElb1WJI1AEbWTCCdYgdLaqZEcVR+zOXnZD8Z93DVZhvNw6qiYat4lLoB.POhVDFqSYgZ0WZXJAL+DWRUn3pYzDjqJspYNJjjM2dUaFdt1fmCfdBU3TaNS2uO7CFNjiFIrPcbtjbGrZmICugNrgd2zth0ueywcxPwDz.O6xL+lou8lBzHhRD+WsMhB5yzolo1o0dKVAdX3KzQoCEjDSFr0K4EsNaCeJHw61n3UZ7aEIvtLrYvN3IEFt7sEAT+Uy0Zl1HaJYYt8cB1nOyciP4g+zAHHAHkfBcxiGi.BAbZ4fr61HDWP+YpWDO1H6KCj.wiYjqz2bTuNk0X.m11hNsxkyNOe5YWfQjnyjQH8FVrfmfHMSEexDhBwzX5.UsjMs7H0HjbG.3OpMEzgfXDEpppz7kzPGl4sTf3bG8iZW6Fl4QoICJaOm3pWapk+MdWOpT+9KbXoEaw3khbebMSdtRGKlZ12f17NLaDJKwj8w5QXa7.4FC3FFB3OI39EBwHFE4ED1VcC6b1nXmqHzYpX9SV5PmXcTDMcv7c0Y6kxXZtcjKVUk0RrNNMAS8I7gCumMi.uEKiffrC.KwnVcjRZdFL.YbL4HiIs36Lc4pLSESpxsZmLygshllShq4GJSIgkyNpYrolb+7TS5EICEwNRj9w8bsgLbrlioov8SWU245B+o4BiS5OS2TekU7OxMyY5Zx+Wd5BJ+pt4mQdME3bRcmu8n1bCmRxJeJgo4HA19PKPUZKtDYNmkx0ptsEIWXziv8GmlHBZ1jeEhrA9I7yDQ4n1V224phAb85yb+FAbG31U7JKmfbrORcBkRfgdefM0rBt2t9qojxJZ3U0Mhq.CeRVRegrSyLRN2Db2xRRA39awyBtgxvvHwIZboL5xZS64OVOwHF0S9ChxYvOjWno5+05Io86KQKttrgINY.8igAjRoydeixn7dKxZ+ayJ5maFlj6atUPZDXfW5uWw0q0FOzq0Wf+zldnJcvSW5gd4P5gpzfdnJMIA1vmDxGB4SB4Cg7gP9jP9PHeRHeHjOIjODBBrEjYKu1fPQms75BB0NDDJZ.BEMAWjxgdIUCMCkR5EpjzJTHoSnRvEAcfZB3.2.xDpAfILC3RHF.FbsMXbau1fPQms85BB0NDDJZ.BEMAW6.F2wqMHTzYGutfPsCAghFfPQSv0tfwc8ZCBEc10qKHT6PPnnAHTzDbsGXbOu1fPQm875BB0NDDJZ.BEMAWOBL9Hu1fPQmG40EDpcHHTz.DJZBt1GLtuWaPnny9dcA8E66Xcxbq7mytM4B4+Tr2uvAhELOGnOYhCTN++eOne43A8tBh+vRdO0Cd+EDepy2GtuA3xK1Gx5c7YIVcBF6IGNJRzQcoHBmil+g+ZK5ySiLSasLHOVqziFnUxfxF0mKlrssDzm67ogwfqTWzxmW+4Bb+gxempeW8mHU3JEvLI9WzTb2+BMyc4525lAW6Yfr+23S2t7uL+zsOGWfFWw3XNbToXJ3xO8zowABfDkB2WkhyrDElI68sn2y9lopP6K+C7KuSe58J4c5OoyOHiwPdPr9UAY4QS9xejsELuU1+ILq5dL8NyeRxyjsA4FJeUP.Yr2.Vm4KwCuyRr8cVhctyRr6cVh8tyR7n6rD6eKRPei4FoF8vrsdngS5XuzRkJcTzIOVubm+IMijFhC

```


## Microtuner
![microtuner](/images/custom/microtuner.png)
A Tuning Sliderpack that can be filled with predefined scales. 

```
HiseSnippet 1886.3oc4XstaabbEdVIstRahRSBLZyuJFPkBPBPtgKE0MDDDRQJJnFIYBQEmX3JjLZ4Pwwd4LL6NTQrAAvOZ4QnOB8W824Mn8blkK4tRLxzxoEEMxvqlamy46bcNiZGp74QQpPh0ZmOdHmX8t1cFK08azmIjjiZRrVwlEQ1e7PVTDuKwxZ4CwcrVaEh4me9y2mEvj97YKQHOUI74GKFHzyVscsuPDDzh0ketXPpSWs1Q9JYCUfZDfhksKSFx7eI6J9oL7XKYSrdzAcEZUXGMSyi.Dsup63N8UeuL97OUDItLfiS7Hc.FEubKUPWDw3pjF8EAcamnsQDhkc6Y59xw59isOQzULc8Y1f22rAcFEosGVKcevyKM7JOW3UddvyJE7VIFdefcG+PwP8rcPr8N1GI07vdLvEjFVwmkrzFOxtgBNgT6Nf8RdqPXxTJxWsb4hT3SgOccm0c.GQjldMKj1kqGI4OkELhGQ+LZBGXc61IPzkG1F7Q4y0L0oxUjVoL9+XV8IeBsCOf6qo59b5YJkldpRyo8TglUFH7CU.0B4UTMCrOokdHb7XpgSmQ5MTCtTsu5l74NK0Yxg5.H6sMBOKePohpvyy0.NVtFafeaZ9XFd.9ok4iY9glOlg0MeLC2O2E.mSiK2HtNeNglO.U8oRx8EJgLet+pLWgaaHVb8OxmEvecFfLGBs9aNOSf4TXpTrMf+ciXAnB8hQQZ72CGq6ytRExYRbZ2QcURitlg8YU1Y7bdZaSdOgjeGkzPTD8NXyfKjzmWt3b+2EEo.WM.2bHpmm6NE2zcuhda4tcwRdaBSKUwsbwR64taQXP4hwqY1m5sKrEsjGtQLuPceBq1LgU6.GcGfbCiLRvL.4vVv9UJiyvOzY7Iksil8GC2q5t2VaUrzt65VY68Jt61ta5UsXocb2qBrpm6dai+xCXq4ba6tGLtzt63VspWwc10c6JUw8c2wayKPoYbMq6bgwNOItJN6xXGoWxfLepRZVJILgdD5ynGI6xugxzzHiCUfLRHCP+TuQRyB.kYb4XLWnJHuuZvPkDh9JB9LHQuv5N+v5NnRltFAFfXFkO1o9byYAq9EXbwOZvbRT7UbciDld6v3BHilH5FrffKw5LyGYElXHV2IkJf4XOQlufyOXfXfBHjhoPYRcuJArEnknde55oNqvXo9L5PVXDGpSl+DnTKbaDRCx7SGM3RdX9BkBKP+yTuJSHN4T.5aAV03Bi4yXg.FDW6zLutNuQTPdiyO5PusJzqmQGV6V6MQ0CPDLmswaVCuOByKMvOwUlbP3Jlr2gY+KeGV5qX8i8noNnRdjTnexPt7W5hWxjv.3NtkmfJP7ZyMbe3ja3lcGCQ.Wl8d1oungXvNw5X6+Rmmb5zrXJlFSM4wTLQlZxjiKVPiGZJGfYyTS5LcZ97EjtLMiX8E1aUw07ywiOlcvKBdVvgsOY7wh5pmETsQSbmqGe73SqWGGh6+U39ibg48Zg6eVaC80i0Sixsbrx89STtjTyIpV56wRTsYMWsXb42amIA41rY0Zju7nlnFBMFLw7Ctjg7Ps.81VM4WCMrE2kwZfwN5kZ0PnuqoooDKm2DOzMPDj0iAIONYPet3p9o5FTTaP5tHe1OMfcSpo0hz7gcD+sL1huWzU2e5Bu55ZQFPTefZjbFqeUyZjT39QKtw2f57IndEKBw.Jaq2EALVGkX8mra3zXCmlNM2v4.mVNs1v4PmC2votS8Mb1mrnR91NLiX9myQzqjVzl6.cvaubRc0ii4hgLhdsXQu9DQeL6RdfQtqZaF6QRYraVyHzOFDZD6ZnlW6PNTFC6gjCEEXl7dH7ieiF61bZqbjr9Cx2VKwIaa8GIj2H.UIEf9ofY.5t.32Ar.rbIB215Uohtrs9Hxc0hz.Y0WCP1LEP9GeKBjDT8xZw.XU6yMMzjAa8fjprgqEqcGXb2N5g2Un5NJfoy9XC7EVS1.pdmoqdrycYjPONchwa8KPlac5EDtefcag1u+7w6RyAuPQn+Si2Iumac6C50CRvR+X1Ve8utOd60Ak2KFJuicGns.ySqM.4OXlS+JHFgdHWxCQip287N6+9h9N6gK76rehuFD+4gLYzPUTFF2gOPbNjxDkdwuLBd8H+6NC8xoWugB6UZNa8yeN1KzbooCSOJzDtbqx2X3wxKrO4M389q7+Lu2+sIa6su3vxKFbeM+IIVKAicDCFFvOPdMO.ZnvfwODZFnGaTfNY0rw0mnjpg8URgeZm9Ybcn3pq3gow9bUn5ZM11wzUdbsyfqQYoCf+3ZGCAdrPvNwef1BuE2Vbe9qOxNFtTLYj9+GE0W92lE0OSMRC26eBCBTwdyfWB1Apk5yAjHk7.7YSVKg0CimWFmGWLU10L4eA+LYSObt0jM8R17+JxX.yOT8M9wuq.ikW0rBn2Ryew00rOAmS8RdFgsM7NIx.nh3236il6RdDx7ooxCflMe.zT8APyVO.Z19APyNO.Z18doAuLp9HsZPbpHrP6CLOmyx5.I1BpIpm7uAPp+WgK
```

## Use the sustain pedal to switch between sound generators

This snippet shows a way to use the sustain pedal to switch between two sound generators. It supports sustain pedals with continous values.

It uses two [MidiMuter](/hise-modules/midi-processors/list/midimuter) modules and activates / deactivates them in the controller callback of the main container.

```
HiseSnippet 459.3ocwT9saSCCEF+31XzpDf.Id.5KvPIv3O2wncsnJVmhVll3tIis2hEN1UwNCxaMuAvwIcKoZUbQj.7cmuy4y4m843jVZ4RmyVBjIWTuQBjGSypM9744LkAVcBPdJcMy4kkSaklUug4bRAPHi+TPfLIBZV+7CyXZlgK6j.3RqhKOUUn7cpoG+YkVujIjWnJ5U8QGuhaMysZaExyXZLrgw+F6F4YrPYin.4QKDJusLyy7RGVyLqnNK29cSa8WpbpupkgfDHC2nVYXdtRKRu6r5.fDk1cxG2dxeAcsRntWu6F3YMIl14n+c.YztHEsCRI8QJtGRKsZQXCBk7P7fdzE0RGBgUToY9cIKzB1lPY2s6rx3kFmxW2uE8eE2mSSUdd994czd3EaT+s4cay+IzEWesj66fMht7K+C5zmaq7JyMqY9R0O.B8rphLb9mKQRLFoF+PTxHHXsINNDGtYxjFQSvuv01jIgXx1jI2kDJX7R6U3aKeoUGl9OnQAYxz7xZB9DGiml.2xzUn.kF+xXn.m5uhyCWEGhrueOuZ.dd8.7bz.77lA34sCvy6Ffm2+G8D9gyGq71h1mInP5hSXdFNGtvvvorlIR32vIOnGT
```

## Play chords from single notes

This snippet will play a (delayed) diminuished chord for each key you press and should demonstrate the proper way of handling artificial note creation using the new [`Synth.setFixNoteOnAfterNoteOff()`](/scripting/scripting-api/synth#setfixnoteonafternoteoff) call.

```
HiseSnippet 1578.3oc6XstaaTDEd2jrUXWtUnBwOme.pNooN1oWnRETy8hEIsQwooHgPUi2cr2grdlkYlMIFDub7DviReCfuYF630stoAKJREg+Qh24bNy7c9N2l06qjwLsVpBBqb3fbVP36G0dfvjtYJkKBZsUP3GEsdgQ1iIXJpgkDrwfbpViuDFN+irJEVYg.2mW7vMnYTQLa7RAAGI4wrc484lwqt+ZeGOKaGZB6Pd+RZem0ZEKEaJyjE.PyG0HHmFeLsG6wTqZyEEDdksS3FopsAXQGDtvFxjAsSkmJ75eDWy6jwrOzLnM1H+x6HyRrH1tZvlo7rj8G435ffvn8GSCy6ogqGsGOge95ioiO1IfL1hx7Q3bSBu4m.dMKCuFkf2TfTXIHsfGRWKpcrhmaFKwhmqF0RXXptTP6kghW2fveOZSITPXp2mdLaGEd3bCpcuFMVlf+r3CpVsagH1vkBhT7Xog8DQsEq9qUqT82pRdYQc6NUY1CRIyxXpoJ1FqUWjg0DE86vTKSNglUvNWQP.SxpQudVsbPO162kTTJZI3lmjyDutTgfgjE91SasE0PsghgqA8xYJC2BgvsXmf7ZefoRzVL8wFYNxreknFxWjIEYTyjIQ1JmgB.GLQjyFdDZtYP4Jq+wxrtrP7ZQ6yMwoSGiyMELBl5sAFGVO9AQa2sKK1LFfKDsy2+1o3q7w+g9i+pQs4Blqyn6v+L2yjmQOgQdju0nT07B5M9GW1di4W5diOI1fi+PEUnyk5I131r97CkBKKLdwmpQ4O6mOvFMKu9lRpZphdwC2AN4TsoM0TnboEq2WVHLSjFL+E0it4L1idg2g6Q+oCWcLhZNsd0ys8UhVYokHGlx0Ds2hSQx.IOiNfPIIHSQTv0orDRbpTk.olTH.IFZCUXHILnY0JTQBQCORSFHKH3KDiDxnYdCLoLh1TDeLQft4jbkD9aerL0PnJtloIoLEqd0kVoZU2diNxJ+lS9Fxpq13tMdPYITzH+DlczfFx+geDBWYExtLyMzjBMCHruMdjw0lkImlxiSIvC6P07XZVl005xOikbKM+WfxJENFMhPbQORyUuOgilM8XJ+XAc0tRUMNNmFOfvIeM413e27lKBudLJpmWnSqssnGxeqGqXHRayH1E.n1hK5gmikErSIqueKhEGdtlInfMbbTlrGOlTqy.35coEYFB25QxtcAwc5h1MoMy.UwFABtKMy5qf6AqeCrUfcQ88KQ2550qW00HotlY1geleX65cwL4QCWMJL960ORNSB3RhAErGRlv0ip2iYaLJDrrZvtgJHlTA6N7X2.1R5bxj5bDCKit5NMpVAN3yX2PAWPAjfxcDPrdC6DLNjzZKqWiDuAtzJtfz3VHb4LywIHErHKgzCQEjF.lUVzKknjx9DDCI8ohACScFxLiPEO4rIw011CrURsEIeoMi3b36SCp5NR6V5nZbMGDi7PfcFseNBmmxrADdOgT4CHJa0f8TgaN5f7hcm0nPPYRXTJo0bady4r.7bJQyxo1KHS1q0Vsbo5NDwnHY2sItZMGtXCqdgc3eHw1Qixbqn91Ucm.T+V1Ts9dzUshMumJbm13Lcj2ixcapzQ1piZf5Vl3SunIICyZhWFIC2zVlPVhbab+pk8Ey1RgK35cW1fwExfNe+aQ6DDCHo14kk7Veb224wIqCiIbVfzJEdaixrAfWchEftNZX2Rj10Qsqh4rg1QVXbpavnSrC8yI1VZHx2ABxXdgNceCUfK56HfSfazjeR1o9Ev+98R3MciAi3GDV5UJr7pj8+ee42Atu7DS4qLBis411JaKNAMLwJVL9IvqbSIFs5jy32SJj4oRAOt7ckNfYT7dX3VYrOUGZciAuK73Ut9ZGvxXzx266KVaWLuip.OwlQtn4e6a7L030mG4gKwlCSd288bl++1umyAneIlnsGEIgmg9D35AswqWDyFdYBauiv4rU49maXe1+9EhD2C+I9LTXS6ygCE1bjv+UNi9zXk74w9th17z2ysB7ag6GNpRzd1mIMCbcJKGKsWL84wwStUuhgqNqFd6Y0v6LqFd2Y0v6MqF9Uypg2+Man8V61e9w99Ryff81ea2XlvvscWT2UQD7WfdP2Oq
```

