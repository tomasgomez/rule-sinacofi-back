-- CreateTable
CREATE TABLE "Schema" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "messages" TEXT[],

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Validation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Validation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemaValidation" (
    "schemaId" INTEGER NOT NULL,
    "validationId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchemaValidation_pkey" PRIMARY KEY ("schemaId","validationId")
);

-- CreateTable
CREATE TABLE "SchemaParameter" (
    "schemaId" INTEGER NOT NULL,
    "parameterId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchemaParameter_pkey" PRIMARY KEY ("schemaId","parameterId")
);

-- CreateTable
CREATE TABLE "_SchemaToValidation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ParameterToSchema" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Schema_type_key" ON "Schema"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Validation_name_key" ON "Validation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Parameter_name_key" ON "Parameter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SchemaToValidation_AB_unique" ON "_SchemaToValidation"("A", "B");

-- CreateIndex
CREATE INDEX "_SchemaToValidation_B_index" ON "_SchemaToValidation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ParameterToSchema_AB_unique" ON "_ParameterToSchema"("A", "B");

-- CreateIndex
CREATE INDEX "_ParameterToSchema_B_index" ON "_ParameterToSchema"("B");

-- AddForeignKey
ALTER TABLE "_SchemaToValidation" ADD CONSTRAINT "_SchemaToValidation_A_fkey" FOREIGN KEY ("A") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchemaToValidation" ADD CONSTRAINT "_SchemaToValidation_B_fkey" FOREIGN KEY ("B") REFERENCES "Validation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToSchema" ADD CONSTRAINT "_ParameterToSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToSchema" ADD CONSTRAINT "_ParameterToSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
