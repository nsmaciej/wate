<script lang="ts">
  import { Mode, finishedStats, effectiveLocale } from "$lib/settings";
  import { ROW_COUNT } from "$lib/game";
  import { numberForLocale } from "./utils";

  export let mode: Mode = Mode.Four;
  $: scaleX = Math.max(1, barScale(mode));

  function barScale(mode: Mode): number {
    let max = 0;
    for (let i = 0; i < ROW_COUNT; ++i) {
      max = Math.max($finishedStats[mode][i] ?? 0, max);
    }
    return max;
  }
</script>

<div class="graph">
  {#each { length: ROW_COUNT } as _, i}
    {@const count = $finishedStats[mode][1 + i] ?? 0}
    <span class="label">{numberForLocale(1 + i, $effectiveLocale)}</span>
    <div class="bar" style:width="{Math.max(8, (100 * count) / scaleX)}%">
      {numberForLocale(count, $effectiveLocale)}
    </div>
  {/each}
</div>

<style>
  .graph {
    display: grid;
    grid: auto-flow calc(var(--font-size-small) + 4px) / max-content 1fr;
    gap: 4px;
    font-size: var(--font-size-small);
    margin-top: 11px;
    width: 100%;
  }
  .label {
    text-align: right;
    align-self: center;
    padding-right: 0.5ex;
  }
  .bar {
    background: var(--segmented-background);
    color: var(--accent-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 4px;
  }
</style>
