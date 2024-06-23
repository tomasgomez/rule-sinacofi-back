
import { ActionInput, ActionOuput, ExecuteAction } from "../interface";
import { ErrorCode, InternalError } from "../../internalError";
import { MessageParameter, Parameter } from "../../paremeters/interface";

/*
    Fill parameters with a exist params
*/


const fillParameterWithMsg: ExecuteAction = (input: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    if (!input.messageParameters || !input.parameter){
        return { message: "Action Failed MessageParameters does not exist", code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 }
    }
    const parameters = input.messageParameters;

    const messageParamsFiltered = parameters.filter((messageParams: MessageParameter | Parameter) =>  (messageParams.name === input.parameter?.name && messageParams.messageCode === values?.messageCode) );
    
    const messageParamsFilteredCasted = messageParamsFiltered as MessageParameter[]
   
    // check the length of messageFiltered
    if(messageParamsFilteredCasted && messageParamsFilteredCasted.length > 0){
        // get the first value
        input.parameter.defaultValue = messageParamsFilteredCasted[0].value;
    }

    return input.parameter;
}

export { fillParameterWithMsg }