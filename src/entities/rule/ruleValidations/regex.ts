import { InternalError } from "../../internalError";
import { InputValue, Validate } from "../interface";

/** 
    * Regular expression validation
    * @params: value: string - the value to be validated [required] 
    * @params: ruleValue: string - the value to be compared
    * @returns: boolean - returns a boolean value
*/

export const regex: Validate = (value: InputValue, ruleValue?: string): boolean | InternalError => {
    if (typeof value !== 'string' || !ruleValue) {
        return false;
    }

    const regex = new RegExp(ruleValue);
    return regex.test(value);
}