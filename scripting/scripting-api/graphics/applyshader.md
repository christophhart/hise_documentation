You can use this method in order to render the GLSL [ScriptShader](/scripting/scripting-api/scriptshader) object to the given area (relative to the ScriptPanel's boundaries).


```javascript
const var Panel1 = Content.addPanel("Panel1", 0, 0);

const var sh = Content.createShader("GLSL/init.glsl");

PAnel1.setPaintRoutine(function(g)
{
	g.applyShader(sh, this.getLocalBounds(0));
});
```