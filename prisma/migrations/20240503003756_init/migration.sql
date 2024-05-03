/*
  Warnings:

  - You are about to drop the column `schemaName` on the `Parameter` table. All the data in the column will be lost.
  - The primary key for the `ParameterOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_RuleToSchema` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,messageCode]` on the table `Parameter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageCode` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameterMessageCode` to the `ParameterOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_schemaName_fkey";

-- DropForeignKey
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_parameterName_fkey";

-- DropForeignKey
ALTER TABLE "_RuleToSchema" DROP CONSTRAINT "_RuleToSchema_A_fkey";

-- DropForeignKey
ALTER TABLE "_RuleToSchema" DROP CONSTRAINT "_RuleToSchema_B_fkey";

-- DropIndex
DROP INDEX "Parameter_name_key";

-- DropIndex
DROP INDEX "ParameterOption_parameterName_optionName_optionType_idx";

-- AlterTable
ALTER TABLE "Parameter" DROP COLUMN "schemaName",
ADD COLUMN     "messageCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_pkey",
ADD COLUMN     "parameterMessageCode" TEXT NOT NULL,
ADD CONSTRAINT "ParameterOption_pkey" PRIMARY KEY ("parameterName", "optionName", "optionType", "parameterMessageCode");

-- DropTable
DROP TABLE "_RuleToSchema";

-- CreateTable
CREATE TABLE "_RuleSchema" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RuleSchema_AB_unique" ON "_RuleSchema"("A", "B");

-- CreateIndex
CREATE INDEX "_RuleSchema_B_index" ON "_RuleSchema"("B");

-- CreateIndex
CREATE INDEX "Parameter_name_idx" ON "Parameter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Parameter_name_messageCode_key" ON "Parameter"("name", "messageCode");

-- CreateIndex
CREATE INDEX "ParameterOption_parameterName_optionName_optionType_paramet_idx" ON "ParameterOption"("parameterName", "optionName", "optionType", "parameterMessageCode");

-- CreateIndex
CREATE INDEX "Schema_messageCode_idx" ON "Schema"("messageCode");

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterOption" ADD CONSTRAINT "ParameterOption_parameterName_parameterMessageCode_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode") REFERENCES "Parameter"("name", "messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleSchema" ADD CONSTRAINT "_RuleSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleSchema" ADD CONSTRAINT "_RuleSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
