<script context="module" lang="ts">
  import { waitLocale, _ } from "svelte-i18n";
  import Wordle from "$lib/Wordle.svelte";
  import Icon from "$lib/Icon.svelte";
  import "./i18n";
  import "../app.css";

  export async function preload(): Promise<void> {
    return waitLocale();
  }
</script>

<main>
  <heading>
    <div>
      <h1>{$_("name")}</h1>
      <i>{$_("description")}</i>
    </div>
    <div class="buttons">
      <button><Icon title={$_("modal.settings")} name="settings" /></button>
      <button><Icon title={$_("modal.help")} name="help" /></button>
    </div>
  </heading>

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
    border: none;
    display: flex;
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
    align-items: center;
    gap: 5px;
  }
  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    max-width: 350px;
    gap: 15px;
    height: 100%;
    padding: 20px 20px 30px;
    margin: 0 auto;
  }
</style>
