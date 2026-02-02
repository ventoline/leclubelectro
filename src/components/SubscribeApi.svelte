<script>
  let email = '';
  let name = '';
  let status = '';
  let loading = false;

  async function submit() {
    status = '';
    loading = true;
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const body = await res.json();
      if (res.ok) {
        status = 'Subscribed — check your email.';
        email = '';
        name = '';
      } else {
        status = body?.message || 'Subscription failed';
      }
    } catch (err) {
      status = err.message || 'Network error';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={submit} class="subscribe-form">
  <label>
    Email
    <input type="email" bind:value={email} required placeholder="you@example.com" />
  </label>
  <label>
    Name
    <input type="text" bind:value={name} placeholder="Optional" />
  </label>
  <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Subscribe'}</button>
  {#if status}
    <p class="status">{status}</p>
  {/if}
</form>

<style>
  .subscribe-form { display:flex; flex-direction:column; gap:0.5rem; max-width:420px; }
  input { padding:0.5rem; border:1px solid #ccc; border-radius:4px; }
  button { padding:0.5rem 0.75rem; border-radius:4px; }
  .status { margin-top:0.5rem; color:#2a7a2a; }
</style>
