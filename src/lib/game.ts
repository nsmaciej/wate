export enum State {
  Unknown = "unknown",
  Absent = "absent",
  Correct = "correct",
  Present = "present",
}

export function findStates(solution: string, row: string): State[] {
  const states: State[] = [];
  const leftovers = new Map<string, number>();

  if (row.includes(" ") || row.length !== solution.length) {
    return new Array(solution.length).fill(State.Unknown);
  }

  for (let i = 0; i < solution.length; ++i) {
    if (row[i] == solution[i]) {
      states[i] = State.Correct;
    } else {
      leftovers.set(solution[i], 1 + (leftovers.get(solution[i]) ?? 0));
    }
  }

  for (let i = 0; i < solution.length; ++i) {
    if (row[i] === solution[i]) continue;
    const left = leftovers.get(row[i]) ?? 0;
    if (left > 0) {
      states[i] = State.Present;
      leftovers.set(row[i], left - 1);
    } else {
      states[i] = State.Absent;
    }
  }
  return states;
}
