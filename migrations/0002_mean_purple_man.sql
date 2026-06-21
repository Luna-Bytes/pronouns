CREATE TABLE `currentMusic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`artist` text DEFAULT '',
	`album` text DEFAULT '',
	`spotifyId` text NOT NULL,
	`spotifyUri` text NOT NULL,
	`createdAt` text DEFAULT (datetime('now')) NOT NULL,
	`expiresAt` text DEFAULT (datetime('now', '+14 days')) NOT NULL
);
