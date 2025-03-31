import nodemailer from 'nodemailer';
import { ContactMessage } from '@shared/schema';

// Initialize the email transporter
// In production, you'd use a real SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

// Email verification function
export async function verifyEmailConfig(): Promise<boolean> {
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
  try {
    // Basic validation
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured. Skipping email send.');
      return false;
    }

    // Format the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'parthasarathyg693@gmail.com', // Your email address
      replyTo: message.email,
      subject: `Portfolio Contact: ${message.subject}`,
      text: `
Name: ${message.name}
Email: ${message.email}
Subject: ${message.subject}

Message:
${message.message}
      `,
      html: `
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
      `
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

// Function to send an auto-reply to the person who submitted the form
export async function sendAutoReply(toEmail: string, name: string): Promise<boolean> {
  try {
    // Basic validation
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured. Skipping auto-reply.');
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Thank you for your message',
      text: `
Dear ${name},

Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.

Best regards,
Parthasarathy GaneshPrabhu
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4a5568;">Thank You for Your Message</h2>
  <p>Dear ${name},</p>
  <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
  <p>Best regards,<br>Parthasarathy GaneshPrabhu</p>
</div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
    return false;
  }
}