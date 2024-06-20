import { ActionInput, ActionOuput, ExecuteAction } from "../interface";
import { ErrorCode, InternalError } from "../../internalError";
import { User } from "../../user/interface";

/*
    Fill parameters with a exist users
*/


const fillCurrentDate: ExecuteAction = (input: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    
    const date = new Date();
    const formattedDate = date.toLocaleDateString('es-CL');
    input.parameter.defaultValue = formattedDate;

    return input.parameter;

}

export { fillCurrentDate }