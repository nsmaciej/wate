<script lang="ts">
  import { State } from "$lib/game";
  export let state: State = State.Unknown;
  export let big = false;
</script>

<button on:click class:big class={state} tabindex="-1">
  <slot />
</button>

<style>
  button {
    border-radius: 4px;
    height: 50px;
    flex: 1;
    font-weight: 700;
    padding: 3px;
    transition: background 100ms ease, color 100ms ease;
  }
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
  button.big {
    flex: 1.5;
  }
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
