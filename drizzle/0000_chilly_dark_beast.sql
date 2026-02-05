CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE "public"."user_roles" AS ENUM('STUDENT', 'DORM_MANAGER', 'ADMIN', 'GUEST');

CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" "citext" NOT NULL,
	"role" "user_roles" DEFAULT 'STUDENT' NOT NULL,
	"avatar" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
