import { InternalError } from "../internalError/error";
import { IEvent } from "../event/interface";
import { IRule } from "./interface";
import { RuleTypes } from "./ruleTypes";
import { InputValue, validate } from "./ruleValidation";
import { Parameter } from "../paremeters/parameter";

/**
 * Rule class is responsible for handling the rule entity. 
 */
class Rule implements IRule {

    id: string; // Unique identifier for the rule
    name: string; // Name of the rule
    type: string; // Type of the rule
    description: string; // Description of the rule
    condition: RuleTypes; // Condition of the rule
    value: string; // Value of the rule
    priority: number; // Priority of the rule
    createdAt: Date; // Date and time when the rule was created
    updatedAt: Date; // Date and time when the rule was last updated
    event?: IEvent | null; // Event object
    eventId?: string; // Event Id

    constructor(
        id: string,
        name: string,
        type: string,
        description: string,
        condition: RuleTypes,
        value: string,
        priority: number,
        createdAt: Date,
        updatedAt: Date,
        eventId?: string,
        event?: IEvent
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.condition = condition;
        this.value = value;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.eventId = eventId;
        this.event = event;
    }


    // setEvent
    setEvent = (event: IEvent) => this.event = event;
    // validate the rule based on the condition
    executeRule = (inputValue: InputValue): boolean | InternalError => validate(this.condition, inputValue, this.value)
    

}

export { Rule };