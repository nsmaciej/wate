<script lang="ts">
  import { _ } from "svelte-i18n";
  import { locale } from "$lib/settings";
  import SegmentedControl from "$lib/SegmentedControl.svelte";
  import Segment from "$lib/Segment.svelte";
</script>

<SegmentedControl bind:selected={$locale}>
  <Segment key="tp">{$_("lanuage.tp")}</Segment>
  <Segment key="tp-sp">{$_("lanuage.tp-sp")}</Segment>
  <Segment key="en">{$_("lanuage.en")}</Segment>
</SegmentedControl>
