/*
  Warnings:

  - You are about to drop the column `sender` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_userId_fkey";

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "sender",
ADD COLUMN     "senderId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
