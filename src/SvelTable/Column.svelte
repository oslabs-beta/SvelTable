<script>
	/* PSEUDOCODE
    columns are an array of all the keys of the obj
  */
	export let headerTitle = [];

	// headerTitle = ['id','name','hobby','city']

	/*
  loop thru headerTitle
    create divs for each ele in array
  */
</script>

<div class="SveltableColContainer">
	{#each headerTitle as heading, i}
		<div class="SveltableColumn">{heading}</div>
	{/each}
</div>

<style>
	.SveltableColumn {
		display: flex;
		flex-direction: row;
		border: 1px solid black;
	}
	.SveltableColContainer {
		display: flex;
		flex-direction: row;
	}
</style>
