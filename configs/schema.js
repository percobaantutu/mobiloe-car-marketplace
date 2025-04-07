import { pgTable, serial, varchar, integer, text, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Car Listing Table
export const CarListing = pgTable("car_listing", {
  id: serial("id").primaryKey(),
  listing_title: varchar("listing_title", { length: 255 }).notNull(),
  listing_description: varchar("listing_description", { length: 255 }).notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: integer("year").notNull(),
  price: integer("price").notNull(),
  mileage: integer("mileage").notNull(),
  fuel_type: varchar("fuel_type").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  drive_type: varchar("drive_type").notNull(),
  transmission: varchar("transmission").notNull(),
  color: varchar("color").notNull(),
  created_by: varchar("created_by").notNull(),
  user_name: varchar("user_name").notNull().default("Anonymous"),
  user_image_url: varchar("user_image_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  features: json("features"),
});

// Car Images Table
export const CarImages = pgTable("car_images", {
  id: serial("id").primaryKey(),
  car_id: integer("car_id")
    .references(() => CarListing.id)
    .notNull(),
  image_url: text("image_url").notNull(),
  is_primary: boolean("is_primary").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Relationships
export const carRelations = relations(CarListing, ({ many }) => ({
  images: many(CarImages),
}));

export const carImageRelations = relations(CarImages, ({ one }) => ({
  car: one(CarListing, {
    fields: [CarImages.car_id],
    references: [CarListing.id],
  }),
}));
