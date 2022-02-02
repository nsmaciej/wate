<script lang="ts">
  import { _ } from "svelte-i18n";
  import { theme, mode, Theme, Mode } from "$lib/settings";
  import LanguagePicker from "$lib/LanguagePicker.svelte";
  import Segment from "$lib/Segment.svelte";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
</script>

<LanguagePicker />

<fieldset>
  <legend>{$_("setting.name.theme")}</legend>
  <SegmentedControl bind:selected={$theme}>
    <Segment key={Theme.Light} title={$_("setting.theme.light")} />
    <Segment key={Theme.Auto} title={$_("setting.theme.automatic")} />
    <Segment key={Theme.Dark} title={$_("setting.theme.dark")} />
  </SegmentedControl>
</fieldset>

<fieldset>
  <legend>{$_("setting.name.mode")}</legend>
  <SegmentedControl bind:selected={$mode}>
    <Segment key={Mode.All} title={$_("setting.mode.all")} />
    <Segment key={Mode.Four} title={$_("setting.mode.four")} />
    <Segment
      key={Mode.Kijetesantakalu}
      title={$_("setting.mode.kijetesantakalu")}
    />
  </SegmentedControl>
</fieldset>
