import { IRepository } from "../../interfaces/repository";
import ISchemaUsecase from "../../interfaces/schemaUsecase";

export class SchemaUsecase implements ISchemaUsecase {
    // constructor
    constructor(private readonly repository: IRepository) {}
    
    // get mesasge type
    getSchema = async (message: any): Promise<any | null> => {
        return message;
    }
}