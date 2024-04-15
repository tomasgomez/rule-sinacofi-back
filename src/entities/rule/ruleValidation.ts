import { IMessageSchema } from "../schema/interface";
import { minLength, maxLength, emailValidation, isRequired, validateSchema } from "./ruleValidations";
import { RuleTypes } from "./ruleTypes";
import { InternalError, ErrorCode } from "../internalError";

/* 
*   Actions object a list of actions that can be performed on the validation rules
*/


// Define the value type to be validated
type InputValue = string | number | IMessageSchema | boolean;

// Define the validate function type
type Validate = (value: InputValue, ruleValue?: string) => boolean | InternalError;

// Define the validations object type
type Validations = {
    MIN_LENGTH: Validate,
    MAX_LENGTH: Validate,
    EMAIL_VALIDATION: Validate, 
    REQUIRED: Validate,
    VALIDATE_SCHEMA: Validate,
}
// Export the actions object
const validations: Validations = {
    MIN_LENGTH: minLength,
    MAX_LENGTH: maxLength,
    EMAIL_VALIDATION: emailValidation,
    REQUIRED: isRequired,
    VALIDATE_SCHEMA: validateSchema,
}

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