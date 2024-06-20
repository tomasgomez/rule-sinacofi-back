import { ErrorCode } from "../internalError";
import { fillParameterWithMsg } from "./actions/fillParameter";
import { fillParameterWithUser } from "./actions/fillUser";
import { fillCurrentDate } from "./actions/fillCurrentDate";
import { ActionsFunctions } from "./interface";

enum actionType {
    fillParameter = 'fillParameter',
    fillUser = 'fillUser',
    fillCurrentDate = 'fillCurrentDate'
}

type ActionType = actionType;


const actions: ActionsFunctions = {
    fillParameter: fillParameterWithMsg,
    fillUser: fillParameterWithUser,
    fillCurrentDate: fillCurrentDate
}

export function getActionType(value: string): actionType {
  console.log(value)
    if (Object.values(actionType).includes(value as actionType)) {
        return value as actionType;
      } else {
        throw new Error("Invalid action type");
      }
}

export { actionType, ActionType, actions }