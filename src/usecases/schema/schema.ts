import { ISchemaRepository } from "../../repository/schema/interface";
import { ISchemaUsecase } from "./usecase";

/*
    SchemaUsecase class is responsible for handling the schema usecases.
*/

class SchemaUsecase implements ISchemaUsecase {
    // constructor
    constructor(private readonly repository: ISchemaRepository) {}
    
    // get mesasge type
    getSchema = async (message: any): Promise<any | null> => {
        return message;
    }

    // create message type
    createSchema = async (message: any): Promise<any | null> => {
        return message;
    }
}

// init schema usecase
export const initSchemaUsecase = (repository: ISchemaRepository): ISchemaUsecase => new SchemaUsecase(repository);