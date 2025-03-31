import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a production app, you might send an email or store this in a database
      console.log("Contact form submission:", validatedData);
      
      res.status(200).json({ 
        success: true,
        message: "Thank you for your message. I will get back to you soon."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: "Validation error",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: "An error occurred while processing your request."
        });
      }
    }
  });

  // API endpoint for resume download
  app.get("/api/resume/download", (req, res) => {
    // In a real app, this would serve an actual file
    // For now, we'll just return a dummy response
    res.status(200).json({
      success: true,
      message: "Resume download endpoint"
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
