import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { OptionalSchema, Schema, SchemaFilter } from "../../entities/schema/interface";
import { ISchemaRepository } from "../../repository/schema/interface";
import { getSchemaTypes } from "./methods/getSchemaTypes";
import { ITypeUsecase } from "./usecase";

/*
    TypeUsecase class is responsible for handling the type usecases.
*/

class TypeUsecase implements ITypeUsecase {
    // constructor
    constructor(readonly repository: ISchemaRepository) {}
    
    // get mesasge type
    getMessageType = async (message: any): Promise<any | null> => {
        return message;
    }

    // get shcema types
    getSchemaTypes = async (request: IRequest<OptionalSchema, SchemaFilter>): Promise <{ schemas: Schema[], total: number } | InternalError > => 
        getSchemaTypes(this, request);
}

// init type usecase
export const initTypeUsecase = (repository: ISchemaRepository): ITypeUsecase => new TypeUsecase(repository);