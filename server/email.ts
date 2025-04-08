import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { Lead } from '@shared/schema';

// Check if SendGrid API key is available
const useSendGrid = !!process.env.SENDGRID_API_KEY;

// Configure SendGrid if key is available
if (useSendGrid && process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Fallback to Nodemailer for Gmail, but this requires less secure apps to be enabled
// or an App Password to be generated
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify the email configuration is working
export async function verifyEmailTransporter(): Promise<boolean> {
  try {
    if (useSendGrid) {
      // SendGrid doesn't have a direct verification method, so we'll just check if API key is set
      if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SendGrid API key not set');
      }
      console.log('SendGrid API key is set and ready to use');
      return true;
    } else {
      // Verify Nodemailer configuration
      await transporter.verify();
      console.log('Nodemailer transport is ready to send emails');
      return true;
    }
  } catch (error) {
    console.error('Email configuration verification failed:', error);
    return false;
  }
}

export async function sendLeadNotification(lead: Lead): Promise<boolean> {
  // Format the email content
  const formattedMessage = `
    New lead submission:
    -------------------
    Name: ${lead.name}
    Email: ${lead.email}
    Phone: ${lead.phone}
    Address: ${lead.address}
    Interest: ${lead.interest}
    Message: ${lead.message || 'No message provided'}
    Submitted at: ${lead.createdAt}
  `;

  // HTML version of the email for better formatting
  const htmlMessage = `
    <h2>New Lead Submission</h2>
    <hr/>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Address:</strong> ${lead.address}</p>
    <p><strong>Interest:</strong> ${lead.interest}</p>
    <p><strong>Message:</strong> ${lead.message || 'No message provided'}</p>
    <p><strong>Submitted at:</strong> ${lead.createdAt}</p>
    <hr/>
    <p>This email was sent from the Internetsp website contact form.</p>
  `;

  try {
    if (useSendGrid && process.env.SENDGRID_API_KEY) {
      // Use SendGrid if API key is available
      const msg = {
        to: 'omar.mteir@internetsp.net',
        from: process.env.EMAIL_USER || 'contact@internetsp.net', // Must be verified in SendGrid
        subject: `New Lead Submission - ${lead.interest}`,
        text: formattedMessage,
        html: htmlMessage,
      };
      
      await sgMail.send(msg);
      console.log('Email sent successfully using SendGrid');
      return true;
    } else {
      // Fall back to Nodemailer if SendGrid is not configured
      const info = await transporter.sendMail({
        from: `"Internetsp Contact Form" <${process.env.EMAIL_USER}>`,
        to: 'omar.mteir@internetsp.net',
        subject: `New Lead Submission - ${lead.interest}`,
        text: formattedMessage,
        html: htmlMessage,
      });
      
      console.log('Email sent successfully using Nodemailer:', info.messageId);
      return true;
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error; // Rethrow to handle in the route
  }
}