import nodemailer from 'nodemailer';
import { Lead } from '@shared/schema';

// For actual production use, you would need proper SMTP credentials
// This is a placeholder that will need to be updated with real credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Will need to set these environment variables
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'omar.mteir@internetsp.net',
      subject: `New Lead Submission - ${lead.interest}`,
      text: formattedMessage,
    });
    
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}