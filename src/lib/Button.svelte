<script lang="ts">
</script>

<button on:click>
  <slot />
</button>

<style>
  button {
    background: var(--link-color);
    border-radius: 5px;
    padding: 10px;
    color: var(--page-background);
    font-weight: 700;
    min-height: 40px;
    max-width: 220px;
    flex: auto;
  }
</style>
