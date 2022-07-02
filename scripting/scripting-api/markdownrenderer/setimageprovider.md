This function lets you define an image provider which is used to resolve image links in the markdown text

By default, the image rendering is non-functional when using a MarkdownRenderer, but you can supply it with image files and even [Path](/scripting/scripting-api/path) objects to render a path. The parameter you pass in must be a JSON object with a list of metadata objects that will be used to determine how to resolve image links.

| Property | Type | Description |
| -- | -- | -------- |
| `URL` | String | the URL that points to the image. Should be a relative and valid markdown link URL |
| `Type` | `"Path"` or `"Image"` | A string describing the type of the image - whether its a (pooled) image or a monochromatic icon rendered from a path. |
| `Data` | String or [Path](/scripting/scripting-api/path) | Depending on the type, this must either be a image reference (using the `{PROJECT_FOLDER}`) wildcard or a reference to a path object. Note: You can also just pass in the Base64 string describing the path so you don't need to create a path object just for this function. |
| `Colour` | 32bit (ARGB) | the colour of the path (only useful when rendering a path obviously). |

Note that you can use the non-standard syntax of defining the size of the path inside the link:

- if you want it to have an absolute size, use `![](link-to-image:80px)`.
- if you want it to have a relative size, use `![](link-to-image:50%)`

#### Example:

```javascript
const var md = Content.createMarkdownRenderer();

const var p = Content.createPath();

// Create a triangle
p.startNewSubPath(0.0, 0.0);
p.lineTo(1.0, 1.0);
p.lineTo(0.0, 1.0);
p.closeSubPath();

const var imageData = 
[
{
	"URL": "my-path",
	"Type": "Path",
	"Data": p,
	"Colour": Colours.blue
}];

md.setImageProvider(imageData);

md.setText("### Example\n> Please render a path like an icon\n![](/my-path:30%)this is text after the icon");

md.setTextBounds([10, 10, 200, 9000]);

const var Panel1 = Content.getComponent("Panel1");

Panel1.setPaintRoutine(function(g)
{
	g.fillAll(0xFF111111);
	g.drawMarkdownText(md);
});
```
