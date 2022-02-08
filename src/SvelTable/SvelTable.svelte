<script>
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth, columnMinWidth } from './store';
	import { onMount } from 'svelte';
	export let dataSet = [];
	let isSortedAtoZ = false;
	let data = [];
	const keys = Object.keys(dataSet[0]);

	/* PSEUDOCODE
  Import Row Component/Column Component
    Pass required data to each component
  Receive dataset from user (array of obj)
    Array of objects
      Each object is a row
      Each key is a heading/column
  */
	onMount(() => {
		data = dataSet;
	});
	const colWidthDefault = keys.map(() => {
		return 200;
	});

	columnWidth.set(colWidthDefault);

	let searchWord = '';

	function filter(e) {
		data = dataSet.filter((elem) => {
			for (let key in elem) {
				if (elem[key].toString().includes(searchWord.toString().toLowerCase())) {
					return elem;
				}
			}
		});
	}

	function filterBy(e, columnName) {
		const { value } = e.target;
		console.log(columnName);
		data = data.filter((elem) => elem[columnName].toLowerCase().includes(value.toLowerCase()));
	}

	function sortBy(e) {
		console.log(e);
		console.log(dataSet);

		const { displayText, isAtoZSort } = e.detail;

		isSortedAtoZ = !isAtoZSort;

		if (isSortedAtoZ) {
			data = data.sort(function (a, b) {
				if (a[displayText] > b[displayText]) {
					return 1;
				}
				if (a[displayText] < b[displayText]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		} else {
			data = data.sort(function (a, b) {
				if (a[displayText] < b[displayText]) {
					return 1;
				}
				if (a[displayText] > b[displayText]) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		}
	}
</script>

<div class="SvelTableContainer">
	<input type="text" placeholder="Search" bind:value={searchWord} on:input={filter} />
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<input
				type="text"
				style="width: {$columnWidth[i] - 6 + 'px'}; min-width: {$columnMinWidth - 6 + 'px'}"
				placeholder="Filter"
				on:input={(e) => filterBy(e, heading)}
			/>
		{/each}
	</div>
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<Heading on:sortBy={sortBy} displayText={heading} bind:isSortedAtoZ colID={i} />
		{/each}
	</div>
	<div class="DataContainer">
		{#each data as row, i}
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
