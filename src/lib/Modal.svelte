<script lang="ts">
  import { fly } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { reduceMotion } from "$lib/settings";
  import { createEventDispatcher } from "svelte";
  import IconButton from "$lib/IconButton.svelte";

  export let shown = false;
  export let title = "Modal";
  export let center = false;
  export let width = 450;
  let modalContainer: HTMLDivElement;
  let modalScrollPx = 0;
  const dispatch = createEventDispatcher();

  function close() {
    shown = false;
    dispatch("close");
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
      bind:this={modalContainer}
      on:scroll={() => (modalScrollPx = modalContainer.scrollTop)}
      on:click={(e) => e.stopPropagation()}
      style:width="min(95vw, {width}px)"
      transition:fly={{ y: 50, duration: $reduceMotion ? 0 : 200 }}
    >
      <div class="header" class:scrollShadow={modalScrollPx > 0}>
        <h2>{title}</h2>
        <div class="close">
          <IconButton
            topRight
            icon="close"
            title={$_("modal.close")}
            sitelen="weka"
            on:click={close}
          />
        </div>
      </div>
      <div class="contents" class:center>
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  /* Modal-global variables. */
  .overlay {
    --modal-radius: 12px;
    --modal-margin: 25px;
  }

  .header {
    padding: 20px var(--modal-margin) 0;
    height: calc(var(--modal-margin) + max(2.2em, var(--tap-target-size)));
    position: sticky;
    top: 0;
    background: var(--page-background);
    z-index: 10;
    transition: box-shadow 300ms;
    /* Safari doesn't seem to clip this properly otherwise. */
    border-radius: var(--modal-radius) var(--modal-radius) 0 0;
  }

  .close {
    position: absolute;
    top: 20px;
    right: var(--modal-margin);
  }

  .header.scrollShadow {
    box-shadow: 0 5px 5px var(--modal-header-shadow);
  }

  .contents {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0 var(--modal-margin) var(--modal-margin);
  }

  .contents.center {
    align-items: center;
  }

  .overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: var(--overlay-background);
    display: flex;
    align-items: center;
    justify-content: center;
    /* This actually only here to stop the animation playing over the modal. */
    z-index: 1;
    /* Same but Safari seems to discard z-indexes. Lift the modal over the animation. */
    /* https://bugs.webkit.org/show_bug.cgi?id=61824 */
    transform: translateZ(200px);
  }

  .modal {
    background: var(--page-background);
    border-radius: var(--modal-radius);
    border: 1px solid var(--modal-border);
    margin: 10px;
    max-height: 85vh;
    /* For the close button. */
    position: relative;
    overflow-y: auto;
    box-shadow: 0 4px 25px 0 #00000033;
  }
</style>
