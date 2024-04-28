import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError } from "../../../entities/internalError";
import { ISchema, IOptionalSchema, ISchemaFilter } from "../../../entities/schema/schema";
import { ITypeUsecase } from "../usecase";


/* 
    Get schema types: Get all schema types from the database
    @param repository: ISchemaRepository
    @param request: IRequest
    @returns Promise<ISchema | InternalError>


*/
const getSchemaTypes = async(context: ITypeUsecase, request: IRequest<IOptionalSchema, ISchemaFilter>): Promise <{ schemas: ISchema[], total: number } | InternalError > => {

    // check if request has filters and if is empty set a default value
    if (!request.filter) request.filter = { id: true, messageCode: true, description: true, name: true, createdAt: true, updatedAt: true, rules: false, parameters: false }
    
    // set filters
    const select: ISchemaFilter = request.filter;
    
    // get the schemas
    const schemasFetched = await context.repository.findSchemaTypes(request.data, request.count, request.offset, select);
    
    return schemasFetched
    
};

export { getSchemaTypes };