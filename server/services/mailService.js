import nodemailer from "nodemailer";

/**
 * Send an email using SMTP configuration from environment variables.
 * @param {Object} options - { from, to, subject, text, html }
 * @returns {Promise} Resolves on success, rejects on error
 */
export const sendMail = async ({ from, to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER?.trim(),
            pass: process.env.SMTP_PASS?.trim(),
        },

    });

    const mailOptions = {
        from: from || process.env.SMTP_USER,
        to,
        subject,
        text,
        html: html || text.replace(/\n/g, "<br>"),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
