import { InternalError } from "../../internalError";
import { InputValue, Validate } from "../ruleValidation";

/**
 * This function is used to validate the string
 * @param {number} value - the value to be validated
 * @returns {boolean} - returns a boolean value
 * @returns {InternalError} - returns an InternalError object
 * 
*/
export const isString: Validate = (value: InputValue, ruleValue?: string): boolean | InternalError => {
    if (typeof value === 'number') {
        return true;
    } else {
        return false;
    }
}