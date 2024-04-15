import { ISchemaRepository } from "../../repository/schema/interface";
import { SchemaUsecase } from "./schema";

/* 
    schemaUsecase interface
*/

export interface ISchemaUsecase {
    getSchema(message: any): Promise<any | null>;
    createSchema(message: any): Promise<any | null>
}

// init schema usecase
export const initSchemaUsecase = (repository: ISchemaRepository): ISchemaUsecase => new SchemaUsecase(repository);