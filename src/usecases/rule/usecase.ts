import { IRuleRepository } from "../../repository/rule/interface";
import { RuleUsecase } from "./rule";

/* 
    Rule interface
*/

export interface IRuleUsecase {
   
}

// init type usecase
export const initRuleUsecase = (repository: IRuleRepository): IRuleUsecase => new RuleUsecase(repository);