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

export const favoriteMusic = sqliteTable("favoriteMusic", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),

    artist: text("artist").default(""),
    album: text("album").default(""),
    spotifyId: text("spotifyId").notNull().unique(),
    spotifyUri: text("spotifyUri").notNull(),
    createdAt: text("createdAt").notNull().default(sql`(datetime('now'))`),
})

export const currentMusic = sqliteTable("currentMusic", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),

    artist: text("artist").default(""),
    album: text("album").default(""),
    spotifyId: text("spotifyId").notNull().unique(),
    spotifyUri: text("spotifyUri").notNull(),
    createdAt: text("createdAt").notNull().default(sql`(datetime('now'))`),
    expiresAt: text("expiresAt").notNull().default(sql`(datetime('now', '+14 days'))`),
})