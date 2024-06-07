import { FilledParametersRequest } from "../../entities/calls/filledSchemaRequest";
import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { OptionalSchema, Schema, SchemaFilter } from "../../entities/schema/interface";
import { ISchemaRepository } from "../../repository/schema/interface";
import { fillSchema } from "./methods/fillSchema";
import { getSchema } from "./methods/getSchema";
import { ISchemaUsecase } from "./usecase";

/*
    SchemaUsecase class is responsible for handling the schema usecases.
*/

class SchemaUsecase implements ISchemaUsecase {
    
    // constructor
    constructor(readonly repository: ISchemaRepository) {}
    
    // get mesasge type
    findSchema = async (request: IRequest<OptionalSchema, SchemaFilter>): Promise < Schema | InternalError > =>
        getSchema(this, request);
    
    // get and fillSchema
    fillSchema = async(request: IRequest<FilledParametersRequest, SchemaFilter>): Promise < Schema | InternalError > =>
        fillSchema(this, request);

}

// init schema usecase
export const initSchemaUsecase = (repository: ISchemaRepository): ISchemaUsecase => new SchemaUsecase(repository);