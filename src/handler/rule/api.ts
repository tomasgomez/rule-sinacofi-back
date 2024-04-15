import express from "express";
import { Calls } from "../../entities/calls/calls";
import { ICalls } from "../../entities/calls/interface";
import { IRuleUsecase } from "../../usecases/rule/usecase";
import { IRuleAPI } from "./interface";
import { validateRule } from "./methods/validateRule";

/*
    RuleAPI class is responsible for handling the requests and responses for the rule API.
*/

class RuleCalls extends Calls implements IRuleAPI {
    // constructor
    _usecase: IRuleUsecase;
    constructor(typeUsecase: IRuleUsecase) {
        super();
        this._usecase = typeUsecase;
    }

    // validate rule method
    VALIDATE_RULE = async (req: express.Request, res: express.Response) => await validateRule(this._usecase, req, res);
    
}

export const initRuleCalls = (usecase: IRuleUsecase): IRuleAPI => new RuleCalls(usecase);