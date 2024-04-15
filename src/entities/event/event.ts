
import { ActionTypes } from "./actionTypes";
import { IEvent } from "./interface";

/*
* Event entity
*/

class Event implements IEvent {
    // constructor
    constructor(
        public id: number, 
        public ruleId: number, 
        public name: string, 
        public description: string, 
        public actionType: ActionTypes, 
        public parameters: Record<string, any> | null,
        public eventChildId?: number,                 
        public childEvent?: IEvent | null,            
    ) {}

    // setChildEvent
    setChildEvent(childEvent: IEvent) {
        this.childEvent = childEvent;
    }

}

export { Event };
