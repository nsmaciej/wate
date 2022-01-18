<script lang="ts">
  import { State } from "$lib/game";

  export let letter: string;
  export let state: State = State.Unknown;
</script>

<div class={state}>
  {letter.toUpperCase()}
</div>

<style>
  div {
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
  }
  div.unknown {
    border: 1px solid gray;
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
