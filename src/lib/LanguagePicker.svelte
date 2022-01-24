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
    <Segment key="tp" title={$_("setting.language.tp")} />
    <Segment key="tp-sp" title={$_("setting.language.tp-sp")} />
  </SegmentedControl>
</fieldset>
