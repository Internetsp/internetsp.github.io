import nodemailer from 'nodemailer';
import { Lead } from '@shared/schema';

// Configure email transport with support for Gmail's security requirements
// For Gmail accounts, you need to use an "App Password" instead of your regular password
// Visit https://myaccount.google.com/apppasswords to generate one
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // This should be an App Password for Gmail
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
});

// Verify the transporter is properly configured
export async function verifyEmailTransporter(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('Email transporter is ready to send emails');
    return true;
  } catch (error) {
    console.error('Email transporter verification failed:', error);
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
    const info = await transporter.sendMail({
      from: `"Internetsp Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'omar.mteir@internetsp.net',
      subject: `New Lead Submission - ${lead.interest}`,
      text: formattedMessage,
      html: htmlMessage,
    });
    
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error; // Rethrow to handle in the route
  }
}