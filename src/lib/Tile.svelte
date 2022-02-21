<script lang="ts">
  // This expects a --tile-size CSS variable to be present.
  import { State } from "$lib/game";
  import { formatLetter } from "$lib/settings";

  export let letter = " ";
  export let flipped = false;
  export let focused = false;
  export let state: State = State.Unknown;
  $: label = $formatLetter(letter);
</script>

<div class={state} class:flipped class:focused>
  <span class="webkit-aa-fix">{label}</span>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 200ms ease-in, box-shadow 50ms ease, border 50ms ease;
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
  div.unknown.focused {
    border: 2px solid var(--link-color);
    box-shadow: 0 0 3px var(--link-color), 0 0 3px var(--link-color) inset;
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
