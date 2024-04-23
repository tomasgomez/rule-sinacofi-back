/*
  Warnings:

  - The primary key for the `Schema` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_schemaId_fkey";

-- AlterTable
ALTER TABLE "Parameter" ALTER COLUMN "schemaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Schema_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Schema_id_seq";

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
