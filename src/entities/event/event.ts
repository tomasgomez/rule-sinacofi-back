
import { IEvent } from "./interface";

/*
* Event entity
*/

export class Event implements IEvent {
    // constructor
    constructor(
        public id: number, 
        public ruleId: number, 
        public name: string, 
        public description: string, 
        public actionType: string, 
        public parameters: Record<string, any> | null,
        public  eventChildId?: number,                 
        public childEvent?: IEvent | null,            
    ) {}

    // setChildEvent
    setChildEvent(childEvent: IEvent) {
        this.childEvent = childEvent;
    }
}
