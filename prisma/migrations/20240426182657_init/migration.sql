/*
  Warnings:

  - You are about to drop the column `messageCode` on the `Rule` table. All the data in the column will be lost.
  - The primary key for the `RuleParameter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ruleType` on the `RuleParameter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_messageCode_fkey";

-- DropForeignKey
ALTER TABLE "RuleParameter" DROP CONSTRAINT "RuleParameter_rulesName_ruleType_fkey";

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "messageCode";

-- AlterTable
ALTER TABLE "RuleParameter" DROP CONSTRAINT "RuleParameter_pkey",
DROP COLUMN "ruleType",
ADD CONSTRAINT "RuleParameter_pkey" PRIMARY KEY ("rulesName", "parameterName");

-- CreateTable
CREATE TABLE "RuleSchema" (
    "rulesName" TEXT NOT NULL,
    "messageCode" TEXT NOT NULL,

    CONSTRAINT "RuleSchema_pkey" PRIMARY KEY ("rulesName","messageCode")
);

-- AddForeignKey
ALTER TABLE "RuleParameter" ADD CONSTRAINT "RuleParameter_rulesName_fkey" FOREIGN KEY ("rulesName") REFERENCES "Rule"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleSchema" ADD CONSTRAINT "RuleSchema_rulesName_fkey" FOREIGN KEY ("rulesName") REFERENCES "Rule"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleSchema" ADD CONSTRAINT "RuleSchema_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;
