This will add a page to the dialog and return an integer index that can be used to add elements to the page.

```javascript
const var mp = Content.addMultipageDialog("mp", 0, 0);

for(i = 0; i < 10; i++)
	mp.addPage();
```

Make sure to store the page index returned by this function as you will need it to add UI elements to the page later.

