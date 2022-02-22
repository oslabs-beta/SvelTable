<script>
	export let displayText = '';
	export let colID = 0;
	export let rowID = 0;
	import { columnWidth, columnMinWidth, overflowwrap } from './store';
	let resizing = false;
	let originalWidth = 0;
	let originalMouseX = 0;
</script>

<div
	class="SvelTableCell"
	{colID}
	{rowID}
	style="min-width: {$columnMinWidth + 'px'}; width: {$columnWidth[colID] +
		'px'}; overflow-wrap: {$overflowwrap};"
>
	{displayText}
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
				localStorage.setItem('localColumnWidth', JSON.stringify($columnWidth));
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
	.SvelTableCell {
		display: flex;
		flex-direction: row;
		color: black;
		background-color: white;
		border: 1px solid lightgray;
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
