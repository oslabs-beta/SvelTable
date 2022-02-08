<script>
	// Note to team: Lightweight even when displaying a huge dataset due to implementation of a "virtual list" mechanism
	import Heading from './Heading.svelte';
	import Cell from './Cell.svelte';
	import { columnWidth } from './store';
import { onMount } from 'svelte';
	// receives dataset from user (default value of empty arr)
	export let dataSet = [];
	export let rowSetting = {};
	export let colSetting = {};
	let isSortedAtoZ=false;
	let data =[];
	// getting all keys for headings
	const keys = Object.keys(dataSet[0]);

	/* PSEUDOCODE
  import Row Component/Column Component
    pass required data to each component
  receive dataset from user (array of obj)
    array of objects
      each object is a row
      each key is a heading/column
  */


  onMount(()=>{
	data=dataSet;
	// for (let i=0; i < data.length; i++){
	// 	arrow.push('');
	// }
  })

	const colWidthDefault = keys.map(() => {
		return 500;
	});

	columnWidth.set(colWidthDefault);

	let searchWord = "";
	 function filter(e){
		 console.log(e);
		//  if(e.detail===searchWord) alert("found adam")
		// dataSet = dataSet.filter(elem => elem[e.detail] === searchWord);
		data = dataSet.filter(elem => elem.name.toLowerCase().includes(searchWord.toLowerCase()));

		console.log(dataSet);

	 }
	let arrowArr = ['','','','',''];

	function sortBy(e, i) {
		console.log(e);
		console.log(dataSet);

		let index = i;
		
		const {displayText, isAtoZSort}= e.detail
		isSortedAtoZ= !isAtoZSort;
		
       if(isSortedAtoZ){ 
		data = data.sort(function (a, b) {
			if (a[displayText] > b[displayText]) {
				return 1;
			}
			if (a[displayText] < b[displayText]) {
				return -1;
			}
			return 0;
		});
		arrowArr[index] = '🔽';
	} else{
		data = data.sort(function (a, b) {
			if (a[displayText] < b[displayText]) {
				return 1;
			}
			if (a[displayText] > b[displayText]) {
				return -1;
			}
			return 0;
		});
		arrowArr[index] = '🔼';
	}
	}
	// console.log($columnWidth);
	// columnWidth = [500,500,500,500,500]
	/* 
  make settings for row and column a global state/variable
    when features are added, those feature component will alter global settings because the table relies on the setting state it will REACT to the change
  */
</script>

<div class="SvelTableContainer">
	<input type="text" bind:value={searchWord} on:input={filter}/>
	<div class="HeadingContainer">
		{#each keys as heading, i}
			<Heading on:sortBy={(e)=>sortBy(e,i)} displayText={heading} arrow={arrowArr[i]} bind:isSortedAtoZ colID={i} />
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
	.SvelTableRow {
		display: flex;
		flex-direction: row;
	}
</style>
