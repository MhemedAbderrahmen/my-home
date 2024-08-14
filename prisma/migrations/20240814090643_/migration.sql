-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT DEFAULT '',
ALTER COLUMN "firstTimeSignIn" SET DEFAULT true;
