import { IEvent } from "../event/interface";
import { IRule } from "./interface";


export class Rule implements IRule {

    // constructor
    constructor(
        public id: number, 
        public name: string, 
        public description: string, 
        public fieldName: string, 
        public condition: string, 
        public value: string, 
        public schemaId: number, 
        public priority: number,
        public event?: IEvent | null,
        public eventId?: number
    ) {}

    // setEvents
    setEvent(event: IEvent) {
        this.event = event;
    }
}