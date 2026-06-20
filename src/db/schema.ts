import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const words = sqliteTable("words", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),

    love: text("love", { mode: "json" }).$type<string[]>().notNull().default([]),
    like: text("like", { mode: "json" }).$type<string[]>().notNull().default([]),
    idk: text("idk", { mode: "json" }).$type<string[]>().notNull().default([]),
    jokingly: text("jokingly", { mode: "json" }).$type<string[]>().notNull().default([]),
    close: text("close", { mode: "json" }).$type<string[]>().notNull().default([]),
    dislike: text("dislike", { mode: "json" }).$type<string[]>().notNull().default([]),
    hate: text("hate", { mode: "json" }).$type<string[]>().notNull().default([]),

    createdAt: text("createdAt").notNull().default(sql`(datetime('now'))`),
    modifiedAt: text("modifiedAt").notNull().default(sql`(datetime('now'))`),
})
