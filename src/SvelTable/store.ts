import { writable } from 'svelte/store';
export const columnWidth = writable([])
export const columnSettings = writable({
  columnWidth: [],
})