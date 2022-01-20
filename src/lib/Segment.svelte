<script lang="ts">
  import { getContext } from "svelte";

  export let key = "";
  const context: any = getContext("segment");
  context.register(key);
</script>

<button on:click={() => context.select(key)}>
  <slot />
</button>

<style>
  button {
    font-weight: bold;
    font-size: min(5vw, var(--font-size));
    padding: 10px 5px;
    width: 100%;
    z-index: 2;
  }
  :global(.linja-pona) button {
    font-weight: normal;
  }
</style>
