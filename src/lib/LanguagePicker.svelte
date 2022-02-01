<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import { locale } from "$lib/settings";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
  import Segment from "$lib/Segment.svelte";
</script>

<fieldset>
  <legend>{$t("setting.name.language")}</legend>
  <SegmentedControl bind:selected={$locale}>
    <Segment key="en" title={$t("setting.language.en")} />
    <Segment key="tok" title={$t("setting.language.tok")} />
    <Segment key="tok-x-sp" title={$t("setting.language.tok-x-sp")} />
  </SegmentedControl>
  {#if $locale === "en"}
    <p>
      <b>Note:</b> The words themselves are in Toki Pona.
    </p>
  {/if}
</fieldset>

<style>
  p {
    margin-top: 5px;
  }
</style>
