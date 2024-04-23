import { Request, Response } from "express";
import { ISchemaUsecase } from "../../../usecases/schema/usecase";
import { InternalError } from "../../../entities/internalError";
import { ErrorCode } from "../../../entities/internalError";

const getSchemaTypes = async (usecase: ISchemaUsecase , req: Request, res: Response) => {
    try {

        /* TODO: Add validation logic here */

        /* Get schema types */
        let response = await usecase.getSchema(req.body);

        /* If response is an instance of InternalError, return the error */
        if (response instanceof InternalError && response.statusCode) {
            res.status(response.statusCode).json(response); 
        } else if (response instanceof InternalError) {
            res.status(500).json(response);
        }

        /* Return the successful response */
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json(new InternalError(error.message, ErrorCode.INTERNAL_SERVER_ERROR, error, 500));
    }
} 

export { getSchemaTypes };