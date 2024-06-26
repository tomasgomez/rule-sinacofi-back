import { Parameter } from "../../../entities/paremeters/interface";
import { IParameterOptionResponse, IParamterActionResponse, IParamterRuleResponse } from "../entities/manyToMany";
import { IParameterResponse } from "../entities/parameter"
import { actionsToEntity } from "./actionsToEntity";
import { optionValuesToEntity } from "./optionValuesToEntity";
import { rulesToEntity } from "./rulesToEntity";


const parameterToEntity = (parameters: IParameterResponse[]): Parameter[] => {
    const parametersAdapted = parameters.map((parameter: IParameterResponse) => {
        const { id, name, messageCode, label, type, placeholder, description, priority, createdAt, updatedAt, rules = [], row, column, defaultValue, optionValues = [], actions = [] } = parameter;
            
        // cast rules and optionValues to IRule and IOptionValue and check if all values are present
        const rulesCasted = rules as IParamterRuleResponse[];
        const rulesAdapted = rulesToEntity(rulesCasted);

        const actionsCasted = actions as IParamterActionResponse[];
        const actionsAdapted = actionsToEntity(actionsCasted);

        const optionValuesCasted = optionValues as IParameterOptionResponse[];
        const optionValuesAdapted = optionValuesToEntity(optionValuesCasted);
        const r: Parameter = {id, name, messageCode, label, type, placeholder, description, priority, rules: rulesAdapted, optionValues: optionValuesAdapted, row, column, defaultValue, createdAt, updatedAt, actions: actionsAdapted};
        return r;
    })
    return parametersAdapted;
}

export { parameterToEntity };