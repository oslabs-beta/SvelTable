<script>
	import SvelTable from '../SvelTable/SvelTable.svelte';

	const data = [
		{ id: 1, name: 'tom', hobby: 'biking', city: 'dallas' },
		{ id: 2, name: 'care', hobby: 'luna and kiko', city: 'chicago' },
		{ id: 3, name: 'brad', hobby: 'epcot', city: 'new york' },
		{ id: 4, name: 'adam', hobby: 'modals', city: 'florida' },
		{ id: 5, name: 'mimi', hobby: 'traveling', city: 'oaxaca' }
	];

</script>

<h1>Welcome to SvelTable</h1>
<SvelTable dataSet={data}/>
