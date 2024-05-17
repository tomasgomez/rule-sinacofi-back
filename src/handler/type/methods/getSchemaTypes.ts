import { Request, Response } from "express";
import { InternalError, ErrorCode, isInternalError } from "../../../entities/internalError";
import { getSchemaTypesRequest } from "../presenter/getSchemaTypesRequest";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { OptionalSchema, SchemaFilter } from "../../../entities/schema/interface";
import { TypeAPI } from "../interface";
import { getSchemaTypeResponse } from "../presenter/getSchemaTypeResponse";

const getSchemaTypes = async (context: TypeAPI, req: Request, res: Response): Promise<void> => {
    try {

        const requestAdapted = getSchemaTypesRequest(req);
        if (isInternalError(requestAdapted)) {
            res.status(requestAdapted.statusCode?? 500).json(requestAdapted);
            return;
        }

        /* Get schema types */
        let response = await context.usecase.getSchemaTypes(requestAdapted as IRequest<OptionalSchema, SchemaFilter>);

        /* If response is an instance of InternalError, return the error */
        if (isInternalError(response)) {
            res.status(response.statusCode?? 500).json(requestAdapted);
            return;
        }

        /* handling response */
        if ('schemas' in response && 'total' in response) {
            const responseAdapted = getSchemaTypeResponse(response.schemas, response.total, requestAdapted as IRequest<OptionalSchema, SchemaFilter>);
            res.status(200).json(responseAdapted);
            return;
        }

       return;
        
    } catch (error) {
        console.log(error);
        const e: InternalError = { message: "Error getting schema types", statusCode: 500, code: ErrorCode.INTERNAL_SERVER_ERROR, data: null};
        res.status(500).json(e);
        return;
    }
} 

export { getSchemaTypes };