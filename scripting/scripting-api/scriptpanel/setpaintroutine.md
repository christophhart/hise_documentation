Setting a paint routine for a single panel:
```
const myPanel = Content.addPanel("myPanel",0,0);
myPanel.setPaintRoutine(function(g)
{
  g.fillRect(this.getLocalBounds(0);
});
```

Re-using a paint routine for multiple panels:
```
const panel1 = Content.addPanel("panel1",0,0);
const panel2 = Content.addPanel("panel2",0,40);

inline function paintPanels(g,this)
{
   g.fillRect(this.getLocalBounds(0);
};

panel1.setPaintRoutine(function(g){paintPanels(g, this);});
panel2.setPaintRoutine(function(g){paintPanels(g, this);});
```
