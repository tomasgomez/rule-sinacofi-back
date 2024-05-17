import express from "express";
import { IRuleUsecase } from "../../../usecases/rule/usecase";
import { validateMessageRequest } from "../presenter/validateMessageRequest";
import { ErrorCode, InternalError, isInternalError } from "../../../entities/internalError";


const validateMessage = async(usecase: IRuleUsecase,req: express.Request, res: express.Response): Promise<void> => {
    try {
        // adapt request to rule
        const message = validateMessageRequest(req);
        // check if message is an InternalError
        if (isInternalError(message)) {
            res.status(message.statusCode!).send(message);
            return;
        }

        // validate rule
        let result = await usecase.validateMessage(message);

        // check if the rule validation failed
        if (isInternalError(result)) {
            res.status(result.statusCode!).send(result);
            return;
        }

        res.status(200).send(result); 
    } catch (e) {
        console.error('Error validating Rule:', e);
        const error: InternalError = { message: 'Internal Server Error', data: e, code: ErrorCode.INTERNAL_SERVER_ERROR, statusCode: 500};
        res.status(400).send(error);
    }  
}

export { validateMessage };