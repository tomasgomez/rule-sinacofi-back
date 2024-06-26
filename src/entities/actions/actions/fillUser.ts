
import { ActionInput, ActionOuput, ExecuteAction } from "../interface";
import { ErrorCode, InternalError } from "../../internalError";
import { User } from "../../user/interface";

/*
    Fill parameters with a exist users
*/


const fillParameterWithUser: ExecuteAction = (input: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    if (!input.parameter){
        return { message: "Action Failed", code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 }
    }
    const indexOfUser = input.parameter.defaultValue as keyof User;
    const user = input.user
    if(!user){
        return { message: "Action Failed User does not exist", code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 }
    }
    input.parameter.defaultValue = user[indexOfUser]

    return input.parameter;

}

export { fillParameterWithUser }