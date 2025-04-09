import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
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

// Lead capture form schema
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  interest: text("interest").notNull(),
  message: text("message"),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const leadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

export type InsertLead = z.infer<typeof leadSchema>;
export type Lead = typeof leads.$inferSelect;

// Business savings schema
export const businessSavings = pgTable("business_savings", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  address: text("address").notNull(),
  hasLLC: boolean("has_llc").default(false),
  serviceType: text("service_type").notNull(), // 'internet', 'phone', or 'both'
  internetPackage: json("internet_package").$type<{
    type: string;
    quantity: number;
  }>(),
  phonePackage: json("phone_package").$type<{
    type: string;
    quantity: number;
    devicePayoff: {
      hasDevice: boolean;
      wantsPayoff: boolean;
      carrier: string;
      deviceCount: number;
      balancePerDevice: number;
    };
  }>(),
  estimatedSavings: integer("estimated_savings").notNull(),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const businessSavingsSchema = createInsertSchema(businessSavings).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  estimatedSavings: z.number().int().min(0),
  serviceType: z.enum(['internet', 'phone', 'both']),
});

export type InsertBusinessSavings = z.infer<typeof businessSavingsSchema>;
export type BusinessSavings = typeof businessSavings.$inferSelect;
