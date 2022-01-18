<script lang="ts">
  import { State } from "$lib/game";

  export let letter: string;
  export let anim: string;
  export let state: State = State.Unknown;
</script>

<div class="{state} {anim}">
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
  }
  @media (max-height: 600px) {
    div {
      font-size: 1em;
    }
  }
  div.unknown {
    border: 2px solid #cacaca;
    /* box-shadow: inset 0px 0px 0px 2px #cacaca; */
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
  @keyframes FlipIn {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(-90deg);
    }
  }
  div.FlipIn {
    animation-name: FlipIn;
    animation-duration: 250ms;
    animation-timing-function: ease-in;
  }
  div.FlipOut {
    animation-name: FlipOut;
    animation-duration: 250ms;
    animation-timing-function: ease-in;
  }
  @keyframes FlipOut {
    0% {
      transform: rotateX(-90deg);
    }
    100% {
      transform: rotateX(0);
    }
  }
</style>
