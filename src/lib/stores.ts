import { writable } from "svelte/store";

export const absentLetters = writable(new Set<string>());
export const correctLetters = writable(new Set<string>());
export const presentLetters = writable(new Set<string>());
