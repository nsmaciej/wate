<script lang="ts">
  export let subtle = false;
</script>

<button on:click class:subtle>
  <slot />
</button>

<style>
  button {
    flex: auto;
  }
  button:not(.subtle) {
    background: var(--link-color);
    border-radius: 7px;
    padding: 3px 12px;
    color: var(--page-background);
    font-weight: 700;
    min-height: 38px;
    max-width: 220px;
  }
  button.subtle {
    color: var(--link-color);
    font-size: var(--font-size-small);
  }
  :global(.linja-pona) button {
    font-weight: normal;
  }
</style>
