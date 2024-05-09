

import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { OptionalSchema, Schema, SchemaFilter } from "../../entities/schema/interface";
import { ISchemaRepository } from "../../repository/schema/interface";

/* 
    TypeUsecase interface
*/
export interface ITypeUsecase {
    repository: ISchemaRepository;

    getMessageType(message: any): Promise<any | null>;
    getSchemaTypes(request: IRequest<OptionalSchema, SchemaFilter>): Promise <{ schemas: Schema[], total: number } | InternalError >;
}

