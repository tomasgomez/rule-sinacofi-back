/*
  Warnings:

  - Added the required column `name` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldId` to the `Parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parameter" ADD COLUMN     "fieldId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
