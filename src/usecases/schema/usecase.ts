/* 
    schemaUsecase interface
*/
import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { OptionalSchema, Schema } from "../../entities/schema/interface";
import { ISchemaRepository } from "../../repository/schema/interface";


export interface ISchemaUsecase {
    repository: ISchemaRepository;

    findSchema(request: IRequest<OptionalSchema, any>): Promise < Schema | InternalError >;
}
