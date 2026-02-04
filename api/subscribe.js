export default async function handler(req, res) {
  // Always respond with JSON
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end(JSON.stringify({ error: "Method Not Allowed" }));
  }

  try {
    const { email, name } = req.body || {};

    if (!email) {
      return res
        .status(400)
        .end(JSON.stringify({ error: "Email is required" }));
    }

    // TEMP sanity check (do NOT add MailerLite yet)
    return res.status(200).end(
      JSON.stringify({
        success: true,
        received: { email, name },
      }),
    );
  } catch (err) {
    return res.status(500).end(
      JSON.stringify({
        error: "Server error",
        detail: String(err),
      }),
    );
  }
}
