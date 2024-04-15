import { InternalError } from "../internalError/error";
import { IEvent } from "../event/interface";
import { RuleTypes } from "./ruleTypes";
import { InputValue } from "./ruleValidation";

/** 
 * Interface representing a validation rule.
 */

interface IRule {
    id: number;                 // Unique identifier for the rule
    name: string;               // Name of the validation rule
    description: string;        // Description of the validation rule
    fieldName: string;          // Name of the field to be validated
    condition: RuleTypes;       // Type of validation condition (e.g., 'MAX_LENGTH', 'EMAIL_VALIDATION')
    value: string;              // Expected value for the validation
    schemaId: number;           // Associated schema Id
    priority: number;           // Priority of the rule
    event?: IEvent | null;      // Rule object
    eventId?: number;           // Event Id

    // methods
    setEvent(event: IEvent): void;
    executeRule(inputValue: InputValue): boolean | InternalError;
}

export { IRule };