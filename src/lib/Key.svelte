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
    height: 50px;
    flex: 1;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
  button.big {
    flex: 1.5;
  }
  button.uknown {
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
