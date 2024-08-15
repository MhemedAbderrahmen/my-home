/*
  Warnings:

  - You are about to drop the column `partnersId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Partners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_partnersId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "partnersId";

-- DropTable
DROP TABLE "Partners";

-- CreateTable
CREATE TABLE "Partnership" (
    "id" SERIAL NOT NULL,
    "user_1Id" TEXT NOT NULL,
    "user_2Id" TEXT NOT NULL,

    CONSTRAINT "Partnership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partnership_user_1Id_key" ON "Partnership"("user_1Id");

-- CreateIndex
CREATE UNIQUE INDEX "Partnership_user_2Id_key" ON "Partnership"("user_2Id");

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_user_1Id_fkey" FOREIGN KEY ("user_1Id") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_user_2Id_fkey" FOREIGN KEY ("user_2Id") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
