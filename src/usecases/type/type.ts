import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../entities/schema/schema";
import { ISchemaRepository } from "../../repository/schema/entities/repository";
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
    getSchemaTypes = async (request: IRequest<IOptionalSchema, ISchemaFilter>): Promise <{ schemas: ISchema[], total: number } | InternalError > => 
        getSchemaTypes(this, request);
}

// init type usecase
export const initTypeUsecase = (repository: ISchemaRepository): ITypeUsecase => new TypeUsecase(repository);