<script>
	export let displayText = '';
	export let colID = 0;
	import { columnWidth, columnMinWidth } from './store';
	

	/* Create handler for resetting 'columnWidth' at specific 'colID':
		- if user selects 
	*/
</script>


<div class="SvelTableHeading" {colID} style="min-width: {$columnMinWidth + 'px'}; width: {$columnWidth[colID] + 'px'};">
	{displayText}
</div>

<style>
	.SvelTableHeading {
		border: 1px solid black;
		font-weight: bold;
	}
</style>
