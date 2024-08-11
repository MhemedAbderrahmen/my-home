-- AlterTable
ALTER TABLE "User" ADD COLUMN     "partnersId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_partnersId_fkey" FOREIGN KEY ("partnersId") REFERENCES "Partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;
