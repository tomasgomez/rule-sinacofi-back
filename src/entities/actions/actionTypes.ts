import { ErrorCode } from "../internalError";
import { fillParameterWithMsg } from "./actions/fillParameter";
import { fillParameterWithUser } from "./actions/fillUser";
import { fillCurrentDate } from "./actions/fillCurrentDate";
import { ActionsFunctions } from "./interface";
import { signSchema } from "./actions/signSchema";
import { editSchema } from "./actions/editSchema";
import { duplicateSchema } from "./actions/duplicateSchema";
import { createSchema } from "./actions/createSchema";

enum actionType {
    fillParameter = 'fillParameter',
    fillUser = 'fillUser',
    fillCurrentDate = 'fillCurrentDate',
    signSchema = 'signSchema',
    editSchema = 'editSchema',
    duplicateSchema = 'duplicateSchema',
    createSchema = 'createSchema'
}

type ActionType = actionType;


const actions: ActionsFunctions = {
    fillParameter: fillParameterWithMsg,
    fillUser: fillParameterWithUser,
    fillCurrentDate: fillCurrentDate,
    signSchema: signSchema,
    editSchema: editSchema,
    duplicateSchema: duplicateSchema,
    createSchema: createSchema

    
}

export function getActionType(value: string): actionType {
    if (Object.values(actionType).includes(value as actionType)) {
        return value as actionType;
      } else {
        throw new Error("Invalid action type");
      }
}

export { actionType, ActionType, actions }