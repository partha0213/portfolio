import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  skillCategories, type SkillCategory, type InsertSkillCategory,
  achievements, type Achievement, type InsertAchievement,
  timelineItems, type TimelineItem, type InsertTimelineItem,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Skill methods
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(categoryId: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Skill category methods
  getSkillCategories(): Promise<SkillCategory[]>;
  getSkillCategory(id: number): Promise<SkillCategory | undefined>;
  createSkillCategory(category: InsertSkillCategory): Promise<SkillCategory>;
  updateSkillCategory(id: number, category: Partial<InsertSkillCategory>): Promise<SkillCategory | undefined>;
  deleteSkillCategory(id: number): Promise<boolean>;
  
  // Achievement methods
  getAchievements(): Promise<Achievement[]>;
  getAchievement(id: number): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement | undefined>;
  deleteAchievement(id: number): Promise<boolean>;
  
  // Timeline methods
  getTimelineItems(): Promise<TimelineItem[]>;
  getTimelineItem(id: number): Promise<TimelineItem | undefined>;
  createTimelineItem(timelineItem: InsertTimelineItem): Promise<TimelineItem>;
  updateTimelineItem(id: number, timelineItem: Partial<InsertTimelineItem>): Promise<TimelineItem | undefined>;
  deleteTimelineItem(id: number): Promise<boolean>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db.update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return true;
  }

  // Skill methods
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getSkillsByCategory(categoryId: number): Promise<Skill[]> {
    return await db.select().from(skills).where(eq(skills.categoryId, categoryId));
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db.update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }

  async deleteSkill(id: number): Promise<boolean> {
    await db.delete(skills).where(eq(skills.id, id));
    return true;
  }

  // Skill category methods
  async getSkillCategories(): Promise<SkillCategory[]> {
    return await db.select().from(skillCategories);
  }

  async getSkillCategory(id: number): Promise<SkillCategory | undefined> {
    const [category] = await db.select().from(skillCategories).where(eq(skillCategories.id, id));
    return category;
  }

  async createSkillCategory(category: InsertSkillCategory): Promise<SkillCategory> {
    const [newCategory] = await db.insert(skillCategories).values(category).returning();
    return newCategory;
  }

  async updateSkillCategory(id: number, category: Partial<InsertSkillCategory>): Promise<SkillCategory | undefined> {
    const [updatedCategory] = await db.update(skillCategories)
      .set(category)
      .where(eq(skillCategories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteSkillCategory(id: number): Promise<boolean> {
    await db.delete(skillCategories).where(eq(skillCategories.id, id));
    return true;
  }

  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getAchievement(id: number): Promise<Achievement | undefined> {
    const [achievement] = await db.select().from(achievements).where(eq(achievements.id, id));
    return achievement;
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db.insert(achievements).values(achievement).returning();
    return newAchievement;
  }

  async updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement | undefined> {
    const [updatedAchievement] = await db.update(achievements)
      .set(achievement)
      .where(eq(achievements.id, id))
      .returning();
    return updatedAchievement;
  }

  async deleteAchievement(id: number): Promise<boolean> {
    await db.delete(achievements).where(eq(achievements.id, id));
    return true;
  }

  // Timeline methods
  async getTimelineItems(): Promise<TimelineItem[]> {
    return await db.select().from(timelineItems);
  }

  async getTimelineItem(id: number): Promise<TimelineItem | undefined> {
    const [timelineItem] = await db.select().from(timelineItems).where(eq(timelineItems.id, id));
    return timelineItem;
  }

  async createTimelineItem(timelineItem: InsertTimelineItem): Promise<TimelineItem> {
    const [newTimelineItem] = await db.insert(timelineItems).values(timelineItem).returning();
    return newTimelineItem;
  }

  async updateTimelineItem(id: number, timelineItem: Partial<InsertTimelineItem>): Promise<TimelineItem | undefined> {
    const [updatedTimelineItem] = await db.update(timelineItems)
      .set(timelineItem)
      .where(eq(timelineItems.id, id))
      .returning();
    return updatedTimelineItem;
  }

  async deleteTimelineItem(id: number): Promise<boolean> {
    await db.delete(timelineItems).where(eq(timelineItems.id, id));
    return true;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
