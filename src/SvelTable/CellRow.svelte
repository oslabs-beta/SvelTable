<script>
	import Cell from './Cell.svelte';
	export let rowData = {};
</script>

<div class="SvelTableRow">
	{#each Object.values(rowData) as keyVal, j}
		<Cell displayText={keyVal} colID={j} />
	{/each}
</div>

<style>
	.SvelTableRow {
		display: flex;
		flex-direction: row;
	}
</style>
