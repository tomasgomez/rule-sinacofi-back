/*
* This file defines the interface for the Event interface.
*/

export interface IEvent {
    id: number;                              // Unique identifier for the event
    ruleId: number;                          // Associated rule (belongsTo relationship)
    name: string;                            // Name of the event
    description: string;                     // Description of the event
    actionType: string;                      // Type of action to be performed (e.g., 'UPDATE_STATUS')
    parameters: Record<string, any> | null;  // Parameters required for the action (in JSON format)
    eventChildId?: number;                   // Child event (hasOne relationship)
    childEvent?: IEvent | null;              // Child event (hasOne relationship)
}