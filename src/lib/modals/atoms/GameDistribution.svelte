<script lang="ts">
  import { _ } from "svelte-i18n";
  import { ROW_COUNT, TokiPonaMode } from "$lib/game";
  import { finishedStats, sitelenLocale, formatNumber } from "$lib/settings";

  export let mode: TokiPonaMode = TokiPonaMode.Four;
  export let highlight = -1;
  $: [plays, scaleX] = calculateStats();

  function calculateStats(): [plays: number, barScale: number] {
    let sum = 0;
    let max = 0;
    for (const x of Object.values($finishedStats[mode])) {
      sum += x;
      max = Math.max(x, max);
    }
    return [sum, max];
  }
</script>

<div class="distribution" class:center={!$sitelenLocale}>
  {$_("share.distribution", {
    values: { times: $formatNumber(plays) },
  })}
  <div class="graph">
    {#each { length: ROW_COUNT } as _, i}
      {@const count = $finishedStats[mode][1 + i] ?? 0}
      <span class="label">{$formatNumber(1 + i, { nanpa: false })}</span>
      <div
        class="bar"
        class:current={highlight === i}
        class:round={$sitelenLocale}
        style:width={count === 0 ? "fit-content" : (100 * count) / scaleX + "%"}
      >
        {$formatNumber(count, { nanpa: false })}
      </div>
    {/each}
  </div>
</div>

<style>
  .distribution {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .distribution.center {
    align-items: center;
  }
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
    color: var(--secondary-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 4px;
  }
  .bar.round {
    border-radius: 4px;
  }
  .bar.current {
    background: var(--correct-background-soft);
    color: var(--page-background);
  }
</style>
