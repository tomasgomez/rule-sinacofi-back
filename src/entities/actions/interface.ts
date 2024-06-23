import { ActionCategory } from "./actionCategory";
import { Schema } from "../schema/interface";
import { InternalError } from "../internalError";
import { execute } from "./executeAction";
import { ActionType } from "./actionTypes";
import { MessageParameter, Parameter } from "../paremeters/interface";
import { User } from "../user/interface";

/*
    Interface for Action entity
    This interface is used to define the structure of Action entity
*/

type Action  = {
    id: string; // Unique identifier for the action
    name: string; // Name of the action
    type: string; // type of actions
    category: ActionCategory // Category of the action
    action: ActionType // actionType
    description: string; // Description of the action
    values?: Record<string, unknown>; // values to be used in the action
    createdAt: Date; // Date and time when the action was created
    updatedAt: Date; // Date and time when the action was last updated
}

// Define the value which required to be execute
type ActionInput = {
    parameter?: Parameter
    user?: User
    messageParameters?: MessageParameter[],
    schema?: Schema
}

// Define the result
type ActionOuput = Parameter | Schema

// define the excuteAction type
type ExecuteAction = (input: ActionInput, values?: Record<string, unknown>) => ActionOuput | InternalError

// define the object
type ActionsFunctions = {
    [key in ActionType]: ExecuteAction
}

// execute the actions 
const executeAction = (action: Action, inputAction: ActionInput): ActionOuput | InternalError => execute(action.action, inputAction, action.values)

// actionsSchemaType
type SchemaAction = {
    parameters?: any[],
    modal?: any,
    buttons?:any []
}


export { Action, ActionsFunctions, ExecuteAction, ActionInput, ActionOuput, SchemaAction, executeAction };