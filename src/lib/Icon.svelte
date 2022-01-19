<script lang="ts" context="module">
  const icons = {
    settings: "",
    help: "",
  };
</script>

<script lang="ts">
  export let name: keyof typeof icons = "help";
  export let title = "";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 0 24 24"
  width="24"
>
  <title>{title}</title>
  <path fill="var(--accent-color)" d={icons[name]} />
</svg>
