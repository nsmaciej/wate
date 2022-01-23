import { Mode } from "$lib/settings";

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
      return (x) => x >= 2;
    case Mode.Kijetesantakalu:
      return (x) => x === 15;
    case Mode.Four:
    default:
      return (x) => x === 4;
  }
}

export function currentGameDay(): number {
  const secondsSinceStart = Math.floor(Date.now() / 1000) - 1642464000;
  return Math.floor(secondsSinceStart / 86400);
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
  rows: string[]
): string {
  let result = `Wate ${gameDay + 1} ${rows.length}/${ROW_COUNT}\n`;
  for (const row of rows) {
    for (const x of findRowStates(solution, row)) {
      result += x === State.Correct ? "🟩" : x === State.Present ? "🟨" : "⬜";
    }
    result += "\n";
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
