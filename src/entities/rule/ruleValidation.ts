import { IMessageSchema } from "../schema/interface";
import { minLength, maxLength, emailValidation, isRequired, validateSchema } from "./ruleValidations";
import { RuleTypes } from "./ruleTypes";
import { InternalError, ErrorCode } from "../internalError";

// Define the value type to be validated
type InputValue = string | number | IMessageSchema | boolean;

// Define the validate function type
type Validate = (value: InputValue, ruleValue?: string) => boolean | InternalError;

// Define the validations object type
type Validations = {
    [key in RuleTypes]: Validate;
}
/**
 * Define the validations object
 */
const validations: Validations = {
    MIN_LENGTH: minLength,
    MAX_LENGTH: maxLength,
    EMAIL_VALIDATION: emailValidation,
    REQUIRED: isRequired,
    VALIDATE_SCHEMA: validateSchema,
}

/** Define the validate function
*  This function takes a rule, value, and ruleValue as arguments
    @param {RuleTypes} rule - the rule to be applied
    @param {InputValue} value - the value to be validated
    @param {string} ruleValue - the value to be validated against
    @returns {boolean | InternalError} - returns a boolean value or an InternalError object
*/
const validate = (rule: RuleTypes, value: InputValue, ruleValue?: string): boolean | InternalError => {
    
    // Get the validation function from the actions object
    const validationFunction = validations[rule];

    // Check if the validation function exists
    if (validationFunction) {
        // Call the validation function with the value and ruleValue
        return validationFunction(value, ruleValue);
    } else {
        throw new InternalError(`Rule ${rule} does not exist`, ErrorCode.NOT_FOUND);
    }
};

// Export the validate function and the InputValue and Validate types
export { validate, InputValue, Validate };