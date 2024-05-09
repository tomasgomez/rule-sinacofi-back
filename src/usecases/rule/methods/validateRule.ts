import { InternalError, ErrorCode, isInternalError } from "../../../entities/internalError";
import { executeRule, Rule } from "../../../entities/rule/interface";
import { InputValue } from "../../../entities/rule/ruleValidation";


// validate rule
const validateRule = async (rule: Rule, value: InputValue): Promise<boolean | InternalError> => {
    
    // check if the rule is null
    if (!rule) {
        console.log("Rule is null");
        return { message: "Rule is null", code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 };
    }

    // validate the rule
    let response = executeRule(rule,value);

    // call repository to validate rule
    if (isInternalError(response)) {
        console.log("Error validating rule");
        return response;
    }

    // check if the rule validation failed
    if (!response){
        console.log("Rule validation failed");
        let data = {
            "rule": rule.name,
            "condition": rule.condition,
            "condition_value": rule.value,
            "value": value
        }
        return { message: "Rule validation failed", code: ErrorCode.VALIDATION_ERROR, data: data, statusCode: 400 };
    }

    return response;
}

export { validateRule };