<script lang="ts">
  import type { SegmentContext } from "$lib/SegmentedControl.svelte";
  import { getContext } from "svelte";

  export let key = "";
  export let title = "";

  const context = getContext<SegmentContext>("segment");
  context.register(key);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  // Uncombine sp character in Safari to fix alignment.
  $: safariFixTitle = isSafari ? title.replace(/[+-]/, " ") : title;
</script>

<button on:click={() => context.select(key)}>
  {safariFixTitle}
</button>

<style>
  button {
    padding: 0 5px;
    width: 100%;
    z-index: 2;
    -webkit-tap-highlight-color: transparent;
  }
</style>
