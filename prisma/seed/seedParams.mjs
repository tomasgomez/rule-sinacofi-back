export const seedParams = async (prisma, params) => {
    if (params.length === 0) {
    throw new Error("schemas is empty");
    }
    const paramsAdded = []
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
            priority     : i + 1,
        }

        console.log(param)
        let paramsPriority = params[i]
        paramsPriority.priority = param.priority
        paramsAdded.push(paramsPriority)

        await prisma.parameter.create({ data: param });
    }

    return paramsAdded
  
};

export const connectParamsToSchema = async (prisma, schemaParams) => {
    if (schemaParams.length === 0) {
        throw new Error("schemaParameters is empty");
    }

    for (let i = 0; i < schemaParams.length; i++) {
        const schemaParam = schemaParams[i];
        await prisma.parameter.update({
            where: { name_messageCode_priority: { name: schemaParam.name, messageCode: schemaParam.messageCode, priority: schemaParam.priority } },
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
            where: { name_messageCode_priority: { name: paramOptionValue.name, messageCode: paramOptionValue.messageCode, priority: paramOptionValue.priority } },
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
            where: { name_messageCode_priority: { name: paramRule.name, messageCode: paramRule.messageCode, priority: paramRule.priority } },
            data: {
                rules: {
                    connect: paramRule.rules.map((rule) => ({ name_type: { name: rule.name, type: rule.type } })
                    )
                }
            }
        });
    }
}

export const connectParameterToActions = async (prisma, paramActions) => {
    if (paramActions.length === 0) {
        throw new Error("paramActions is empty");
    }

    for (let i = 0; i < paramActions.length; i++) {
        const paramAction = paramActions[i];
        await prisma.parameter.update({
            where: { name_messageCode_priority: { name: paramAction.name, messageCode: paramAction.messageCode, priority: paramAction.priority } },
            data: {
                actions: {
                    connect: paramAction.actions.map((action) => ({ name_type: { name: action.name, type: action.type } })
                    )
                }
            }
        });
    }
}