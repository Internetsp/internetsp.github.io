import { 
  users, type User, type InsertUser, 
  leads, type Lead, type InsertLead,
  businessSavings, type BusinessSavings, type InsertBusinessSavings
} from "@shared/schema";

// Modify the interface with any CRUD methods you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead management
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  
  // Business Savings management
  createBusinessSavings(data: InsertBusinessSavings): Promise<BusinessSavings>;
  getBusinessSavings(): Promise<BusinessSavings[]>;
  getBusinessSavingsById(id: number): Promise<BusinessSavings | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private businessSavingsData: Map<number, BusinessSavings>;
  private userCurrentId: number;
  private leadCurrentId: number;
  private businessSavingsCurrentId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.businessSavingsData = new Map();
    this.userCurrentId = 1;
    this.leadCurrentId = 1;
    this.businessSavingsCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.leadCurrentId++;
    const createdAt = new Date().toISOString();
    // Create a new object with explicit properties to ensure type safety
    const lead: Lead = {
      id,
      name: insertLead.name,
      email: insertLead.email,
      phone: insertLead.phone,
      address: insertLead.address,
      interest: insertLead.interest,
      message: insertLead.message ?? null,
      createdAt
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLead(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }
  
  async createBusinessSavings(insertData: InsertBusinessSavings): Promise<BusinessSavings> {
    const id = this.businessSavingsCurrentId++;
    const createdAt = new Date().toISOString();
    
    // Create a new object with explicit properties to ensure type safety
    const data: BusinessSavings = {
      id,
      firstName: insertData.firstName,
      lastName: insertData.lastName,
      email: insertData.email,
      phoneNumber: insertData.phoneNumber,
      address: insertData.address,
      hasLLC: insertData.hasLLC ?? false,
      serviceType: insertData.serviceType,
      internetPackage: insertData.internetPackage ?? null,
      phonePackage: insertData.phonePackage ?? null,
      estimatedSavings: insertData.estimatedSavings,
      createdAt
    };
    
    this.businessSavingsData.set(id, data);
    return data;
  }
  
  async getBusinessSavings(): Promise<BusinessSavings[]> {
    return Array.from(this.businessSavingsData.values());
  }
  
  async getBusinessSavingsById(id: number): Promise<BusinessSavings | undefined> {
    return this.businessSavingsData.get(id);
  }
}

export const storage = new MemStorage();
