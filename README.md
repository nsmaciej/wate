**[<img src="static/icon-tok.png" width="18" align="center"> Play Wate][wate]**  
Toki Pona Wordle avaliable in English, Toki Pona, and Sitelen Pona.

**[<img src="static/icon-en.png" width="18" align="center"> Play Wordy][wordle]**  
English Wordle avaliable in English.

# Wate & Wordy

[![Build and Deploy](https://github.com/maciej-irl/wate/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/maciej-irl/wate/actions/workflows/build-and-deploy.yml)

[Wate][wate] is an open source game inspired by [Wordle][wordle]. Wate has been
written with Toki Pona words in mind, with the interface avaliable in English,
Toki Pona, and the Sitelen Pona script. However it can also be configured to use
English words, using the [Wordy][wordy] mode.

[wordle]: https://wate.maciej.ie
[wate]: https://wate.maciej.ie
[wordy]: https://wordy.maciej.ie

## Features

- Clean interface
- Sharing with Discord spoiler tags
- No cookies, no personally identifiable information
- Support for English, Toki Pona and the Sitelen Pona script
- Easy mode - Allows unrecognized words as guesses
- Hard mode - Requires guesses to use all previous hints
- Respects Reduced Motion preference
- Color blind mode
- Any word mode - Uses Toki Pona words of any length for solutions
- Kijetesantakalu mode - Uses 15 letter words for solutions
- Easter eggs

## Configuration

All configuration lives in `static/config.json`.
The `wordy` property, enables or disables the Wordy version of the
code:

```json
{
  "wordy": true
}
```

## Running

Install the dependencies with `npm install`, then start the development server
with:

```sh
npm run dev
```

## Building

Create a production version of Wate with:

```sh
npm run build
```

You can then preview the result using `npm run preview`.

## Translation

With exception of the `src/lib/modals/Help.svelte` code which is too complex
to easily internationalize, all translation strings can be found in
`src/locales`.

- `en.json` - Wate - English
- `tok.json` - Wate - Toki Pona
- `tok-x-sp.json` - Wate - Sitelen Pona
- `en-wordy.json` - Wordy - English
