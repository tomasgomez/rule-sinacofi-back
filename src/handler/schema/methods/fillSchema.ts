import { Request, Response } from "express";
import { SchemaAPI } from "../interface";
import { ErrorCode, InternalError, isInternalError } from "../../../entities/internalError";
import { fillSchemaRequest } from "../presenter/fillSchemaRequest";
import { FilledParametersRequest } from "../../../entities/calls/filledSchemaRequest";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { SchemaFilter } from "../../../entities/schema/interface";



const fillSchema = async (context: SchemaAPI, req: Request, res: Response): Promise<void> => {
    try{

        // adapt request
        const requestAdapted = fillSchemaRequest(req);
        if (isInternalError(requestAdapted)) {
            res.status(requestAdapted.statusCode?? 500).json(requestAdapted);
            return;
        }
    
        /* Get schema types */
        let response = await context.usecase.fillSchema(requestAdapted as IRequest<FilledParametersRequest, SchemaFilter>);

        /* If response is an instance of InternalError, return the error */
        if (isInternalError(response)) {
            res.status(response.statusCode?? 500).json(response);
            return;
        }

        /* Return the response */
        res.status(200).json(response);

        return;
    }catch(error){
        /* Return the error */
        const e: InternalError = { message: "Error getting schema", statusCode: 500, code: ErrorCode.INTERNAL_SERVER_ERROR, data: null};
        res.status(500).json(e)
        return;
    }
}

export { fillSchema }