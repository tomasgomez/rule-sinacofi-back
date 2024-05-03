import { InternalError } from "../internalError/error";
import { IEvent } from "../event/interface";
import { RuleTypes } from "./ruleTypes";
import { IMessageSchema } from "../schema/interface";

/** 
 * Interface representing a validation rule.
 */

interface IRule {
    id: string;              // Unique identifier for the rule
    name: string;            // Name of the rule
    type: string;            // Type of the rule
    description: string;     // Description of the rule
    condition: RuleTypes;    // Condition of the rule
    value: string;           // Value of the rule
    priority: number;        // Priority of the rule
    createdAt: Date;         // Date and time when the rule was created
    updatedAt: Date;         // Date and time when the rule was last updated
    event ? : IEvent | null; // Event object
    eventId ? : string;      // Event Id

    // methods
    setEvent(event: IEvent): IEvent;
    executeRule(inputValue: InputValue): boolean | InternalError;
}

// Define the value type to be validated
type InputValue = string | number | IMessageSchema | boolean;

// Define the validate function type
type Validate = (value: InputValue, ruleValue?: string) => boolean | InternalError;

// Define the validations object type
type Validations = {
    [key in RuleTypes]: Validate;
}


export { IRule, Validations, InputValue, Validate };