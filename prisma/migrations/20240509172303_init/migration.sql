/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RulesActions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchemasActions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RulesActions" DROP CONSTRAINT "RulesActions_actionName_fkey";

-- DropForeignKey
ALTER TABLE "RulesActions" DROP CONSTRAINT "RulesActions_ruleName_ruleType_fkey";

-- DropForeignKey
ALTER TABLE "SchemasActions" DROP CONSTRAINT "SchemasActions_allowedActionName_fkey";

-- DropForeignKey
ALTER TABLE "SchemasActions" DROP CONSTRAINT "SchemasActions_schemaMessageCode_fkey";

-- DropTable
DROP TABLE "Action";

-- DropTable
DROP TABLE "RulesActions";

-- DropTable
DROP TABLE "SchemasActions";
