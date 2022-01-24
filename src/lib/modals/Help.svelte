<script lang="ts">
  import LanguagePicker from "$lib/LanguagePicker.svelte";
  import { effectiveLocale } from "$lib/settings";
  import { derived } from "svelte/store";

  const sitelen = derived(
    effectiveLocale,
    (locale) => (tokipona: string, sitelen: string) =>
      locale === "tok-x-sp" ? sitelen : tokipona
  );

  const combine = derived(
    effectiveLocale,
    (locale) => (tokipona: string) =>
      locale === "tok-x-sp" ? tokipona.split(" ").join("+") : tokipona
  );
</script>

<LanguagePicker />

{#if $effectiveLocale === "en"}
  <p>
    This is an open source clone of Wordle in toki pona. Play the original
    <a href="https://www.powerlanguage.co.uk/wordle/">here</a>.
  </p>
  <p>
    Project by
    <a href="https://maciej.ie">Maciej Goszczycki</a>.
  </p>
  <p>
    sitelen pona typeset in
    <a href="https://musilili.net/linja-pona/">linja pona</a>.
  </p>
  <p>
    Check out the code on
    <a href="https://github.com/mgoszcz2/wate">GitHub</a>.
  </p>
{:else}
  <p>
    ni li kon ilo {$combine("pi jan ale")}. ona li sama musi nanpa wan {$sitelen(
      "Wordle",
      "[_waso_alasa_toki_esun]"
    )}.
    <a href="https://www.powerlanguage.co.uk/wordle/" title="Wordle">
      o musi e musi nanpa wan
    </a>.
  </p>
  <p>
    lipu ni tan
    <a href="https://maciej.ie" title="Maciej Goszczycki">
      {$sitelen("jan Masije", "jan [_mun_ante_sona_ilo_jan_esun]")}
    </a>.
  </p>
  <p>
    {$combine("sitelen pona")} kepeken
    <a href="https://musilili.net/linja-pona/" title="linja pona">
      {$combine("linja pona")}
    </a>.
  </p>
  <p>
    o lukin e ilo kon ni lon
    <a href="https://github.com/mgoszcz2/wate" title="GitHub">
      {$sitelen("lipu GitHub", "lipu [_kulupu_ilo_toki_awen_pona]")}
    </a>.
  </p>
{/if}
