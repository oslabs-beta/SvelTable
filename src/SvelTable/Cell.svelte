<script>
	export let displayText = '';
	export let colID = 0;
	export let rowID = 0;
	import { columnWidth, columnMinWidth } from './store';
</script>

<div class="SvelTableCell" {colID} {rowID} style="min-width: {$columnMinWidth + 'px'}; width: {$columnWidth[colID] + 'px'};">
	{displayText}
</div>

<style>
	.SvelTableCell {
		border: 1px solid black;
	}
</style>
