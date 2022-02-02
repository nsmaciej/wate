<script context="module" lang="ts">
  import { readable } from "svelte/store";
  import { unixTimestamp, nextDayTimestamp } from "$lib/game";

  const timestamp = readable<number>(null, (set) => {
    set(unixTimestamp());
    const interval = setInterval(() => {
      set(unixTimestamp());
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<script lang="ts">
  import { effectiveLocale } from "$lib/settings";
  import { numberToSitelen } from "$lib/utils";
  import { _ } from "svelte-i18n";

  const nextDay = nextDayTimestamp();
  $: secondsLeft = Math.max(0, nextDay - $timestamp);
  $: hours = Math.floor(secondsLeft / 60 / 60);
  $: minutes = Math.floor((secondsLeft / 60) % 60);
  $: seconds = secondsLeft % 60;

  function pad(n: number): string {
    return String(n).padStart(2, "0");
  }
</script>

{#if $effectiveLocale === "tok-x-sp"}
  <div class="sitelen">
    musi [_waso_alasa_toki_esun] li kama sin lon tenpo+suno sin.<br />
    <div class="tenpo">
      ona li kama kepeken ilo+tenpo lon ni:
      <div class="tenpo-grid">
        <span class="desc">tenpo suli:</span>
        <span class="nanpa">{numberToSitelen(hours)}</span>
        <span class="desc">tenpo lili:</span>
        <span class="nanpa">{numberToSitelen(minutes)}</span>
        <span class="desc">tenpo lili lili:</span>
        <span class="nanpa">{numberToSitelen(seconds)}</span>
      </div>
    </div>
  </div>
{:else}
  <div class="countdown">
    <p>{$_("share.next")}</p>
    <b class="clock">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</b>
  </div>
{/if}

<style>
  .tenpo {
    margin-top: 11px;
    font-size: var(--font-size-small);
    color: var(--accent-color);
  }
  .tenpo-grid {
    display: grid;
    grid: auto-flow / max-content 1fr;
  }
  .nanpa {
    letter-spacing: 0.3ex;
  }
  .desc {
    text-align: right;
    padding-right: 1.5ex;
  }

  /* Latin. */
  .countdown {
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .clock {
    font-size: 24px;
    margin-top: 6px;
  }
</style>
