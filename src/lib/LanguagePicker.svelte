<script lang="ts">
  import { _ } from "svelte-i18n";
  import { locale } from "$lib/settings";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
  import Segment from "$lib/Segment.svelte";
</script>

<fieldset>
  <legend>{$_("setting.name.language")}</legend>
  <SegmentedControl bind:selected={$locale}>
    <Segment key="en" title={$_("setting.language.en")} />
    <Segment key="tok" title={$_("setting.language.tok")} />
    <Segment key="tok-x-sp" title={$_("setting.language.tok-x-sp")} />
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
