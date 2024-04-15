import { IRepository } from "../../repository/interface";
import { SchemaUsecase } from "./schema";


/* 
    schemaUsecase interface
*/
export interface ISchemaUsecase {
    getSchema(message: any): Promise<any | null>;
    createSchema(message: any): Promise<any | null>
}

// init schema usecase
export const initSchemaUsecase = (repository: IRepository): ISchemaUsecase => new SchemaUsecase(repository);