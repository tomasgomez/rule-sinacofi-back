import { RuleTypes, validations } from "./ruleTypes";
import { InternalError, ErrorCode } from "../internalError";
import { InputValue } from "./interface";


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
        const error: InternalError = { message: `Rule ${rule} does not exist`, code: ErrorCode.NOT_FOUND };
        throw error;
    }
};

// Export the validate function and the InputValue and Validate types
export { validate, InputValue };