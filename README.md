# SvelTable

SvelTable is a feature rich, data table component built with Svelte.  Import your data objects and our table will take care of the rest.

Current features include:
* Full Table Search Bar
* Indivudal Column Search Bars
* Multi-Input Filtering
* Row Sorting Alphabetically or Numerically
* Column Resizing

## SetUp
1.) Use the package manager [npm](https://docs.npmjs.com/) to install Sveltable.
```bash
npm install sveltable
```
2.) Import sveltables to your svelte file.
```bash
import SvelTable from 'sveltable';
```

3.) Declare a data array inside script tag to import data to.
```bash
<script>
  import SvelTable from 'sveltable';
  let data = [];
</script>
```
4.) Use dataSet method to render a SvelTable with your data.
```bash
<SvelTable dataSet={data} />
```
5.) By default SvelTable will display up to 30 rows before adding a scroll bar.  This can be changed by setting numRows to your desired number.
```bash
<SvelTable dataSet={data} numRows={[Your Number]}/>
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

