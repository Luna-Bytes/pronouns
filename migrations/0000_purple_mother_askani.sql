CREATE TABLE `words` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`love` text DEFAULT '[]' NOT NULL,
	`like` text DEFAULT '[]' NOT NULL,
	`idk` text DEFAULT '[]' NOT NULL,
	`jokingly` text DEFAULT '[]' NOT NULL,
	`close` text DEFAULT '[]' NOT NULL,
	`dislike` text DEFAULT '[]' NOT NULL,
	`hate` text DEFAULT '[]' NOT NULL,
	`createdAt` text DEFAULT (datetime('now')) NOT NULL,
	`modifiedAt` text DEFAULT (datetime('now')) NOT NULL
);
