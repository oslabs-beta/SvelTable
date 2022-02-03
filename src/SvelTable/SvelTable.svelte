<script>
	// Note to team: Lightweight even when displaying a huge dataset due to implementation of a "virtual list" mechanism
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth } from './store';
	// Receives dataset from user (default value of empty arr)
	export let dataSet = [];
	export let rowSetting = {};
	export let colSetting = {};

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
		{/each}
	</div>
	<div class="DataContainer">
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
		display: flex;
		flex-direction: column;
		border: solid;
		border-color: black;
		/* padding: 20px; */
	}
	.HeadingContainer {
		display: flex;
		flex-direction: row;
	}
	.SvelTableRow {
		display: flex;
		flex-direction: row;
	}
</style>
