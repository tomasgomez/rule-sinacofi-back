

import { IRequest } from "../../entities/calls/pagination/interface";
import { InternalError } from "../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../entities/schema/schema";
import { ISchemaRepository } from "../../repository/schema/interface";

/* 
    TypeUsecase interface
*/
export interface ITypeUsecase {
    repository: ISchemaRepository;

    getMessageType(message: any): Promise<any | null>;
    getSchemaTypes(request: IRequest<IOptionalSchema, ISchemaFilter>): Promise <{ schemas: ISchema[], total: number } | InternalError >;
}

