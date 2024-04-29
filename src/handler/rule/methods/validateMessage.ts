import express from "express";
import { IRuleUsecase } from "../../../usecases/rule/usecase";
import { validateMessageRequest } from "../presenter/validateMessageRequest";
import { ErrorCode, InternalError } from "../../../entities/internalError";


const validateMessage = async(usecase: IRuleUsecase,req: express.Request, res: express.Response): Promise<void> => {
    try {
        // adapt request to rule
        const message = validateMessageRequest(req);
        if (message instanceof InternalError) {
            res.status(message.statusCode!).send(message);
            return;
        }

        // validate rule
        let result = await usecase.validateMessage(message);

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

export { validateMessage };