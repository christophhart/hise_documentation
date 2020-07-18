This calls the given URL with the `parameters` as GET arguments and will execute the callback function when the server responded.

The `parameters` have to be a non-nested JSON object and will automatically change the URL to embed these parameters


```javascript
Server.setBaseURL("https://forum.hise.audio");

// The GET arguments as JSON object
const var p =
{
    "term": "HISE",
    "in": "titlespost"
};

// => https://forum.hise.audio/api/search?term=HISE&in=titlesposts
Server.callWithGET("api/search", p, function(status, response)
{
    if(status == Server.StatusOK)
    {
        // Just use the response like any other JSON object
        Console.print("There are " + response.matchCount + " results");
    }
});
```
