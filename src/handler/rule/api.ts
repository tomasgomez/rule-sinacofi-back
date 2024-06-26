import express from "express";
import { Calls } from "../../entities/calls/calls";
import { IRuleUsecase } from "../../usecases/rule/usecase";
import { RuleAPI } from "./interface";
import { validateRule } from "./methods/validateRule";
import { validateMessage } from "./methods/validateMessage";

/*
    RuleAPI class is responsible for handling the requests and responses for the rule API.
*/

class RuleCalls extends Calls implements RuleAPI {
    // constructor
    _usecase: IRuleUsecase;
    constructor(typeUsecase: IRuleUsecase) {
        super();
        this._usecase = typeUsecase;
    }

    // validate rule method
    VALIDATE_RULE = async (req: express.Request, res: express.Response) => await validateRule(this._usecase, req, res);

    // validate message method
    VALIDATE_MESSAGE = async (req: express.Request, res: express.Response): Promise<void> => validateMessage(this._usecase, req, res);
    
    
}

export const initRuleCalls = (usecase: IRuleUsecase): RuleAPI => new RuleCalls(usecase);