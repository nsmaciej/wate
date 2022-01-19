<script lang="ts">
  import { State } from "$lib/game";
  export let state: State = State.Unknown;
  export let big = false;
</script>

<button on:click class:big class={state}>
  <slot />
</button>

<style>
  button {
    border: none;
    border-radius: 4px;
    font-family: inherit;
    height: 50px;
    flex: 1;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
    font-size: 14px;
    user-select: none;
    padding: 3px;
    text-transform: uppercase;
  }
  :global(.linja-pona) button {
    font-size: 18px;
  }
  button:hover {
    filter: brightness(105%);
  }
  button:active {
    transform: translateY(1px);
  }
  button.big {
    flex: 1.5;
    font-size: 9px;
  }
  :global(.linja-pona) button.big {
    font-size: 30px;
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
