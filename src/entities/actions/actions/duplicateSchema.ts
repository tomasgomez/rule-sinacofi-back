

import { ActionInput, ActionOuput, ExecuteAction } from "../interface";
import { ErrorCode, InternalError } from "../../internalError";
import { User } from "../../user/interface";

/*
    Duplicate Schema
*/


const duplicateSchema: ExecuteAction = (input: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    
    
    
    return { message: "Action Failed User does not exist", code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 }

}

export { duplicateSchema }