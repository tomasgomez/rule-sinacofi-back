import { IRequest, IResponse } from "../../../entities/calls/pagination/interface";
import { PaginationResponse } from "../../../entities/calls/pagination/pagination";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { OptionalSchema, Schema, SchemaFilter } from "../../../entities/schema/interface";


const getSchemaTypeResponse = (schemas: Schema[], total: number, request: IRequest<OptionalSchema, SchemaFilter>): IResponse<Schema> | InternalError => {
    try {
        // new response
        const response: IResponse<Schema> = new PaginationResponse<Schema>(schemas, total, request.count, request.offset);
        // return response
        return response;
        
    } catch (error) {
        console.log('Error creating response from schema', error)
        return { message: 'Error creating response from schema', code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500 };
    }
}

export { getSchemaTypeResponse };