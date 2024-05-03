import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createMaterializedView() {

  await prisma.$executeRaw`
  CREATE VIEW schema_view AS
    SELECT
      s.id,
      s."messageCode",
      s.description,
      s.name,
      s."createdAt",
      s."updatedAt",
      p.id AS parameterId,
      p.name AS parameterName,
      p."schemaName",
      p.label,
      p.type,
      p.placeholder,
      p.description AS parameterDescription,
      p.row,
      p.column,
      p."defaultValue",
      p.priority AS parameterPriority,
      r.id AS ruleId,
      r.name AS ruleName,
      r.type AS ruleType,
      r.description AS ruleDescription,
      r.condition AS ruleCondition,
      r.value AS ruleValue,
      r.priority AS rulePriority,
      ov.id AS optionValueId,
      ov.name AS optionValueName,
      ov.type AS optionValueType,
      ov.description AS optionValueDescription,
      ov.value AS optionValueValue,
      ov.label AS optionValueLabel
    FROM
      "Schema" s
    LEFT JOIN
      "Parameter" p ON s."messageCode" = p."schemaName"
    LEFT JOIN
      "Rule" r ON s."messageCode" = r."schemaName"
    LEFT JOIN
      "ParameterOption" po ON p.name = po."parameterName" AND po."optionType" = 'OptionType'
    LEFT JOIN
      "OptionValue" ov ON po."optionName" = ov.name AND po."optionType" = ov.type;
  `;
}

createMaterializedView()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
