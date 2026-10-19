import nodemailer from "nodemailer";

/**
 * Send an email using SMTP configuration from environment variables.
 * @param {Object} options - { from, to, subject, text, html }
 * @returns {Promise} Resolves with messageId on success, rejects with a
 *                   structured error (error.smtpCode, error.smtpMessage) on failure.
 */
export const sendMail = async ({ from, to, subject, text, html }) => {
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    // 465 = implicit TLS; 587 = STARTTLS; anything else = plain
    secure: smtpPort === 465,
    requireTLS: smtpPort === 587, // enforce STARTTLS on port 587
    auth: {
      user: process.env.SMTP_USER?.trim(),
      pass: process.env.SMTP_PASS?.trim(),
    },
    tls: {
      // Allow self-signed certs in dev; remove in prod if you want strict checking
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: from?.trim() || process.env.SMTP_USER,
    to,
    subject,
    text,
    html: html || text.replace(/\n/g, "<br>"),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[MailService] Email sent:", info.messageId);
    return info;
  } catch (error) {
    // Build a clean, structured error so the controller can return a useful message
    const smtpCode = error.responseCode ?? error.code ?? "UNKNOWN";
    let friendlyMessage = "Failed to send email via SMTP.";

    if (error.code === "EAUTH" || error.responseCode === 535) {
      friendlyMessage =
        "SMTP authentication failed (535). The Gmail App Password in SMTP_PASS is invalid or has been revoked. " +
        "Go to myaccount.google.com → Security → App Passwords and generate a fresh 16-character password, " +
        "then update SMTP_PASS in server/.env.";
    } else if (error.code === "ECONNREFUSED") {
      friendlyMessage = `SMTP connection refused on ${process.env.SMTP_HOST}:${smtpPort}. Check SMTP_HOST / SMTP_PORT.`;
    } else if (error.code === "ETIMEDOUT") {
      friendlyMessage = `SMTP connection timed out. Check your network or firewall rules for port ${smtpPort}.`;
    } else if (error.responseCode) {
      friendlyMessage = `SMTP error ${error.responseCode}: ${error.response ?? error.message}`;
    }

    console.error("[MailService] SMTP Error code:", smtpCode);
    console.error("[MailService] SMTP Error message:", error.message);

    // Attach the friendly message so the controller can forward it to the client
    error.friendlyMessage = friendlyMessage;
    throw error;
  }
};

