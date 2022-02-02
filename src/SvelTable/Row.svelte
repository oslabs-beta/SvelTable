<script>
  /* PSEUDOCODE
    row are array of objects
  */
 
  // rowData received from SvelTable.svelte 
  export let rowData = [];
</script>

<div class='SveltableRowContainer'>
  
</div>

<style>
  .SveltableRowContainer {
    display: flex;
    flex-direction: column;
  }
  .SveltableRowItem{
    display: flex;
    flex-direction: row;
  }
</style>