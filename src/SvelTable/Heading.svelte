<script>
	export let displayText = '';
	export let colID = 0;
	import { columnWidth, columnMinWidth } from './store';

	/* Create handler for resetting 'columnWidth' at specific 'colID':
		- colID correspond to specific column index
		- handleColResize will access columnWidth[colID] and increase OR decrease that value
		- every cell/heading dependent on that value will respond to the change
		- 
			(Look into accessing local storage)We can save frontend width data into client's local storage in their browser;
				have logic to check client's local storage first to see if there's a width valuye in there
				if there is, use that instead
				
	*/

	// Monitor user's mouse movement and location; not currently being used. Referenced from: https://svelte.dev/tutorial/inline-handlers
	let m = { y: 0 };
	function handleMousemove(event) {
		m.y = event.clientY;
	}

</script>

<div
	class="SvelTableHeading"
	{colID}
	style="min-width: {$columnMinWidth + 'px'}; width: {$columnWidth[colID] + 'px'};"
	on:click="{(e) => {
		$columnWidth[colID] += 1;
	}}"
	>
	{displayText}
</div>

<style>
	.SvelTableHeading {
		border: 1px solid black;
		font-weight: bold;
		/* resize: horizontal; */
		cursor: ew-resize;
		overflow: auto;
	}
</style>
