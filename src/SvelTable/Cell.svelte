<script>
	export let displayText = '';
	export let colID = 0;
	export let rowID = 0;
	import { columnWidth, columnMinWidth, overflowwrap } from './store';
</script>

<div
	class="SvelTableCell"
	{colID}
	{rowID}
	style="min-width: {$columnMinWidth + 'px'}; width: {$columnWidth[colID] +
		'px'}; overflow-wrap: {$overflowwrap};"
>
	{displayText}
</div>

<style>
	.SvelTableCell {
		color: black;
		background-color: white;
		border: 1px solid lightgray;
	}
</style>
