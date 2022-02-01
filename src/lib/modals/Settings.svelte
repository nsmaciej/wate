<script lang="ts">
  import { t } from "svelte-intl-precompile";
  import { theme, mode, Theme, Mode } from "$lib/settings";
  import LanguagePicker from "$lib/LanguagePicker.svelte";
  import Segment from "$lib/Segment.svelte";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
</script>

<LanguagePicker />

<fieldset>
  <legend>{$t("setting.name.theme")}</legend>
  <SegmentedControl bind:selected={$theme}>
    <Segment key={Theme.Light} title={$t("setting.theme.light")} />
    <Segment key={Theme.Auto} title={$t("setting.theme.automatic")} />
    <Segment key={Theme.Dark} title={$t("setting.theme.dark")} />
  </SegmentedControl>
</fieldset>

<fieldset>
  <legend>{$t("setting.name.mode")}</legend>
  <SegmentedControl bind:selected={$mode}>
    <Segment key={Mode.All} title={$t("setting.mode.all")} />
    <Segment key={Mode.Four} title={$t("setting.mode.four")} />
    <Segment
      key={Mode.Kijetesantakalu}
      title={$t("setting.mode.kijetesantakalu")}
    />
  </SegmentedControl>
</fieldset>
