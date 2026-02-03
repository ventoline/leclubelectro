module.exports = async (req, res) => {
  // Allow only POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vercel usually parses JSON into req.body, but in dev it can be a string
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    const email = body?.email;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Hard fail early if env vars missing (most common reason for 500)
    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Missing MAILERLITE_API_KEY env var" });
    }
    if (!groupId) {
      return res
        .status(500)
        .json({ error: "Missing MAILERLITE_GROUP_ID env var" });
    }

    // Ensure fetch exists (Node 18+ has it). If not, you'll see a clear error.
    if (typeof fetch !== "function") {
      return res
        .status(500)
        .json({ error: "fetch is not available (use Node 18+)" });
    }

    const mlRes = await fetch(
      "https://connect.mailerlite.com/api",
      /*  "https://connect.mailerlite.com/api/subscribers", */
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          groups: [groupId],
        }),
      },
    );

    const text = await mlRes.text();

    if (!mlRes.ok) {
      // Return MailerLite’s response text so you can see the actual reason
      return res.status(mlRes.status).json({
        error: "MailerLite request failed",
        detail: text,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    // This prints the real crash reason in your terminal
    console.error("subscribe function crashed:", err);
    return res
      .status(500)
      .json({ error: "Function crashed", detail: String(err) });
  }
};
