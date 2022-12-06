-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "ydfID" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "FatherName" TEXT NOT NULL,
    "MotherName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "Doctor" TEXT NOT NULL,
    "Hospital" TEXT NOT NULL,
    "insulinType" TEXT NOT NULL,
    "stripType" TEXT NOT NULL,
    "syringeType" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HBA1C" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HBA1C_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insulin" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insulin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strip" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Strip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Syringe" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Syringe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HBA1C" ADD CONSTRAINT "HBA1C_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insulin" ADD CONSTRAINT "Insulin_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strip" ADD CONSTRAINT "Strip_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syringe" ADD CONSTRAINT "Syringe_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
