/* 
    schemaUsecase interface
*/
import { ISchemaRepository } from "../../repository/schema/interface";

export interface ISchemaUsecase {
    repository: ISchemaRepository;

    // getSchema(message: any): Promise<any | null>;
    createSchema(message: any): Promise<any | null>
}
