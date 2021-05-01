-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "repoCount" INTEGER NOT NULL,
    "forkCount" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
