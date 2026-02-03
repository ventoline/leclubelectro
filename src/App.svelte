<script lang="ts">
  import type { Route, RouterOptions } from "@dvcol/svelte-simple-router/models";
  import { RouterView } from "@dvcol/svelte-simple-router/components";

  import Home from "./routes/Home.svelte";
  import AppsPage from "./routes/AppsPage.svelte";
  import EmbedApp from "./routes/EmbedApp.svelte";

  type RouteNames = "home" | "app" | "embed" | "notfound";

  const routes: Readonly<Route<RouteNames>[]> = [
    { name: "home", path: "/", component: Home },

    // dynamic params are supported (example in docs uses normal path patterns)
    { name: "app", path: "/apps/:slug", component: AppsPage },
    { name: "embed", path: "/embed/:slug", component: EmbedApp },

    // fallback
    { name: "notfound", path: "*", redirect: { name: "home" } }
  ] as const;

  const options: RouterOptions<RouteNames> = {
    routes,
    // history mode by default; hash routing is optional (see docs)
    // hash: false
  } as const;
</script>

<RouterView {options} />
