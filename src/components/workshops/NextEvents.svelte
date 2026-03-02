<script lang="ts">
  import { onMount } from "svelte";

const API_KEY = import.meta.env.VITE_GCAL_API_KEY;
const CALENDAR_ID = import.meta.env.VITE_GCAL_ID;

  type GCalEvent = {
    id: string;
    summary?: string;
    location?: string;
    htmlLink?: string;
    start?: { dateTime?: string; date?: string };
  };

  let events: GCalEvent[] = [];
  let loading = true;
  let error = "";

  function formatDate(ev: GCalEvent) {
    const raw = ev.start?.dateTime ?? ev.start?.date;
    if (!raw) return "";

    const d = new Date(raw);

    if (ev.start?.date) {
      return d.toLocaleDateString();
    }

    return d.toLocaleString();
  }

  async function loadEvents() {
    console.log("Loading events with", { API_KEY, CALENDAR_ID });
    try {
      const timeMin = new Date().toISOString(); // filter out past events

      const url =
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events` +
        `?key=${API_KEY}` +
        `&timeMin=${timeMin}` +
        `&singleEvents=true` +
        `&orderBy=startTime` +
        `&maxResults=10`;

      const res = await fetch(url);
      const data = await res.json();
console.log("GCAL response", { data });
      events = data.items ?? [];

      console.log("Loaded events", { events });
    } catch (e) {
      error = "Failed to load events";
    } finally {
      loading = false;
    }
  }

  onMount(loadEvents);
</script>

<h2></h2>

{#if loading}
  <p>Loading...</p>

{:else if error}
  <p>{error}</p>

{:else if events.length === 0}
  <p>No upcoming events</p>

{:else}
  <ul>
    {#each events as ev (ev.id)}
      <li>
        <strong>{ev.summary}</strong>
        {formatDate(ev)}

        {#if ev.location}
          - {ev.location}
        {/if}

        {#if ev.htmlLink}
          
          <a href={ev.htmlLink} target="_blank">
            Calendar
          </a> | <span><a href={'#'}> Book </a> </span>
          <hr/>
        {/if}
      </li>
    {/each}
  </ul>
{/if}
