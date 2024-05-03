/*
  Warnings:

  - You are about to drop the `ParameterOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RuleParameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RuleSchema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_optionName_optionType_fkey";

-- DropForeignKey
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_parameterName_parameterMessageCode_fkey";

-- DropForeignKey
ALTER TABLE "RuleParameter" DROP CONSTRAINT "RuleParameter_parameterName_parameterMessageCode_fkey";

-- DropForeignKey
ALTER TABLE "RuleParameter" DROP CONSTRAINT "RuleParameter_ruleName_ruleType_fkey";

-- DropForeignKey
ALTER TABLE "RuleSchema" DROP CONSTRAINT "RuleSchema_messageCode_fkey";

-- DropForeignKey
ALTER TABLE "RuleSchema" DROP CONSTRAINT "RuleSchema_ruleName_ruleType_fkey";

-- DropTable
DROP TABLE "ParameterOption";

-- DropTable
DROP TABLE "RuleParameter";

-- DropTable
DROP TABLE "RuleSchema";

-- CreateTable
CREATE TABLE "RulesSchemas" (
    "ruleName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "messageCode" TEXT NOT NULL,

    CONSTRAINT "RulesSchemas_pkey" PRIMARY KEY ("ruleName","ruleType","messageCode")
);

-- CreateTable
CREATE TABLE "RulesParameters" (
    "ruleName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "parameterName" TEXT NOT NULL,
    "parameterMessageCode" TEXT NOT NULL,

    CONSTRAINT "RulesParameters_pkey" PRIMARY KEY ("ruleName","ruleType","parameterName","parameterMessageCode")
);

-- CreateTable
CREATE TABLE "ParametersOptions" (
    "parameterName" TEXT NOT NULL,
    "parameterMessageCode" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionType" TEXT NOT NULL,

    CONSTRAINT "ParametersOptions_pkey" PRIMARY KEY ("parameterName","parameterMessageCode","optionName","optionType")
);

-- CreateIndex
CREATE INDEX "RulesSchemas_ruleName_ruleType_messageCode_idx" ON "RulesSchemas"("ruleName", "ruleType", "messageCode");

-- CreateIndex
CREATE INDEX "RulesParameters_ruleName_ruleType_parameterName_parameterMe_idx" ON "RulesParameters"("ruleName", "ruleType", "parameterName", "parameterMessageCode");

-- CreateIndex
CREATE INDEX "ParametersOptions_parameterName_parameterMessageCode_option_idx" ON "ParametersOptions"("parameterName", "parameterMessageCode", "optionName", "optionType");

-- AddForeignKey
ALTER TABLE "RulesSchemas" ADD CONSTRAINT "RulesSchemas_ruleName_ruleType_fkey" FOREIGN KEY ("ruleName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesSchemas" ADD CONSTRAINT "RulesSchemas_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesParameters" ADD CONSTRAINT "RulesParameters_ruleName_ruleType_fkey" FOREIGN KEY ("ruleName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesParameters" ADD CONSTRAINT "RulesParameters_parameterName_parameterMessageCode_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode") REFERENCES "Parameter"("name", "messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametersOptions" ADD CONSTRAINT "ParametersOptions_optionName_optionType_fkey" FOREIGN KEY ("optionName", "optionType") REFERENCES "OptionValue"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametersOptions" ADD CONSTRAINT "ParametersOptions_parameterName_parameterMessageCode_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode") REFERENCES "Parameter"("name", "messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;
