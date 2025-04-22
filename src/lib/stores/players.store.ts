import type { Player } from '$lib/interfaces/player.interface';
import { writable } from 'svelte/store';

export const playersStore = writable<Player[]>([]);

export function setPlayers(data: Player[]) {
  playersStore.set(data);
}

export function getIndexOfPlayer(name: string) {
  let index = -1;
  playersStore.subscribe((players) => {
    index = players.findIndex((player) => player.name === name);
  });
  return index;
}
