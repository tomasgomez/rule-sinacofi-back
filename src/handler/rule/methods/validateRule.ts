import express from "express";
import { IRuleUsecase } from "../../../usecases/rule/usecase";
import { createRuleFromRequest } from "../presenter/validateRuleRequest";

const validateRule = async(usecase: IRuleUsecase,req: express.Request, res: express.Response): Promise<void> => {
    try {
        const rule = createRuleFromRequest(req);
        const result = await usecase.validateRule(rule);
        res.status(200).send(result); 
    } catch (error) {
        res.status(400).send("Error validating rule");
    }  
}

export { validateRule };

