/* 
    schemaUsecase interface
*/

export interface ISchemaUsecase {
    getSchema(message: any): Promise<any | null>;
    createSchema(message: any): Promise<any | null>
}
