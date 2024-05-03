/*
  Warnings:

  - The primary key for the `ParameterOption` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "ParameterOption_parameterName_optionName_optionType_paramet_idx";

-- AlterTable
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_pkey",
ADD CONSTRAINT "ParameterOption_pkey" PRIMARY KEY ("parameterName", "parameterMessageCode", "optionName", "optionType");

-- CreateIndex
CREATE INDEX "ParameterOption_parameterName_parameterMessageCode_optionNa_idx" ON "ParameterOption"("parameterName", "parameterMessageCode", "optionName", "optionType");
