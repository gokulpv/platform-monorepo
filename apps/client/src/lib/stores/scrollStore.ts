import { writable } from 'svelte/store';

// Record of pathname -> scroll position
export const scrollPositions = writable<Record<string, number>>({});
