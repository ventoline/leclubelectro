

<script>
import SubscribeApi from '../SubscribeApi.svelte';
import FacebookPastEvents from './FbEvents.svelte';
import NextEvents from './NextEvents.svelte';

  export let id = "";
  export let title = "";
  export let subtitle = "";
</script>

<section id={id} class="section">
  <div class="container">
    {#if title}<h2>{title}</h2>{/if}
    {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
    <div class="content">
<!--       <slot />   
 -->              <SubscribeApi />      
        <div class='workshop-upcoming'>
<br/><br/>
      <h3>Next workshops!</h3> </div>
<NextEvents /> <br/>
  <p>Stay tuned for updates :  
         <br/> We will be adding more content and sessions in the near future.</p>


    </div>
      <div class="sidebar-workshops">

        <div class='workshop-past'>
          <div></div> 
<FacebookPastEvents />
        </div>
      </div>


  </div>
</section>

<style>
  .section { padding: 1rem 0; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
  h2 { font-size: 2rem; margin: 0 0 0.5rem; }
  .subtitle { opacity: 0.75; margin: 0 0 1.5rem; }
</style>
