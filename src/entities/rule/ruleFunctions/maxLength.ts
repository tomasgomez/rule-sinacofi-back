import { InputValue, Validate } from "../interface";

/** 
    * compare two lengths of strings and return true if the value is less than or equal to the ruleValue
    * @params: value: string - the value to be validated [required] 
    * @params: ruleValue: string - the value to be compared
    * @returns: boolean - returns a boolean value
*/

export const maxLength: Validate = (value: InputValue, ruleValue?: string): boolean => {

    // check if the value is a number
    if (typeof value === "number") {
        value = value.toString(); // Safe to call toString here
    } 

    // check if the value is not a string
    if (typeof value !== "string") {
        return false;
    }

    // check if the ruleValue is exist
    if (!ruleValue) {
        return false;
    }
    
    // convert the ruleValue to a number
    const ruleValueNumber = parseInt(ruleValue);
    // compare the lengths of the strings
    return value.length <= ruleValueNumber;
}
