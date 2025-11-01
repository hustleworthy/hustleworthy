import nodemailer from 'nodemailer';

// Create transporter using SMTP (using Brevo SMTP)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.BREVO_SMTP_LOGIN, // Your Brevo SMTP login
      pass: process.env.BREVO_SMTP_KEY, // Your Brevo SMTP key
    },
  });
};

interface OwnershipApprovalEmailData {
  userEmail: string;
  userName: string;
  websiteName: string;
  websiteUrl?: string;
}

export const sendOwnershipApprovalEmail = async (data: OwnershipApprovalEmailData) => {
  const transporter = createTransporter();
  
  const { userEmail, userName, websiteName, websiteUrl } = data;

  const mailOptions = {
    from: `"Hustleworthy" <${process.env.BREVO_VERIFIED_SENDER}>`,
    to: userEmail,
    subject: `🎉 Ownership Approved - ${websiteName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            🎉 Congratulations!
          </h1>
          <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">
            Your website ownership has been approved
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px; background-color: #ffffff;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Hi <strong>${userName}</strong>,
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
            Great news! Your ownership claim for <strong>${websiteName}</strong> has been successfully approved by our admin team.
          </p>

          <!-- Website Details Card -->
          <div style="background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin: 25px 0;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">
              ✅ Verified Website Details
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 120px;">Website:</td>
                <td style="padding: 8px 0; color: #1f2937;">${websiteName}</td>
              </tr>
              ${websiteUrl ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">URL:</td>
                <td style="padding: 8px 0;">
                  <a href="${websiteUrl}" style="color: #2563eb; text-decoration: none;" target="_blank">
                    ${websiteUrl}
                  </a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Status:</td>
                <td style="padding: 8px 0;">
                  <span style="background-color: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                    ✓ Verified Owner
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <!-- What's Next Section -->
          <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px;">
              🚀 What's Next?
            </h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">Your verified status will be displayed publicly</li>
              <li style="margin-bottom: 8px;">You can now edit the description, ways to earn, tips to earn more, Payout Methods, payment frequency.</li>
            </ul>
          </div>

          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
            Thank you for being part of the Hustleworthy community! If you have any questions, feel free to reach out to our support team.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 25px 30px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
            Best regards,<br>
            <strong style="color: #374151;">The Hustleworthy Team</strong>
          </p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This email was sent to ${userEmail}. If you have any questions, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
Congratulations ${userName}!

Your ownership claim for ${websiteName} has been successfully approved by our admin team.

Website Details:
- Website: ${websiteName}
${websiteUrl ? `- URL: ${websiteUrl}` : ''}
- Status: ✓ Verified Owner

What's Next?
• You can now manage and respond to reviews for your website
• Your verified status will be displayed publicly  
• You'll receive notifications about new reviews
• Access your dashboard to monitor your website's performance

Thank you for being part of the Hustleworthy community!

Best regards,
The Hustleworthy Team
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Ownership approval email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending ownership approval email:', error);
    throw error;
  }
};
