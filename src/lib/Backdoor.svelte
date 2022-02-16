<script context="module" lang="ts">
  import { wordy } from "$static/config.json";
</script>

{#if wordy}
  <a href="http://wate.maciej.ie" tabindex="-1" class="lupamonsi">
    <!-- A humble kijetesantakalu. -->
    <svg viewBox="0 0 27 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.5 0H18a11.8 11.8 0 0 0-5.9 2C8 4.5 6.4 9.2 6.3 13.9H5.1c-3.3
        0-5.1 2.3-5.1 5.4C0 22 1.5 24 4.3 24h10l-1.6-5.6-1.5.4 1 3.6H8v-7.8c0-6.2
        2.6-12 9.4-13L18 4l6 4.8-3.5 2.2v13H22V11.8l4.5-3L19.3 3l-.8-3zm-4.3 6a1.5
        1.5 0 0 0-1.6 1.6c0 .8.7 1.5 1.6 1.5a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0
        14.2 6zm4.2 0a1.5 1.5 0 0 0-1.5 1.6c0 .8.6 1.5 1.5 1.5a1.5 1.5 0 0 0
        1.5-1.5A1.5 1.5 0 0 0 18.4 6zM4.9 22.5v-7h1.4v7H5zm-3.3-3.1c0-1.4.4-2.7
        1.7-3.4v6.4c-1.4-.5-1.7-1.7-1.7-3zM16.8 24h1.6v-6.6h-1.6V24z"
      />
    </svg>
  </a>
{:else}
  <a href="http://wordy.maciej.ie" tabindex="-1" class="backdoor">π</a>
{/if}

<style>
  a {
    display: none;
  }

  @media screen and (hover) and (min-width: 550px) {
    a {
      position: absolute;
      bottom: 5px;
      right: 5px;
      cursor: default;
      display: flex;
    }
  }

  a:hover {
    opacity: 1;
  }

  .backdoor {
    font: 14px serif;
    text-decoration: none;
    opacity: 0.09;
  }

  .lupamonsi {
    opacity: 0.1;
  }

  svg {
    height: 10px;
  }

  path {
    fill: currentColor;
  }
</style>
