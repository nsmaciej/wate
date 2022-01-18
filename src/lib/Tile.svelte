<script lang="ts">
  import { State } from "$lib/game";

  export let letter = " ";
  export let flipped = false;
  export let state: State = State.Unknown;
</script>

<div class={state} class:flipped>
  {letter.toUpperCase()}
</div>

<style>
  div {
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    font-weight: bold;
    transition: transform 200ms ease-in;
  }
  @media (max-height: 600px) {
    div {
      font-size: 1em;
    }
  }
  div.unknown {
    border: 2px solid #cacaca;
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
