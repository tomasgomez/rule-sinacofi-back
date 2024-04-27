/*
  Warnings:

  - The primary key for the `ParameterOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ParameterOption` table. All the data in the column will be lost.
  - You are about to drop the `Rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RulesParameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParameterToRules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rules" DROP CONSTRAINT "Rules_messageCode_fkey";

-- DropForeignKey
ALTER TABLE "RulesParameter" DROP CONSTRAINT "RulesParameter_rulesName_fkey";

-- DropForeignKey
ALTER TABLE "_ParameterToRules" DROP CONSTRAINT "_ParameterToRules_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParameterToRules" DROP CONSTRAINT "_ParameterToRules_B_fkey";

-- AlterTable
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ParameterOption_pkey" PRIMARY KEY ("parameterName", "optionName", "optionType");

-- DropTable
DROP TABLE "Rules";

-- DropTable
DROP TABLE "RulesParameter";

-- DropTable
DROP TABLE "_ParameterToRules";

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "messageCode" TEXT,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleParameter" (
    "rulesName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "parameterName" TEXT NOT NULL,

    CONSTRAINT "RuleParameter_pkey" PRIMARY KEY ("rulesName","ruleType","parameterName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rule_name_key" ON "Rule"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rule_name_type_key" ON "Rule"("name", "type");

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleParameter" ADD CONSTRAINT "RuleParameter_rulesName_ruleType_fkey" FOREIGN KEY ("rulesName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleParameter" ADD CONSTRAINT "RuleParameter_parameterName_fkey" FOREIGN KEY ("parameterName") REFERENCES "Parameter"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
