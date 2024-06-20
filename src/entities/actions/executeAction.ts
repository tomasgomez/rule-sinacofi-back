import { ErrorCode, InternalError } from "../internalError";
import { ActionType, actions } from "./actionTypes";
import { ActionInput, ActionOuput, ExecuteAction } from "./interface";


/** Define the action function
*  This function takes a action, value, and actionValue as arguments
    @param {ActionType} action - the action to be executed
    @param {ActionInput} actionInput - parameters or schema
    @param {string} values - the values
    @returns {ActionOutput | InternalError} - returns a boolean value or an InternalError object
*/
const execute = (action: ActionType, actionInput: ActionInput, values?: Record<string, unknown>): ActionOuput | InternalError => {
    
    // Get the actionFunctions
    const actionFunction = actions[action];

    // Check if the actions function exists
    if (actionFunction) {
        // Call the actions
        return actionFunction(actionInput, values);
    } else {
        const error: InternalError = { message: `Action: ${action} does not exist`, code: ErrorCode.NOT_FOUND };
        throw error;
    }
};

export { execute }