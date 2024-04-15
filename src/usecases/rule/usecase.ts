import { InternalError } from "../../entities/internalError/error";
import { IRule } from "../../entities/rule/interface";
import { InputValue } from "../../entities/rule/ruleValidation";

/* 
    Rule interface
*/

export interface IRuleUsecase {
   validateRule(rule: IRule, inputValue: InputValue): Promise<boolean | InternalError>;
}

