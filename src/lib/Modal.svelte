<script lang="ts">
  // Dispatches a "close" event when closed.
  import { fly, fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { reduceMotion } from "$lib/settings";
  import { createEventDispatcher } from "svelte";
  import IconButton from "$lib/IconButton.svelte";

  export let shown = false;
  export let title = "Modal";
  export let center = false;
  export let width = 450;
  let scrollContainer: HTMLDivElement;
  let contentScrollPx = 0;
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
  <!-- The on:click can't be on svelte:window or the modal insta-closes itself. -->
  <div
    role="presentation"
    class="overlay"
    on:click={close}
    transition:fade={{ duration: 200 }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- The key events are handled on svelte:window -->
    <div
      role="dialog"
      aria-modal="true"
      class="modal"
      style:width="min(95vw, {width}px)"
      transition:fly={{ y: 50, duration: $reduceMotion ? 0 : 200 }}
      on:click={(e) => e.stopPropagation()}
    >
      <div class="header" class:scrollShadow={contentScrollPx > 0}>
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

      <div
        class="contents"
        class:center
        bind:this={scrollContainer}
        on:scroll={() => (contentScrollPx = scrollContainer.scrollTop)}
      >
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

  .modal {
    background: var(--page-background);
    border-radius: var(--modal-radius);
    border: 1px solid var(--modal-border);
    margin: 10px;
    max-height: 85vh;
    /* For the close button. */
    position: relative;
    box-shadow: var(--modal-shadow);
    display: flex;
    flex-direction: column;
    /* Important to clip the scrolling box shadow. */
    overflow: hidden;
  }

  .header {
    padding: 20px var(--modal-margin) 0;
    height: calc(var(--modal-margin) + max(2.2em, var(--tap-target-size)));
    background: var(--page-background);
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
    box-shadow: var(--modal-header-shadow);
  }

  .contents {
    display: flex;
    overflow-y: auto;
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
</style>
