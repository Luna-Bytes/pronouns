CREATE TABLE `favoriteMusic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`artist` text DEFAULT '',
	`album` text DEFAULT '',
	`spotifyId` text NOT NULL,
	`spotifyUri` text NOT NULL,
	`createdAt` text DEFAULT (datetime('now')) NOT NULL
);
