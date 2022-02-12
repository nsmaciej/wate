<script lang="ts">
  import {
    theme,
    tokiPonaMode,
    Theme,
    colorBlind,
    guessMode,
  } from "$lib/settings";
  import { _ } from "svelte-i18n";
  import { GuessMode, TokiPonaMode } from "$lib/game";
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
  <legend>{$_("setting.name.guessmode")}</legend>
  <SegmentedControl bind:selected={$guessMode}>
    <Segment key={GuessMode.Easy} title={$_("setting.guessmode.easy")} />
    <Segment key={GuessMode.Normal} title={$_("setting.guessmode.normal")} />
    <Segment key={GuessMode.Hard} title={$_("setting.guessmode.hard")} />
  </SegmentedControl>
  <p class="note">
    {#if $guessMode === GuessMode.Easy}
      {$_("setting.guessmode.easy-text")}
    {:else if $guessMode === GuessMode.Hard}
      {$_("setting.guessmode.easy-hard")}
    {/if}
  </p>
</fieldset>

<fieldset>
  <legend>{$_("setting.name.colorblind")}</legend>
  <SegmentedControl bind:selected={$colorBlind}>
    <Segment key={false} title={$_("setting.off")} />
    <Segment key={true} title={$_("setting.on")} />
  </SegmentedControl>
</fieldset>

<style>
  .note {
    margin-top: 3px;
    color: var(--accent-color);
  }
</style>
