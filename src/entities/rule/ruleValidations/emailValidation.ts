import { InputValue, Validate } from "../ruleValidation";

/*
* This function is used to validate the email
* @param {string} value - the value to be validated
* @returns {boolean} - returns a boolean value
*/

export const emailValidation: Validate = (value: InputValue): boolean => {
    
    // check if the value is a string
    if (typeof value !== "string") {
        return false;
    }

    // regex for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // check if the value matches the regex
    return emailRegex.test(value);
}