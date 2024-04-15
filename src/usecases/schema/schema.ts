import { IRepository } from "../../repository/interface";
import { ISchemaUsecase } from "./usecase";

export class SchemaUsecase implements ISchemaUsecase {
    // constructor
    constructor(private readonly repository: IRepository) {}
    
    // get mesasge type
    getSchema = async (message: any): Promise<any | null> => {
        return message;
    }

    // create message type
    createSchema = async (message: any): Promise<any | null> => {
        return message;
    }
}