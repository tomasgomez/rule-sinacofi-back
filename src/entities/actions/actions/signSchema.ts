

import { Action, ActionInput, ActionOuput, ExecuteAction, SchemaAction } from "../interface";
import { ErrorCode, InternalError } from "../../internalError";
import { OptionValue, Parameter } from "../../paremeters/interface";
import { Rule } from "../../rule/interface";
import { getRuleCategory, ruleCategory } from "../../rule/ruleCategory";
import { getRuleType, ruleType } from "../../rule/ruleTypes";
import { getDisabled } from "../../rule/ruleFunctions/disabled";
import { getRequired } from "../../rule/ruleFunctions";

/*
    Sign Schema
*/


const signSchema: ExecuteAction = (input: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    
    // rules to be used
    const disabled = getDisabled("true");
    const required = getRequired("true")

    // casted values
    let valueCasted = values as SchemaAction;

    let { schema } = input;
    if (!schema){
        return { message: "Action Failed, schema is required", code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 }
    }
    const { parameters } = schema;
    // cast paremeters 
    let parametersCasted = parameters as Parameter[]

    let parametersUpdated: Parameter[] = []
    // map all parameters of the schema
    parametersCasted.forEach((param) => {
        valueCasted.parameters?.forEach((parameterAction) => {
            // target field to be modified
            let targetField = parameterAction.targetField as keyof Parameter;
            // input field to filtered
            let inputField = parameterAction.inputField as keyof Parameter;
            let inputValues = parameterAction.inputValue as string[];
            let value = parameterAction.value as string;
            // check if param[inputField] exists
            if (!param[inputField]){
                parametersUpdated.push(param)
                return; 
            }
            // check if param[inputField] is in inputValues
            if (inputValues.includes(param[inputField] as any)){
                if (Array.isArray(param[targetField])){ 
                    (param[targetField] as Rule[]) = (param[targetField] as Rule[])?.filter((values: any) => values.name !== value);
                }
                // add required value
                (param[targetField] as Rule[]).push(required)
                parametersUpdated.push(param)
                return;
            }
            inputValues.forEach(inputValue => {
                if(param[inputField] !== inputValue){
                    // check if has rules disables parameter
                    let isquired = (param[targetField] as Rule[]) = (param[targetField] as Rule[])?.filter((values: any) => values.name === value);
                    if (!isquired || isquired.length == 0){
                        (param[targetField] as Rule[]).push(disabled)
                    }
                    parametersUpdated.push(param)
                    return;
                }
            });
            }); 
        });
        // set values
        schema.parameters = parametersUpdated;
        
        return schema    

}

export { signSchema }