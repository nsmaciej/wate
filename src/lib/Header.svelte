<script lang="ts">
  import { _ } from "svelte-i18n";
  import Button from "$lib/Button.svelte";
  import Settings from "$lib/modals/Settings.svelte";
  import Modal from "$lib/Modal.svelte";
  import Help from "$lib/Help.svelte";

  let settingsShown = false;
  let helpShown = false;
  let olukinalaShown = false;
</script>

<heading>
  <div>
    <h1>{$_("name")}</h1>
    <span class="tagline">
      {$_("description")}
      <button
        on:click={() => (olukinalaShown = true)}
        class="olukinala"
        tabindex="-1"
      >
        {$_("olukinala")}
      </button>
    </span>
  </div>
  <div class="buttons">
    <Button
      title={$_("modal.settings")}
      name="settings"
      sitelen="nasin"
      on:click={() => (settingsShown = true)}
    />
    <Button
      title={$_("modal.help")}
      name="help"
      sitelen="seme"
      on:click={() => (helpShown = true)}
    />
  </div>
</heading>

<Modal bind:shown={settingsShown} title={$_("modal.settings")}>
  <Settings />
</Modal>
<Modal bind:shown={helpShown} title={$_("modal.help")}>
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
  h1 {
    font-size: 28px;
    font-weight: 900;
  }
  :global(.linja-pona) h1 {
    font-size: 40px;
  }
  heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* Prevents sudden layout shifts when switching languages. */
    height: 70px;
  }
  .tagline {
    color: var(--accent-color);
    display: block;
  }
  :global(.linja-pona) .tagline {
    font-size: 0.5em;
  }
  .buttons {
    display: flex;
    /* Prevent iOS touch overlays from spanning the whole header. */
    align-items: flex-start;
  }
  .olukinala {
    color: transparent;
    cursor: pointer;
  }
</style>
