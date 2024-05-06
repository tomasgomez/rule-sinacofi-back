export const seedParams = async (prisma, params) => {
  if (params.length === 0) {
    throw new Error("schemas is empty");
  }

    for (let i = 0; i < params.length; i++) {
        const param = {
            name         : params[i].name,      
            messageCode  : params[i].messageCode,
            label        : params[i].label,
            type         : params[i].fieldtype,
            placeholder  : params[i].placeholder,
            description  : params[i].description,
            row          : params[i].row,
            column       : params[i].column,
            defaultValue : params[i].defaultValue,
            priority     : params[i].priority,
        }

        await prisma.parameter.create({ data: param });
    }
  
};

export const connectParamsToSchema = async (prisma, schemaParams) => {
    if (schemaParams.length === 0) {
        throw new Error("schemaParameters is empty");
    }

    for (let i = 0; i < schemaParams.length; i++) {
        const schemaParam = schemaParams[i];
        await prisma.parameter.update({
            where: { name_messageCode: { name: schemaParam.name, messageCode: schemaParam.messageCode } },
            data: {
                schema: {
                    connect:  {messageCode: schemaParam.messageCode} 
                }
            }
        });
    }
}

export const connectParamsToOptionValues = async (prisma, paramOptionValues) => {
    if (paramOptionValues.length === 0) {
        throw new Error("paramOptionValues is empty");
    }

    for (let i = 0; i < paramOptionValues.length; i++) {
        const paramOptionValue = paramOptionValues[i];
        await prisma.parameter.update({
            where: { name_messageCode: { name: paramOptionValue.name, messageCode: paramOptionValue.messageCode } },
            data: {
                optionValues: {
                    connect: paramOptionValue.optionValues.map((optionValue) => ({ name_type: { name: optionValue.name, type: optionValue.type } }))
                }
            }
        });
    }
}

export const connectParameterToRules = async (prisma, paramRules) => {
    if (paramRules.length === 0) {
        throw new Error("paramRules is empty");
    }

    for (let i = 0; i < paramRules.length; i++) {
        const paramRule = paramRules[i];
        await prisma.parameter.update({
            where: { name_messageCode: { name: paramRule.name, messageCode: paramRule.messageCode } },
            data: {
                rules: {
                    connect: paramRule.rules.map((rule) => ({ name_type: { name: rule.name, type: rule.type } })
                    )
                }
            }
        });
    }
}