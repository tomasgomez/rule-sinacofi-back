import { ErrorCode } from "../internalError";
import { fillParameterWithMsg } from "./actions/fillParameter";
import { fillParameterWithUser } from "./actions/fillUser";
import { ActionsFunctions } from "./interface";

enum actionType {
    fillParameter = 'fillParameter',
    fillUser = 'fillUser',
    fillUserName = 'fillUserName',
    fillUserDni = 'fillUserDni',
}

type ActionType = actionType;


const actions: ActionsFunctions = {
    fillParameter: fillParameterWithMsg,
    fillUser: fillParameterWithUser,
    fillUserName: fillParameterWithUser,
    fillUserDni: fillParameterWithUser,
}

export function getActionType(value: string): actionType {
    if (Object.values(actionType).includes(value as actionType)) {
        return value as actionType;
      } else {
        throw new Error("Invalid action type");
      }
}

export { actionType, ActionType, actions }