import { Request, Response } from "express";
import { InternalError } from "../../../entities/internalError";
import { ErrorCode } from "../../../entities/internalError";
import { getSchemaTypesRequest } from "../presenter/getSchemaTypesRequest";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../../entities/schema/schema";
import { ITypeAPI } from "../interface";
import { getSchemaTypeResponse } from "../presenter/getSchemaTypeResponse";

const getSchemaTypes = async (context: ITypeAPI, req: Request, res: Response) => {
    try {

        const requestAdapted = getSchemaTypesRequest(req);
        if (requestAdapted instanceof InternalError && requestAdapted.statusCode) {
            res.status(requestAdapted.statusCode).json(requestAdapted);
        } else if (requestAdapted instanceof InternalError) {
            res.status(500).json(requestAdapted);
        }

        /* Get schema types */
        let response = await context.usecase.getSchemaTypes(requestAdapted as IRequest<IOptionalSchema, ISchemaFilter>);

        /* If response is an instance of InternalError, return the error */
        if (response instanceof InternalError && response.statusCode) {
            res.status(response.statusCode).json(response); 
        } else if (response instanceof InternalError) {
            res.status(500).json(response);
        }

        /* handling response */
        if ('schemas' in response && 'total' in response) {
            const responseAdapted = getSchemaTypeResponse(response.schemas as ISchema[], response.total, requestAdapted as IRequest<IOptionalSchema, ISchemaFilter>);
            res.status(200).json(responseAdapted);
        }

        /* If response is not an instance of InternalError, return the response */
        res.status(500).json(new InternalError("", ErrorCode.INTERNAL_SERVER_ERROR, "", 500));
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json(new InternalError(error.message, ErrorCode.INTERNAL_SERVER_ERROR, error, 500));
    }
} 

export { getSchemaTypes };