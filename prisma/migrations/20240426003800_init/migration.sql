/*
  Warnings:

  - You are about to drop the column `description` on the `ParameterOption` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `ParameterOption` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ParameterOption` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ParameterOption` table. All the data in the column will be lost.
  - You are about to drop the `ParameterParameterOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParameterToParameterOption` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `optionName` to the `ParameterOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionType` to the `ParameterOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ParameterToParameterOption" DROP CONSTRAINT "_ParameterToParameterOption_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParameterToParameterOption" DROP CONSTRAINT "_ParameterToParameterOption_B_fkey";

-- DropIndex
DROP INDEX "ParameterOption_name_key";

-- AlterTable
ALTER TABLE "ParameterOption" DROP COLUMN "description",
DROP COLUMN "label",
DROP COLUMN "name",
DROP COLUMN "value",
ADD COLUMN     "optionName" TEXT NOT NULL,
ADD COLUMN     "optionType" TEXT NOT NULL;

-- DropTable
DROP TABLE "ParameterParameterOption";

-- DropTable
DROP TABLE "_ParameterToParameterOption";

-- CreateTable
CREATE TABLE "OptionValue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "parameterName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "OptionValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OptionValueToParameter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OptionValue_name_key" ON "OptionValue"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OptionValue_name_type_key" ON "OptionValue"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "_OptionValueToParameter_AB_unique" ON "_OptionValueToParameter"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionValueToParameter_B_index" ON "_OptionValueToParameter"("B");

-- AddForeignKey
ALTER TABLE "ParameterOption" ADD CONSTRAINT "ParameterOption_optionName_optionType_fkey" FOREIGN KEY ("optionName", "optionType") REFERENCES "OptionValue"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterOption" ADD CONSTRAINT "ParameterOption_parameterName_fkey" FOREIGN KEY ("parameterName") REFERENCES "Parameter"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionValueToParameter" ADD CONSTRAINT "_OptionValueToParameter_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionValueToParameter" ADD CONSTRAINT "_OptionValueToParameter_B_fkey" FOREIGN KEY ("B") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
