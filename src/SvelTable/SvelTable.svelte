<script>
	// Note to team: Lightweight even when displaying a huge dataset due to implementation of a "virtual list" mechanism
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth } from './store';
	// Receives dataset from user (default value of empty arr)
	export let dataSet = [];

	// Pulling all keys for heading names
	const keys = Object.keys(dataSet[0]);
	const keysLength = keys.length;

	/* PSEUDOCODE
  Import Row Component/Column Component
    Pass required data to each component
  Receive dataset from user (array of obj)
    Array of objects
      Each object is a row
      Each key is a heading/column
  */
	const clickResize = () => {
		console.log('clicked resize div');
	};

	const colWidthDefault = keys.map(() => {
		return 200;
	});

	columnWidth.set(colWidthDefault);

	/* 
  Make settings for row and column a global state/variable.

	When features are added, those feature component will alter global settings. 
	
	Because the table relies on the setting state it will REACT to the change.
  */
	// const incWidth = () => {
	// 	$columnWidth[0] += 10;
	// };
</script>

<div class="SvelTableContainer">
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<Heading displayText={heading} colID={i} />
			<!-- <button class="ResizeComponent" on:click={clickResize} /> -->
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
<!-- <button on:click={incWidth}> inc-id-width </button> -->

<style>
	.SvelTableContainer {
		width: fit-content;
		display: flex;
		flex-direction: column;
		border: 1px solid black;
	}
	.HeadingContainer {
		display: flex;
		flex-direction: row;
	}
	.SvelTableRow {
		display: flex;
		flex-direction: row;
	}
	/* .ResizeComponent {
		position: absolute;
		z-index: 1;
		pointer-events: all;
		cursor: ew-resize;
	} */
	/* .SvelTableContainer {
		display: grid;
		grid-template-columns: repeat(2);
	}
	.HeadingContainer {
		display: grid;
		grid-template-rows: repeat(keysLength, columnWidth[colID]);
	}
	.SvelTableRow {
		display: flex;
		flex-direction: row;
	} */
</style>
