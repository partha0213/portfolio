import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertContactMessageSchema, 
  insertProjectSchema,
  insertSkillSchema,
  insertSkillCategorySchema,
  insertAchievementSchema,
  insertTimelineItemSchema
} from "@shared/schema";
import { sendContactEmail, sendAutoReply, verifyEmailConfig } from "./emailService";

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects API endpoints
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch projects" 
      });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid project ID" 
        });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      
      res.status(200).json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch project" 
      });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid project ID" 
        });
      }
      
      // Partial validation of project data
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData);
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
      
      res.status(200).json(project);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid project ID" 
        });
      }
      
      const success = await storage.deleteProject(id);
      res.status(200).json({ success });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete project" 
      });
    }
  });

  // Skills API endpoints
  app.get("/api/skills", async (_req, res) => {
    try {
      const skills = await storage.getSkills();
      res.status(200).json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch skills" 
      });
    }
  });

  app.get("/api/skills/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category ID" 
        });
      }
      
      const skills = await storage.getSkillsByCategory(categoryId);
      res.status(200).json(skills);
    } catch (error) {
      console.error("Error fetching skills by category:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch skills by category" 
      });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(skillData);
      res.status(201).json(skill);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.patch("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid skill ID" 
        });
      }
      
      const skillData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, skillData);
      
      if (!skill) {
        return res.status(404).json({ 
          success: false, 
          message: "Skill not found" 
        });
      }
      
      res.status(200).json(skill);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid skill ID" 
        });
      }
      
      const success = await storage.deleteSkill(id);
      res.status(200).json({ success });
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete skill" 
      });
    }
  });

  // Skill Categories API endpoints
  app.get("/api/skill-categories", async (_req, res) => {
    try {
      const categories = await storage.getSkillCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching skill categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch skill categories" 
      });
    }
  });

  app.post("/api/skill-categories", async (req, res) => {
    try {
      const categoryData = insertSkillCategorySchema.parse(req.body);
      const category = await storage.createSkillCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.patch("/api/skill-categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category ID" 
        });
      }
      
      const categoryData = insertSkillCategorySchema.partial().parse(req.body);
      const category = await storage.updateSkillCategory(id, categoryData);
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: "Category not found" 
        });
      }
      
      res.status(200).json(category);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.delete("/api/skill-categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category ID" 
        });
      }
      
      const success = await storage.deleteSkillCategory(id);
      res.status(200).json({ success });
    } catch (error) {
      console.error("Error deleting skill category:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete skill category" 
      });
    }
  });

  // Achievements API endpoints
  app.get("/api/achievements", async (_req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.status(200).json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch achievements" 
      });
    }
  });

  app.post("/api/achievements", async (req, res) => {
    try {
      const achievementData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.patch("/api/achievements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid achievement ID" 
        });
      }
      
      const achievementData = insertAchievementSchema.partial().parse(req.body);
      const achievement = await storage.updateAchievement(id, achievementData);
      
      if (!achievement) {
        return res.status(404).json({ 
          success: false, 
          message: "Achievement not found" 
        });
      }
      
      res.status(200).json(achievement);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.delete("/api/achievements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid achievement ID" 
        });
      }
      
      const success = await storage.deleteAchievement(id);
      res.status(200).json({ success });
    } catch (error) {
      console.error("Error deleting achievement:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete achievement" 
      });
    }
  });

  // Timeline API endpoints
  app.get("/api/timeline", async (_req, res) => {
    try {
      const timelineItems = await storage.getTimelineItems();
      res.status(200).json(timelineItems);
    } catch (error) {
      console.error("Error fetching timeline items:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch timeline items" 
      });
    }
  });

  app.post("/api/timeline", async (req, res) => {
    try {
      const timelineData = insertTimelineItemSchema.parse(req.body);
      const timelineItem = await storage.createTimelineItem(timelineData);
      res.status(201).json(timelineItem);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.patch("/api/timeline/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid timeline item ID" 
        });
      }
      
      const timelineData = insertTimelineItemSchema.partial().parse(req.body);
      const timelineItem = await storage.updateTimelineItem(id, timelineData);
      
      if (!timelineItem) {
        return res.status(404).json({ 
          success: false, 
          message: "Timeline item not found" 
        });
      }
      
      res.status(200).json(timelineItem);
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.delete("/api/timeline/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid timeline item ID" 
        });
      }
      
      const success = await storage.deleteTimelineItem(id);
      res.status(200).json({ success });
    } catch (error) {
      console.error("Error deleting timeline item:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete timeline item" 
      });
    }
  });

  // Contact API endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store contact message in the database
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Check if email credentials are configured
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.warn("Email credentials not configured.");
        return res.status(200).json({ 
          success: true,
          message: "Your message has been saved, but email notifications are not configured yet."
        });
      }
      
      // Send email notification to the portfolio owner
      try {
        const emailSent = await sendContactEmail(contactMessage);
        
        if (!emailSent) {
          console.error("Failed to send email notification: Email service returned false");
          return res.status(200).json({ 
            success: true,
            message: "Your message has been saved, but there was an issue sending email notifications."
          });
        }
        
        // Send auto-reply to the person who submitted the contact form
        await sendAutoReply(contactMessage.email, contactMessage.name);
        
        return res.status(200).json({ 
          success: true,
          message: "Thank you for your message. I will get back to you soon."
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Provide a better message but still return a 200 status since we saved the message
        return res.status(200).json({ 
          success: true,
          message: "Your message has been saved, but there was an issue sending email notifications."
        });
      }
    } catch (error) {
      handleValidationError(error, res);
    }
  });

  app.get("/api/contact-messages", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact messages" 
      });
    }
  });

  app.delete("/api/contact-messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid message ID" 
        });
      }
      
      const success = await storage.deleteContactMessage(id);
      res.status(200).json({ success });
    } catch (error) {
      console.error("Error deleting contact message:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete contact message" 
      });
    }
  });

  // API endpoint for resume download
  app.get("/api/resume/download", (req, res) => {
    const filePath = process.cwd() + '/public/assets/Parthasarathy GaneshPrabhu.pdf';
    res.download(filePath, 'Parthasarathy_GaneshPrabhu_Resume.pdf', (err) => {
      if (err) {
        console.error("Error downloading resume:", err);
        res.status(500).json({
          success: false,
          message: "Failed to download resume"
        });
      }
    });
  });
  
  // API endpoint to verify email configuration
  app.get("/api/email/verify", async (_req, res) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables."
      });
    }
    
    try {
      const emailVerified = await verifyEmailConfig();
      if (emailVerified) {
        return res.status(200).json({
          success: true,
          message: "Email configuration is valid and working correctly."
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Email configuration failed verification. Check server logs for details."
        });
      }
    } catch (error) {
      console.error("Error verifying email configuration:", error);
      return res.status(500).json({
        success: false,
        message: "Error verifying email configuration. Check server logs for details."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Helper function to handle validation errors
function handleValidationError(error: unknown, res: Response) {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ 
      success: false,
      message: "Validation error",
      errors: error.errors 
    });
  } else {
    console.error("Server error:", error);
    return res.status(500).json({ 
      success: false,
      message: "An error occurred while processing your request."
    });
  }
}
