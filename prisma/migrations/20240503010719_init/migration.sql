/*
  Warnings:

  - You are about to drop the `ParameterOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_optionName_optionType_fkey";

-- DropForeignKey
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_parameterName_parameterMessageCode_fkey";

-- DropTable
DROP TABLE "ParameterOption";

-- CreateTable
CREATE TABLE "_OptionValueParameter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionValueParameter_AB_unique" ON "_OptionValueParameter"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionValueParameter_B_index" ON "_OptionValueParameter"("B");

-- AddForeignKey
ALTER TABLE "_OptionValueParameter" ADD CONSTRAINT "_OptionValueParameter_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionValueParameter" ADD CONSTRAINT "_OptionValueParameter_B_fkey" FOREIGN KEY ("B") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
