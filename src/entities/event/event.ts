
import { IEvent } from "./interface";

/*
* Event entity
*/

export class Event implements IEvent {
    id: number;                              // Unique identifier for the event
    ruleId: number;                          // Associated rule (belongsTo relationship)
    name: string;                            // Name of the event
    description: string;                     // Description of the event
    actionType: string;                      // Type of action to be performed (e.g., 'UPDATE_STATUS')
    parameters: Record<string, any> | null;  // Parameters required for the action (in JSON format)
    eventChildId?: number;                   // Child event (hasOne relationship)
    childEvent?: IEvent | null;              // Child event 

    // constructor
    constructor(id: number, ruleId: number, name: string, description: string, actionType: string, parameters: Record<string, any> | null) {
        this.id = id;
        this.ruleId = ruleId;
        this.name = name;
        this.description = description;
        this.actionType = actionType;
        this.parameters = parameters;
    }

    // setChildEvent
    setChildEvent(childEvent: IEvent) {
        this.childEvent = childEvent;
    }
}
