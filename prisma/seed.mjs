import {
    PrismaClient
} from '@prisma/client';

import { schemas, parameters, optionValues, rules } from './message670.mjs';

const prisma = new PrismaClient();

async function main() {
    
    // reduce schemas to get messageCode group
    const schemasGrouped = schemas.reduce((acc, schema) => {
        if (!acc[schema.messageCode]) {
            acc[schema.messageCode] = schema;
        }
        return acc;
    }, {});

    // populate Schema table
    const schemaTable = await prisma.schema.createMany({ data: schemas });
    console.log(schemaTable);

    const optionsValuesToBeCreated = [];
    const isUnique = (obj, index, self) => index === self.findIndex(o => o.name === obj.name && o.type === obj.type);
    // Create optionValues
    const optTypeFilter = optionValues.filter((obj, index, self) => isUnique(obj, index, self));
    const optionValuesGrouped = optTypeFilter.reduce((acc, optionValue) => {
        const opt = {
            name: optionValue.name,
            description: optionValue.description,
            type: optionValue.type,
            value: optionValue.value,
            label: optionValue.label,
        };
    
        if (!acc[optionValue.type]) {
            acc[optionValue.type] = [opt];
        }else{
            acc[optionValue.type].push(opt);
        }
        optionsValuesToBeCreated.push(opt);
        return acc;
    }, {});

    // populate OptionValue table
    for (let i= 0; i < optionsValuesToBeCreated.length; i++) {
        const option = optionsValuesToBeCreated[i];
        await prisma.optionValue.create({ data: option });
    }

    // rules
    const rulesToBeCreated = [];
    const rulesGrouped = rules.reduce((acc, rule) => {
        const ruleAdapted = {
            name: rule.name,
            description: rule.description,
            type: rule.type,
            condition: rule.condition,
            value: rule.value,
            priority: rule.priority,
        };
        if (!acc[rule.name]) {
            acc[rule.name] = [ruleAdapted];
        }else{
            acc[rule.name].push(ruleAdapted);
        }
        rulesToBeCreated.push(ruleAdapted);
        return acc;
    }, {});

    // populate rules
    for (let i= 0; i < rulesToBeCreated.length; i++) {
        const rule = rulesToBeCreated[i];
        await prisma.rule.create({ data: rule });
    }

    // populate Parameter table
    for (let i= 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        // get Schema and OptionValue
        const schema = schemasGrouped[parameter.messageCode];
        let options = optionValuesGrouped[parameter.parameterOptions];
        if (!options) {
            options = [];
        }
        
        // get Rules
        const rulesArray = parameter.rules ? parameter.rules.replace(" ","").split(",").map(rule => rule.trim()) : [];
        // rules to be added to parameter
        const rulesToBeAdded = [];
        rulesArray.forEach(rule => {
            const ruleGroup = rulesGrouped[rule];
            ruleGroup.forEach(rule => {
                rulesToBeAdded.push(rule);
            });
        });

        var data = {
            name: parameter.name,
            label: parameter.label,
            placeholder: parameter.placeholder,
            description: parameter.description,
            type: parameter.type,
            row: parameter.row,
            column: parameter.column,
            defaultValue: parameter.defaultValue,
            priority: i,
            schema: { connect: { messageCode: schema.messageCode } }
        };

        if (rulesToBeAdded.length > 0) {
            data.rules = { connect: rulesToBeAdded.map(rule => ({name_type: { name: rule.name, type: rule.type }})) };
        }
        // create parameter
        await prisma.parameter.create({ data: data });
    };

    // connect tables with parameters
    for (let i= 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        let options = optionValuesGrouped[parameter.parameterOptions];
        if (!options) {
            options = [];
        }


        for (let j= 0; j < options.length; j++) {
            const option = options[j];
            // create parameterOption
            await prisma.parameterOption.upsert({
                where: {
                    parameterName_optionName_optionType: {
                        parameterName: parameter.name,
                        optionName: option.name,
                        optionType: option.type
                    }
                },
                update: {},
                create: {
                    parameter: { connect: { name: parameter.name } },
                    optionValue: {
                        connect: {
                            name_type: {
                                name: option.name,
                                type: option.type
                            }
                        }
                    }
                }
            });

            await prisma.optionValue.update({
                where: {
                    name_type: {
                        name: option.name,
                        type: option.type
                    }
                },
                data: {
                    parameters: { connect: { parameterName_optionName_optionType: { parameterName: parameter.name, optionName: option.name, optionType: option.type } } }
                }
            });
        }

        await prisma.parameter.update({
            where: {
                name: parameter.name
            },
            data: {
                optionValues: { connect: options.map(op => ({ parameterName_optionName_optionType: {parameterName: parameter.name, optionName: op.name, optionType: op.type }})) }
            }
        });
    }


}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
