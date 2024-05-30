
import { params674, schema674 } from "./index.mjs";
import { connectSchemaToParameter } from "../seedSchema.mjs";
import { seedParams, connectParamsToSchema } from "../seedParams.mjs";
import { seedRuleParameterTable, seedParameterOptionTable } from "../manyToMany.mjs";

export const seed674 = async (prisma, rules, options) => {
  
    // seed params
    const params = await seedParams(prisma, params674); 

     // connect schemaToParameter
     await connectSchemaToParameter(prisma, [{ messageCode: schema674.messageCode, parameters: params }]);

     // connect parameterToSchema
     const paramsToSchema = params.map((param) => ({ name: param.name, messageCode: param.messageCode, priority: param.priority, schemas: [schema674] }))
 
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


};