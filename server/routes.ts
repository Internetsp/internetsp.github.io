import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { leadSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendLeadNotification } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead capture API endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = leadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      // Attempt to send email notification
      let emailSent = false;
      
      // Only attempt to send email if environment variables are set
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        emailSent = await sendLeadNotification(lead);
      } else {
        console.warn('Email credentials not set. Skipping email notification.');
      }
      
      res.status(201).json({
        message: "Lead captured successfully",
        lead,
        emailSent
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation error",
          errors: validationError.toString()
        });
      } else {
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
