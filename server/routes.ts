import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { leadSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendLeadNotification, verifyEmailTransporter } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Verify email transporter on startup if credentials are available
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    try {
      const verified = await verifyEmailTransporter();
      if (verified) {
        console.log('Email service is configured and ready to send messages');
      } else {
        console.warn('Email service verification failed. Emails may not be sent properly.');
      }
    } catch (error) {
      console.error('Error configuring email service:', error);
    }
  } else {
    console.warn('Email credentials not set. Email notifications will not be sent.');
  }

  // Set up a health check endpoint
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ 
      status: "ok",
      emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
    });
  });

  // Lead capture API endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate the lead data
      const leadData = leadSchema.parse(req.body);
      
      // Store the lead in our database
      const lead = await storage.createLead(leadData);
      
      // Attempt to send email notification
      let emailSent = false;
      let emailError = null;
      
      // Only attempt to send email if environment variables are set
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        try {
          await sendLeadNotification(lead);
          emailSent = true;
          console.log(`Email notification sent for lead from ${lead.email}`);
        } catch (error: any) {
          emailError = error.message || 'Unknown email error';
          console.error('Failed to send email notification:', error);
        }
      } else {
        console.warn('Email credentials not set. Skipping email notification.');
      }
      
      // Return success response to the client
      res.status(201).json({
        message: "Lead captured successfully",
        lead,
        emailSent,
        emailError: emailError ? `Email could not be sent: ${emailError}` : null
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation error",
          errors: validationError.toString()
        });
      } else {
        // Handle other errors
        console.error('Error processing lead:', error);
        res.status(500).json({
          message: "An error occurred while processing your request"
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
