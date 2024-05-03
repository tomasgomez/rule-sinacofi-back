/*
  Warnings:

  - You are about to drop the `_ParameterToRule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ParameterToRule" DROP CONSTRAINT "_ParameterToRule_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParameterToRule" DROP CONSTRAINT "_ParameterToRule_B_fkey";

-- DropTable
DROP TABLE "_ParameterToRule";

-- CreateTable
CREATE TABLE "_RuleParameter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RuleParameter_AB_unique" ON "_RuleParameter"("A", "B");

-- CreateIndex
CREATE INDEX "_RuleParameter_B_index" ON "_RuleParameter"("B");

-- AddForeignKey
ALTER TABLE "_RuleParameter" ADD CONSTRAINT "_RuleParameter_A_fkey" FOREIGN KEY ("A") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleParameter" ADD CONSTRAINT "_RuleParameter_B_fkey" FOREIGN KEY ("B") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
