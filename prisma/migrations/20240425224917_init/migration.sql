/*
  Warnings:

  - You are about to drop the column `fieldId` on the `Parameter` table. All the data in the column will be lost.
  - You are about to drop the column `schemaId` on the `Parameter` table. All the data in the column will be lost.
  - You are about to drop the column `parameterId` on the `ParameterOption` table. All the data in the column will be lost.
  - You are about to drop the column `fieldName` on the `Rules` table. All the data in the column will be lost.
  - You are about to drop the column `parameterId` on the `Rules` table. All the data in the column will be lost.
  - You are about to drop the column `schemaId` on the `Rules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Field` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Parameter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ParameterOption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Rules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageCode]` on the table `Schema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fieldName` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schemaName` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameterName` to the `ParameterOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageCode` to the `Rules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_schemaId_fkey";

-- DropForeignKey
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_parameterId_fkey";

-- DropForeignKey
ALTER TABLE "Rules" DROP CONSTRAINT "Rules_parameterId_fkey";

-- DropForeignKey
ALTER TABLE "Rules" DROP CONSTRAINT "Rules_schemaId_fkey";

-- AlterTable
ALTER TABLE "Parameter" DROP COLUMN "fieldId",
DROP COLUMN "schemaId",
ADD COLUMN     "fieldName" TEXT NOT NULL,
ADD COLUMN     "schemaName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParameterOption" DROP COLUMN "parameterId",
ADD COLUMN     "parameterName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rules" DROP COLUMN "fieldName",
DROP COLUMN "parameterId",
DROP COLUMN "schemaId",
ADD COLUMN     "messageCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ParameterParameterOption" (
    "parameterName" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,

    CONSTRAINT "ParameterParameterOption_pkey" PRIMARY KEY ("parameterName","optionName")
);

-- CreateTable
CREATE TABLE "RulesParameter" (
    "rulesName" TEXT NOT NULL,
    "parameterName" TEXT NOT NULL,

    CONSTRAINT "RulesParameter_pkey" PRIMARY KEY ("rulesName","parameterName")
);

-- CreateTable
CREATE TABLE "_ParameterToParameterOption" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ParameterToRules" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ParameterToParameterOption_AB_unique" ON "_ParameterToParameterOption"("A", "B");

-- CreateIndex
CREATE INDEX "_ParameterToParameterOption_B_index" ON "_ParameterToParameterOption"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ParameterToRules_AB_unique" ON "_ParameterToRules"("A", "B");

-- CreateIndex
CREATE INDEX "_ParameterToRules_B_index" ON "_ParameterToRules"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Field_name_key" ON "Field"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Parameter_name_key" ON "Parameter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ParameterOption_name_key" ON "ParameterOption"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rules_name_key" ON "Rules"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Schema_messageCode_key" ON "Schema"("messageCode");

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_fieldName_fkey" FOREIGN KEY ("fieldName") REFERENCES "Field"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_schemaName_fkey" FOREIGN KEY ("schemaName") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rules" ADD CONSTRAINT "Rules_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToParameterOption" ADD CONSTRAINT "_ParameterToParameterOption_A_fkey" FOREIGN KEY ("A") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToParameterOption" ADD CONSTRAINT "_ParameterToParameterOption_B_fkey" FOREIGN KEY ("B") REFERENCES "ParameterOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToRules" ADD CONSTRAINT "_ParameterToRules_A_fkey" FOREIGN KEY ("A") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToRules" ADD CONSTRAINT "_ParameterToRules_B_fkey" FOREIGN KEY ("B") REFERENCES "Rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
