<script lang="ts">
  import { State } from "$lib/game";
  import { formatLetter } from "$lib/settings";

  export let letter = " ";
  export let flipped = false;
  export let demo = false;
  export let agressiveScaling = false;
  export let state: State = State.Unknown;
  $: label = $formatLetter(letter);
</script>

<div class={state} class:flipped class:demo class:agressiveScaling>
  {label}
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 200ms ease-in;
    /* This stops the grid caring about our content. */
    min-width: 0;
    user-select: none;
    -webkit-user-select: none;
    font-weight: 900;
  }

  /* Transitions. */
  div.flipped {
    transform: rotateX(-90deg);
  }
  @media (prefers-reduced-motion) {
    div {
      transition: none;
    }
    div.flipped {
      transform: none;
    }
  }

  /* Font sizes. */
  div {
    font-size: clamp(10px, 8vw, 35px);
  }
  .demo {
    font-size: 28px;
    font-weight: 700;
  }
  .agressiveScaling {
    font-size: clamp(10px, 3vw, 35px);
  }
  :global(.linja-pona) div {
    border-radius: 8px;
  }

  /* Colors. */
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
</style>
