var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  achievements: () => achievements,
  contactMessages: () => contactMessages,
  insertAchievementSchema: () => insertAchievementSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertSkillCategorySchema: () => insertSkillCategorySchema,
  insertSkillSchema: () => insertSkillSchema,
  insertTimelineItemSchema: () => insertTimelineItemSchema,
  insertUserSchema: () => insertUserSchema,
  projects: () => projects,
  skillCategories: () => skillCategories,
  skills: () => skills,
  timelineItems: () => timelineItems,
  users: () => users
});
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  year: text("year").notNull(),
  badgeColor: text("badge_color").notNull(),
  tags: text("tags").array().notNull(),
  githubUrl: text("github_url").default("https://github.com/partha0213")
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true
});
var skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  percentage: integer("percentage").notNull()
});
var insertSkillSchema = createInsertSchema(skills).omit({
  id: true
});
var skillCategories = pgTable("skill_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull()
});
var insertSkillCategorySchema = createInsertSchema(skillCategories).omit({
  id: true
});
var achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  description: text("description").notNull()
});
var insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true
});
var timelineItems = pgTable("timeline_items", {
  id: serial("id").primaryKey(),
  period: text("period").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull()
});
var insertTimelineItemSchema = createInsertSchema(timelineItems).omit({
  id: true
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Project methods
  async getProjects() {
    return await db.select().from(projects);
  }
  async getProject(id) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  async createProject(project) {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }
  async updateProject(id, project) {
    const [updatedProject] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updatedProject;
  }
  async deleteProject(id) {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return true;
  }
  // Skill methods
  async getSkills() {
    return await db.select().from(skills);
  }
  async getSkillsByCategory(categoryId) {
    return await db.select().from(skills).where(eq(skills.categoryId, categoryId));
  }
  async createSkill(skill) {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }
  async updateSkill(id, skill) {
    const [updatedSkill] = await db.update(skills).set(skill).where(eq(skills.id, id)).returning();
    return updatedSkill;
  }
  async deleteSkill(id) {
    await db.delete(skills).where(eq(skills.id, id));
    return true;
  }
  // Skill category methods
  async getSkillCategories() {
    return await db.select().from(skillCategories);
  }
  async getSkillCategory(id) {
    const [category] = await db.select().from(skillCategories).where(eq(skillCategories.id, id));
    return category;
  }
  async createSkillCategory(category) {
    const [newCategory] = await db.insert(skillCategories).values(category).returning();
    return newCategory;
  }
  async updateSkillCategory(id, category) {
    const [updatedCategory] = await db.update(skillCategories).set(category).where(eq(skillCategories.id, id)).returning();
    return updatedCategory;
  }
  async deleteSkillCategory(id) {
    await db.delete(skillCategories).where(eq(skillCategories.id, id));
    return true;
  }
  // Achievement methods
  async getAchievements() {
    return await db.select().from(achievements);
  }
  async getAchievement(id) {
    const [achievement] = await db.select().from(achievements).where(eq(achievements.id, id));
    return achievement;
  }
  async createAchievement(achievement) {
    const [newAchievement] = await db.insert(achievements).values(achievement).returning();
    return newAchievement;
  }
  async updateAchievement(id, achievement) {
    const [updatedAchievement] = await db.update(achievements).set(achievement).where(eq(achievements.id, id)).returning();
    return updatedAchievement;
  }
  async deleteAchievement(id) {
    await db.delete(achievements).where(eq(achievements.id, id));
    return true;
  }
  // Timeline methods
  async getTimelineItems() {
    return await db.select().from(timelineItems);
  }
  async getTimelineItem(id) {
    const [timelineItem] = await db.select().from(timelineItems).where(eq(timelineItems.id, id));
    return timelineItem;
  }
  async createTimelineItem(timelineItem) {
    const [newTimelineItem] = await db.insert(timelineItems).values(timelineItem).returning();
    return newTimelineItem;
  }
  async updateTimelineItem(id, timelineItem) {
    const [updatedTimelineItem] = await db.update(timelineItems).set(timelineItem).where(eq(timelineItems.id, id)).returning();
    return updatedTimelineItem;
  }
  async deleteTimelineItem(id) {
    await db.delete(timelineItems).where(eq(timelineItems.id, id));
    return true;
  }
  // Contact message methods
  async getContactMessages() {
    return await db.select().from(contactMessages);
  }
  async createContactMessage(message) {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
  async deleteContactMessage(id) {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";

// server/emailService.ts
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
try {
  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith("SG.")) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("SendGrid initialized successfully");
  } else if (process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key format is incorrect - key should start with "SG."');
  }
} catch (error) {
  console.error("Failed to initialize SendGrid:", error);
}
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // use SSL
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || ""
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});
function isSendGridConfigured() {
  return !!(process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith("SG."));
}
async function verifyEmailConfig() {
  if (isSendGridConfigured()) {
    return true;
  }
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Email configuration failed:", error);
    return false;
  }
}
async function sendContactEmail(message) {
  const recipientEmail = "parthasarathyg693@gmail.com";
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
      ${message.message.replace(/\n/g, "<br>")}
    </div>
  </div>
  <p style="color: #6b7280; font-size: 14px;">This message was sent from your portfolio website contact form.</p>
</div>
  `;
  if (isSendGridConfigured()) {
    try {
      const fromEmail = process.env.EMAIL_USER || "portfolio@noreply.com";
      const msg = {
        to: recipientEmail,
        from: fromEmail,
        subject: `Portfolio Contact: ${message.subject}`,
        text: emailText,
        html: emailHtml,
        replyTo: message.email
      };
      await sgMail.send(msg);
      console.log("Email sent via SendGrid");
      return true;
    } catch (error) {
      console.error("SendGrid email failed:", error);
    }
  }
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("Email credentials not configured. Skipping Nodemailer send.");
      return false;
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: message.email,
      subject: `Portfolio Contact: ${message.subject}`,
      text: emailText,
      html: emailHtml
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent via Nodemailer:", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email via Nodemailer:", error);
    return false;
  }
}
async function sendAutoReply(toEmail, name) {
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
  if (isSendGridConfigured()) {
    try {
      const fromEmail = process.env.EMAIL_USER || "portfolio@noreply.com";
      const msg = {
        to: toEmail,
        from: fromEmail,
        subject: "Thank you for your message",
        text: emailText,
        html: emailHtml
      };
      await sgMail.send(msg);
      console.log("Auto-reply sent via SendGrid");
      return true;
    } catch (error) {
      console.error("SendGrid auto-reply failed:", error);
    }
  }
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("Email credentials not configured. Skipping Nodemailer auto-reply.");
      return false;
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Thank you for your message",
      text: emailText,
      html: emailHtml
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Auto-reply sent via Nodemailer:", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send auto-reply via Nodemailer:", error);
    return false;
  }
}

// server/routes.ts
var contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10)
});
async function registerRoutes(app2) {
  app2.get("/api/projects", async (_req, res) => {
    try {
      const projects2 = await storage.getProjects();
      res.status(200).json(projects2);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch projects"
      });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
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
  app2.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      handleValidationError(error, res);
    }
  });
  app2.patch("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID"
        });
      }
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
  app2.delete("/api/projects/:id", async (req, res) => {
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
  app2.get("/api/skills", async (_req, res) => {
    try {
      const skills2 = await storage.getSkills();
      res.status(200).json(skills2);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch skills"
      });
    }
  });
  app2.get("/api/skills/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID"
        });
      }
      const skills2 = await storage.getSkillsByCategory(categoryId);
      res.status(200).json(skills2);
    } catch (error) {
      console.error("Error fetching skills by category:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch skills by category"
      });
    }
  });
  app2.post("/api/skills", async (req, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(skillData);
      res.status(201).json(skill);
    } catch (error) {
      handleValidationError(error, res);
    }
  });
  app2.patch("/api/skills/:id", async (req, res) => {
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
  app2.delete("/api/skills/:id", async (req, res) => {
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
  app2.get("/api/skill-categories", async (_req, res) => {
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
  app2.post("/api/skill-categories", async (req, res) => {
    try {
      const categoryData = insertSkillCategorySchema.parse(req.body);
      const category = await storage.createSkillCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      handleValidationError(error, res);
    }
  });
  app2.patch("/api/skill-categories/:id", async (req, res) => {
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
  app2.delete("/api/skill-categories/:id", async (req, res) => {
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
  app2.get("/api/achievements", async (_req, res) => {
    try {
      const achievements2 = await storage.getAchievements();
      res.status(200).json(achievements2);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch achievements"
      });
    }
  });
  app2.post("/api/achievements", async (req, res) => {
    try {
      const achievementData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      handleValidationError(error, res);
    }
  });
  app2.patch("/api/achievements/:id", async (req, res) => {
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
  app2.delete("/api/achievements/:id", async (req, res) => {
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
  app2.get("/api/timeline", async (_req, res) => {
    try {
      const timelineItems2 = await storage.getTimelineItems();
      res.status(200).json(timelineItems2);
    } catch (error) {
      console.error("Error fetching timeline items:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch timeline items"
      });
    }
  });
  app2.post("/api/timeline", async (req, res) => {
    try {
      const timelineData = insertTimelineItemSchema.parse(req.body);
      const timelineItem = await storage.createTimelineItem(timelineData);
      res.status(201).json(timelineItem);
    } catch (error) {
      handleValidationError(error, res);
    }
  });
  app2.patch("/api/timeline/:id", async (req, res) => {
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
  app2.delete("/api/timeline/:id", async (req, res) => {
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
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.warn("Email credentials not configured.");
        return res.status(200).json({
          success: true,
          message: "Your message has been saved, but email notifications are not configured yet."
        });
      }
      try {
        const emailSent = await sendContactEmail(contactMessage);
        if (!emailSent) {
          console.error("Failed to send email notification: Email service returned false");
          return res.status(200).json({
            success: true,
            message: "Your message has been saved, but there was an issue sending email notifications."
          });
        }
        await sendAutoReply(contactMessage.email, contactMessage.name);
        return res.status(200).json({
          success: true,
          message: "Thank you for your message. I will get back to you soon."
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        return res.status(200).json({
          success: true,
          message: "Your message has been saved, but there was an issue sending email notifications."
        });
      }
    } catch (error) {
      handleValidationError(error, res);
    }
  });
  app2.get("/api/contact-messages", async (_req, res) => {
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
  app2.delete("/api/contact-messages/:id", async (req, res) => {
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
  app2.get("/api/resume/download", (req, res) => {
    const filePath = process.cwd() + "/public/assets/Parthasarathy GaneshPrabhu.pdf";
    res.download(filePath, "Parthasarathy_GaneshPrabhu_Resume.pdf", (err) => {
      if (err) {
        console.error("Error downloading resume:", err);
        res.status(500).json({
          success: false,
          message: "Failed to download resume"
        });
      }
    });
  });
  app2.get("/api/email/verify", async (_req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}
function handleValidationError(error, res) {
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

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import path3 from "path";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/assets", express2.static(path3.join(process.cwd(), "public/assets")));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
