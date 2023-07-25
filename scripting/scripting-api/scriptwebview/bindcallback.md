This will bind a callable HiseScript object (so either a function, an inline function or a broadcaster) to a function id in the WebView so you can call it from within JS in the web browser. In order to use this, just pass in a function ID that you will then use in JS to call this and a function with a single parameter. This parameter will be an array with all arguments that you pass into the JS function. You can also return a value which will then be used in a JS Promise to be evaluated asynchronously later:

#### Javascript in your webview:

```javascript

someFunction({"value": Math.random()}).then ((result) => 
{ 
    console.log(result);
});
```

#### HiseScript

```javascript
wv.bindCallback("someFunction", function(args)
{
	Console.print(args.value);
	return args.value * 2.0;
});
```

