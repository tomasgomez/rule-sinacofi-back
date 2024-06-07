
export const seedRuleParameterTable = async (prisma, ruleParameter) => {

    if (ruleParameter.length === 0) {
        throw new Error('ruleParameter is empty');
    }

    for (let i= 0; i < ruleParameter.length; i++) {
        const rparam = ruleParameter[i];
        await prisma.rulesParameters.upsert({
            where: { 
                ruleName_ruleType_parameterName_parameterMessageCode_parameterPriority: { 
                    ruleName: rparam.ruleName, 
                    ruleType: rparam.ruleType,
                    parameterName: rparam.parameterName,
                    parameterMessageCode: rparam.parameterMessageCode,
                    parameterPriority: rparam.parameterPriority
                } 
            },
            update: {},
            create: {
                rule: {
                    connect: { 
                        name_type: {
                            name: rparam.ruleName, 
                            type: rparam.ruleType
                        } 
                    }
                },
                parameter: {
                    connect: { 
                        name_messageCode_priority: {
                            name: rparam.parameterName, 
                            messageCode: rparam.parameterMessageCode,
                            priority: rparam.parameterPriority
                        } 
                    }
                }
            }
        });
    }
}

export const seedParameterOptionTable = async (prisma, parameterOption) => {
    
        if (parameterOption.length === 0) {
            throw new Error('parameterOption is empty');
        }
    
        for (let i= 0; i < parameterOption.length; i++) {
            const paramOpt = parameterOption[i];
    
            await prisma.parametersOptions.upsert({
                where: { 
                    parameterName_parameterMessageCode_parameterPriority_optionName_optionType: { 
                        parameterName: paramOpt.parameterName,
                        parameterMessageCode: paramOpt.parameterMessageCode, 
                        parameterPriority: paramOpt.parameterPriority,
                        optionName: paramOpt.optionName,
                        optionType: paramOpt.optionType
                    } 
                },
                update: {},
                create: {
                    parameter: {
                        connect: { 
                            name_messageCode_priority: {
                                name: paramOpt.parameterName, 
                                messageCode: paramOpt.parameterMessageCode,
                                priority: paramOpt.parameterPriority
                            }
                        },
                    },
                    optionValue: {
                        connect: { 
                            name_type: {
                                name: paramOpt.optionName, 
                                type: paramOpt.optionType
                            }
                        }
                    }
                }
            });
        }
}

export const seedActionParameterTable = async (prisma, actionParameter) => {

    if (actionParameter.length === 0) {
        throw new Error('actionParameter is empty');
    }

    for (let i= 0; i < actionParameter.length; i++) {
        const rparam = actionParameter[i];
        await prisma.actionsParameters.upsert({
            where: { 
                parameterMessageCode_parameterName_parameterPriority_actionName_actionType: { 
                    actionName: rparam.actionName, 
                    actionType: rparam.actionType,
                    parameterName: rparam.parameterName,
                    parameterMessageCode: rparam.parameterMessageCode,
                    parameterPriority: rparam.parameterPriority
                } 
            },
            update: {},
            create: {
                action: {
                    connect: { 
                        name_type: {
                            name: rparam.actionName, 
                            type: rparam.actionType
                        } 
                    }
                },
                parameter: {
                    connect: { 
                        name_messageCode_priority: {
                            name: rparam.parameterName, 
                            messageCode: rparam.parameterMessageCode,
                            priority: rparam.parameterPriority
                        } 
                    }
                }
            }
        });
    }
}