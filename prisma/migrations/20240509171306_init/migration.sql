-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "values" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RulesActions" (
    "ruleName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "actionName" TEXT NOT NULL,

    CONSTRAINT "RulesActions_pkey" PRIMARY KEY ("ruleName","actionName")
);

-- CreateTable
CREATE TABLE "SchemasActions" (
    "schemaMessageCode" TEXT NOT NULL,
    "allowedActionName" TEXT NOT NULL,

    CONSTRAINT "SchemasActions_pkey" PRIMARY KEY ("schemaMessageCode","allowedActionName")
);

-- CreateIndex
CREATE INDEX "Action_name_idx" ON "Action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- CreateIndex
CREATE INDEX "RulesActions_ruleName_actionName_idx" ON "RulesActions"("ruleName", "actionName");

-- CreateIndex
CREATE INDEX "SchemasActions_schemaMessageCode_allowedActionName_idx" ON "SchemasActions"("schemaMessageCode", "allowedActionName");

-- AddForeignKey
ALTER TABLE "RulesActions" ADD CONSTRAINT "RulesActions_ruleName_ruleType_fkey" FOREIGN KEY ("ruleName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesActions" ADD CONSTRAINT "RulesActions_actionName_fkey" FOREIGN KEY ("actionName") REFERENCES "Action"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemasActions" ADD CONSTRAINT "SchemasActions_schemaMessageCode_fkey" FOREIGN KEY ("schemaMessageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemasActions" ADD CONSTRAINT "SchemasActions_allowedActionName_fkey" FOREIGN KEY ("allowedActionName") REFERENCES "Action"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
