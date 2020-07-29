The arguments in a POST call are not embedded in the URL so they are more suitable for sensitive information.

```javascript
Server.setBaseURL("http://hise.audio");

const var p = 
{
    "first_argument": 9000
};

// This dummy file just returns the `first_argument` as `post_argument`...
Server.callWithPOST("post_test.php", p, function(status, response)
{
    Console.print(response.post_argument);
});
```