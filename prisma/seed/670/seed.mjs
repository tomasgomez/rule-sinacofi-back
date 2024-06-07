
import { params670, schema670 } from "./index.mjs";
import { connectSchemaToParameter } from "../seedSchema.mjs";
import { seedParams, connectParamsToSchema } from "../seedParams.mjs";
import { seedRuleParameterTable, seedParameterOptionTable, seedActionParameterTable } from "../manyToMany.mjs";

export const seed670 = async (prisma, rules, options, actions) => {
  
    // seed params
    const params = await seedParams(prisma, params670); 

    // connect schemaToParameter
    await connectSchemaToParameter(prisma, [{ messageCode: schema670.messageCode, parameters: params }]);

    // connect parameterToSchema
    const paramsToSchema = params.map((param) => ({ name: param.name, messageCode: param.messageCode, priority: param.priority, schemas: [schema670] }))

    await connectParamsToSchema(prisma, paramsToSchema);

    // create many-to-many relationship between parameters and rules
    const ruleToParameter = [];
    params.forEach((parameter) => {
        const rulesArray = parameter.rules ? parameter.rules.replace(" ","").split(",").map(rule => rule.trim()) : [];
        // find rules that match the rulesArray
        rulesArray.forEach((rule) => {
            const rFiltered = rules.find((r) => r.name === rule);
            const value = { ruleName: rFiltered.name, ruleType: rFiltered.type, parameterName: parameter.name, parameterMessageCode: parameter.messageCode, parameterPriority: parameter.priority };
            ruleToParameter.push(value);
        })
    });

    await seedRuleParameterTable(prisma, ruleToParameter);

    // create many-to-many relationship between parameters and options
    const parameterToOptions = [];
    params.forEach((parameter) => {
        const optionsArray = parameter.parameterOptions ? parameter.parameterOptions.replace(" ","").split(",").map(option => option.trim()) : [];
        // find options that match the optionsArray
        optionsArray.forEach(option => {
            const optionGroup = options[option];
            optionGroup.forEach(option => {
                const value = { parameterName: parameter.name, parameterMessageCode: parameter.messageCode, parameterPriority: parameter.priority ,optionName: option.name, optionType: option.type };
                parameterToOptions.push(value);
            });
        });  
    });

    await seedParameterOptionTable(prisma, parameterToOptions);

    // create many-to-many relationship betweeen parameters and actions
    const actionToParameter = [];
    params.forEach((parameter) => {
        const actionsArray = parameter.actions ? parameter.actions.replace(" ","").split(",").map(rule => rule.trim()) : [];
        // find action that match the rulesArray
        actionsArray.forEach((action) => {
            const rFiltered = actions.find((r) => r.name === action);
            const value = { actionName: rFiltered.name, actionType: rFiltered.type, parameterName: parameter.name, parameterMessageCode: parameter.messageCode, parameterPriority: parameter.priority };
            actionToParameter.push(value);
        })
    });

    await seedActionParameterTable(prisma, actionToParameter)


    



};