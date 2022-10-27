<script lang="ts">
  import LanguagePicker from "$lib/modals/atoms/LanguagePicker.svelte";
  import DemoRow from "$lib/modals/atoms/DemoRow.svelte";
  import count from "$lib/countClick";
  import { wordy } from "$src/config.json";
  import {
    effectiveLocale,
    formatLetterSentence,
    sitelenLocale,
  } from "$lib/settings";
  import { State } from "$lib/game";
  import { derived } from "svelte/store";

  // Only needed here since everywhere else we rely on the tok-x-sp locale.
  const sitelen = derived(
    sitelenLocale,
    (isSp) => (tokipona: string, sitelen: string) => isSp ? sitelen : tokipona
  );

  const combine = derived(
    sitelenLocale,
    (isSp) => (tokipona: string) =>
      isSp ? tokipona.split(" ").join("+") : tokipona
  );

  $: latinDot = $sitelenLocale ? "" : ".";
</script>

{#if !wordy}
  <LanguagePicker />
{/if}

{#if $effectiveLocale === "en"}
  {#if wordy}
    <p>
      Wordy is an open source game inspired by Wordle. Play the original
      <a use:count href="https://www.nytimes.com/games/wordle/index.html"
        >here</a
      >. You can also play a version in the constructed language Toki Pona
      <a use:count href="https://wate.maciej.ie/">here</a>.
    </p>
  {:else}
    <p>
      Wate is an open source Toki Pona game inspired by Wordle. Play the
      original
      <a use:count href="https://www.nytimes.com/games/wordle/index.html"
        >here</a
      >. You can also play a version with an English word list
      <a use:count href="https://wordy.maciej.ie/">here</a>.
    </p>
  {/if}
  <p>
    Project by
    <a use:count href="https://maciej.ie">Maciej Goszczycki</a>. Check out the
    code on
    <a use:count href="https://github.com/mgoszcz2/wate">GitHub</a>.
  </p>
  <h2>Rules</h2>
  You need to guess a word in five tries. After each guess the color of the tiles
  will change:
  <div class="demo">
    <div class="demo-grid">
      <DemoRow
        letters={wordy ? "today" : "toki"}
        state={State.Correct}
        statePosition={0}
      />
      <p>The letter <b>T</b> is in the word and in the correct spot.</p>
      <DemoRow
        letters={wordy ? "favor" : "kasi"}
        state={State.Present}
        statePosition={1}
      />
      <p>The letter <b>A</b> is in the word but in a different spot.</p>
      <DemoRow
        letters={wordy ? "fewer" : "kule"}
        state={State.Absent}
        statePosition={3}
      />
      <p>The letter <b>E</b> is not in the word.</p>
    </div>
  </div>
{:else}
  <p>
    musi {$sitelen("Wate", "[_waso_alasa_toki_esun]")} li sama musi nanpa wan
    {$sitelen("Wordle", "[_waso_alasa_toki_esun]")}.
    <a
      use:count
      href="https://www.nytimes.com/games/wordle/index.html"
      title="Wordle">o musi e musi {$sitelen("Wordle", "nanpa wan")}</a
    >. musi ni li lon toki {$sitelen("Inli", "[_ilo_nasa_linja_ijo]")} kin.
    <a href="https://wordy.maciej.ie/">o musi e ona</a>.
  </p>
  <p>
    lipu ni tan
    <a use:count href="https://maciej.ie" title="Maciej Goszczycki"
      >jan {$sitelen("Masije", "[_mun_ante_sona_ilo_jan_esun]")}</a
    >. o lukin e ilo kon ona lon
    <a use:count href="https://github.com/mgoszcz2/wate" title="GitHub"
      >lipu {$sitelen("GitHub", "[_kulupu_ilo_toki_awen_pona]")}</a
    >.
  </p>
  <h2>nasin musi li seme?</h2>
  sina wile sona e nimi. tenpo luka la sina ken pana e nimi. pana la ona li kama
  kule e ni:
  <div class="demo">
    {#key $effectiveLocale}
      <div class="demo-grid">
        <DemoRow letters="toki" state={State.Correct} statePosition={0} />
        <p>
          sitelen <b>{$formatLetterSentence("t")}</b>
          li lon{latinDot}
        </p>
        <DemoRow letters="kasi" state={State.Present} statePosition={1} />
        <p>
          sitelen <b>{$formatLetterSentence("a")}</b>
          li lon. taso ona lon {$combine("poki ante")}{latinDot}
        </p>
        <DemoRow letters="kule" state={State.Absent} statePosition={3} />
        <p>
          sitelen <b>{$formatLetterSentence("e")}</b>
          li lon ala{latinDot}
        </p>
      </div>
    {/key}
  </div>
{/if}

<style>
  .demo-grid {
    display: grid;
    grid: auto-flow / auto auto;
    gap: 20px 15px;
    align-items: center;
    justify-content: start;
  }
  @media (max-width: 450px) {
    .demo-grid {
      display: flex;
      flex-direction: column;
      gap: 0.7em;
      text-align: center;
    }
    .demo {
      display: flex;
      justify-content: center;
    }
  }
</style>
