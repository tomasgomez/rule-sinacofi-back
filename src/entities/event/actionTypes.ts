// action types
const CREATE_MESSAGE = "CREATE_MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const UPDATE_MESSAGE = "UPDATE_MESSAGE";
const EXECUTE_RULE = "EXECUTE_RULE";

export type ActionTypes = 
    | typeof CREATE_MESSAGE
    | typeof DELETE_MESSAGE
    | typeof UPDATE_MESSAGE
    | typeof EXECUTE_RULE;
