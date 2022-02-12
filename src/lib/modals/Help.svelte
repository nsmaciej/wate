<script lang="ts">
  import LanguagePicker from "$lib/modals/atoms/LanguagePicker.svelte";
  import DemoRow from "$lib/modals/atoms/DemoRow.svelte";
  import { SITELEN_PONA_LETTERS } from "$lib/utils";
  import { effectiveLocale, sitelenLocale } from "$lib/settings";
  import { State } from "$lib/game";
  import { derived } from "svelte/store";

  const sitelen = derived(
    sitelenLocale,
    (isSp) => (tokipona: string, sitelen: string) => isSp ? sitelen : tokipona
  );

  const combine = derived(
    sitelenLocale,
    (isSp) => (tokipona: string) =>
      isSp ? tokipona.split(" ").join("+") : tokipona
  );
</script>

<LanguagePicker />

{#if $effectiveLocale === "en"}
  <p>
    Wate is an open source clone of Wordle in Toki Pona. Play the original
    <a href="https://www.powerlanguage.co.uk/wordle/">here</a>.
  </p>
  <p>
    Project by
    <a href="https://maciej.ie">Maciej Goszczycki</a>. Check out the code on
    <a href="https://github.com/mgoszcz2/wate">GitHub</a>.
  </p>
  <h2>Rules</h2>
  You need to guess a word in five tries. After each guess the color of the tiles
  will change:
  <div class="demo">
    <div class="demo-grid">
      <DemoRow letters="toki" state={State.Correct} statePosition={0} />
      <p>The letter <b>T</b> is in the word and in the correct spot.</p>
      <DemoRow letters="pona" state={State.Present} statePosition={1} />
      <p>The letter <b>O</b> is in the word but in a different spot.</p>
      <DemoRow letters="awen" state={State.Absent} statePosition={3} />
      <p>The letter <b>N</b> is not in the word.</p>
    </div>
  </div>
{:else}
  <p>
    musi {$sitelen("Wate", "[_waso_alasa_toki_esun]")} li sama musi nanpa wan
    {$sitelen("Wordle", "[_waso_alasa_toki_esun]")}.
    <a href="https://www.powerlanguage.co.uk/wordle/" title="Wordle"
      >o musi e musi {$sitelen("Wordle", "nanpa wan")}</a
    >.
  </p>
  <p>
    lipu ni tan
    <a href="https://maciej.ie" title="Maciej Goszczycki"
      >{$sitelen("jan Masije", "jan [_mun_ante_sona_ilo_jan_esun]")}</a
    >. o lukin e ilo kon ni lon
    <a href="https://github.com/mgoszcz2/wate" title="GitHub"
      >{$sitelen("lipu GitHub", "lipu [_kulupu_ilo_toki_awen_pona]")}</a
    >.
  </p>
  <h2>o alasa e nimi</h2>
  sina wile sona e nimi. tenpo luka la sina ken pana e nimi. pana la ni li kama kule
  e ni:
  <div class="demo">
    {#key $effectiveLocale}
      <div class="demo-grid">
        <DemoRow letters="toki" state={State.Correct} statePosition={0} />
        <p>
          sitelen <b>{$sitelen("T", `[_${SITELEN_PONA_LETTERS["t"]}]`)}</b> li lon.
        </p>
        <DemoRow letters="pona" state={State.Present} statePosition={1} />
        <p>
          sitelen <b>{$sitelen("O", `[_${SITELEN_PONA_LETTERS["o"]}]`)}</b> li
          lon. taso ni li lon {$combine("poka ante")}.
        </p>
        <DemoRow letters="awen" state={State.Absent} statePosition={3} />
        <p>
          sitelen <b>{$sitelen("N", `[_${SITELEN_PONA_LETTERS["n"]}]`)}</b> li lon
          ala.
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
