import { InternalError } from "../../entities/internalError";
import { OptionalSchema, Schema, SchemaFilter } from "../../entities/schema/interface";
import { PrismaWrapper } from "../prismaWrapper";


interface ISchemaRepository {
    repository: PrismaWrapper;
  
    // find(schema: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | InternalError >;
    
    findSchemaTypes(schema: OptionalSchema, count: number, offset: number, select: SchemaFilter): Promise <{ schemas: Schema[], total: number } | InternalError >;
    findSchema(schema: OptionalSchema, select: any): Promise < Schema | InternalError >;
}

export { ISchemaRepository }
