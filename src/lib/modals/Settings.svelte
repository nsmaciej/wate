<script lang="ts">
  import { _ } from "svelte-i18n";
  import { locale } from "$lib/settings";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
  import Segment from "$lib/Segment.svelte";
  let dummy;
</script>

<div class="settings">
  <h2>{$_("modal.settings")}</h2>

  <div class="section">
    {$_("setting.name.language")}:
    <SegmentedControl bind:selected={$locale}>
      <Segment key="tp">{$_("setting.lanuage.tp")}</Segment>
      <Segment key="tp-sp">{$_("setting.lanuage.tp-sp")}</Segment>
      <Segment key="en">{$_("setting.lanuage.en")}</Segment>
    </SegmentedControl>
  </div>

  <div class="section">
    {$_("setting.name.theme")}:
    <SegmentedControl bind:selected={dummy}>
      <Segment key="dark">{$_("setting.theme.dark")}</Segment>
      <Segment key="light">{$_("setting.theme.light")}</Segment>
      <Segment key="automatic">{$_("setting.theme.automatic")}</Segment>
    </SegmentedControl>
  </div>
</div>

<style>
  .settings {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .section {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
