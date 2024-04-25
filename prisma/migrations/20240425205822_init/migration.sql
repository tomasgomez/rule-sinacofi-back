/*
  Warnings:

  - You are about to drop the `MessageParameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ParameterOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schemaId` to the `Rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Rules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MessageParameter" DROP CONSTRAINT "MessageParameter_parameterId_fkey";

-- AlterTable
ALTER TABLE "Parameter" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParameterOption" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rules" ADD COLUMN     "schemaId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "MessageParameter";

-- DropTable
DROP TABLE "Status";

-- AddForeignKey
ALTER TABLE "Rules" ADD CONSTRAINT "Rules_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
