<script lang="ts" context="module">
  import { localStorageStore } from "$lib/utils";

  const startupHelp = localStorageStore("helpshown", true);
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { guessMode } from "$lib/settings";
  import { guessModeMedal } from "$lib/game";
  import { recordEvent } from "$lib/countClick";
  import IconButton from "$lib/IconButton.svelte";
  import Help from "$lib/modals/Help.svelte";
  import Modal from "$lib/Modal.svelte";
  import Settings from "$lib/modals/Settings.svelte";

  let settingsShown = false;
  let helpShown = false;
  let olukinalaShown = false;

  // Used to prevent the win modal showing over other modals.
  export let showingModal = false;
  $: showingModal = settingsShown || helpShown || olukinalaShown;

  onMount(() => {
    // This is needed because right now there is not easy way to set
    // intro: true and I want a nice initial in transition.
    if ($startupHelp) helpShown = true;
  });
</script>

<heading>
  <div>
    <h1>
      {$_("name")}{guessModeMedal($guessMode)}
    </h1>
    <span class="tagline">
      {$_("description")}
      <button
        on:click={() => {
          olukinalaShown = true;
          recordEvent("olukinala"); // Curious if somebody will find this.
        }}
        class="olukinala"
        tabindex="-1"
      >
        {$_("olukinala")}
      </button>
    </span>
  </div>
  <div class="buttons">
    <slot />
    <IconButton
      title={$_("modal.settings")}
      icon="settings"
      sitelen="nasin"
      on:click={() => (settingsShown = true)}
    />
    <IconButton
      title={$_("modal.help")}
      icon="help"
      sitelen="seme"
      on:click={() => (helpShown = true)}
    />
  </div>
</heading>

<Modal bind:shown={settingsShown} title={$_("modal.settings")}>
  <Settings />
</Modal>
<Modal
  width={530}
  bind:shown={helpShown}
  title={$_("modal.help")}
  on:close={() => {
    // Good to know since we don't record anything else until the game is
    // finished: how many people actually do anything at all.
    if ($startupHelp) recordEvent("tutorial");
    $startupHelp = false;
  }}
>
  <Help />
</Modal>
<Modal bind:shown={olukinalaShown} title={$_("olukinala")}>
  <div class="linja-pona">
    o lukin ala e lipu ni. o tawa!<br />
    sina toki e ona tawa jan mute la lipu ni li kama ike.<br />
    sina lukin la awen pona.
  </div>
</Modal>

<style>
  heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* Prevents sudden layout shifts when switching languages. */
    height: 70px;
  }
  .tagline {
    color: var(--secondary-color);
    display: block;
    font-size: clamp(8px, 3.8vw, var(--font-size));
  }
  :global(.linja-pona) .tagline {
    font-size: 16px;
  }
  .buttons {
    display: flex;
    /* Prevent iOS touch overlays from spanning the whole header. */
    align-items: flex-start;
  }
  .olukinala {
    color: transparent;
  }
</style>
