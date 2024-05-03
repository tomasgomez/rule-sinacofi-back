import { InternalError } from "../../internalError";
import { InputValue, Validate } from "../ruleValidation";

/*
* This function is used to validate the distinctToIssuedBank
* @param {string} value - the value to be validated
* @returns {boolean} - returns a boolean value
*/

export const distinctToIssuedBank: Validate = (value: InputValue, ruleValue?: string): boolean | InternalError => {
    return true;
}