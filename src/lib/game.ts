export enum State {
  Unknown = "unknown",
  Absent = "absent",
  Correct = "correct",
  Present = "present",
}

function modePredicate(mode: string): (x: number) => boolean {
  switch (mode) {
    case "four":
      return (x) => x === 4;
    case "all":
      return () => true;
    case "kijetesantakalu":
      return (x) => x === 15;
  }
}

export function selectWord(mode: string, dictionary: string[]): string {
  const predicate = modePredicate(mode);
  const candidates = dictionary.filter((x) => predicate(x.length));
  const secondsSinceStart = Math.floor(Date.now() / 1000) - 1642464000;
  const dayIndex = Math.floor(secondsSinceStart / 86400);
  return candidates[dayIndex % candidates.length];
}

export function generateEmojiArt(
  solution: string,
  finalRow: number,
  rows: string[]
): string {
  let result = `Wate ${finalRow}/${rows.length}\n`;
  for (let i = 0; i < finalRow; ++i) {
    for (const x of findRowStates(solution, rows[i])) {
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
      if (states[i] != State.Unknown) {
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
    return new Array(solution.length).fill(State.Unknown);
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
