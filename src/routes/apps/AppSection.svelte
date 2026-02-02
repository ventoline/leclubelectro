<script>
  import { apps } from "../../data/apps";
  import AppCard from "./AppCard.svelte";
</script>

<div class="grid">
  {#each apps as app}
    <AppCard {app} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
</style>
