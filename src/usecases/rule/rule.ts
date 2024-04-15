
import { InternalError } from "../../entities/internalError/error";
import { IRule } from "../../entities/rule/interface";
import { InputValue } from "../../entities/rule/ruleValidation";
import { IRuleRepository } from "../../repository/rule/interface";
import { validateRule } from "./methods";
import { IRuleUsecase } from "./usecase";


/*
    RuleUsecase class is responsible for handling the rule usecases.
*/

class RuleUsecase implements IRuleUsecase {
    // constructor
    constructor(private readonly repository: IRuleRepository) {}

    // validate rule
    validateRule = async (rule: IRule, inputValue: InputValue): Promise<boolean | InternalError> => validateRule(rule, inputValue);
    
}

// init type usecase
export const initRuleUsecase = (repository: IRuleRepository): IRuleUsecase => new RuleUsecase(repository);