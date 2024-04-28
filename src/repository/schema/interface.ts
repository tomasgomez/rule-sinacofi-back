import { InternalError } from "../../entities/internalError";
import { ISchema, IOptionalSchema, ISchemaFilter } from "../../entities/schema/schema";
import { PrismaWrapper } from "../prismaWrapper";

export interface ISchemaRepository {
  repository: PrismaWrapper;

  // find(schema: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | InternalError >;
  
  findSchemaTypes(schema: IOptionalSchema, count: number, offset: number, select: ISchemaFilter): Promise <{ schemas: ISchema[], total: number } | InternalError >;
  findSchema(schema: IOptionalSchema, select: any): Promise < ISchema | InternalError >;
}
