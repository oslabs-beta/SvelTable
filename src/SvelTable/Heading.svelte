<script>
	import { createEventDispatcher } from 'svelte';

	export let displayText = '';
	export let arrowArr = [];
	export let arrow = '';
	export let colID = 0;
	import { columnWidth } from './store';
	export let isSortedAtoZ;
	const dispatch = createEventDispatcher();
</script>

<div
	on:click={() => dispatch('sortBy', {displayText, isAtoZSort:isSortedAtoZ})}
	class="SvelTableHeading"
	{colID}
	style="width: {$columnWidth[colID].toString() + 'px'};"
>
	{displayText}
	{arrow}
</div>

<style>
	.SvelTableHeading {
		border: 1px solid black;
		font-weight: bold;
	}
</style>
