/*
  Warnings:

  - You are about to drop the column `name` on the `Parameter` table. All the data in the column will be lost.
  - You are about to drop the column `messages` on the `Schema` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Schema` table. All the data in the column will be lost.
  - You are about to drop the `SchemaParameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchemaValidation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Validation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParameterToSchema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SchemaToValidation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schemaId` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validationRule` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Schema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageCode` to the `Schema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Schema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Schema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ParameterToSchema" DROP CONSTRAINT "_ParameterToSchema_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParameterToSchema" DROP CONSTRAINT "_ParameterToSchema_B_fkey";

-- DropForeignKey
ALTER TABLE "_SchemaToValidation" DROP CONSTRAINT "_SchemaToValidation_A_fkey";

-- DropForeignKey
ALTER TABLE "_SchemaToValidation" DROP CONSTRAINT "_SchemaToValidation_B_fkey";

-- DropIndex
DROP INDEX "Parameter_name_key";

-- DropIndex
DROP INDEX "Schema_type_key";

-- AlterTable
ALTER TABLE "Parameter" DROP COLUMN "name",
ADD COLUMN     "column" INTEGER,
ADD COLUMN     "defaultValue" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "priority" INTEGER NOT NULL,
ADD COLUMN     "row" INTEGER,
ADD COLUMN     "schemaId" INTEGER NOT NULL,
ADD COLUMN     "validationRule" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "messages",
DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "messageCode" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "SchemaParameter";

-- DropTable
DROP TABLE "SchemaValidation";

-- DropTable
DROP TABLE "Validation";

-- DropTable
DROP TABLE "_ParameterToSchema";

-- DropTable
DROP TABLE "_SchemaToValidation";

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParameterOption" (
    "id" SERIAL NOT NULL,
    "parameterId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "ParameterOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageParameter" (
    "messageId" TEXT NOT NULL,
    "parameterId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "MessageParameter_pkey" PRIMARY KEY ("messageId","parameterId")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterOption" ADD CONSTRAINT "ParameterOption_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "Parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageParameter" ADD CONSTRAINT "MessageParameter_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "Parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
