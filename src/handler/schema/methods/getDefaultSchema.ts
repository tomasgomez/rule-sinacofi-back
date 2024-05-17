import { IRequest } from "../../../entities/calls/pagination/interface";
import { ErrorCode, InternalError, isInternalError } from "../../../entities/internalError";
import { OptionalSchema, SchemaFilter } from "../../../entities/schema/interface";
import { SchemaAPI } from "../interface";
import { getSchemaRequest } from "../presenter/getSchemaRequest";
import { Request, Response } from "express";

/**
 * Get schema 
 * @param context 
 * @param req 
 * @param res
 */
const getDefaultSchema = async (context: SchemaAPI, req: Request, res: Response): Promise<void> => {
    try {
        const requestAdapted = getSchemaRequest(req);
        if (isInternalError(requestAdapted)) {
            res.status(requestAdapted.statusCode?? 500).json(requestAdapted);
            return;
        }

        /* Get schema types */
        let response = await context.usecase.findSchema(requestAdapted as IRequest<OptionalSchema, SchemaFilter>);

        /* If response is an instance of InternalError, return the error */
        if (isInternalError(response)) {
            res.status(response.statusCode?? 500).json(response);
            return;
        }

        /* Return the response */
        res.status(200).json(response);

       return;
        
    } catch (error) {
        /* Return the error */
        const e: InternalError = { message: "Error getting schema", statusCode: 500, code: ErrorCode.INTERNAL_SERVER_ERROR, data: null};
        res.status(500).json(e);
        return;
    }
} 

export { getDefaultSchema };