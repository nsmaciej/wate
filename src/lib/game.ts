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
const WORDY_EPOCH = dayjs("2022-02-17");
const GAME_EPOCH = wordy ? WORDY_EPOCH : WATE_EPOCH;

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

export interface EmojiArtConfig {
  discord: boolean;
  guessMode: GuessMode;
  name: string;
}

export function generateEmojiArt(
  gameDay: number,
  solution: string,
  rows: string[],
  { name, discord, guessMode }: EmojiArtConfig
): string {
  const medals = guessModeMedal(guessMode);
  const count = gameLost(solution, rows) ? "X" : rows.length;
  let result = `${name}${medals} ${gameDay + 1} ${count}/${ROW_COUNT}\n`;
  for (const [i, row] of rows.entries()) {
    const rowStates = findRowStates(solution, row);
    for (const x of rowStates) {
      result += x === State.Correct ? "🟩" : x === State.Present ? "🟨" : "⬛";
    }
    
    // Only include Discord spoilers and new lines if we haven't won yet
    if (!rowStates.every((s) => s === State.Correct)) {
      if (discord) result += ` ||\`${row.toUpperCase()}\`||`;
      if (i < ROW_COUNT - 1) result += "\n";
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

/// Returns true if the item was present.
function removeFromArrayBag<T>(bag: T[], item: T): boolean {
  const ix = bag.lastIndexOf(item);
  if (ix < 0) return false;
  bag.splice(ix, 1);
  return true;
}

export interface HardModeJudgment {
  letter: string;
  position?: number;
}

export function validHardModeGuess(
  solution: string,
  rows: string[],
  guess: string
): HardModeJudgment | "valid" {
  if (rows.length === 0) return "valid";

  // Only check last row, don't try to check for "integrity" of the playthrough.
  const lastRow = rows[rows.length - 1];
  const lastRowHints = findRowStates(solution, lastRow);
  const guessNonCorrectLetters = [];

  // Check that we used all correct hints.
  for (let i = 0; i < solution.length; ++i) {
    if (lastRowHints[i] === State.Correct) {
      if (guess[i] !== lastRow[i]) return { letter: lastRow[i], position: i };
    } else {
      guessNonCorrectLetters.push(guess[i]);
    }
  }

  // Check that we used all present hints.
  for (let i = 0; i < solution.length; ++i) {
    if (
      lastRowHints[i] === State.Present &&
      !removeFromArrayBag(guessNonCorrectLetters, lastRow[i])
    ) {
      return { letter: lastRow[i] };
    }
  }

  return "valid";
}

export function findRowStates(solution: string, guess: string): State[] {
  const states: State[] = [];
  const presentSolutionLetters = [];

  for (let i = 0; i < solution.length; ++i) {
    if (guess[i] === solution[i]) {
      states[i] = State.Correct;
    } else {
      presentSolutionLetters.push(solution[i]);
    }
  }

  for (let i = 0; i < solution.length; ++i) {
    if (guess[i] === solution[i]) continue;
    if (removeFromArrayBag(presentSolutionLetters, guess[i])) {
      states[i] = State.Present;
    } else {
      states[i] = State.Absent;
    }
  }
  return states;
}

export function gameWon(solution: string, rows: string[]): boolean {
  return rows[rows.length - 1] === solution;
}

export function gameLost(solution: string, rows: string[]): boolean {
  return rows[rows.length - 1] !== solution && rows.length >= ROW_COUNT;
}

export function gameFinished(solution: string, rows: string[]): boolean {
  return rows[rows.length - 1] === solution || rows.length >= ROW_COUNT;
}

export type RuleJudgement =
  | { rule: "notEnoughLetters" }
  | { rule: "notInDictionary" }
  | ({ rule: "badHardModeGuess" } & HardModeJudgment)
  | { rule: "valid" };

export function checkRules(
  solution: string,
  guess: string,
  guessMode: GuessMode,
  rows: string[],
  dictionary: string[]
): RuleJudgement {
  if (guess.length < solution.length) {
    return { rule: "notEnoughLetters" };
  }
  if (guessMode !== GuessMode.Easy && !dictionary.includes(guess)) {
    return { rule: "notInDictionary" };
  }
  if (guessMode === GuessMode.Hard) {
    const hardModeJudgment = validHardModeGuess(solution, rows, guess);
    if (hardModeJudgment !== "valid") {
      return { rule: "badHardModeGuess", ...hardModeJudgment };
    }
  }
  return { rule: "valid" };
}
