import { InputValue, Rule, Validate } from "../interface";
import { ruleCategory } from "../ruleCategory";
import { ruleType } from "../ruleTypes";

/** 
*   this function is used to check if the value is not empty
*   @params: value: string - the value to be validated [required]
*   @returns: boolean - returns a boolean value
*/

export const isRequired: Validate = (value: InputValue): boolean => {
    // check if the value is a string
    if (typeof value === "string") {
        return value !== "";
    }
    // check if the value is a number
    if (typeof value === "number") {
        return true;
    }
    // check if the value is a boolean
    if (typeof value === "boolean") {
        return true;
    }
    // check if the value is an object
    if (typeof value === "object") {
        return Object.keys(value).length > 0;
    }
    // return false if the value is not a string, number, boolean, or object
    return false;
}

export const getRequired = (value: string): Rule => {
    return {
        "id": "",
        "name": "required",
        "type": "parameter",
        "category": ruleCategory.VALIDATION,
        "description": "campo requerido",
        "condition": ruleType.required,
        "value": value,
        "priority": 0,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
}