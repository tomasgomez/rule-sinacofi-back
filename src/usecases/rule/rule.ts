
import { InternalError } from "../../entities/internalError/error";
import { Message } from "../../entities/message/interface";
import { Rule } from "../../entities/rule/interface";
import { InputValue } from "../../entities/rule/ruleValidation";
import { IRuleRepository } from "../../repository/rule/interface";
import { ISchemaUsecase } from "../schema/usecase";
import { validateRule, validateMessage } from "./methods";
import { IRuleUsecase } from "./usecase";


/*
    RuleUsecase class is responsible for handling the rule usecases.
*/

class RuleUsecase implements IRuleUsecase {
    
    schemaUsecase: ISchemaUsecase;
    // constructor
    constructor(readonly repository: IRuleRepository, schemaUsecase: ISchemaUsecase) {
        this.schemaUsecase = schemaUsecase;
    }

    // validate rule
    validateRule = async (rule: Rule, inputValue: InputValue): Promise<boolean | InternalError> => validateRule(rule, inputValue);
    // validate message
    validateMessage = async (message: Message): Promise<boolean | InternalError> => validateMessage(this, message);
    
}

// init type usecase
export const initRuleUsecase = (repository: IRuleRepository, schemaUsecase: ISchemaUsecase): IRuleUsecase => new RuleUsecase(repository, schemaUsecase);