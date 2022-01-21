<script lang="ts">
  import { fly } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import Button from "$lib/Button.svelte";

  export let shown = false;
  export let title = "Modal";

  function close() {
    shown = false;
  }
  //TODO: Trap tab.
</script>

<svelte:window
  on:keydown={(event) => {
    if (shown && event.key === "Escape") close();
  }}
/>

{#if shown}
  <div class="overlay" aria-modal="true" on:click={close}>
    <div
      class="modal"
      on:click={(e) => e.stopPropagation()}
      transition:fly={{ y: 50, duration: 200 }}
    >
      <div class="header">
        <h2>{title}</h2>
        <div class="close">
          <Button
            topRight
            name="close"
            title={$_("modal.close")}
            sitelen="weka"
            on:click={close}
          />
        </div>
      </div>
      <slot />
    </div>
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 30px;
  }
  .close {
    cursor: pointer;
  }
  .header {
    display: flex;
    width: 100%;
    gap: 20px;
    justify-content: space-between;
  }
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    background: var(--overlay-background);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background: var(--page-background);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid var(--modal-border);
    box-shadow: 0 4px 25px 0 #00000033;
    margin: 10px;
    width: min(100vw, 50px + var(--app-width));
  }
</style>
