/* 
    This file contains the different types of rules that can be applied to a field.
    The types are exported as constants and used in the Rule class to determine which
    validation method to call.
*/

enum ruleType {
    MAX_LENGTH = 'MAX_LENGTH',
    MIN_LENGTH = 'MIN_LENGTH',
    EMAIL_VALIDATION = 'EMAIL_VALIDATION',
    REQUIRED = 'REQUIRED',
    VALIDATE_SCHEMA = 'VALIDATE_SCHEMA',
  }
  
export type RuleTypes = ruleType; 