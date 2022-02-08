<script>
	import SvelTable from '../SvelTable/SvelTable.svelte';
	//adding more object will add rows
	//adding more key/value pair will add columns
	const data = [
		
		{ id: '#5', name: 'mimi', hobby: 'traveling', city: 'oaxaca', favnum: '#36' },
		{ id: 1, name: 'tom', hobby: 'biking', city: 'dallas', favnum: 36 },
		{ id: 2, name: 'care', hobby: 'dancing', city: 'chicago', favnum: 36 },
		{ id: 3, name: 'brad', hobby: 'epcot', city: 'new york', favnum: 36 },
		{ id: 4, name: 'adam', hobby: 'modals', city: 'florida', favnum: 36 },
		{ id: 5, name: 'brad', hobby: 'traveling', city: 'oaxaca', favnum: 36 },
		{ id: 5, name: '+adam', hobby: 'traveling', city: 'oaxaca', favnum: 36 }

	];

</script>

<h1>Welcome to SvelTable</h1>
<SvelTable dataSet={data}/>
