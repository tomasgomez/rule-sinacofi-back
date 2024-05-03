

export const seedRuleParameterTable = async (prisma, ruleParameter) => {

    if (ruleParameter.length === 0) {
        throw new Error('ruleParameter is empty');
    }

    for (let i= 0; i < ruleParameter.length; i++) {
        const rparam = ruleParameter[i];
        await prisma.rulesParameters.upsert({
            where: { 
                ruleName_ruleType_parameterName_parameterMessageCode: { 
                    ruleName: rparam.ruleName, 
                    ruleType: rparam.ruleType,
                    parameterName: rparam.parameterName,
                    parameterMessageCode: rparam.parameterMessageCode
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
                        name_messageCode: {
                            name: rparam.parameterName, 
                            messageCode: rparam.parameterMessageCode
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
                    parameterName_parameterMessageCode_optionName_optionType: { 
                        parameterName: paramOpt.parameterName,
                        parameterMessageCode: paramOpt.parameterMessageCode, 
                        optionName: paramOpt.optionName,
                        optionType: paramOpt.optionType
                    } 
                },
                update: {},
                create: {
                    parameter: {
                        connect: { 
                            name_messageCode: {
                                name: paramOpt.parameterName, 
                                messageCode: paramOpt.parameterMessageCode
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