import nodemailer from 'nodemailer';
import { ContactMessage } from '@shared/schema';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid if API key is available and in correct format
try {
  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid initialized successfully');
  } else if (process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key format is incorrect - key should start with "SG."');
  }
} catch (error) {
  console.error('Failed to initialize SendGrid:', error);
}

// Initialize the email transporter for Gmail
// For Gmail with App Passwords
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || ''
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

// Check if SendGrid is correctly configured
function isSendGridConfigured(): boolean {
  return !!(process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.'));
}

// Email verification function
export async function verifyEmailConfig(): Promise<boolean> {
  // If SendGrid is available with correct format, we consider it verified
  if (isSendGridConfigured()) {
    return true;
  }
  
  // Otherwise, check nodemailer
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration failed:', error);
    return false;
  }
}

// Function to send contact form submissions to the portfolio owner
export async function sendContactEmail(message: ContactMessage): Promise<boolean> {
  const recipientEmail = 'parthasarathyg693@gmail.com'; // Your email address
  
  // Email content
  const emailText = `
Name: ${message.name}
Email: ${message.email}
Subject: ${message.subject}

Message:
${message.message}
  `;
  
  const emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4a5568;">New Contact Message from Portfolio</h2>
  <div style="border-left: 4px solid #6366f1; padding-left: 20px; margin: 20px 0;">
    <p><strong>From:</strong> ${message.name} (${message.email})</p>
    <p><strong>Subject:</strong> ${message.subject}</p>
    <p><strong>Message:</strong></p>
    <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px;">
      ${message.message.replace(/\n/g, '<br>')}
    </div>
  </div>
  <p style="color: #6b7280; font-size: 14px;">This message was sent from your portfolio website contact form.</p>
</div>
  `;

  // Try sending with SendGrid first if properly configured
  if (isSendGridConfigured()) {
    try {
      const fromEmail = process.env.EMAIL_USER || 'portfolio@noreply.com';
      
      const msg = {
        to: recipientEmail,
        from: fromEmail,
        subject: `Portfolio Contact: ${message.subject}`,
        text: emailText,
        html: emailHtml,
        replyTo: message.email
      };
      
      await sgMail.send(msg);
      console.log('Email sent via SendGrid');
      return true;
    } catch (error) {
      console.error('SendGrid email failed:', error);
      // Fall back to Nodemailer if SendGrid fails
    }
  }
  
  // Fall back to Nodemailer or use it as primary if SendGrid is not available
  try {
    // Check if we have credentials for Nodemailer
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured. Skipping Nodemailer send.');
      return false;
    }

    // Format the email content for Nodemailer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: message.email,
      subject: `Portfolio Contact: ${message.subject}`,
      text: emailText,
      html: emailHtml
    };

    // Send the email with Nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent via Nodemailer:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email via Nodemailer:', error);
    return false;
  }
}

// Function to send an auto-reply to the person who submitted the form
export async function sendAutoReply(toEmail: string, name: string): Promise<boolean> {
  // Email content for auto-reply
  const emailText = `
Dear ${name},

Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.

Best regards,
Parthasarathy GaneshPrabhu
  `;
  
  const emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4a5568;">Thank You for Your Message</h2>
  <p>Dear ${name},</p>
  <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
  <p>Best regards,<br>Parthasarathy GaneshPrabhu</p>
</div>
  `;

  // Try sending with SendGrid first if properly configured
  if (isSendGridConfigured()) {
    try {
      const fromEmail = process.env.EMAIL_USER || 'portfolio@noreply.com';
      
      const msg = {
        to: toEmail,
        from: fromEmail,
        subject: 'Thank you for your message',
        text: emailText,
        html: emailHtml
      };
      
      await sgMail.send(msg);
      console.log('Auto-reply sent via SendGrid');
      return true;
    } catch (error) {
      console.error('SendGrid auto-reply failed:', error);
      // Fall back to Nodemailer if SendGrid fails
    }
  }
  
  // Fall back to Nodemailer or use it as primary if SendGrid is not available
  try {
    // Check if we have credentials for Nodemailer
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured. Skipping Nodemailer auto-reply.');
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Thank you for your message',
      text: emailText,
      html: emailHtml
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent via Nodemailer:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send auto-reply via Nodemailer:', error);
    return false;
  }
}