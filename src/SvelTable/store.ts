// import writable from svelte store in order to create global state of variables developers can customize 
import { writable } from 'svelte/store';

export const columnWidth = writable([])
export const columnMinWidth = writable(50);
export const overflowwrap = writable('break-word');