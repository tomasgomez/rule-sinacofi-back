-- CreateTable
CREATE TABLE "Schema" (
    "id" TEXT NOT NULL,
    "messageCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "messageCode" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "row" INTEGER,
    "column" INTEGER,
    "defaultValue" TEXT,
    "priority" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionValue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RulesSchemas" (
    "ruleName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "messageCode" TEXT NOT NULL,

    CONSTRAINT "RulesSchemas_pkey" PRIMARY KEY ("ruleName","ruleType","messageCode")
);

-- CreateTable
CREATE TABLE "RulesParameters" (
    "ruleName" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "parameterName" TEXT NOT NULL,
    "parameterMessageCode" TEXT NOT NULL,

    CONSTRAINT "RulesParameters_pkey" PRIMARY KEY ("ruleName","ruleType","parameterName","parameterMessageCode")
);

-- CreateTable
CREATE TABLE "ParametersOptions" (
    "parameterName" TEXT NOT NULL,
    "parameterMessageCode" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionType" TEXT NOT NULL,

    CONSTRAINT "ParametersOptions_pkey" PRIMARY KEY ("parameterName","parameterMessageCode","optionName","optionType")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schema_messageCode_key" ON "Schema"("messageCode");

-- CreateIndex
CREATE INDEX "Schema_messageCode_idx" ON "Schema"("messageCode");

-- CreateIndex
CREATE INDEX "Parameter_name_idx" ON "Parameter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Parameter_name_messageCode_key" ON "Parameter"("name", "messageCode");

-- CreateIndex
CREATE INDEX "OptionValue_name_type_idx" ON "OptionValue"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "OptionValue_name_type_key" ON "OptionValue"("name", "type");

-- CreateIndex
CREATE INDEX "Rule_name_type_idx" ON "Rule"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Rule_name_type_key" ON "Rule"("name", "type");

-- CreateIndex
CREATE INDEX "RulesSchemas_ruleName_ruleType_messageCode_idx" ON "RulesSchemas"("ruleName", "ruleType", "messageCode");

-- CreateIndex
CREATE INDEX "RulesParameters_ruleName_ruleType_parameterName_parameterMe_idx" ON "RulesParameters"("ruleName", "ruleType", "parameterName", "parameterMessageCode");

-- CreateIndex
CREATE INDEX "ParametersOptions_parameterName_parameterMessageCode_option_idx" ON "ParametersOptions"("parameterName", "parameterMessageCode", "optionName", "optionType");

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesSchemas" ADD CONSTRAINT "RulesSchemas_ruleName_ruleType_fkey" FOREIGN KEY ("ruleName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesSchemas" ADD CONSTRAINT "RulesSchemas_messageCode_fkey" FOREIGN KEY ("messageCode") REFERENCES "Schema"("messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesParameters" ADD CONSTRAINT "RulesParameters_ruleName_ruleType_fkey" FOREIGN KEY ("ruleName", "ruleType") REFERENCES "Rule"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RulesParameters" ADD CONSTRAINT "RulesParameters_parameterName_parameterMessageCode_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode") REFERENCES "Parameter"("name", "messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametersOptions" ADD CONSTRAINT "ParametersOptions_optionName_optionType_fkey" FOREIGN KEY ("optionName", "optionType") REFERENCES "OptionValue"("name", "type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametersOptions" ADD CONSTRAINT "ParametersOptions_parameterName_parameterMessageCode_fkey" FOREIGN KEY ("parameterName", "parameterMessageCode") REFERENCES "Parameter"("name", "messageCode") ON DELETE RESTRICT ON UPDATE CASCADE;
