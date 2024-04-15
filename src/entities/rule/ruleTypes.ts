/* 
    This file contains the different types of rules that can be applied to a field.
    The types are exported as constants and used in the Rule class to determine which
    validation method to call.
*/

const MAX_LENGTH = 'MAX_LENGTH';
const MIN_LENGTH = 'MIN_LENGTH';
const EMAIL_VALIDATION = 'EMAIL_VALIDATION';
const REQUIRED = 'REQUIRED';
const VALIDATE_SCHEMA = 'VALIDATE_SCHEMA';

export type RuleTypes =
    | typeof MAX_LENGTH
    | typeof MIN_LENGTH
    | typeof EMAIL_VALIDATION
    | typeof REQUIRED
    | typeof VALIDATE_SCHEMA;