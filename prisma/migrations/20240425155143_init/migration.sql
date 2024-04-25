/*
  Warnings:

  - The primary key for the `Field` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MessageParameter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Parameter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ParameterOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "MessageParameter" DROP CONSTRAINT "MessageParameter_parameterId_fkey";

-- DropForeignKey
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_parameterId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP CONSTRAINT "Field_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Field_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Field_id_seq";

-- AlterTable
ALTER TABLE "MessageParameter" DROP CONSTRAINT "MessageParameter_pkey",
ALTER COLUMN "parameterId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MessageParameter_pkey" PRIMARY KEY ("messageId", "parameterId");

-- AlterTable
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Parameter_id_seq";

-- AlterTable
ALTER TABLE "ParameterOption" DROP CONSTRAINT "ParameterOption_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parameterId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ParameterOption_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ParameterOption_id_seq";

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Status_id_seq";

-- CreateTable
CREATE TABLE "Rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "parameterId" TEXT NOT NULL,

    CONSTRAINT "Rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParameterOption" ADD CONSTRAINT "ParameterOption_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "Parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageParameter" ADD CONSTRAINT "MessageParameter_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "Parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rules" ADD CONSTRAINT "Rules_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "Parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
