<script lang="ts" context="module">
  const icons = {
    settings:
      "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
    help: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z",
    close:
      "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  };
</script>

<script lang="ts">
  import { sitelenLocale } from "$lib/settings";

  export let icon: keyof typeof icons = "help";
  export let sitelen = "seme";
  export let title = "";
  // For modals.
  export let topRight = false;
</script>

<button on:click class:topRight {title}>
  {#if $sitelenLocale}
    <div class="sp">{sitelen}</div>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d={icons[icon]} />
    </svg>
  {/if}
</button>

<style>
  button {
    min-width: var(--tap-target-size);
    min-height: var(--tap-target-size);
    align-items: center;
    justify-content: center;
  }
  button.topRight {
    align-items: flex-start;
    justify-content: flex-end;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  .sp {
    border-bottom: 2px solid currentcolor;
    color: var(--link-color);
    font-weight: bold;
  }
  path {
    fill: var(--link-color);
  }
</style>
