---
keywords: Event Processing
summary:  Please enter a brief description.
weight:   50
index:    01
---


Scripts for intercepting incoming MIDI and CC Messages, and do some stuff with them. 

## Keyswitches / Coloring




## Choke Groups 

A script to let a note ring, and choke it off with another, like in a open and closed HiHat Setting. 
This script makes use of the Artifical Event Type. Learn more about this [here](../guide/misc.html#Artificial-Events)

``` js 
// Use const var for constants for improved performance.
const var closeHiHatKey = 66;
const var openHiHatKey = 70;

//  An Array is also a constant, even if it will be populated later on
const var evtList = [];

// make sure it has enough storage to avoid allocation during the noteOn callback
evtList.reserve(64);

function onNoteOn()
{
    if(Message.getNoteNumber() == closeHiHatKey)
    {
        // Always use the for ... in loop if you don't need the index
        for(eventId in evtList)
        {
            // Send the note off command for the given event id
            Synth.noteOffByEventId(eventId);
        }
        
        // Clear all notes
        evtList.clear();
    }
    else if (Message.getNoteNumber() == openHiHatKey)
    {
        // This is necessary because you will kill the note artificially and HISE
        // can only kill artifical notes for stability reasons
        Message.makeArtificial();
        
        // Add this ID to the list (it'll add the artificial event ID)
        evtList.push(Message.getEventId());
    }
}
function onNoteOff()
{
    if(Message.getNoteNumber() == openHiHatKey)
    {
        // We need to ignore the note-off message
        // for the open hi-hat so it will keep ringing...
        Message.ignoreEvent(true);
    }
}

```
```
HiseSnippet 2020.3oc6Y0uabbaDeOIs0QaibR.RA5eR3TfbGfjhVqOr.DLx8shPsrE7oX2hf.Cpc4oiP6QdcWtx5RfQ6aPek5CP+i7nj2f1eC28tcOoyxmJpcKZ5gYE4RNyveb3vgCWcRrNPjjnicpr5oiGIbp7wt8FqLCZMfKUNG01ox8cOlmXDwrrlZNdDOIQD5ToxxGRMTY0Ubr+94utIOhqBDEM437BsLP7D4Poon0Q0+8xnnt7Pwoxgk3dm5GEnUszQ5Tfmkc2xYDO3B94hmxI1Vx0oxupSnzni6Y3FQhSkUZpCG2af90pL9egLQdVjfdw2oGTTVyc0QgDhoVcZMPFEdxj4chiSE2SJrBKmYE9b2ikgxosWXM9TaGrBIJaOprzsAO+xvaqEFdNkP2JYnCfPGlFwMyhLZ4HuCod1UpiTFgJQZFWd45+nv8ybOQZBFLe7tzbvKVndei27E+0b6zuuHvT.1Ub69G9vtRe+Ln7qc6IUB6NRKP9M12YujeofcnPIhIi5srm7m92+dxmEXvneZLWkLRmLih6IFJOUqHCRQieahnar3O8bZQtb6sz73410O+0cwbbtxziaRisdKMFpSUlY7NVdgWRlergslWrgUdeEaX4ECdyARUt4NrOysWPrbjonmrH2sFnuPvx5aFzj2zR+v8baoo8ZlMSDluQHOefo5taU6f07J09KkglAnYa6q4AGhDC6RdLyviOWXXOlMgY7VK8vQvGPYp9frtePsCJKRr77ywoIuUYx5+AWenBEA7wuUor8Zkw6q9JFqgh0HNF7KSX7nDMiyrZhqLqyDWJTLYelzvdM74YmIXizinnPhPF82XlVUZjEWZdhLglke22efU+C4vpljFKHcLfmvDJc54CXIX8EGWwLX.uTKCwXGoCr9qrvzXo5blYffozFwyTr.z6Y3.Nu7AXyXQhH9RQ081o1A8SUAV4zpmZYuZMuezigex9UOFqwXbHa.04SSGdlHtZM1ieLqZt8i56E7nTQ0Za3WqlUxebMaA8ifUTlM0xElb1WJI1AEbWTCCdYgdLaqZEcVR+zOXnZD8Z93DVZhvNw6qiYat4lLoB.POhVDFqSYgZ0WZXJAL+DWRUn3pYzDjqJspYNJjjM2dUaFdt1fmCfdBU3TaNS2uO7CFNjiFIrPcbtjbGrZmICugNrgd2zth0ueywcxPwDz.O6xL+lou8lBzHhRD+WsMhB5yzolo1o0dKVAdX3KzQoCEjDSFr0K4EsNaCeJHw61n3UZ7aEIvtLrYvN3IEFt7sEAT+Uy0Zl1HaJYYt8cB1nOyciP4g+zAHHAHkfBcxiGi.BAbZ4fr61HDWP+YpWDO1H6KCj.wiYjqz2bTuNk0X.m11hNsxkyNOe5YWfQjnyjQH8FVrfmfHMSEexDhBwzX5.UsjMs7H0HjbG.3OpMEzgfXDEpppz7kzPGl4sTf3bG8iZW6Fl4QoICJaOm3pWapk+MdWOpT+9KbXoEaw3khbebMSdtRGKlZ12f17NLaDJKwj8w5QXa7.4FC3FFB3OI39EBwHFE4ED1VcC6b1nXmqHzYpX9SV5PmXcTDMcv7c0Y6kxXZtcjKVUk0RrNNMAS8I7gCumMi.uEKiffrC.KwnVcjRZdFL.YbL4HiIs36Lc4pLSESpxsZmLygshllShq4GJSIgkyNpYrolb+7TS5EICEwNRj9w8bsgLbrlioov8SWU245B+o4BiS5OS2TekU7OxMyY5Zx+Wd5BJ+pt4mQdME3bRcmu8n1bCmRxJeJgo4HA19PKPUZKtDYNmkx0ptsEIWXziv8GmlHBZ1jeEhrA9I7yDQ4n1V224phAb85yb+FAbG31U7JKmfbrORcBkRfgdefM0rBt2t9qojxJZ3U0Mhq.CeRVRegrSyLRN2Db2xRRA39awyBtgxvvHwIZboL5xZS64OVOwHF0S9ChxYvOjWno5+05Io86KQKttrgINY.8igAjRoydeixn7dKxZ+ayJ5maFlj6atUPZDXfW5uWw0q0FOzq0Wf+zldnJcvSW5gd4P5gpzfdnJMIA1vmDxGB4SB4Cg7gP9jP9PHeRHeHjOIjODBBrEjYKu1fPQms75BB0NDDJZ.BEMAWjxgdIUCMCkR5EpjzJTHoSnRvEAcfZB3.2.xDpAfILC3RHF.FbsMXbau1fPQms85BB0NDDJZ.BEMAW6.F2wqMHTzYGutfPsCAghFfPQSv0tfwc8ZCBEc10qKHT6PPnnAHTzDbsGXbOu1fPQm875BB0NDDJZ.BEMAWOBL9Hu1fPQmG40EDpcHHTz.DJZBt1GLtuWaPnny9dcA8E66Xcxbq7mytM4B4+Tr2uvAhELOGnOYhCTN++eOne43A8tBh+vRdO0Cd+EDepy2GtuA3xK1Gx5c7YIVcBF6IGNJRzQcoHBmil+g+ZK5ySiLSasLHOVqziFnUxfxF0mKlrssDzm67ogwfqTWzxmW+4Bb+gxempeW8mHU3JEvLI9WzTb2+BMyc4525lAW6Yfr+23S2t7uL+zsOGWfFWw3XNbToXJ3xO8zowABfDkB2WkhyrDElI68sn2y9lopP6K+C7KuSe58J4c5OoyOHiwPdPr9UAY4QS9xejsELuU1+ILq5dL8NyeRxyjsA4FJeUP.Yr2.Vm4KwCuyRr8cVhctyRr6cVh8tyR7n6rD6eKRPei4FoF8vrsdngS5XuzRkJcTzIOVubm+IMijFhC

```


