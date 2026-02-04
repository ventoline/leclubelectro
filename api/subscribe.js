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

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .end(JSON.stringify({ error: "Missing MAILERLITE_API_KEY" }));
    }

    const mlRes = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          name,
        }),
      },
    );

    const text = await mlRes.text();

    if (!mlRes.ok) {
      return res.status(mlRes.status).end(
        JSON.stringify({
          error: "MailerLite rejected request",
          detail: text,
        }),
      );
    }

    return res.status(200).end(JSON.stringify({ success: true }));
  } catch (err) {
    return res.status(500).end(
      JSON.stringify({
        error: "Server error",
        detail: String(err),
      }),
    );
  }
}
