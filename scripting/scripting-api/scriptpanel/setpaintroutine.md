setPaintRoutine() automatically passes a [graphics API](https://docs.hise.dev/scripting/scripting-api/graphics/index.html) object to the provided function, so it can be accessed from inside the paint routine. Conventionally, this parameter is named `g`. 

### Examples

Setting a paint routine for a single panel:

```javascript
const myPanel = Content.addPanel("myPanel",0,0);
myPanel.setPaintRoutine(function(g)
{
  g.fillRect(this.getLocalBounds(0));
});
```

Using an inlined function to paint multiple panels:

```javascript
const panel1 = Content.addPanel("panel1",0,0);
const panel2 = Content.addPanel("panel2",0,60);

inline function paintPanels(g)
{
   g.fillRect(this.getLocalBounds(0));
}

panel1.setPaintRoutine(paintPanels);
panel2.setPaintRoutine(paintPanels);
```

Using a regular function to paint multiple panels:

```javascript
const panel1 = Content.addPanel("panel1",0,0);
const panel2 = Content.addPanel("panel2",0,60);

function paintPanels(g) //The function declaration must come before setPaintRoutine().
{
  g.fillRect(this.getLocalBounds(0));
}

panel1.setPaintRoutine(paintPanels);
panel2.setPaintRoutine(paintPanels);
```
