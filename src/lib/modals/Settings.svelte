<script lang="ts">
  import {
    theme,
    tokiPonaMode,
    Theme,
    TokiPonaMode,
    colorBlind,
  } from "$lib/settings";
  import { _ } from "svelte-i18n";
  import { englishWords } from "$static/config.json";
  import LanguagePicker from "$lib/modals/atoms/LanguagePicker.svelte";
  import Segment from "$lib/Segment.svelte";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
</script>

{#if !englishWords}
  <LanguagePicker />
{/if}

<fieldset>
  <legend>{$_("setting.name.theme")}</legend>
  <SegmentedControl bind:selected={$theme}>
    <Segment key={Theme.Light} title={$_("setting.theme.light")} />
    <Segment key={Theme.Auto} title={$_("setting.theme.automatic")} />
    <Segment key={Theme.Dark} title={$_("setting.theme.dark")} />
  </SegmentedControl>
</fieldset>

{#if !englishWords}
  <fieldset>
    <legend>{$_("setting.name.mode")}</legend>
    <SegmentedControl bind:selected={$tokiPonaMode}>
      <Segment key={TokiPonaMode.All} title={$_("setting.mode.all")} />
      <Segment key={TokiPonaMode.Four} title={$_("setting.mode.four")} />
      <Segment
        key={TokiPonaMode.Kijetesantakalu}
        title={$_("setting.mode.kijetesantakalu")}
      />
    </SegmentedControl>
  </fieldset>
{/if}

<fieldset>
  <legend>{$_("setting.name.colorblind")}</legend>
  <SegmentedControl bind:selected={$colorBlind}>
    <Segment key={false} title={$_("setting.off")} />
    <Segment key={true} title={$_("setting.on")} />
  </SegmentedControl>
</fieldset>
