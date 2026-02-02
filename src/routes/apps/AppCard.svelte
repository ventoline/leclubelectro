<script>
  export let app;
</script>

<a class="card" href={"/apps/" + app.slug}>
  <h3>{app.name}</h3>
  <p>{app.description}</p>
</a>

<style>
  .card {
    display: block;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
  }
  .card:hover { border-color: #aaa; }
  h3 { margin: 0 0 0.5rem; }
  p { margin: 0; opacity: 0.8; }
</style>
