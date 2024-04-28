import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../entities/schema/schema";
import { ISchemaRepository } from "../../repository/schema/interface";
import { getSchema } from "./methods/getSchema";
import { ISchemaUsecase } from "./usecase";

/*
    SchemaUsecase class is responsible for handling the schema usecases.
*/

class SchemaUsecase implements ISchemaUsecase {
    
    // constructor
    constructor(readonly repository: ISchemaRepository) {}
    
    // get mesasge type
    findSchema = async (request: IRequest<IOptionalSchema, ISchemaFilter>): Promise < ISchema | InternalError > =>
        getSchema(this, request); 
}

// init schema usecase
export const initSchemaUsecase = (repository: ISchemaRepository): ISchemaUsecase => new SchemaUsecase(repository);