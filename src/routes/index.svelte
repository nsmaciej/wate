<script context="module" lang="ts">
  import { waitLocale } from "svelte-i18n";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<script lang="ts">
  import { _ } from "svelte-i18n";
  import Wordle from "$lib/Wordle.svelte";
  import Button from "$lib/Button.svelte";
  import Settings from "$lib/modals/Settings.svelte";
  import Modal from "$lib/Modal.svelte";
  import Help from "$lib/Help.svelte";

  let settingsShown = false;
  let helpShown = false;
</script>

<main>
  <heading>
    <div>
      <h1>{$_("name")}</h1>
      <i>{$_("description")}</i>
    </div>
    <div class="buttons">
      <button on:click={() => (settingsShown = true)}>
        <Button title={$_("modal.settings")} name="settings" sitelen="nasin" />
      </button>
      <button on:click={() => (helpShown = true)}>
        <Button title={$_("modal.help")} name="help" sitelen="seme" />
      </button>
    </div>
  </heading>

  <Modal bind:shown={settingsShown} title={$_("modal.settings")}>
    <Settings />
  </Modal>
  <Modal bind:shown={helpShown} title={$_("modal.help")}>
    <Help />
  </Modal>
  <Wordle />
</main>

<style>
  h1 {
    font-size: 28px;
  }
  :global(.linja-pona) h1 {
    font-size: 40px;
  }
  button {
    display: flex;
    cursor: pointer;
  }
  heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* Prevents sudden layout shifts when switching languages. */
    height: 70px;
  }
  i {
    color: var(--accent-color);
    display: block;
  }
  :global(.linja-pona) i {
    font-size: 0.5em;
  }
  div.buttons {
    display: flex;
    gap: 5px;
  }
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    max-width: var(--app-width);
    gap: 15px;
    height: 100%;
    padding: 20px 20px 30px;
    margin: 0 auto;
  }
</style>
