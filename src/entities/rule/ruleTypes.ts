import { InternalError } from "../internalError";
import { InputValue, Validations,  } from "./interface";
import { minLength, maxLength, emailValidation, isRequired, regex, distinctToIssuedBank, isNumber, cuk, isString, dni } from "./ruleValidations";

/* 
    This file contains the different types of rules that can be applied to a field.
    The types are exported as constants and used in the Rule class to determine which
    validation method to call.
*/

enum ruleType {
    minLegth             = 'minLegth',
    maxLength            = 'maxLength',
    emailValidation      = 'emailValidation',
    required             = 'required',
    regex                = 'regex',
    dni                  = 'dni',
    distinctToIssuedBank = 'distinctToIssuedBank',
    isNumber             = 'isNumber',
    CUK                  = 'CUK',
    isString             = 'isString',
    disabled             = 'disabled',
    currentDate          = 'currentDate',
    checkUserChannel     = 'checkUserChannel',
    accordion            = 'accordion'

}

type RuleTypes = ruleType; 

/**
 * Define the validations object
 */
const validations: Validations = {
  minLegth: minLength,
  maxLength: maxLength,
  emailValidation: emailValidation,
  required: isRequired,
  regex: regex,
  dni: dni,
  distinctToIssuedBank: distinctToIssuedBank,
  isNumber: isNumber,
  CUK: cuk,
  isString: isString,
  disabled: () => true,
  currentDate: () => true,
  checkUserChannel: () => true,
  accordion: () => true
}

function getRuleType(value: string): ruleType {
  console.log(value);
  if (Object.values(ruleType).includes(value as ruleType)) {
    return value as ruleType;
  } else {
    throw new Error("Invalid rule type provided.");
  }
}

export { RuleTypes, validations, getRuleType };