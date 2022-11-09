<script>
	import { createEventDispatcher } from 'svelte';
	export let displayText = '';
	export let arrow = '';
	export let imageIcons;
	export let colID = 0;

	import { columnWidth, columnMinWidth, overflowwrap } from './store';

	export let isSortedAtoZ;
	const dispatch = createEventDispatcher();
	let resizing = false;
	let originalWidth = 0;
	let originalMouseX = 0;
</script>

<div
	on:click={() => dispatch('sortBy', { displayText, isAtoZSort: isSortedAtoZ })}
	class="SvelTableHeading"
	{colID}
	style="min-width: {$columnMinWidth + 'px'}; width: {$columnWidth[colID] +
		'px'}; overflow-wrap: {$overflowwrap};"
>
	{displayText}
	{#if (imageIcons)}
		<img src={arrow} alt="">
	{:else}
		{arrow}
	{/if}
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
	.SvelTableHeading {
		background-color: white;
		color: black;
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
