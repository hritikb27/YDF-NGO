/*
  Warnings:

  - A unique constraint covering the columns `[ydfID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_ydfID_key" ON "Student"("ydfID");
