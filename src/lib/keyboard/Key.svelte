<script lang="ts">
  import { State } from "$lib/game";
  export let state: State = State.Unknown;
  export let big = false;
  export let offset = false;
</script>

<!-- The preventDefault here prevents these buttons from ever getting focus. -->
<button
  on:click
  on:mousedown={(e) => e.preventDefault()}
  class:big
  class:offset
  class={state}
  tabindex="-1"
>
  <slot />
</button>

<style>
  button {
    border-radius: 4px;
    height: 50px;
    font-weight: 700;
    padding: 3px;
    transition: background 100ms ease, color 100ms ease;
    grid-column-end: span 2;
  }
  button.big {
    grid-column-end: span 3;
    font-size: 0.9em;
  }
  :global(.linja-pona) button.big {
    font-size: 1em;
  }
  button.offset {
    grid-column-start: 2;
  }

  /* States. */
  @media (hover) {
    /* Disable the hover on mobile devices. */
    button:hover {
      filter: brightness(105%);
    }
    :global(.dark) button:hover {
      filter: brightness(115%);
    }
  }
  button:active {
    transform: translateY(1px);
  }

  /* Colors. */
  :global(.linja-pona) button.big {
    color: var(--link-color);
  }
  button.unknown {
    background: var(--key-bg);
    color: var(--key-fg);
  }
  button.absent {
    background: var(--absent-bg);
    color: var(--absent-fg);
  }
  button.present {
    background: var(--present-bg);
    color: var(--present-fg);
  }
  button.correct {
    background: var(--correct-bg);
    color: var(--correct-fg);
  }
</style>
