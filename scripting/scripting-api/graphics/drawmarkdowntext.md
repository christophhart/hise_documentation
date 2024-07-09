
Draw a [MarkdownRenderer](/scripting/scripting-api/markdownrenderer) element on a panel.

```javascript
const var Panel1 = Content.getComponent("Panel1");

const var markd = Content.createMarkdownRenderer();
markd.setTextBounds(Panel1.getLocalBounds(0));

markd.setText("
## Heading
Explain explain explain
");

Panel1.setPaintRoutine(function(g)
{	
	g.drawMarkdownText(markd);
});
```