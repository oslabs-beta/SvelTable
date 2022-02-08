<script>
	import { createEventDispatcher } from 'svelte';
	export let displayText = '';
	export let arrowArr = [];
	export let arrow = '';
	export let colID = 0;
	import { columnWidth, columnMinWidth } from './store';
  export let isSortedAtoZ;
	const dispatch = createEventDispatcher();
	/* Create handler for resetting 'columnWidth' at specific 'colID':
		- colID correspond to specific column index
		- handleColResize will access columnWidth[colID] and increase OR decrease that value
		- every cell/heading dependent on that value will respond to the change
		- 
			(Look into accessing local storage)We can save frontend width data into client's local storage in their browser;
				have logic to check client's local storage first to see if there's a width valuye in there
				if there is, use that instead
				
	*/
	let resizing = false;
	let originalWidth = 0;
	let originalMouseX = 0;
	
</script>

<div
  on:click={() => dispatch('sortBy', {displayText, isAtoZSort:isSortedAtoZ})}
	class="SvelTableHeading"
	{colID}
	style="min-width: {$columnMinWidth + 'px'}; width: {$columnWidth[colID] + 'px'};"
	>
	{displayText}
	{arrow}
	<div
		class="resizer"
		on:mousedown={(e) => {
			e.preventDefault();
			resizing = true;
			originalWidth = $columnWidth[colID];
			originalMouseX = e.pageX;
			window.addEventListener('mousemove', (e) => {
				if (resizing) {
					$columnWidth[colID] = originalWidth + (e.pageX - originalMouseX);
				}
			});
			window.addEventListener('mouseup', () => {
				resizing = false;
				window.removeEventListener('mousemove', (e) => {
					if (resizing) {
						$columnWidth[colID] = originalWidth + (e.pageX - originalMouseX);
					}
				});
			});
		}}
	/>
</div>

<style>
	.SvelTableHeading {
		display: flex;
		flex-direction: row;
		border: 1px solid black;
		font-weight: bold;
		overflow: auto;
	}
	.resizer {
		margin-left: auto;
		margin-right: 0;
		width: 3px;
		height: 18px;
	}
	.resizer:hover {
		background-color: gray;
		cursor: ew-resize;
	}
</style>
