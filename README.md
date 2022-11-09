# SvelTable

SvelTable is a feature rich, data table component built with Svelte.  Import your data objects and our table will take care of the rest.

Current features include:
* Full Table Search Bar
* Individual Column Search Bars
* Multi-Input Filtering
* Column Sorting Alphabetically or Numerically
* Column Resizing

## SetUp
1.) Use the package manager [npm](https://docs.npmjs.com/) to install SvelTable.
```bash
npm install sveltable
```
2.) Import sveltable to your svelte file.
```js
import SvelTable from 'sveltable';
```

3.) Declare a data array inside script tag to import data to.
```html
<script>
  import SvelTable from 'sveltable';
  let data = [];
</script>
```
4.) Use dataSet method to render a SvelTable with your data.
```html
<SvelTable dataSet={data} />
```
5.) By default SvelTable will display up to 30 rows before adding a scroll bar.  This can be changed by setting numRows to your desired number.
```html
<SvelTable dataSet={data} numRows={[Your Number]}/>
```

6.) Add custom filtering icons (Image or Emoji). Images (.png, .jpeg, .webp) are able to be used however SVGs are recommended due to much easier sizing.
```html
<!-- Image Based -->
<SvelTable dataSet={data} upArrow="static/upArrow.svg" downArrow="static/downArrow.svg"/>

<!-- Text Based -->
<SvelTable dataSet={data} upArrow="🔼" downArrow="🔽"/>
```

## Contributing
Want to do help us do some svixing?  
We've got big plans for our little data table, including:
* Range Filtering
* Corner Grab Resizing
* Custom Styling Options
* Row Count Display
* Feature Toggling
* Pagination
* TypeScript Optimization

See how to contibute to any of the above and more [here!](https://github.com/oslabs-beta/SvelTable/blob/main/Contributing.md)

## Vist [Sveltable.io](https://sveltable.io) for further information.

## License
[MIT](https://choosealicense.com/licenses/mit/)

