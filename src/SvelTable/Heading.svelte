<script>
	export let displayText = '';
	export let colID = 0;
	import { columnWidth } from './store';

	const getLeftPos = (colID) => {
		if (colID === 0) return $columnWidth[0] + 7;
		if (colID > 0) return $columnWidth[0] + 7 + ($columnWidth[colID] + 2) * colID;
	};
</script>

<div class="SvelTableHeading" {colID} style="width: {$columnWidth[colID] + 'px'};">
	{displayText}
</div>
<div class="ResizeComponent" style="left: {getLeftPos(colID) + 'px'}" />

<style>
	.SvelTableHeading {
		top: 0px;

		border: 1px solid black;
		font-weight: bold;
	}
	.ResizeComponent {
		height: 20px;
		width: 10px;
		color: black;
		background-color: black;
		position: absolute;
		cursor: ew-resize;
		pointer-events: all;
		z-index: 5;
	}
</style>
