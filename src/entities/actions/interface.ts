


import { actionTypes } from "./actionTypes";

/*
    Interface for Action entity
    This interface is used to define the structure of Action entity
*/

type Action  = {
    id: string; // Unique identifier for the action
    name: actionTypes; // Name of the action
    description: string; // Description of the action
    values?: Record<string, unknown>; // values to be used in the action
    createdAt: Date; // Date and time when the action was created
    updatedAt: Date; // Date and time when the action was last updated
}

export { Action };