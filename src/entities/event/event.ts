
import { ActionTypes } from "../actions/actionTypes";
import { IEvent } from "./interface";

/*
* Event entity
*/
class Event implements IEvent {
    // constructor
    constructor(
        public id: string, 
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

    // executeEvent
    executeEvent() {
        console.log('Event executed:', this);
    }

}

export { Event };
