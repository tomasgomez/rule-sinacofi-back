import express from "express";
import { IRuleUsecase } from "../../../usecases/rule/usecase";
import { createRuleFromRequest } from "../presenter/validateRuleRequest";
import { ErrorCode, InternalError } from "../../../entities/internalError";

const validateRule = async(usecase: IRuleUsecase,req: express.Request, res: express.Response): Promise<void> => {
    try {

        // adapt request to rule
        const rule = createRuleFromRequest(req);
        if (rule instanceof InternalError) {
            res.status(rule.statusCode!).send(rule);
            return;
        }

        // validate rule
        let result = await usecase.validateRule(rule, "fgar");

        // check if the rule validation failed
        if (result instanceof InternalError) {
            res.status(result.statusCode!).send(result);
            return;
        }

        res.status(200).send(result); 
    } catch (error) {
        console.error('Error validating Rule:', error);
        res.status(400).send(new InternalError("Error validating Rule: Calling usecase", ErrorCode.INTERNAL_SERVER_ERROR,400));
    }  
}

export { validateRule };

