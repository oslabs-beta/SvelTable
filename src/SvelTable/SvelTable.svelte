<script>
	/* PSEUDOCODE
  import Row Component/Column Component
    pass required data to each component
  receive dataset from user (array of obj)
    array of objects
      each object is a row
      each key is a heading/column
  */

	// Note to team: Lightweight even when displaying a huge dataset due to implementation of a "virtual list" mechanism
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import Column from './Column.svelte';
	import Row from './Row.svelte';

	// receives dataset from user (default value of empty arr)
	export let dataSet = [];
	export let rowSetting = {};
	export let colSetting = {};
	// determine number of columns required to generate Column containers
	const keys = Object.keys(dataSet[0]);

	// determine number of rows INCLUDING headings
	const numRow = dataSet.length + 1;

	/* 
  make settings for row and column a global state/variable
	when features are added, those feature component will alter global settings because the table relies on the setting state it will REACT to the change
  */
</script>

<div class="SveltableContainer">
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<Heading displayText={heading} colID={i.toString()} />
		{/each}
	</div>
	<div class="DataContainer">
		{#each dataSet as row, i}
			<div class="SveltableRow">
				{#each Object.entries(row) as keyVal, j}
					<Cell displayText={keyVal[1]} colID={j.toString()} rowID={i.toString()} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.SveltableContainer {
		width: 60%;
		display: flex;
		flex-direction: column;
		border: solid;
		border-color: black;
		padding: 20px;
	}
	.HeadingContainer {
		display: flex;
		flex-direction: row;
	}
	.SveltableRow {
		display: flex;
		flex-direction: row;
	}
</style>
