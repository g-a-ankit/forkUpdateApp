-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DEFAULT E'NONE',
ALTER COLUMN "forkCount" SET DEFAULT 0;
