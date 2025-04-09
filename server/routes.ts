import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { leadSchema, businessSavingsSchema } from "@shared/schema";
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
      emailConfigured: !!(
        (process.env.SENDGRID_API_KEY) || 
        (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
      )
    });
  });
  
  // API to get all leads (admin access)
  app.get("/api/leads", async (_req, res) => {
    try {
      const leads = await storage.getLeads();
      res.status(200).json({ leads });
    } catch (error) {
      console.error('Error retrieving leads:', error);
      res.status(500).json({
        message: "An error occurred while retrieving leads"
      });
    }
  });

  // Lead capture API endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate the lead data
      const leadData = leadSchema.parse(req.body);
      
      // Store the lead in our database (the most important part)
      const lead = await storage.createLead(leadData);
      
      // Log the lead for admin access
      console.log('New lead captured:', {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        interest: lead.interest,
        timestamp: lead.createdAt
      });
      
      // Attempt to send email notification, but don't fail if it doesn't work
      let emailSent = false;
      let emailError = null;
      
      // Check if email sending is possible (SendGrid or Gmail)
      const canSendEmail = !!(
        (process.env.SENDGRID_API_KEY) || 
        (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
      );
      
      if (canSendEmail) {
        try {
          await sendLeadNotification(lead);
          emailSent = true;
          console.log(`Email notification sent for lead from ${lead.email}`);
        } catch (error: any) {
          emailError = error.message || 'Unknown email error';
          console.error('Failed to send email notification:', error);
        }
      } else {
        console.warn('Email service not configured. Skipping email notification.');
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
  
  // Business Savings API endpoints
  // Create a new business savings quote request
  app.post("/api/business-savings", async (req, res) => {
    try {
      // Validate the business savings data
      const savingsData = businessSavingsSchema.parse(req.body);
      
      // Store the business savings quote in our database
      const businessSavings = await storage.createBusinessSavings(savingsData);
      
      // Log the business savings request
      console.log('New business savings request:', {
        name: `${businessSavings.firstName} ${businessSavings.lastName}`,
        email: businessSavings.email,
        phone: businessSavings.phoneNumber,
        serviceType: businessSavings.serviceType,
        estimatedSavings: businessSavings.estimatedSavings,
        timestamp: businessSavings.createdAt
      });
      
      // Attempt to send email notification, but don't fail if it doesn't work
      let emailSent = false;
      let emailError = null;
      
      // Check if email sending is possible (SendGrid or Gmail)
      const canSendEmail = !!(
        (process.env.SENDGRID_API_KEY) || 
        (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
      );
      
      if (canSendEmail) {
        try {
          // Create a lead-like object for the email notification
          const leadData = {
            id: businessSavings.id,
            name: `${businessSavings.firstName} ${businessSavings.lastName}`,
            email: businessSavings.email,
            phone: businessSavings.phoneNumber,
            address: businessSavings.address,
            interest: `Business Savings (${businessSavings.serviceType})`,
            message: `Estimated Annual Savings: $${businessSavings.estimatedSavings}. 
                     Service Type: ${businessSavings.serviceType}. 
                     ${businessSavings.internetPackage ? `Internet: ${JSON.stringify(businessSavings.internetPackage)}. ` : ''}
                     ${businessSavings.phonePackage ? `Phone: ${JSON.stringify(businessSavings.phonePackage)}. ` : ''}
                     Has LLC: ${businessSavings.hasLLC ? 'Yes' : 'No'}`,
            createdAt: businessSavings.createdAt
          };
          
          await sendLeadNotification(leadData);
          emailSent = true;
          console.log(`Email notification sent for business savings request from ${businessSavings.email}`);
        } catch (error: any) {
          emailError = error.message || 'Unknown email error';
          console.error('Failed to send business savings email notification:', error);
        }
      } else {
        console.warn('Email service not configured. Skipping email notification for business savings.');
      }
      
      // Return success response to the client
      res.status(201).json({
        message: "Business savings request captured successfully",
        businessSavings,
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
        console.error('Error processing business savings request:', error);
        res.status(500).json({
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  
  // Get all business savings requests (admin access)
  app.get("/api/business-savings", async (_req, res) => {
    try {
      const businessSavings = await storage.getBusinessSavings();
      res.status(200).json({ businessSavings });
    } catch (error) {
      console.error('Error retrieving business savings requests:', error);
      res.status(500).json({
        message: "An error occurred while retrieving business savings requests"
      });
    }
  });
  
  // Get a specific business savings request by ID
  app.get("/api/business-savings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const businessSavings = await storage.getBusinessSavingsById(id);
      if (!businessSavings) {
        return res.status(404).json({ message: "Business savings request not found" });
      }
      
      res.status(200).json({ businessSavings });
    } catch (error) {
      console.error('Error retrieving business savings request:', error);
      res.status(500).json({
        message: "An error occurred while retrieving the business savings request"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
