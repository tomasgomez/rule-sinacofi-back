import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../../entities/schema/schema";
import { ISchemaUsecase } from "../usecase";



const getSchema = async(context: ISchemaUsecase, request: IRequest<IOptionalSchema, ISchemaFilter>): Promise < ISchema | InternalError > => {

    // check if request has filters and if is empty set a default value
    if (!request.filter) request.filter = { id: true, messageCode: true, description: true, name: true, createdAt: true, updatedAt: true, rules: true, parameters: true }
    
    // set filters
    const select: ISchemaFilter = request.filter;
    
    // get the schemas
    const schemasFetched = await context.repository.findSchema(request.data, select);
    
    return schemasFetched
    
};

export { getSchema };