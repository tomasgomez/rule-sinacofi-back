import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../entities/schema/schema";
import { ISchemaRepository } from "../../repository/schema/interface";
import { getSchemaTypes } from "../type/methods/getSchemaTypes";
import { ISchemaUsecase } from "./usecase";

/*
    SchemaUsecase class is responsible for handling the schema usecases.
*/

class SchemaUsecase implements ISchemaUsecase {
    
    // constructor
    constructor(readonly repository: ISchemaRepository) {}
    
    // get mesasge type
    // getSchema = async (schema: MessageSchema): Promise<any | InternalError> => {
        
    //     let schemas = await this.repository.find(schema, '0', '');

    //     return schemas;
    // }

    // create message type
    createSchema = async (message: any): Promise<any | null> => {
        return message;
    }
}

// init schema usecase
export const initSchemaUsecase = (repository: ISchemaRepository): ISchemaUsecase => new SchemaUsecase(repository);