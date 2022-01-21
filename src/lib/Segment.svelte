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
    color: #000;
    font-size: min(5vw, var(--font-size));
    padding: 0 5px;
    width: 100%;
    z-index: 2;
    -webkit-tap-highlight-color: transparent;
  }
</style>
