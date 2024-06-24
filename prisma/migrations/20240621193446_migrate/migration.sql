/*
  Warnings:

  - The primary key for the `ParametersOptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RulesParameters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name,messageCode,priority]` on the table `Parameter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parameterPriority` to the `ParametersOptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameterPriority` to the `RulesParameters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ParametersOptions" DROP CONSTRAINT "ParametersOptions_parameterName_parameterMessageCode_fkey";

-- DropForeignKey
ALTER TABLE "RulesParameters" DROP CONSTRAINT "RulesParameters_parameterName_parameterMessageCode_fkey";

-- DropIndex
DROP INDEX "Parameter_name_idx";

-- DropIndex
DROP INDEX "Parameter_name_messageCode_key";

-- DropIndex
DROP INDEX "ParametersOptions_parameterName_parameterMessageCode_option_idx";

-- DropIndex
DROP INDEX "RulesParameters_ruleName_ruleType_parameterName_parameterMe_idx";

-- AlterTable
ALTER TABLE "ParametersOptions" DROP CONSTRAINT "ParametersOptions_pkey",
ADD COLUMN     "parameterPriority" INTEGER NOT NULL,
ADD CONSTRAINT "ParametersOptions_pkey" PRIMARY KEY ("parameterName", "parameterMessageCode", "parameterPriority", "optionName", "optionType");

-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RulesParameters" DROP CONSTRAINT "RulesParameters_pkey",
ADD COLUMN     "parameterPriority" INTEGER NOT NULL,
ADD CONSTRAINT "RulesParameters_pkey" PRIMARY KEY ("ruleName", "ruleType", "parameterName", "parameterMessageCode", "parameterPriority");

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionsSchemas" (
    "schemaMessageCode" TEXT NOT NULL,
    "actionName" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,

    CONSTRAINT "ActionsSchemas_pkey" PRIMARY KEY ("schemaMessageCode","actionName","actionType")
);

-- CreateTable
CREATE TABLE "ActionsParameters" (
    "parameterName" TEXT NOT NULL,
    "parameterMessageCode" TEXT NOT NULL,
    "parameterPriority" INTEGER NOT NULL,
    "actionName" TEXT NOT NULL,
    "actionType" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Action_name_type_idx" ON "Action"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_type_key" ON "Action"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ActionsSchemas_schemaMessageCode_actionName_actionType_key" ON "ActionsSchemas"("schemaMessageCode", "actionName", "actionType");

-- CreateIndex
CREATE INDEX "ActionsParameters_parameterMessageCode_parameterName_parame_idx" ON "ActionsParameters"("parameterMessageCode", "parameterName", "parameterPriority", "actionName", "actionType");

-- CreateIndex
CREATE UNIQUE INDEX "ActionsParameters_parameterMessageCode_parameterName_parame_key" ON "ActionsParameters"("parameterMessageCode", "parameterName", "parameterPriority", "actionName", "actionType");

-- CreateIndex
CREATE INDEX "Parameter_name_messageCode_priority_idx" ON "Parameter"("name", "messageCode", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "Parameter_name_messageCode_priority_key" ON "Parameter"("name", "messageCode", "priority");

-- CreateIndex
CREATE INDEX "ParametersOptions_parameterName_parameterMessageCode_parame_idx" ON "ParametersOptions"("parameterName", "parameterMessageCode", "parameterPriority", "optionName", "optionType");

-- CreateIndex
CREATE INDEX "RulesParameters_ruleName_ruleType_parameterName_parameterMe_idx" ON "RulesParameters"("ruleName", "ruleType", "parameterName", "parameterMessageCode", "parameterPriority");

-- AddForeignKey
ALTER TABLE "ActionsSchemas" ADD CONSTRAINT "ActionsSchemas_schemaMessageCode_fkey" FOREIGN KEY ("schemaMessageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionsSchemas" ADD CONSTRAINT "ActionsSchemas_actionName_actionType_fkey" FOREIGN KEY ("actionName", "actionType") REFERENCES "Action"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionsParameters" ADD CONSTRAINT "ActionsParameters_parameterMessageCode_parameterName_param_fkey" FOREIGN KEY ("parameterMessageCode", "parameterName", "parameterPriority") REFERENCES "Parameter"("name", "messageCode", "priority") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionsParameters" ADD CONSTRAINT "ActionsParameters_actionName_actionType_fkey" FOREIGN KEY ("actionName", "actionType") REFERENCES "Action"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesParameters" ADD CONSTRAINT "RulesParameters_parameterName_parameterMessageCode_paramet_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode", "parameterPriority") REFERENCES "Parameter"("name", "messageCode", "priority") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametersOptions" ADD CONSTRAINT "ParametersOptions_parameterName_parameterMessageCode_param_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode", "parameterPriority") REFERENCES "Parameter"("name", "messageCode", "priority") ON DELETE RESTRICT ON UPDATE CASCADE;
