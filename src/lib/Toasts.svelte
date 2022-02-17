<script lang="ts" context="module">
  import { get, writable } from "svelte/store";
  import { delay, fixSitelenForSafari } from "$lib/utils";
  import { sitelenLocale } from "$lib/settings";

  type Toast = [id: number, message: string, latin: boolean];
  const toastList = writable<Toast[]>([]);
  let toastId = 0;

  export async function showToast(
    message: string,
    { delay: delayFactor = 1, latin = false } = {}
  ): Promise<void> {
    const thisToast = toastId++;
    toastList.update((x) => [
      ...x,
      [thisToast, fixSitelenForSafari(message), latin],
    ]);
    // Give sitelen pona users a lot more time to read the toast.
    const duration = get(sitelenLocale) && !latin ? 4000 : 2000;
    await delay(duration * delayFactor);
    toastList.update((x) => x.filter((y) => y[0] !== thisToast));
  }
</script>

<script lang="ts">
  import { flip } from "svelte/animate";
  import { fly, fade } from "svelte/transition";
</script>

<div class="container">
  {#each $toastList as [id, message, latin] (id)}
    <div
      class="toast"
      class:latin
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    z-index: 2;
    /* The last value is for Safari, see Modal. */
    transform: translate3d(-50%, 0, 400px);
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
