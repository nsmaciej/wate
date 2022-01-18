import { writable } from "svelte/store";
import type { State } from "$lib/game";

export const letterStates = writable(new Map<string, State>());
