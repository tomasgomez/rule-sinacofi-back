import { InternalError, ErrorCode } from "../../../entities/internalError";
import { IRule } from "../../../entities/rule/interface";
import { InputValue } from "../../../entities/rule/ruleValidation";


// validate rule
const validateRule = async (rule: IRule, value: InputValue): Promise<boolean | InternalError> => {
    
    // check if the rule is null
    if (!rule) {
        console.log("Rule is null");
        return new InternalError("Rule is null", ErrorCode.NOT_FOUND);
    }

    // validate the rule
    let response = rule.executeRule(value);

    // call repository to validate rule
    if (response instanceof InternalError) {
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
        return new InternalError("Rule validation failed", ErrorCode.VALIDATION_ERROR, data, 400);
    }

    return response;
}

export { validateRule };