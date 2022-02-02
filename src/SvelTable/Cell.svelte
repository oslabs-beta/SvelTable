<script>
	export let displayText = '';
	export let colID = '';
	export let rowID = '';
</script>

<div class="SvelTableCell" {colID} {rowID}>
	{displayText}
</div>

<style>
	.SvelTableCell {
		border: 1px solid black
	}
</style>