import { ActionInput, ActionOuput, ExecuteAction } from "../interface";
import { ErrorCode, InternalError } from "../../internalError";
import { User } from "../../user/interface";

/*
    Fill parameters with a exist users
*/


const fillCurrentDate: ExecuteAction = (input: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    
    const date = new Date();
    // const formattedDate = date.toLocaleDateString('es-CL');
    // console.log(formattedDate);
    input.parameter.defaultValue = date.toDateString();

    return input.parameter;

}

export { fillCurrentDate }