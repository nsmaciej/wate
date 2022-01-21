<script lang="ts">
  import { _ } from "svelte-i18n";
  import { locale } from "$lib/settings";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
  import Segment from "$lib/Segment.svelte";
  let dummy;
</script>

<div class="settings">
  <fieldset>
    <legend>{$_("setting.name.language")}:</legend>
    <SegmentedControl bind:selected={$locale}>
      <Segment key="tp">{$_("setting.lanuage.tp")}</Segment>
      <Segment key="tp-sp">{$_("setting.lanuage.tp-sp")}</Segment>
      <Segment key="en">{$_("setting.lanuage.en")}</Segment>
    </SegmentedControl>
  </fieldset>

  <fieldset>
    <legend>{$_("setting.name.theme")}:</legend>
    <SegmentedControl bind:selected={dummy}>
      <Segment key="dark">{$_("setting.theme.dark")}</Segment>
      <Segment key="light">{$_("setting.theme.light")}</Segment>
      <Segment key="automatic">{$_("setting.theme.automatic")}</Segment>
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
