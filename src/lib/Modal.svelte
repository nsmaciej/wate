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
    background: #ffffffbb;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 25px 0 #00000033;
    margin: 40px;
    max-width: calc(100px + var(--app-width));
  }
</style>
