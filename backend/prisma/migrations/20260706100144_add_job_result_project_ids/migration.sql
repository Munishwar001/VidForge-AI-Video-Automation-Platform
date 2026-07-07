-- AlterTable
ALTER TABLE "generation_jobs" ADD COLUMN     "resultProjectIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
