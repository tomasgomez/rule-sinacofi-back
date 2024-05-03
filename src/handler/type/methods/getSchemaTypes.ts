import { Request, Response } from "express";
import { InternalError, ErrorCode } from "../../../entities/internalError";
import { getSchemaTypesRequest } from "../presenter/getSchemaTypesRequest";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { IOptionalSchema, ISchemaFilter } from "../../../entities/schema/schema";
import { ITypeAPI } from "../interface";
import { getSchemaTypeResponse } from "../presenter/getSchemaTypeResponse";

const getSchemaTypes = async (context: ITypeAPI, req: Request, res: Response): Promise<void> => {
    try {

        const requestAdapted = getSchemaTypesRequest(req);
        if (requestAdapted instanceof InternalError && requestAdapted.statusCode) {
            res.status(requestAdapted.statusCode).json(requestAdapted);
        } else if (requestAdapted instanceof InternalError) {
            res.status(500).json(requestAdapted);
            return;
        }

        /* Get schema types */
        let response = await context.usecase.getSchemaTypes(requestAdapted as IRequest<IOptionalSchema, ISchemaFilter>);

        /* If response is an instance of InternalError, return the error */
        if (response instanceof InternalError && response.statusCode) {
            res.status(response.statusCode).json(response); 
            return;
        } else if (response instanceof InternalError) {
            res.status(500).json(response);
            return;
        }

        /* handling response */
        if ('schemas' in response && 'total' in response) {
            const responseAdapted = getSchemaTypeResponse(response.schemas, response.total, requestAdapted as IRequest<IOptionalSchema, ISchemaFilter>);
            res.status(200).json(responseAdapted);
            return;
        }

       return;
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json(new InternalError(error.message, ErrorCode.INTERNAL_SERVER_ERROR, error, 500));
        return;
    }
} 

export { getSchemaTypes };