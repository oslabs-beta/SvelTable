<script>
	import VirtualList from './util/VirtualList.svelte';
	import { browser } from '$app/env';
	import CellRow from './CellRow.svelte';
	import Heading from './Heading.svelte';
	import { columnWidth, columnMinWidth, dataDisplay, isSorted } from './store';
	import { onMount } from 'svelte';
	//props for user to specify
	export let dataSet = [];
	let currentData = [];
	let searchedData = {};
	//let filteredData = {};
	let isSortedAtoZ = false;
	let arrowArr = [];
	let searchValue = '';
	let filterValues = {};
	const keys = Object.keys(dataSet[0]);

	onMount(() => {
		currentData = [...dataSet];
		dataDisplay.set(currentData); //setting the dataDisplay state to the passed in data array.
		for (let i = 0; i < keys.length; i += 1) {
			arrowArr.push('');
		}
	});

	let colWidthDefault = keys.map(() => {
		return 100;
	});

	/*	making height of virtual list dynamic based on data size
	would probably need to have fixed height for rows
		checking global dataDisplay.length this gives amount of rows being displayed
			if amount pass a certain point, it'll be a fixed width
			if it's under reduce height based on amount of rows
	*/
	//this value is fixed based on the current height of our rows to get precise height sizing
	let rowHeight = 21.1;
	//allow users to change how many rows are displayed within Virtual List
	export let numRows = 30;
	//sets the initial height to show exactly numRows of lines
	let VLHeight = numRows * rowHeight;
	//reactive number of rows based on what's being displayed
	$: displayRows = $dataDisplay.length;
	//reactive conditional if displayed rows is less than previously specified numRows change height to displayrow height
	$: if (displayRows && displayRows <= numRows) {
		VLHeight = displayRows * rowHeight;
	} else VLHeight = numRows * rowHeight;
	//IMPORTANT this could move other element that sits under the table up if they dont specify that it should be fixed

	//grab columnWidth from local storage if it exists
	if (browser) {
		// check for localColumnWidth in localstorage
		if (localStorage.getItem('localColumnWidth')) {
			//if it exist change default as that array
			colWidthDefault = JSON.parse(localStorage.getItem('localColumnWidth'));
		}
	}
	// else set it as default
	columnWidth.set(colWidthDefault);

	/** filter's purpose
	 * @param event
	 * @returns elem =
	 */

	function search(event) {
		dataDisplay.set([...dataSet]);
		if (searchedData[searchValue]) {
			dataDisplay.set(searchedData[searchValue]);
			return;
		} else {
			searchedData[searchValue] = $dataDisplay.filter((elem) => {
				for (let key in elem) {
					if (elem[key].toString().includes(searchValue.toString().toLowerCase())) {
						return elem;
					}
				}
			});
			dataDisplay.set(searchedData[searchValue]);
		}
	}

	/** filterBy's purpose
	 * @param event
	 * @param columnName
	 */

	function filterBy(event, columnName) {
		search();
		const { value } = event.target;
		filterValues[columnName] = value;
		const filteredData = $dataDisplay.filter((elem) => {
			for (let key in filterValues) {
				if (!elem[key].toString().toLowerCase().includes(filterValues[key].toLowerCase())) {
					return false;
				}
			}
			return true;
		});
		dataDisplay.set(filteredData);
	}

	function sortBy(event, i) {
		let index = i;
		const obj = {}; //creating empty object to allow setting a key with a variable
		for (let a = 0; a < keys.length; a += 1) {
			arrowArr[a] = '';
		}
		const sortedData = $dataDisplay; //grabs the current display data from the store and stores it in a new array
		const { displayText, isAtoZSort } = event.detail; //grabs the passed up display value from the child component and destructures
		if (!$isSorted[displayText]) {
			//if the isSorted object doesn't have the display value as a key execute sort funtionality
			obj[displayText] = { sortBool: true, count: 1 };
			isSorted.set(obj); //setting the display value as a key on the isSorted object and giving it a count
			sortedData.sort(function (a, b) {
				if (typeof a[displayText] === 'number') {
					//this will sort if the display value is a number
					arrowArr[index] = '🔼';
					return a[displayText] - b[displayText];
				}
				const aValue = a[displayText].toLowerCase(); //assigning the passed in arguments as variables and accounting for different letterrcases
				const bValue = b[displayText].toLowerCase();
				if (aValue > bValue) {
					//sort functionality if the display value is a string
					arrowArr[index] = '🔼';
					return 1;
				}
				if (aValue < bValue) {
					return -1;
				}
				return 0;
			});
			dataDisplay.set(sortedData); //setting the state of our display data to the sortedData array
		} else if ($isSorted[displayText].count === 1) {
			//if the display value exists as a key on the isSorted object and the count is 1
			sortedData.reverse(); //instead of sorting the array in backwords order we are reversing the array
			arrowArr[index] = '🔽';
			obj[displayText] = { sortBool: true, count: 2 }; //incrementing count. Is there a better way to do this?
			isSorted.set(obj);
			dataDisplay.set(sortedData); //setting the state of our display data to the sortedData array
		} else {
			//if the above conditionals are not met then this is the third time the sort was clicked
			isSorted.set({}); //reseting the isSorted object to an empty object indicating the column is no longer sorted
			const originalData = [...dataSet]; //creating new array so that dataSet is not mutated when dataDiplay is set to the original array that was passed in
			dataDisplay.set(originalData); //resetting the display data to the original data's sort order
			arrowArr[index] = '';
		}
	}
</script>

<div class="SvelTableContainer">
	<input type="text" placeholder="Search" bind:value={searchValue} on:input={search} />
	<div class="SearchFilterContainer">
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
				displayText={heading}
				arrow={arrowArr[i]}
				bind:isSortedAtoZ
				colID={i}
			/>
		{/each}
	</div>
	<div class="DataContainer">
		<VirtualList height={VLHeight + 'px'} items={$dataDisplay} let:item>
			<CellRow rowData={item} />
		</VirtualList>
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

	.DataContainer {
		resize: both;
	}
</style>
