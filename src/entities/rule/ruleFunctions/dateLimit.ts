import { InternalError } from "../../internalError";
import { InputValue, Validate } from "../interface";


/*
* This function is used to validate the dateLimit
* @param {string} value - the value to be validated
* @returns {boolean} - returns a boolean value
*/

export const dateResponseLimit: Validate = (value: InputValue, ruleValue?: string): boolean | InternalError => {
    // check if the value is a string
    if (typeof value !== "string") {
        return false;
    }

    // check if the value is a valid date
    if (!Date.parse(value)) {
        return false;
    }

    if (!ruleValue) {
        return false;
    }

    let creationDate = new Date(value);

    // The maximun date is 24 hours from the current date
    let maxDate = new Date(creationDate); // Create a new Date instance to avoid mutating the original date
    maxDate.setHours(creationDate.getHours() + 24); // Add 24 hours

    // check if the value is less than or equal to the ruleValue
    if (Date.parse(value) <= Date.parse(ruleValue)) {
        return true;
    }

    return false;
}