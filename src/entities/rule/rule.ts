import { IEvent } from "../event/interface";
import { IRule } from "./interface";


export class Rule implements IRule {
    id: number;                 // Unique identifier for the rule
    name: string;               // Name of the validation rule
    description: string;        // Description of the validation rule
    fieldName: string;          // Name of the field to be validated
    condition: string;          // Type of validation condition (e.g., 'MAX_LENGTH', 'EMAIL_VALIDATION')
    value: string;              // Expected value for the validation
    schemaId: number;           // Associated schema Id
    priority: number;           // Priority of the rule
    event?: IEvent | null;      // Rule object
    eventId?: number;           // Event Id

    // constructor
    constructor(id: number, name: string, description: string, fieldName: string, condition: string, value: string, schemaId: number, priority: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.fieldName = fieldName;
        this.condition = condition;
        this.value = value;
        this.schemaId = schemaId;
        this.priority = priority;
    }

    // setEvents
    setEvent(event: IEvent) {
        this.event = event;
    }
    
}