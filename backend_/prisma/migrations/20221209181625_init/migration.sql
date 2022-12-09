-- DropForeignKey
ALTER TABLE "HBA1C" DROP CONSTRAINT "HBA1C_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Insulin" DROP CONSTRAINT "Insulin_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Strip" DROP CONSTRAINT "Strip_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Syringe" DROP CONSTRAINT "Syringe_studentId_fkey";

-- AlterTable
ALTER TABLE "HBA1C" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Insulin" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Strip" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Syringe" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "HBA1C" ADD CONSTRAINT "HBA1C_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("ydfID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insulin" ADD CONSTRAINT "Insulin_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("ydfID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strip" ADD CONSTRAINT "Strip_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("ydfID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syringe" ADD CONSTRAINT "Syringe_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("ydfID") ON DELETE RESTRICT ON UPDATE CASCADE;
