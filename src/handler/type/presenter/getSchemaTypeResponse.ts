import { IRequest, IResponse } from "../../../entities/calls/pagination/interface";
import { PaginationResponse } from "../../../entities/calls/pagination/pagination";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../../entities/schema/schema";


const getSchemaTypeResponse = (schemas: ISchema[], total: number, request: IRequest<IOptionalSchema, ISchemaFilter>): IResponse<ISchema> | InternalError => {
    try {
        // new response
        const response: IResponse<ISchema> = new PaginationResponse<ISchema>(schemas, total, request.count, request.offset);
        // return response
        return response;
        
    } catch (error) {
        console.log('Error creating response from schema', error)
        return new InternalError('Error creating response from schema', ErrorCode.INTERNAL_SERVER_ERROR, error);
    }
}

export { getSchemaTypeResponse };