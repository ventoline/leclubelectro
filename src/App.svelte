<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
 // import AppPage from "./routes/AppPage.svelte";
  //import EmbedApp from "./routes/EmbedApp.svelte";

  const routes = {
    "/": Home,
   /*  "/apps/:slug": AppPage,
    "/embed/:slug": EmbedApp */
  };
</script>

<Router {routes} />
