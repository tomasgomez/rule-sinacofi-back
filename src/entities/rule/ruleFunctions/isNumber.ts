import { InternalError } from "../../internalError";
import { InputValue, Validate } from "../interface";

/**
 * This function is used to validate the number
 * @param {string} value - the value to be validated
 * @returns {boolean} - returns a boolean value
 * @returns {InternalError} - returns an InternalError object
 * 
*/
export const isNumber: Validate = (value: InputValue, ruleValue?: string): boolean | InternalError => {
    if (typeof value === 'number') {
        return true;
    } else {
        return false;
    }
}