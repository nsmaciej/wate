<script lang="ts">
  import LanguagePicker from "$lib/modals/atoms/LanguagePicker.svelte";
  import { effectiveLocale, sitelenLocale } from "$lib/settings";
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

{#if $effectiveLocale === "en"}
  <p>
    Wate is an open source clone of Wordle in Toki Pona. Play the original
    <a href="https://www.powerlanguage.co.uk/wordle/">here</a>.
  </p>
  <p>
    Project by
    <a href="https://maciej.ie">Maciej Goszczycki</a>.
  </p>
  <p>
    Sitelen Pona typeset in
    <a href="https://musilili.net/linja-pona/">Linja Pona</a>.
  </p>
  <p>
    Check out the code on
    <a href="https://github.com/mgoszcz2/wate">GitHub</a>.
  </p>
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
    >.
  </p>
  <p>
    {$combine("sitelen pona")} li kepeken
    <a href="https://musilili.net/linja-pona/" title="linja pona"
      >{$combine("linja pona")}</a
    >.
  </p>
  <p>
    o lukin e ilo kon ni lon
    <a href="https://github.com/mgoszcz2/wate" title="GitHub"
      >{$sitelen("lipu GitHub", "lipu [_kulupu_ilo_toki_awen_pona]")}</a
    >.
  </p>
{/if}

<LanguagePicker />
