/* 
    schemaUsecase interface
*/
import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { IOptionalSchema, ISchema } from "../../entities/schema/schema";
import { ISchemaRepository } from "../../repository/schema/interface";


export interface ISchemaUsecase {
    repository: ISchemaRepository;

    findSchema(request: IRequest<IOptionalSchema, any>): Promise < ISchema | InternalError >;
}
