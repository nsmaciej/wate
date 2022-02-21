<script context="module" lang="ts">
  import type { Dayjs } from "dayjs";
  import dayjs from "dayjs";
  import duration from "dayjs/plugin/duration.js";
  import { readable } from "svelte/store";
  import { nextDayTime } from "$lib/game";

  dayjs.extend(duration);

  const currentTime = readable<Dayjs>(null, (set) => {
    set(dayjs());
    const interval = setInterval(() => {
      set(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<script lang="ts">
  import { sitelenLocale } from "$lib/settings";
  import { numberToSitelen } from "$lib/utils";
  import { _ } from "svelte-i18n";

  const nextDay = nextDayTime();
  $: timeLeft = dayjs.duration(Math.max(0, nextDay.diff($currentTime)));
</script>

{#if $sitelenLocale}
  <div class="sitelen">
    musi [_waso_alasa_toki_esun] li kama sin lon tenpo+suno sin.<br />
    <div class="tenpo">
      ona li kama kepeken ilo+tenpo lon ni:
      <div class="tenpo-grid">
        <span class="desc">tenpo suli:</span>
        <span class="nanpa"
          >{numberToSitelen(timeLeft.hours(), { nanpa: false })}</span
        >
        <span class="desc">tenpo lili:</span>
        <span class="nanpa"
          >{numberToSitelen(timeLeft.minutes(), { nanpa: false })}</span
        >
        <span class="desc">tenpo lili lili:</span>
        <span class="nanpa"
          >{numberToSitelen(timeLeft.seconds(), { nanpa: false })}</span
        >
      </div>
    </div>
  </div>
{:else}
  <div class="countdown">
    <p>{$_("share.next")}</p>
    <b class="clock">{timeLeft.format("HH:mm:ss")}</b>
  </div>
{/if}

<style>
  .sitelen {
    width: 100%;
  }
  .tenpo {
    margin-top: 11px;
    font-size: var(--font-size-small);
    color: var(--secondary-color);
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
    padding-right: 0.5ex;
  }

  /* Latin. */
  .countdown {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .clock {
    font-size: 24px;
    margin-top: 6px;
  }
</style>
