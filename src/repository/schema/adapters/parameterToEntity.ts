import { IParameter } from "../../../entities/paremeters/interface";
import { IParameterOptionResponse, IParamterRuleResponse } from "../entities/manyToMany";
import { IParameterResponse } from "../entities/parameter"
import { optionValuesToEntity } from "./optionValuesToEntity";
import { rulesToEntity } from "./rulesToEntity";


const parameterToEntity = (parameters: IParameterResponse[]): IParameter[] => {
    const parametersAdapted = parameters.map((parameter: IParameterResponse) => {
        const { id, name, messageCode, label, type, placeholder, description, priority, createdAt, updatedAt, rules = [], row, column, defaultValue, optionValues = [] } = parameter;
            
        // cast rules and optionValues to IRule and IOptionValue and check if all values are present
        const rulesCasted = rules as IParamterRuleResponse[];
        const rulesAdapted = rulesToEntity(rulesCasted);

        const optionValuesCasted = optionValues as IParameterOptionResponse[];
        const optionValuesAdapted = optionValuesToEntity(optionValuesCasted);
        const r: IParameter = {id, name, messageCode, label, type, placeholder, description, priority, rules: rulesAdapted, optionValues: optionValuesAdapted, row, column, defaultValue, createdAt, updatedAt};
        return r;
    })
    return parametersAdapted;
}

export { parameterToEntity };