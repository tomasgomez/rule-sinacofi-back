import { PrismaWrapper } from "../prismaWrapper";
import { InternalError } from "../../entities/internalError";
import { findSchemaTypes } from "./methods/findSchemaTypes";
import { OptionalSchema, Schema, SchemaFilter } from "../../entities/schema/interface";
import { findSchema } from "./methods/findSchema";
import { ISchemaRepository } from "./interface";

class SchemaRepository implements ISchemaRepository {
  repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this.repository = repository;
  }
  findSchemaTypes = async (schema: OptionalSchema, count: number, offset: number, select: SchemaFilter): Promise <{ schemas: Schema[], total: number } | InternalError > => 
    findSchemaTypes(this, schema, count, offset, select);

  findSchema = async (schema: OptionalSchema, select: SchemaFilter): Promise < Schema | InternalError > => 
    findSchema(this, schema, select);

}

// init repository
const initSchemaRepository = (connection: PrismaWrapper): ISchemaRepository => new SchemaRepository(connection);

export { initSchemaRepository }