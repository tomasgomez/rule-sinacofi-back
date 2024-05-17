import express from "express";
import { IRuleUsecase } from "../../../usecases/rule/usecase";
import { createRuleFromRequest } from "../presenter/validateRuleRequest";
import { ErrorCode, isInternalError } from "../../../entities/internalError";

const validateRule = async(usecase: IRuleUsecase,req: express.Request, res: express.Response): Promise<void> => {
    try {

        // adapt request to rule
        const rule = createRuleFromRequest(req);
        if (isInternalError(rule)) {
            res.status(rule.statusCode?? 400).send(rule);
            return;
        }
        // validate rule
        let result = await usecase.validateRule(rule, "fgar");

        // check if the rule validation failed
        if (isInternalError(result)) {
            res.status(result.statusCode?? 400).send(rule);
            return;
        }

        res.status(200).send(result); 
    } catch (error) {
        console.error('Error validating Rule:', error);
        res.status(500).send({ message: 'Error validating Rule', code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, status: 500 });
        return;
    }  
}

export { validateRule };

