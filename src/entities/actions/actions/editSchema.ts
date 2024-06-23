

import { ActionInput, ActionOuput, ExecuteAction, SchemaAction } from "../interface";
import { ErrorCode, InternalError } from "../../internalError";
import { User } from "../../user/interface";
import { Parameter } from "../../paremeters/interface";

/*
    Edit Schema
*/

const editSchema: ExecuteAction = (input: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    
 
    
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
                    
                    (param[targetField] as string) = (param[targetField] as string) = value;
                    parametersUpdated.push(param)
                    return;
                }
                parametersUpdated.push(param);
                }); 
            });
            // set values
            schema.parameters = parametersUpdated;
            
            return schema   
}

export { editSchema }