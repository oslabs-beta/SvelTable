import { writable } from 'svelte/store';


export const columnWidth = writable([])

const testArr = ['girl', 'boy', 'them']

function sort() {
    const { subscribe, set, update } = writable(testArr)
    return {
        subscribe,
        sortAtoZ: () => update(testArr => testArr.sort()),
        sortZtoA: () => update(testArr => testArr.sort().reverse()),
        reset: () => set(testArr)
    };
}

export const sorting = sort();