<script lang="ts">
  // This expects a --tile-size CSS variable to be present.
  import { State } from "$lib/game";
  import { formatLetter } from "$lib/settings";

  export let letter = " ";
  export let flipped = false;
  export let state: State = State.Unknown;
  $: label = $formatLetter(letter);
</script>

<div class={state} class:flipped class:filled={letter !== " "}>
  <span class="webkit-aa-fix">{label}</span>
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

  /* Some anti-aliased characters pixels can land outside what Quartz/Safari
    considers the bounding box of the tile, preventing them from being cleaned
    up when the user deletes the character. This doesn't work when applied to
    the tile itself, so we apply it to a span that tightly wraps the character.
    See https://stackoverflow.com/questions/17575624 */
  .webkit-aa-fix {
    outline: 1px solid transparent;
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
    font-size: calc(var(--tile-size) * 0.5);
  }
  :global(.linja-pona) div {
    border-radius: 8px;
  }

  /* Colors. */
  div.unknown {
    border: 2px solid var(--unknown-tile-border);
    background: none;
  }
  div.unknown.filled {
    border: 2px solid var(--filled-tile-border);
  }
  div.absent {
    background: var(--absent-background);
    color: var(--evaluated-text-color);
  }
  div.present {
    background: var(--present-background);
    color: var(--evaluated-text-color);
  }
  div.correct {
    background: var(--correct-background);
    color: var(--evaluated-text-color);
  }
</style>
