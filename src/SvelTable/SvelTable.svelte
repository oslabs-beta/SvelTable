<script>
	// Note to team: Lightweight even when displaying a huge dataset due to implementation of a "virtual list" mechanism
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth, columnSettings } from './store';
	// receives dataset from user (default value of empty arr)
	export let dataSet = [];

	// getting all keys for headings
	const keys = Object.keys(dataSet[0]);

	const colWidthDefault = keys.map(() => {
		return 100;
	});

	columnWidth.set(colWidthDefault);
	/* 
  make settings for row and column a global state/variable
	when features are added, those feature component will alter global settings because the table relies on the setting state it will REACT to the change
  */
</script>

<div class="SvelTableContainer">
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<Heading displayText={heading} colID={i} />
			<!-- <div class="ResizeComponent" /> -->
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
		border: solid;
		border-color: black;
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
