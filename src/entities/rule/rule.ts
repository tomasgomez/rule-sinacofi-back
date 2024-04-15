import { IEvent } from "../event/interface";
import { IRule } from "./interface";


export class Rule implements IRule {
    // Constructor with parameter properties
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

    // Method to set event
    setEvent(event: IEvent) {
        this.event = event;
    }
}