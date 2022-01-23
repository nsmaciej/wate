<script lang="ts">
  import type { SegmentContext } from "$lib/SegmentedControl.svelte";
  import { getContext } from "svelte";
  import { fixSitelenForSafari } from "$lib/utils";

  export let key = "";
  export let title = "";

  const context = getContext<SegmentContext>("segment");
  context.register(key);
</script>

<button on:click={() => context.select(key)}>
  {fixSitelenForSafari(title)}
</button>

<style>
  button {
    padding: 0 5px;
    width: 100%;
    z-index: 2;
    -webkit-tap-highlight-color: transparent;
  }
</style>
