<script lang="ts">
  import { onMount } from "svelte";

/*   declare global {
    interface Window {
      FB?: any;
      fbAsyncInit?: () => void;
    }
  } */

  function loadFacebookSDK() {
    return new Promise<void>((resolve) => {
      if (window.FB?.XFBML) return resolve();

      window.fbAsyncInit = function () {
        window.FB?.init({ xfbml: true, version: "v25.0" });
        resolve();
      };

      const existing = document.querySelector('script[src*="connect.facebook.net/en_US/sdk.js"]');
      if (existing) return;

      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    });
  }

  onMount(async () => {
    await loadFacebookSDK();
    window.FB?.XFBML?.parse();
  });
</script>

<div
  class="fb-page"
  data-href="https://www.facebook.com/leclubelectro/"
data-show-posts="true"
 data-tabs="event"  data-small-header="true"
      data-adapt-container-width="true"
      data-hide-cover="true" 
      data-hide-cta="true"
      data-show-facepile="false">
</div>