import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Mode } from "$lib/settings";

dayjs.extend(utc);

export const ROW_COUNT = 5;

export enum State {
  Unknown = "unknown",
  Absent = "absent",
  Correct = "correct",
  Present = "present",
}

function modePredicate(mode: Mode): (x: number) => boolean {
  switch (mode) {
    case Mode.All:
      return (x) => x >= 2 && x !== 4 && x !== 15;
    case Mode.Kijetesantakalu:
      return (x) => x === 15;
    case Mode.Four:
    default:
      return (x) => x === 4;
  }
}

// Set to `Math.floor(Date.now() / 1000) - 24 * 60 * 60 + 10` for testing.
const WATE_EPOCH_UTC = 1642464000;

export function wateEpochForLocalTime(): Dayjs {
  return dayjs.unix(WATE_EPOCH_UTC).local().startOf("day");
}

export function nextDayTime(): Dayjs {
  // Note this works with daylight saving since dayjs keeps the hour the same.
  return wateEpochForLocalTime().add(currentGameDay() + 1, "day");
}

export function currentGameDay(): number {
  return dayjs().diff(wateEpochForLocalTime(), "day");
}

export function selectWord(
  mode: Mode,
  day: number,
  dictionary: string[]
): string {
  const predicate = modePredicate(mode);
  const candidates = dictionary.filter((x) => predicate(x.length));
  return candidates[day % candidates.length];
}

export function generateEmojiArt(
  gameDay: number,
  solution: string,
  rows: string[],
  { sitelen = false, discord = false } = {}
): string {
  const medals = sitelen ? "." : "";
  let result = `Wate ${gameDay + 1} ${rows.length}/${ROW_COUNT}${medals}\n`;
  for (let i = 0; i < rows.length; ++i) {
    const row = rows[i];
    for (const x of findRowStates(solution, row)) {
      result += x === State.Correct ? "🟩" : x === State.Present ? "🟨" : "⬛";
    }
    if (i < rows.length - 1) {
      if (discord) result += ` ||\`${row.toUpperCase()}\`||`;
      result += "\n";
    }
  }
  return result;
}

export function findLetterStates(
  solution: string,
  rows: string[]
): Map<string, State> {
  const allStates = {
    [State.Correct]: new Set<string>(),
    [State.Absent]: new Set<string>(),
    [State.Present]: new Set<string>(),
  };
  for (const row of rows) {
    const states = findRowStates(solution, row);
    for (let i = 0; i < row.length; ++i) {
      if (states[i] !== State.Unknown) {
        allStates[states[i]].add(row[i]);
      }
    }
  }

  // Right-most state takes priority when coloring the key.
  const statePriority = [State.Absent, State.Present, State.Correct];
  const result = new Map<string, State>();
  for (const state of statePriority) {
    for (const letter of allStates[state]) {
      result.set(letter, state);
    }
  }
  return result;
}

export function findRowStates(solution: string, row: string): State[] {
  const states: State[] = [];
  const leftovers = new Map<string, number>();

  if (row.includes(" ") || row.length !== solution.length) {
    throw new Error(`incompatible rows "${row}" "${solution}"`);
  }

  for (let i = 0; i < solution.length; ++i) {
    if (row[i] === solution[i]) {
      states[i] = State.Correct;
    } else {
      leftovers.set(solution[i], 1 + (leftovers.get(solution[i]) ?? 0));
    }
  }

  for (let i = 0; i < solution.length; ++i) {
    if (row[i] === solution[i]) continue;
    const left = leftovers.get(row[i]) ?? 0;
    if (left > 0) {
      // Only mark as present up to the number of occurences in the solution.
      states[i] = State.Present;
      leftovers.set(row[i], left - 1);
    } else {
      states[i] = State.Absent;
    }
  }
  return states;
}
