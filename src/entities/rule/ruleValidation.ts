import { IMessageSchema } from "../schema/interface";
import { minLength, maxLength, emailValidation, isRequired, validateSchema } from "./ruleValidations";
import { RuleTypes } from "./ruleTypes";

/* 
*   Actions object a list of actions that can be performed on the validation rules
*/
type Validations = {
    MIN_LENGTH: typeof minLength,
    MAX_LENGTH: typeof maxLength,
    EMAIL_VALIDATION: typeof emailValidation, 
    REQUIRED: typeof isRequired,
    VALIDATE_SCHEMA: typeof validateSchema,
}

// Define the value type to be validated
type InputValue = string | number | IMessageSchema | boolean;

// Define the validate function type
type Validate = (value: InputValue, ruleValue?: string) => boolean 

// Export the actions object
const validations: Validations = {
    MIN_LENGTH: minLength,
    MAX_LENGTH: maxLength,
    EMAIL_VALIDATION: emailValidation,
    REQUIRED: isRequired,
    VALIDATE_SCHEMA: validateSchema,
}

const validate = (rule: RuleTypes, value: InputValue, ruleValue?: string): boolean | Error => {
    
    // Get the validation function from the actions object
    const validationFunction = validations[rule];

    // Check if the validation function exists
    if (validationFunction) {
        // Call the validation function with the value and ruleValue
        return validationFunction(value, ruleValue);
    } else {
        throw new Error(`Rule ${rule} does not exist`);
    }
};

// Export the validate function and the InputValue and Validate types
export { validate, InputValue, Validate };