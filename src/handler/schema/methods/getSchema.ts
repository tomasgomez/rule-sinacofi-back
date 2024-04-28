import { IRequest } from "../../../entities/calls/pagination/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchemaFilter } from "../../../entities/schema/schema";
import { ISchemaAPI } from "../interface";
import { getSchemaRequest } from "../presenter/getSchemaRequest";
import { Request, Response } from "express";

/**
 * Get schema 
 * @param context 
 * @param req 
 * @param res
 */
const getSchema = async (context: ISchemaAPI, req: Request, res: Response): Promise<void> => {
    try {
        const requestAdapted = getSchemaRequest(req);
        if (requestAdapted instanceof InternalError && requestAdapted.statusCode) {
            res.status(requestAdapted.statusCode).json(requestAdapted);
        } else if (requestAdapted instanceof InternalError) {
            res.status(500).json(requestAdapted);
            return;
        }

        /* Get schema types */
        let response = await context.usecase.findSchema(requestAdapted as IRequest<IOptionalSchema, ISchemaFilter>);

        /* If response is an instance of InternalError, return the error */
        if (response instanceof InternalError && response.statusCode) {
            res.status(response.statusCode).json(response); 
            return;
        } else if (response instanceof InternalError) {
            res.status(500).json(response);
            return;
        }

        /* Return the response */
        res.status(200).json(response);

       return;
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json(new InternalError(error.message, ErrorCode.INTERNAL_SERVER_ERROR, error, 500));
        return;
    }
} 

export { getSchema };