import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { integer, numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => customers.id),
  position: text("position").notNull(),
});

export const menu = pgTable("menu", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 4, scale: 2 }).notNull(),
});

export const orderItems = pgTable("order_items", {
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  itemId: integer("item_id")
    .notNull()
    .references(() => menu.id),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  sales: numeric("sales", { precision: 10, scale: 2 }).notNull(),
});

// creating type from inferSelectModel
export type customersSelect = InferSelectModel<typeof customers>;
export type employeesSelect = InferSelectModel<typeof employees>;
export type menuSelect = InferSelectModel<typeof menu>;
export type orderItemsSelect = InferSelectModel<typeof orderItems>;
export type ordersSelect = InferSelectModel<typeof orders>;
export type restaurantsSelect = InferSelectModel<typeof restaurants>;

// zod object that contains necessary schema
export const restaurantsInsertSchema = createInsertSchema(restaurants);
export const employeeInsertSchema = createInsertSchema(employees);
export const customerInsertSchema = createInsertSchema(customers);
export const orderInsertSchema = createInsertSchema(orders);
export const orderItemsInsertSchema = createInsertSchema(orderItems);

//export type restaurantsInsertSchema = InferInsertModel<typeof restaurants>;
