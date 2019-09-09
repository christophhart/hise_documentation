---
keywords: Table
summary:  An UI element that can be used to edit a curve.
author:   Christoph Hart
weight:   80
modified: 18.03.2019
properties:
- tableIndex: the table index (starting with 0) of the table that you want to control. In most cases it will just be zero, but eg. the Table Envelope has two tables (0 = Attack, 1 = Release). It might be possible that you have to [rebuild](/working-with-hise/workspaces/scripting-workspace/canvas#toolbar) the interface after changing this value to apply the changes.
- customColours: if true, it will use a flat design with customizable colours, otherwise it will look like the thing above.
---

The Table UI component is one of the most used complex components throughout HISE and can be used to change the curve of many things:

- velocity curves
- CC curves
- wave shaping

Each module that uses a table for anything can be referenced as [`TableProcessor`](/scripting/scripting-api/tableprocessor) which offers ways of changing the curve by scripting calls.

You can also use it on your compiled plugin with a lot of customization options.

## Using the Table

By default, each table has a line that starts at the bottom left and goes all the way to the top right. This is similar to the output function:

`y = x`

where input equals output. It has at least two points which are tied to the left and right edge of the table. You can click anywhere to create a new point, drag it around and change the curve by hovering over a point and moving the mousewheel. If you right click on a point it will be removed.

> If you're inside the main workspace, you need to use Cmd + Mousewheel to prevent accidently changing the curve if you scroll around


## Scripting API 
[ScriptTable](/scripting/scripting-api/scripttable)