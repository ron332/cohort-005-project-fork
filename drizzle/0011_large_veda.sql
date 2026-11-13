CREATE TABLE `refund_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`purchase_id` integer NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`reason` text NOT NULL,
	`refundable_amount` integer NOT NULL,
	`raised_at` text NOT NULL,
	`decided_at` text,
	`decided_by_user_id` integer,
	FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`decided_by_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `refund_requests_purchase_idx` ON `refund_requests` (`purchase_id`);--> statement-breakpoint
CREATE TABLE `refunds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`refund_request_id` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`amount_refunded` integer,
	`created_at` text NOT NULL,
	`issued_at` text,
	FOREIGN KEY (`refund_request_id`) REFERENCES `refund_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `refunds_refund_request_idx` ON `refunds` (`refund_request_id`);