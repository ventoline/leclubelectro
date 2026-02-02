<script>
  // Paste the MailerLite embed HTML into `embedHtml` prop
  export let embedHtml = '';
</script>

{#if embedHtml}
  <div class="ml-embed">{@html embedHtml}</div>
{:else}
  <div class="ml-placeholder">
    Paste your MailerLite embed code into the `embedHtml` prop of this component.
    You can grab the embed code from MailerLite → Subscribers → Forms → Embedded forms.
  </div>
{/if}

<style>
  .ml-embed { max-width: 640px; }
  .ml-placeholder { padding: 1rem; border: 1px dashed #ccc; border-radius: 6px; color: #555; }
</style>
