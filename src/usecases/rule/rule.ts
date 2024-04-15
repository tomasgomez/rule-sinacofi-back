
import { IRuleRepository } from "../../repository/rule/interface";
import { IRuleUsecase } from "./usecase";


/*
    RuleUsecase class is responsible for handling the rule usecases.
*/

class RuleUsecase implements IRuleUsecase {
    // constructor
    constructor(private readonly repository: IRuleRepository) {}
    
}

// init type usecase
export const initRuleUsecase = (repository: IRuleRepository): IRuleUsecase => new RuleUsecase(repository);