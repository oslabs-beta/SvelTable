<script>
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth, columnMinWidth } from './store';
	import { onMount } from 'svelte';
	import { dataDisplay } from './store';
	import { isSorted } from './store';
	export let dataSet = [];
	let isSortedAtoZ = false;
	//let data = [];
	let arrowArr = [];
	let searchValue = '';
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
		dataDisplay.set(dataSet);//setting the dataDisplay state to the passed in data array.
		for (let i = 0; i < keys.length; i += 1) {
			arrowArr.push('');
		}
	});

	const colWidthDefault = keys.map(() => {
		return 100;
	});

	columnWidth.set(colWidthDefault);

	/** filter's purpose 
	 * @param event
	 * @returns elem = 
	 */

	function search(event) {
		const searchedData = dataSet.filter((elem) => {
			for (let key in elem) {
				if (elem[key].toString().includes(searchValue.toString().toLowerCase())) {
					return elem;
				}
			}
		});
		dataDisplay.set(searchedData)
	}

	/** filterBy's purpose
	 * @param event
	 * @param columnName
	 */

	function filterBy(event, columnName) {
		search()//invoking search to refresh data array if the input is changed or deleted.
		const { value } = event.target;
		const filteredData = $dataDisplay.filter((elem) => {
			return elem[columnName].toString().toLowerCase().includes(value.toLowerCase())});//checks for the value on the object's passed in columnName key.
		dataDisplay.set(filteredData)
	};

	function sortBy(event, i) {
		let index = i;
		const sortedData = $dataDisplay
		const { displayValue, isAtoZSort } = event.detail;1
		
		if(!$isSorted[displayValue]){
			sortedData.sort(function (a, b) {
				if(typeof a[displayValue] === 'number') { return a[displayValue] - b[displayValue] }
				const aValue = a[displayValue].toLowerCase();
				const bValue = b[displayValue].toLowerCase();
				
				if (aValue > bValue) {
					arrowArr[index] = '🔼';
					return 1;
				}
				if (aValue < bValue) {
					return -1;
				}
				return 0;
			});
		} else {
			sortedData.reverse()
			arrowArr[index] = '🔽';
			};
		dataDisplay.set(sortedData)
	}
</script>

<div class="SvelTableContainer">
	<input type="text" placeholder="Search" bind:value={searchValue} on:input={search} />
	<div class="HeadingContainer">
		{#each keys as columnName, i}
			<input
				type="text"
				style="width: {$columnWidth[i] - 6 + 'px'}; min-width: {$columnMinWidth - 6 + 'px'}"
				placeholder="Filter"
				on:input={(e) => filterBy(e, columnName)}
			/>
		{/each}
	</div>
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<Heading
				on:sortBy={(e) => sortBy(e, i)}
				displayValue={heading}
				arrow={arrowArr[i]}
				bind:isSortedAtoZ
				colID={i}
			/>
		{/each}
	</div>
	<div class="DataContainer">
		{#each $dataDisplay as row, i}
			<div class="SvelTableRow">
				{#each Object.entries(row) as keyVal, j}
					<Cell displayValue={keyVal[1]} colID={j} rowID={i} />
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
		display: flex;
		flex-direction: row;
	}
	.SvelTableRow {
		display: flex;
		flex-direction: row;
	}
</style>
