import { ActionCategory, getActionCategory } from "../../../entities/actions/actionCategory";
import { ActionType, getActionType } from "../../../entities/actions/actionTypes";
import { Action } from "../../../entities/actions/interface";
import { ErrorCode } from "../../../entities/internalError";
import { IParamterActionResponse, ISchemaActionResponse } from "../entities/manyToMany";


const actionsToEntity = (actions: any): Action[] => {
    try {
        const actionsAdapted = actions.map((r: any) => {
            let actionCategory: ActionCategory = getActionCategory(r.action.category);
            let actionType: ActionType = getActionType(r.action.action);
            return {
                name: r.action.name, 
                type: r.action.type,
                category: actionCategory, 
                description: r.action.description, 
                action: actionType,
                id: r.action.id, 
                values: r.action.value as Record<string, unknown>, 
                createdAt: r.action.createdAt, 
                updatedAt: r.action.updatedAt};
        });
        return actionsAdapted;
    } catch (e) {
        console.error(e);
        throw { message: "Error adapting actions", code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500}
    }
}

const allowedActionsToEntity = (actions: any): Action[] => {
    try {
        const actionsAdapted = actions.map((r: any) => {
            let actionCategory: ActionCategory = getActionCategory(r.action.category);
            let actionType: ActionType = getActionType(r.action.action);
            return {
                name: r.action.name, 
                type: r.action.type,
                category: actionCategory, 
                description: r.action.description, 
                action: actionType,
                id: r.action.id, 
                values: r.action.value as Record<string, unknown>, 
                createdAt: r.action.createdAt, 
                updatedAt: r.action.updatedAt};
        });
        return actionsAdapted;
    } catch (e) {
        console.error(e);
        throw { message: "Error adapting actions", code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500}
    }
}

export { actionsToEntity, allowedActionsToEntity };