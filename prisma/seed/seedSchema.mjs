import { PrismaClient } from '@prisma/client';

export const seedSchema = async (prisma, schemas) => {

    if (schemas.length === 0) {
        throw new Error('schemas is empty');
    }

    for (let i= 0; i < schemas.length; i++) {
        const schema = schemas[i];
        await prisma.schema.create({ data: schema });
    }
};

export const connectSchemaToRule = async (prisma, schemaRules) => { 
    if (schemaRules.length === 0) {
        throw new Error('schemaRules is empty');
    }

    for (let i= 0; i < schemaRules.length; i++) {
        const schemaRule = schemaRules[i];
        await prisma.schema.update({
            where: { messageCode: schemaRule.messageCode },
            data: {
                rules: {
                    connect: schemaRule.rules.map((rule) => ({ name_type: { name: rule.name, type: rule.type } }) )
                }
            }
        });
    }
}

export const connectSchemaToParameter = async (prisma, schemaParameters) => {
    if (schemaParameters.length === 0) {
        throw new Error('schemaParameters is empty');
    }

    for (let i= 0; i < schemaParameters.length; i++) {
        const schemaParameter = schemaParameters[i];
        console.log(schemaParameter)
        await prisma.schema.update({
            where: { messageCode: schemaParameter.messageCode },
            data: {
                parameters: {
                    connect: schemaParameter.parameters.map((parameter, index) => ({ name_messageCode_priority: { name: parameter.name, messageCode: parameter.messageCode, priority: parameter.priority } }) )
                }
            }
        });
    }
};