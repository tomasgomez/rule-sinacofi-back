import { InternalError } from "../../internalError";
import { InputValue, Validate } from "../interface";

/*
* This function is used to validate the distinctToIssuedBank
* @param {string} value - the value to be validated
* @returns {boolean} - returns a boolean value
*/

export const cuk: Validate = (value: InputValue, ruleValue?: string): boolean | InternalError => {
    // check if the value is a string
    if (typeof value !== "string") {
        return false;
    }

    // check the first two characters of the value
    if (value.slice(0, 2) !== 'AH') {
        return false;
    }

    // TODO: check the area of user
    // TODO: check the message correlative

    return true;
}