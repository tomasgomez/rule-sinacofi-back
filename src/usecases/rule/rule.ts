
import { IRule } from "../../entities/rule/interface";
import { IRuleRepository } from "../../repository/rule/interface";
import { IRuleUsecase } from "./usecase";


/*
    RuleUsecase class is responsible for handling the rule usecases.
*/

class RuleUsecase implements IRuleUsecase {
    // constructor
    constructor(private readonly repository: IRuleRepository) {}

    // validate rule
    validateRule = async (rule: IRule): Promise<boolean> => {
        // call repository to validate rule
        
        let value = rule.executeRule("12345678");

        console.log(value);
        if (value instanceof Error) {
            console.log("Error validating rule");
            return false;
        }
        return value;
    }
    
}

// init type usecase
export const initRuleUsecase = (repository: IRuleRepository): IRuleUsecase => new RuleUsecase(repository);