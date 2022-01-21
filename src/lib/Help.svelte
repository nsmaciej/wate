<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<p>
  {$_("help.wordle-clone")}
  <a href="https://www.powerlanguage.co.uk/wordle/">{$_("help.link.wordle")}</a
  >.
</p>

<p>
  {$_("help.github-intro")}
  <a href="https://github.com/mgoszcz2/wate">{@html $_("help.link.github")}</a>.
</p>
