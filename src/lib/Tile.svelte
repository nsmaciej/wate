<script lang="ts">
  import { State } from "$lib/game";
  import { formatLetter } from "$lib/settings";

  export let letter = " ";
  export let flipped = false;
  export let state: State = State.Unknown;
  $: label = $formatLetter(letter);
</script>

<div class={state} class:flipped>{label}</div>

<style>
  div {
    font-size: clamp(10px, 10vw, 28px);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    font-weight: bold;
    transition: transform 200ms ease-in;
    /* This stops the grid caring about our content. */
    min-width: 0;
  }
  :global(.linja-pona) div {
    font-size: clamp(10px, 10vw, 35px);
    border-radius: 8px;
  }
  :global(.kijetesantakalu) div {
    font-size: clamp(10px, 3vw, 35px);
  }
  :global(.linja-pona) :global(.kijetesantakalu) div {
    font-size: clamp(10px, 3vw, 35px);
  }
  div.unknown {
    border: 2px solid var(--unknown-tile-border);
    background: none;
  }
  div.absent {
    background: var(--absent-bg);
    color: var(--absent-fg);
  }
  div.present {
    background: var(--present-bg);
    color: var(--present-fg);
  }
  div.correct {
    background: var(--correct-bg);
    color: var(--correct-fg);
  }
  div.flipped {
    transform: rotateX(-90deg);
  }
</style>
