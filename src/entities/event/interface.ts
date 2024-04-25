import { ActionTypes } from "./actionTypes";

/*
* This file defines the interface for the Event interface.
*/

interface IEvent {
    id: string;                              // Unique identifier for the event
    ruleId: string;                          // Associated rule (belongsTo relationship)
    name: string;                            // Name of the event
    description: string;                     // Description of the event
    actionType: ActionTypes;                 // Type of action to be performed (e.g., 'UPDATE_STATUS')
    parameters: Record<string, any> | null;  // Parameters required for the action (in JSON format)
    eventChildId?: number;                   // Child event (hasOne relationship)
    childEvent?: IEvent | null;              // Child event (hasOne relationship)

    // methods
    setChildEvent(childEvent: IEvent): void;
    executeEvent(): void;
}

export { IEvent };