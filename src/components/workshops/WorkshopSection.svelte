<script>
  export let id = "";
  export let title = "";
  export let subtitle = "";
</script>

<section id={id} class="section">
  <div class="container">
    {#if title}<h2>{title}</h2>{/if}
    {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
    <div class="content">
      <slot />
      <subscribe-api ></subscribe-api>
    </div>
  </div>
</section>

<style>
  .section { padding: 4rem 0; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
  h2 { font-size: 2rem; margin: 0 0 0.5rem; }
  .subtitle { opacity: 0.75; margin: 0 0 1.5rem; }
</style>
