
import { IRuleRepository } from "../../repository/rule/interface";
import { IRuleUsecase } from "./usecase";


/*
    RuleUsecase class is responsible for handling the usecases.
*/

export class RuleUsecase implements IRuleUsecase {
    // constructor
    constructor(private readonly repository: IRuleRepository) {}
    
}