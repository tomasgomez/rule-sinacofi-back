/*
  Warnings:

  - You are about to drop the `RuleParameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RuleSchema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OptionValueToParameter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RuleParameter" DROP CONSTRAINT "RuleParameter_parameterName_fkey";

-- DropForeignKey
ALTER TABLE "RuleParameter" DROP CONSTRAINT "RuleParameter_rulesName_fkey";

-- DropForeignKey
ALTER TABLE "RuleSchema" DROP CONSTRAINT "RuleSchema_messageCode_fkey";

-- DropForeignKey
ALTER TABLE "RuleSchema" DROP CONSTRAINT "RuleSchema_rulesName_fkey";

-- DropForeignKey
ALTER TABLE "_OptionValueToParameter" DROP CONSTRAINT "_OptionValueToParameter_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionValueToParameter" DROP CONSTRAINT "_OptionValueToParameter_B_fkey";

-- DropTable
DROP TABLE "RuleParameter";

-- DropTable
DROP TABLE "RuleSchema";

-- DropTable
DROP TABLE "_OptionValueToParameter";

-- CreateTable
CREATE TABLE "_ParameterToRule" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RuleToSchema" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ParameterToRule_AB_unique" ON "_ParameterToRule"("A", "B");

-- CreateIndex
CREATE INDEX "_ParameterToRule_B_index" ON "_ParameterToRule"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RuleToSchema_AB_unique" ON "_RuleToSchema"("A", "B");

-- CreateIndex
CREATE INDEX "_RuleToSchema_B_index" ON "_RuleToSchema"("B");

-- CreateIndex
CREATE INDEX "ParameterOption_parameterName_optionName_optionType_idx" ON "ParameterOption"("parameterName", "optionName", "optionType");

-- AddForeignKey
ALTER TABLE "_ParameterToRule" ADD CONSTRAINT "_ParameterToRule_A_fkey" FOREIGN KEY ("A") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToRule" ADD CONSTRAINT "_ParameterToRule_B_fkey" FOREIGN KEY ("B") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleToSchema" ADD CONSTRAINT "_RuleToSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleToSchema" ADD CONSTRAINT "_RuleToSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
