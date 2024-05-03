/*
  Warnings:

  - You are about to drop the `_OptionValueParameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RuleParameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RuleSchema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OptionValueParameter" DROP CONSTRAINT "_OptionValueParameter_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionValueParameter" DROP CONSTRAINT "_OptionValueParameter_B_fkey";

-- DropForeignKey
ALTER TABLE "_RuleParameter" DROP CONSTRAINT "_RuleParameter_A_fkey";

-- DropForeignKey
ALTER TABLE "_RuleParameter" DROP CONSTRAINT "_RuleParameter_B_fkey";

-- DropForeignKey
ALTER TABLE "_RuleSchema" DROP CONSTRAINT "_RuleSchema_A_fkey";

-- DropForeignKey
ALTER TABLE "_RuleSchema" DROP CONSTRAINT "_RuleSchema_B_fkey";

-- DropTable
DROP TABLE "_OptionValueParameter";

-- DropTable
DROP TABLE "_RuleParameter";

-- DropTable
DROP TABLE "_RuleSchema";

-- CreateTable
CREATE TABLE "RuleSchema" (
    "ruleName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "messageCode" TEXT NOT NULL,

    CONSTRAINT "RuleSchema_pkey" PRIMARY KEY ("ruleName","ruleType","messageCode")
);

-- CreateTable
CREATE TABLE "RuleParameter" (
    "ruleName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "parameterName" TEXT NOT NULL,
    "parameterMessageCode" TEXT NOT NULL,

    CONSTRAINT "RuleParameter_pkey" PRIMARY KEY ("ruleName","ruleType","parameterName","parameterMessageCode")
);

-- CreateTable
CREATE TABLE "ParameterOption" (
    "parameterName" TEXT NOT NULL,
    "parameterMessageCode" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionType" TEXT NOT NULL,

    CONSTRAINT "ParameterOption_pkey" PRIMARY KEY ("parameterName","optionName","optionType","parameterMessageCode")
);

-- CreateIndex
CREATE INDEX "RuleSchema_ruleName_ruleType_messageCode_idx" ON "RuleSchema"("ruleName", "ruleType", "messageCode");

-- CreateIndex
CREATE INDEX "RuleParameter_ruleName_ruleType_parameterName_parameterMess_idx" ON "RuleParameter"("ruleName", "ruleType", "parameterName", "parameterMessageCode");

-- CreateIndex
CREATE INDEX "ParameterOption_parameterName_optionName_optionType_paramet_idx" ON "ParameterOption"("parameterName", "optionName", "optionType", "parameterMessageCode");

-- AddForeignKey
ALTER TABLE "RuleSchema" ADD CONSTRAINT "RuleSchema_ruleName_ruleType_fkey" FOREIGN KEY ("ruleName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleSchema" ADD CONSTRAINT "RuleSchema_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleParameter" ADD CONSTRAINT "RuleParameter_ruleName_ruleType_fkey" FOREIGN KEY ("ruleName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleParameter" ADD CONSTRAINT "RuleParameter_parameterName_parameterMessageCode_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode") REFERENCES "Parameter"("name", "messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterOption" ADD CONSTRAINT "ParameterOption_optionName_optionType_fkey" FOREIGN KEY ("optionName", "optionType") REFERENCES "OptionValue"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterOption" ADD CONSTRAINT "ParameterOption_parameterName_parameterMessageCode_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode") REFERENCES "Parameter"("name", "messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;
