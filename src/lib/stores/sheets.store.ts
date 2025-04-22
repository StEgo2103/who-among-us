import { writable } from 'svelte/store';

export const sheetsStore = writable<string[][]>([]);

export function setSheets(data: string[][]) {
  sheetsStore.set(data);
}