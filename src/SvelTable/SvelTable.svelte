<script>
	import Column from './Column.svelte';
	/* NOTES
  export creates a prop for the component
  */

	/* PSEUDOCODE
  import Row Component/ Column Component
    pass required data to each component
  receive dataset from user (array of obj)
    array of objects
      each object is a row
      each key is a heading/column
  */

	// receive dataset from user (default value of empty arr)
	export let dataSet = [];
  // getting the keys of the first object in dataSet
	const columnData = Object.keys(dataSet[0]);
</script>

<div class='MainContainer'>
  <Column {columnData} />
</div>

<style>
  .MainContainer {
    display: flex;
    flex-direction: column;
    border: solid;
    border-width: 2 2px;
    border-color: black;
    width: 300px;
    height: 300px;
    padding: 50px;
    margin: 20px;
  }
</style>
