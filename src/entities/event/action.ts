import { InternalError } from '../internalError';
import { actionTypes, ActionTypes } from './actionTypes';

// Payload type with any key-value pair
type Payload = { [key: string]: any };

// Action type with function and payload
type Action = (fn: Function, payload: Payload) => Promise<Payload | InternalError>;

// Actions type with specific action functions 
type Actions = {
  [key in ActionTypes]: Action;
};

// action action
const actionFunction: Action = async (fn: Function, payload: Payload) => {
  return fn(payload);
}

export { Actions, Payload, Action, actionFunction};