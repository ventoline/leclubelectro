module.exports = async (req, res) => {
  // Only allow POST
  /*   if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  } */
  console.log("subscribe endpoint hit with body:", req);
  console.log("subscribe endpoint hit with headers:", res);

  try {
    const { email, name } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // TEMP sanity check — proves POST works
    // Replace this block with MailerLite once confirmed
    return res.status(200).json({
      success: true,
      received: { email, name },
    });
  } catch (err) {
    console.error("subscribe error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
