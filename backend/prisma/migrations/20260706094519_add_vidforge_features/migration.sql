-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('VIDEO', 'IMAGE');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETED', 'PROCESSING', 'FAILED');

-- CreateEnum
CREATE TYPE "JobStage" AS ENUM ('QUEUED', 'PREPARING', 'GENERATING', 'RENDERING', 'FINALIZING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('GENERATED', 'UPLOADED', 'DELETED', 'FAVORITED', 'FAILED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "creditsRemaining" INTEGER NOT NULL DEFAULT 340,
ADD COLUMN     "creditsTotal" INTEGER NOT NULL DEFAULT 500,
ADD COLUMN     "notifyCreditAlerts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyGenerationComplete" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyProductUpdates" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyWeeklySummary" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "storageLimitBytes" DOUBLE PRECISION NOT NULL DEFAULT 53687091200,
ADD COLUMN     "storageUsedBytes" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'light',
ADD COLUMN     "totalImagesGenerated" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalVideosGenerated" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'COMPLETED',
    "thumbnail" TEXT NOT NULL,
    "duration" INTEGER,
    "resolution" TEXT,
    "creditsUsed" INTEGER NOT NULL DEFAULT 0,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_folders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "folderId" TEXT,
    "sizeBytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_history_entries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_history_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generation_jobs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "stage" "JobStage" NOT NULL DEFAULT 'QUEUED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "etaSeconds" INTEGER,
    "credits" INTEGER NOT NULL,
    "error" TEXT,
    "settings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generation_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "keyPreview" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "projects_userId_idx" ON "projects"("userId");

-- CreateIndex
CREATE INDEX "media_folders_userId_idx" ON "media_folders"("userId");

-- CreateIndex
CREATE INDEX "media_items_userId_idx" ON "media_items"("userId");

-- CreateIndex
CREATE INDEX "media_items_folderId_idx" ON "media_items"("folderId");

-- CreateIndex
CREATE INDEX "prompt_history_entries_userId_idx" ON "prompt_history_entries"("userId");

-- CreateIndex
CREATE INDEX "generation_jobs_userId_idx" ON "generation_jobs"("userId");

-- CreateIndex
CREATE INDEX "api_keys_userId_idx" ON "api_keys"("userId");

-- CreateIndex
CREATE INDEX "activity_items_userId_idx" ON "activity_items"("userId");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_folders" ADD CONSTRAINT "media_folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_items" ADD CONSTRAINT "media_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_items" ADD CONSTRAINT "media_items_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "media_folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_history_entries" ADD CONSTRAINT "prompt_history_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generation_jobs" ADD CONSTRAINT "generation_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_items" ADD CONSTRAINT "activity_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
