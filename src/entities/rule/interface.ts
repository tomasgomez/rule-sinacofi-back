import { InternalError } from "../internalError/error";
import { RuleTypes } from "./ruleTypes";
import { Schema } from "../schema/interface";
import { validate } from "./ruleValidation";
import { RuleCategory } from "./ruleCategory";
/** 
 * Interface representing a validation rule.
 */
type Rule = {
    id: string;               // Unique identifier for the rule
    name: string;             // Name of the rule
    type: string;             // Type of the rule
    category: RuleCategory;   // Category of the tule
    description: string;      // Description of the rule
    condition: RuleTypes;     // Condition of the rule
    value: string;            // Value of the rule
    priority: number;         // Priority of the rule
    createdAt: Date;          // Date and time when the rule was created
    updatedAt: Date;          // Date and time when the rule was last updated
}

// validate the rule based on the condition
const executeRule = (rule: Rule, inputValue: InputValue): boolean | InternalError => validate(rule.condition, inputValue, rule.value)

// Define the value type to be validated
type InputValue = string | number | Schema | boolean;

// Define the validate function type
type Validate = (value: InputValue, ruleValue?: string) => boolean | InternalError;

// Define the validations object type
type Validations = {
    [key in RuleTypes]: Validate;
}


export { Rule, Validations, Validate, InputValue, executeRule };