<script lang="ts">type ApiError = { error?: string; message?: string; detail?: string };

  let email = '';
  let name = '';
  let status = '';
  let loading = false;

async function submit() {
  console.log('Submitting', { email, name });
  status = '';
  loading = true;

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

      body: JSON.stringify({ email, name })
    });

    const contentType = res.headers.get('content-type') || '';
    let data = null;

    if (contentType.includes('application/json')) {
      data = await res.json().catch(() => null);
    }

    if (!res.ok) {
      status = data?.error || data?.message || `Request failed (${res.status})`;
      return;
    }

    status = 'Subscribed — check your email.';
    email = '';
    name = '';
  } catch (err:any) {
    status = err.message || 'Network error';
  } finally {
    loading = false;
  }
}

</script>
  <p>Get updates on upcoming workshops and events!</p>
<div class="subscribe-intro">


  <form on:submit|preventDefault={submit} class="subscribe-form">
  <label>
    
    <input type="email" bind:value={email} required placeholder="you@example.com" />
  </label>
  <label>
    
    <input type="text" bind:value={name} placeholder="Name" />
  </label>
  <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Subscribe'}</button>
  {#if status}
    <p class="status">{status}</p>
  {/if}
</form>
</div>
<style>
  .subscribe-form { display:flex; flex-direction:column; gap:0.5rem; max-width:420px; }
  input { padding:0.5rem; border:1px solid #ccc; border-radius:4px; }
  button { padding:0.5rem 0.75rem; border-radius:4px; }
  .status { margin-top:0.5rem; color:#2a7a2a; }
</style>
