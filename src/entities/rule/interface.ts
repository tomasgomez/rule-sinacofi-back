import {
    InternalError
} from "../internalError/error";
import {
    IEvent
} from "../event/interface";
import {
    RuleTypes
} from "./ruleTypes";
import {
    InputValue
} from "./ruleValidation";
import {
    Parameter
} from "../paremeters/parameter";

/** 
 * Interface representing a validation rule.
 */

interface IRule {
    id: string; // Unique identifier for the rule
    name: string; // Name of the rule
    type: string; // Type of the rule
    description: string; // Description of the rule
    condition: RuleTypes; // Condition of the rule
    value: string; // Value of the rule
    priority: number; // Priority of the rule
    createdAt: Date; // Date and time when the rule was created
    updatedAt: Date; // Date and time when the rule was last updated
    event ? : IEvent | null; // Event object
    eventId ? : string; // Event Id

    // methods
    setEvent(event: IEvent): IEvent;
    executeRule(inputValue: InputValue): boolean | InternalError;
}

export { IRule };