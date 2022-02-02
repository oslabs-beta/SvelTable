<script>
  /* NOTES
  export creates a prop for the component
  */

  /* PSEUDOCODE
    columns are an array of all the keys of the obj
  */
  export let columnData = [];
  // console.log('columnData inside Column Component',columnData)
  


  // columnData = ['id','name','hobby','city']
  
  /*
  loop thru columnData
    create divs for each ele in array
  */
</script>

<div class='ColumnContainer'>
  {#each columnData as heading (heading.id)}
    <div class='Column' >{heading}</div>
    <div class='resize'></div>
  {/each}
</div>


<style>
  .Column {
    display: flex;
    flex-direction: row;
    border: solid black;
  }
  .ColumnContainer {
    display: flex;
    flex-direction: row;
  }
  .resize {
    /* margin-left: 10px;
    margin-right: 10px; */
    border: solid;
    border-width: 1px;
  }
  .resize:hover {
    color: red;
  }
</style>
