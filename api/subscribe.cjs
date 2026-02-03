module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const email = body?.email;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey)
      return res.status(500).json({ error: "Missing MAILERLITE_API_KEY" });

    // If fetch is missing, return a clear error instead of crashing
    if (typeof fetch !== "function") {
      return res
        .status(500)
        .json({ error: "fetch not available; use Node 18+" });
    }

    const mlRes = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email }),
      },
    );

    const text = await mlRes.text();

    // IMPORTANT: MailerLite errors should be returned as 4xx/5xx with detail, not crash your function
    if (!mlRes.ok) {
      return res
        .status(mlRes.status)
        .json({ error: "MailerLite rejected request", detail: text });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("subscribe crashed:", err);
    return res
      .status(500)
      .json({ error: "Function crashed", detail: String(err?.stack || err) });
  }
};
