<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { correctLetters, absentLetters, presentLetters } from "$lib/stores";
  import { State } from "$lib/game";
  import Key from "$lib/Key.svelte";
  export let letters = "";

  const dispatch = createEventDispatcher();
  function letterState(
    $correctLetters,
    $absentLetters,
    $presentLetters,
    letter: string
  ): State {
    if ($correctLetters.has(letter)) return State.Correct;
    if ($absentLetters.has(letter)) return State.Absent;
    if ($presentLetters.has(letter)) return State.Present;
    return State.Unknown;
  }
</script>

<div>
  <slot name="start" />
  {#each letters as letter}
    <Key
      on:click={() => dispatch("press", letter)}
      state={letterState(
        $correctLetters,
        $absentLetters,
        $presentLetters,
        letter
      )}
    >
      {letter.toUpperCase()}
    </Key>
  {/each}
  <slot name="end" />
</div>

<style>
  div {
    display: flex;
    margin: 4px 0;
  }
</style>
