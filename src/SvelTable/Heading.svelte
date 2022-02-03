<script>
	export let displayText = '';
	export let colID = 0;
	import { columnWidth } from './store';
</script>

<div class="SvelTableHeading" {colID} style="width: {$columnWidth[colID].toString() + 'px'};">
	{displayText}
</div>

<style>
	.SvelTableHeading {
		border: 1px solid black;
		font-weight: bold;
	}
</style>
