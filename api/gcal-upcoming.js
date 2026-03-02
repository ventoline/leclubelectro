// api/gcal-upcoming.js
export default async function handler(req, res) {
  const calendarId = process.env.GCAL_ID; // e.g. club@group.calendar.google.com
  const apiKey = process.env.GCAL_API_KEY;

  const timeMin = new Date().toISOString();

  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "10",
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId,
  )}/events?${params.toString()}`;

  const r = await fetch(url);
  const data = await r.json();
  return res.status(r.status).json(data);
}
