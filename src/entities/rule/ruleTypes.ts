import { InputValue, Validations } from "./interface";
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
}

export { RuleTypes, validations };