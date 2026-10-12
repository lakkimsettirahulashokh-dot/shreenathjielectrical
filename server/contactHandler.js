import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Validates and sends the contact form enquiry email to shreenathjielectrical01@gmail.com
 * Securely handles credentials from environment variables without exposing anything to frontend.
 */
export async function handleContactSubmission(data) {
  const { name, phone, email, subject, message } = data;

  // 1. Validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new Error('Full Name is required.');
  }

  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    throw new Error('Phone Number is required.');
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new Error('Email Address is required.');
  }

  // Proper Email Regex Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new Error('Message is required.');
  }

  // Current formatted timestamp
  const now = new Date();
  const submittedAt = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  // Target recipient email (as specified in Master Prompt)
  const recipientEmail = 'shreenathjielectrical01@gmail.com';

  // Email Subject (exact format specified in Master Prompt)
  const emailSubject = 'New Contact Form Enquiry — SHREENATHJI ELECTRICAL';

  // Plain Text Body (exact format specified in Master Prompt)
  const emailBodyText = `NEW CONTACT FORM ENQUIRY

Customer Name:
${name.trim()}

Phone Number:
${phone.trim()}

Customer Email:
${email.trim()}

Subject:
${(subject && subject.trim()) || 'Not Specified'}

Message:
${message.trim()}

Submitted At:
${submittedAt}`;

  // Rich HTML version for modern email clients
  const emailBodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Enquiry — SHREENATHJI ELECTRICAL</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #F4F6F9; margin: 0; padding: 24px; color: #1A202C;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 3px solid #2C3539; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color: #2C3539; padding: 24px; border-bottom: 3px solid #F37021;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 0.5px; color: #FFFFFF;">
                SHREENATHJI <span style="color: #F37021;">ELECTRICAL</span>
              </h1>
              <p style="margin: 6px 0 0 0; color: #FFA46B; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                New Contact Form Enquiry
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 28px;">
              <h2 style="font-size: 16px; color: #2C3539; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px 0; border-bottom: 2px solid #E2E8F0; padding-bottom: 8px;">
                Customer &amp; Enquiry Details
              </h2>

              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 14px; margin-bottom: 20px;">
                <tr>
                  <td width="140" style="font-weight: bold; color: #5A6A80; vertical-align: top;">Customer Name:</td>
                  <td style="color: #1A202C; font-weight: 700;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #5A6A80; vertical-align: top;">Phone Number:</td>
                  <td style="color: #1A202C; font-weight: 700;">
                    <a href="tel:${phone.trim()}" style="color: #F37021; text-decoration: none;">${phone.trim()}</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #5A6A80; vertical-align: top;">Customer Email:</td>
                  <td style="color: #1A202C;">
                    <a href="mailto:${email.trim()}" style="color: #F37021; text-decoration: none;">${email.trim()}</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #5A6A80; vertical-align: top;">Subject:</td>
                  <td style="color: #1A202C;">${(subject && subject.trim()) || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #5A6A80; vertical-align: top;">Submitted At:</td>
                  <td style="color: #5A6A80; font-size: 13px;">${submittedAt}</td>
                </tr>
              </table>

              <h2 style="font-size: 16px; color: #2C3539; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 12px 0; border-bottom: 2px solid #E2E8F0; padding-bottom: 8px;">
                Message Content
              </h2>
              <div style="background-color: #F4F6F9; border-left: 4px solid #F37021; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #1A202C; white-space: pre-wrap;">${message.trim()}</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 16px 28px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B;">
              <strong>Reply-To Enabled:</strong> Clicking 'Reply' in your email client will reply directly to <strong>${email.trim()}</strong>.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // 2. Read SMTP Configuration from Environment Variables
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpSecure = process.env.SMTP_SECURE !== undefined 
    ? process.env.SMTP_SECURE === 'true' 
    : smtpPort === 465;

  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP credentials are not configured on the server. Please check SMTP_USER and SMTP_PASS in .env');
  }

  // 3. Create Transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  // 4. Send Email with Reply-To set to the customer's entered email
  const mailOptions = {
    from: `"SHREENATHJI ELECTRICAL" <${smtpUser}>`,
    to: recipientEmail,
    replyTo: email.trim(),
    subject: emailSubject,
    text: emailBodyText,
    html: emailBodyHtml
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}
