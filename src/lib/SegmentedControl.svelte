<script lang="ts">
  import { setContext } from "svelte";

  export let selected = "";
  let keys: string[] = [];

  setContext("segment", {
    select(key: string): void {
      selected = key;
    },
    register(key: string): void {
      keys = [...keys, key];
    },
  });
  $: selectedIndex = Math.max(
    keys.findIndex((x) => x === selected),
    0
  );
</script>

<div class="group" role="group">
  <div
    class="selected"
    style:left="calc({(100 / keys.length) * selectedIndex}% + 3px)"
    style:width="calc({100 / keys.length}% - 6px)"
  />
  <slot />
</div>

<style>
  .group {
    display: grid;
    grid: auto / auto-flow 1fr;
    width: 100%;
    position: relative;
    height: 38px;
    border-radius: 7px;
    background: var(--segmented-background);
  }
  .selected {
    background: var(--segmented-selected);
    position: absolute;
    transition: left 150ms ease-out;
    border-radius: 5px;
    height: calc(100% - 6px);
    top: 3px;
    box-shadow: 0 1px 3px #0000002d;
  }
</style>
