<script lang="ts" context="module">
  import { writable } from "svelte/store";
  import { delay, fixSitelenForSafari } from "$lib/utils";

  type Toast = [id: number, message: string];
  const toastList = writable<Toast[]>([]);
  let toastId = 0;

  export async function showToast(message: string): Promise<void> {
    const thisToast = toastId++;
    toastList.update((x) => [...x, [thisToast, fixSitelenForSafari(message)]]);
    await delay(2000);
    toastList.update((x) => x.filter((y) => y[0] !== thisToast));
  }
</script>

<script lang="ts">
  import { flip } from "svelte/animate";
  import { fly, fade } from "svelte/transition";
</script>

<div class="container">
  {#each $toastList as [id, message] (id)}
    <div
      class="toast"
      animate:flip={{ duration: 200 }}
      in:fly={{ y: 50, duration: 200 }}
      out:fade={{ duration: 150 }}
    >
      {message}
    </div>
  {/each}
</div>

<style>
  .container {
    position: fixed;
    left: 50%;
    top: 120px;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .toast {
    text-align: center;
    background: var(--toast-bg);
    color: var(--toast-fg);
    padding: 12px 15px;
    border-radius: 5px;
    font-weight: 700;
  }
</style>
