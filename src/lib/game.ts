// Be careful with the imports here to keep this testable.
import type { Dayjs } from "dayjs";
import { wordy } from "$static/config.json";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const ROW_COUNT = wordy ? 6 : 5;

export const enum TokiPonaMode {
  Four = "four",
  All = "all",
  Kijetesantakalu = "kijetesantakalu",
}

export const enum GuessMode {
  Easy = "easy",
  Normal = "normal",
  Hard = "hard",
}

export enum State {
  Unknown = "unknown",
  Absent = "absent",
  Correct = "correct",
  Present = "present",
}

function modePredicate(mode: TokiPonaMode): (x: number) => boolean {
  switch (mode) {
    case TokiPonaMode.All:
      return (x) => x >= 2 && x !== 4 && x !== 15;
    case TokiPonaMode.Kijetesantakalu:
      return (x) => x === 15;
    case TokiPonaMode.Four:
    default:
      return (x) => x === 4;
  }
}

const WATE_EPOCH = dayjs("2022-01-18");
const WORDLE_EPOCH = dayjs("2021-06-19");
const GAME_EPOCH = wordy ? WORDLE_EPOCH : WATE_EPOCH;

export function nextDayTime(): Dayjs {
  // Note this works with daylight saving since dayjs keeps the hour the same.
  return GAME_EPOCH.add(currentGameDay() + 1, "day");
}

export function currentGameDay(): number {
  return dayjs().diff(GAME_EPOCH, "day");
}

export function selectTokiPonaWord(
  words: string[],
  tokiPonaMode: TokiPonaMode,
  day: number
): string {
  const predicate = modePredicate(tokiPonaMode);
  const candidates = words.filter((x) => predicate(x.length));
  return candidates[day % candidates.length];
}

export function selectEnglishWord(words: string[], day: number): string {
  return words[day % words.length];
}

export function guessModeMedal(mode: GuessMode): string {
  if (mode === GuessMode.Easy) return "°";
  if (mode === GuessMode.Hard) return "*";
  return "";
}

export function generateEmojiArt(
  gameDay: number,
  solution: string,
  rows: string[],
  {
    sitelen,
    discord,
    guessMode,
  }: { sitelen: boolean; discord: boolean; guessMode: GuessMode }
): string {
  const medals = guessModeMedal(guessMode);
  const name = wordy ? "Wordy" : sitelen ? "wate" : "Wate";
  // Just like the real Wordle we use the index directly. The first day is day 0.
  let result = `${name}${medals} ${gameDay} ${rows.length}/${ROW_COUNT}\n`;
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

export function validHardModeGuess(
  solution: string,
  rows: string[],
  guess: string
): { use: string; position?: number } | undefined {
  return;
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
