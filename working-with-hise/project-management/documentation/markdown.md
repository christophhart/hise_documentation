---
keywords: Markdown
summary:  A specification of the Markdown language used in HISE
author:   Christoph Hart
modified: 19.09.2019
index:    00
weight:   60
---


  
HISE uses [Markdown](https://www.markdownguide.org) for all documentation: it's the most popular markup language and yields beautifully arranged texts with a minimum of boilerplate.  
Just like with [HiseScript](/scripting/scripting-in-hise/javascript), there are a few customizations to the language (can't help it). Also the Markdown renderer in HISE is not 100% standard compliant, so please use this reference as guideline.

> The HISE forum also uses Markdown, so if you learn about this here, you'll look smarter over there...

## Language Syntax

The idea of markdown is that you can write texts without relying on tools (eg. MS Word or Indesign) for formatting the output - instead it uses a lean syntax of markup that will be parsed and turned into a formatted document. The reason why Markdown is so successful is because these markup tags are pretty simple and do not clutter the written text (try reading the source code of a HTML page LOL).  
Below you can find a comprehensive list of every markup tag supported in HISE.

If you don't know Markdown at all, I suggest you go through a tutorial like [this](https://www.markdowntutorial.com/), and then keep reading here to learn about the special things in HISE (which is like a mini-version of the learning process if you want to learn HiseScript).

### Text formatting

The normal text in a paragraph can be formatted using these markup tags:

**Bold**: `**bold**` = **bold**  
**Newline**: two spaces  
**Code**: surround with fences:

```
`this will be monospaced`
```  

These formatting options are not supported: 

- strikethrough
- italic
- adding custom HTML

### Headline

Headlines are preceded by a number of hashtags that define their level:

```
# Headline level 1
## Headline level 2
### Headline level 3
```

> All Headlines up to level 2 will create a item in the TOC and in the search box that can be linked to using the anchor syntax (`#headline-urlified`)

### Paragraphs

`> This is a comment`
> This is a comment  

`- bullet point`

- bullet point

`1. numbered list`
1. Numbered list

### Links

In order to create a link to another page in the documentation (or an external website), you need to use this format:

```
[Text to be shown](link-target)
```

If you want to create links to another page in the documentation, make sure the link target follows the principles described [here](#markdown-file-system)


### Images

`![ImageName](imageURL)` = shows a image

> If you want to embed local images, use the image creation tool - this will automatically copy the local file into the correct subfolder of the repository folder and create a correct relative link.


### Tables

Tables are defined using the standard Markdown syntax with the addition that you can define a fixed column width by adding `:#px` at the end of the `--` line definitions.  
This is useful for when using tables to display icons / shortcuts.


```
| First row | Second Row |
| ---:120px | ------ |
| cell 1 | cell 4 |
| cell 2 | cell 3 |
```

| First row | Second Row |
| ----- | ------ |
| cell 1 | cell 4 |
| cell 2 | cell 3 |




> The table parser in HISE is more strict than the usual parser. In order to make sure that the table is rendered correctly, use the Table generator in the editor.





## YAML Header

The markdown files in HISE expect a YAML header at the beginning of each file in the [Front Matter](https://jekyllrb.com/docs/front-matter/) format:

```
---
property: value
list-property:
- key: value
- key: value
---
```

It contains metadata for the file which is used in the search box and the TOC.

> If you create a new file using the Markdown Editor, it will create the basic properties for you, otherwise you will have to fill them in manually.

Below you can find a list of all supported properties. Some of them are exclusive to the HISE documentation and won't affect project documentation.



| Property | Expected Data | Description |
| -- | --- | --------- |
| `keywords` | String (one line) | the title of the page |
| `summary` | String (one line) | a short description that will be shown in the search box popup. |
| `author` | String (one line) | your name (only used in the HISE docs). |
| `modified` | Date (TT.MM.YYYY format) | the last modification date. Only used in the HISE Docs. |
| `index` | number (starting with zero) | overrides the natural sorting of the items in the TOC and can be used to manually setup the order you want the TOC to appear. |
| `weight` | number (0 - 100) | the "importance" of this page. This will have an effect on the search results (pages with higher weight will show up first). Be aware that by default everything starts with 50 and children have 10 weight less than their parents. |
| `colour` | Colour (`#AARRGGBB`) | the colour to show in the search box and TOC for this item and all its children (which don't have a defined colour property themselves) |
| `parameters` | YAML list | Only for HISE modules: a description of every parameter that is used by the autogenerator for the module database. |
| `properties` | YAML list | Only for Floating tiles & Script components: a description of each property that is used by the autogenerator. |







