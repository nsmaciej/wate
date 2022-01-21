<script lang="ts">
  import { _ } from "svelte-i18n";
  import { locale, theme } from "$lib/settings";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
  import Segment from "$lib/Segment.svelte";
</script>

<div class="settings">
  <fieldset>
    <legend>{$_("setting.name.language")}:</legend>
    <SegmentedControl bind:selected={$locale}>
      <Segment key="tp" title={$_("setting.lanuage.tp")} />
      <Segment key="tp-sp" title={$_("setting.lanuage.tp-sp")} />
      <Segment key="en" title={$_("setting.lanuage.en")} />
    </SegmentedControl>
  </fieldset>

  <fieldset>
    <legend>{$_("setting.name.theme")}:</legend>
    <SegmentedControl bind:selected={$theme}>
      <Segment key="dark" title={$_("setting.theme.dark")} />
      <Segment key="light" title={$_("setting.theme.light")} />
      <Segment key="auto" title={$_("setting.theme.automatic")} />
    </SegmentedControl>
  </fieldset>
</div>

<style>
  .settings {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  fieldset {
    border: 0;
  }
  legend {
    margin-bottom: 5px;
    font-weight: bold;
  }
</style>
