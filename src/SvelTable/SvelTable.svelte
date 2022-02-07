<script>
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth } from './store';
	// Receives dataset from user (default value of empty arr)
	export let dataSet = [];

	// Pulling all keys for heading names
	const keys = Object.keys(dataSet[0]);

	/* PSEUDOCODE
  Import Row Component/Column Component
    Pass required data to each component
  Receive dataset from user (array of obj)
    Array of objects
      Each object is a row
      Each key is a heading/column
  */
	
	const colWidthDefault = keys.map(() => {
		return 200;
	});

	columnWidth.set(colWidthDefault);

	/* 
  Make settings for row and column a global state/variable.

	When features are added, those feature component will alter global settings. 
	
	Because the table relies on the setting state it will REACT to the change.
  */
</script>

<div class="SvelTableContainer">
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<Heading displayText={heading} colID={i} />
			<!-- <div class="ResizeComponent" /> -->
		{/each}
	</div>
	<div>
		{#each dataSet as row, i}
			<div class="SvelTableRow">
				{#each Object.entries(row) as keyVal, j}
					<Cell displayText={keyVal[1]} colID={j} rowID={i} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.SvelTableContainer {
		width: fit-content;
		display: flex;
		flex-direction: column;
		border: 1px solid black;
	}
	.HeadingContainer {
		top: 0px;
		left: 0px;
		display: flex;
		flex-direction: row;
	}
	.SvelTableRow {
		display: flex;
		flex-direction: row;
	}
	/* .ResizeComponent {
		height: 20px;
		width: 20px;
		left: 100px;
		color: black;
		background-color: black;
		position: absolute;
		cursor: ew-resize;
		pointer-events: all;
	} */
</style>
