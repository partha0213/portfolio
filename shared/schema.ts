import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Projects table for portfolio projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  year: text("year").notNull(),
  badgeColor: text("badge_color").notNull(),
  tags: text("tags").array().notNull(),
  githubUrl: text("github_url").default("https://github.com/partha0213"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Skills table for portfolio skills section
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  percentage: integer("percentage").notNull(),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Skill categories table
export const skillCategories = pgTable("skill_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

export const insertSkillCategorySchema = createInsertSchema(skillCategories).omit({
  id: true,
});

export type InsertSkillCategory = z.infer<typeof insertSkillCategorySchema>;
export type SkillCategory = typeof skillCategories.$inferSelect;

// Achievements table for portfolio achievements section
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  description: text("description").notNull(),
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

// Timeline table for about section
export const timelineItems = pgTable("timeline_items", {
  id: serial("id").primaryKey(),
  period: text("period").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const insertTimelineItemSchema = createInsertSchema(timelineItems).omit({
  id: true,
});

export type InsertTimelineItem = z.infer<typeof insertTimelineItemSchema>;
export type TimelineItem = typeof timelineItems.$inferSelect;

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
