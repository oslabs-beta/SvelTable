<script>
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth, columnMinWidth } from './store';
	import { onMount } from 'svelte';
	import { dataDisplay } from './store';
	import { isSorted } from './store';
	export let dataSet = [];
	let currentData = [];
	let searchedData = {};
	let filteredData = {};
	let isSortedAtoZ = false;
	let arrowArr = [];
	let searchValue = '';
	let filterValues = {};
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
		currentData = [...dataSet];
		dataDisplay.set(currentData); //setting the dataDisplay state to the passed in data array.
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
		dataDisplay.set([...dataSet])
		if(searchedData[searchValue]){
			dataDisplay.set(searchedData[searchValue])
			return
		} else {
		searchedData[searchValue] = $dataDisplay.filter((elem) => {
			for (let key in elem) {
				if (elem[key].toString().includes(searchValue.toString().toLowerCase())) {
					return elem;
				}
			}
		});
		dataDisplay.set(searchedData[searchValue]);
		console.log($dataDisplay)
		};
	}

	/** filterBy's purpose
	 * @param event
	 * @param columnName
	 */

	function filterBy(event, columnName) {
		search();
		let output = []
		const { value } = event.target;
		if (filteredData[value] || filteredData[value] === 0){
			output = [...output, ...filteredData[value]]
		} else {
		filterValues[columnName] = value;
		filteredData[value] = $dataDisplay.filter((elem) => {
			for (let key in filterValues){
				console.log(filterValues)
				if(!elem[columnName].toString().toLowerCase().includes(filterValues[key].toLowerCase())){
					console.log('deleted',elem[columnName], filterValues[key])
					return false
				}
			}
			return true
		});
		dataDisplay.set(filteredData[value]); 
		}
	}

	function sortBy(event, i) {
		let index = i;
		const obj = {}; //creating empty object to allow setting a key with a variable
		for (let a = 0; a < keys.length; a += 1) {
			arrowArr[a] = '';
		}
		const sortedData = $dataDisplay; //grabs the current display data from the store and stores it in a new array
		const { displayValue, isAtoZSort } = event.detail; //grabs the passed up display value from the child component and destructures
		if (!$isSorted[displayValue]) {//if the isSorted object doesn't have the display value as a key execute sort funtionality
			obj[displayValue] = { sortBool: true, count: 1 };
			isSorted.set(obj); //setting the display value as a key on the isSorted object and giving it a count
			sortedData.sort(function (a, b) {
				if (typeof a[displayValue] === 'number') {//this will sort if the display value is a number
					arrowArr[index] = '🔼';
					return a[displayValue] - b[displayValue];
				} 
				const aValue = a[displayValue].toLowerCase(); //assigning the passed in arguments as variables and accounting for different letterrcases
				const bValue = b[displayValue].toLowerCase();
				if (aValue > bValue) {//sort functionality if the display value is a string
					arrowArr[index] = '🔼';
					return 1;
				}
				if (aValue < bValue) {
					return -1;
				}
				return 0;
			});
			dataDisplay.set(sortedData); //setting the state of our display data to the sortedData array
		} else if ($isSorted[displayValue].count === 1) {//if the display value exists as a key on the isSorted object and the count is 1
			sortedData.reverse(); //instead of sorting the array in backwords order we are reversing the array
			arrowArr[index] = '🔽';
			obj[displayValue] = { sortBool: true, count: 2 }; //incrementing count. Is there a better way to do this?
			isSorted.set(obj);
			dataDisplay.set(sortedData); //setting the state of our display data to the sortedData array
		} else {//if the above conditionals are not met then this is the third time the sort was clicked
			isSorted.set({}); //reseting the isSorted object to an empty object indicating the column is no longer sorted
			const originalData = [...dataSet]; //creating new array so that dataSet is not mutated when dataDiplay is set to the original array that was passed in
			dataDisplay.set(originalData); //resetting the display data to the original data's sort order
			arrowArr[index] = '';
		}
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
