import { pgTable, serial, varchar, json, timestamp, integer, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const carListing = pgTable("car_listing", {
	serial: serial().notNull(),
	id: serial().primaryKey().notNull(),
	listingTitle: varchar("listing_title", { length: 255 }).notNull(),
	tagline: varchar(),
	originalPrice: varchar().notNull(),
	sellingPrice: varchar().notNull(),
	category: varchar().notNull(),
	condition: varchar().notNull(),
	make: varchar({ length: 100 }).notNull(),
	model: varchar({ length: 100 }).notNull(),
	year: varchar().notNull(),
	driveType: varchar().notNull(),
	transmission: varchar().notNull(),
	fuelType: varchar("fuel_type").notNull(),
	mileage: varchar().notNull(),
	engineSize: varchar(),
	cylinder: varchar(),
	color: varchar().notNull(),
	door: varchar().notNull(),
	offerType: varchar().notNull(),
	vin: varchar().notNull(),
	listingDescription: varchar().notNull(),
	features: json(),
	images: json().notNull(),
	createdBy: varchar("created_by").notNull(),
	postedOn: varchar(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const carImages = pgTable("car_images", {
	id: serial().primaryKey().notNull(),
	carId: integer("car_id").notNull(),
	imageUrl: text("image_url").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});
