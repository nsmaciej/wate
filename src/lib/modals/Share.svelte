<script lang="ts">
  import { _ } from "svelte-i18n";
  import { showToast } from "$lib/Toasts.svelte";
  import { generateEmojiArt } from "$lib/game";
  import { effectiveLocale, gameState, mode } from "$lib/settings";
  import Button from "$lib/Button.svelte";
  import Countdown from "$lib/Countdown.svelte";
  import GameDistribution from "$lib/GameDistribution.svelte";

  export let gameDay = 0;
  export let solution = "";

  async function share(discord: boolean) {
    const art = generateEmojiArt(gameDay, solution, $gameState[$mode], {
      sitelen: $effectiveLocale === "tok-x-sp",
      discord,
    });
    const share = { text: art };
    try {
      if (
        // Sharing in desktop browsers sucks.
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) &&
        navigator.canShare?.(share)
      ) {
        await navigator.share(share);
      } else {
        await navigator.clipboard.writeText(art);
        // This is a one time toast so give it more time.
        showToast($_("toast.clipboard"), 2);
      }
    } catch (e) {
      console.log("Share Exception", e);
      // I have no idea what could go wrong here but I don't want to find out.
    }
  }
</script>

<div class="share">
  <Button on:click={() => share(false)}>{$_("share.button")}</Button>
  <Button subtle on:click={() => share(true)}
    >{$_("share.button-discord")}</Button
  >
</div>
<div class="distribution" class:center={$effectiveLocale !== "tok-x-sp"}>
  {$_("share.distribution")}
  <GameDistribution mode={$mode} />
</div>
<Countdown />

<style>
  .share {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 8px;
  }
  .distribution {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .distribution.center {
    align-items: center;
  }
</style>
