import { PrismaWrapper } from "../prismaWrapper";
import { InternalError } from "../../entities/internalError";
import { findSchemaTypes } from "./methods/findSchemaTypes";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../entities/schema/schema";
import { findSchema } from "./methods/findSchema";
import { ISchemaRepository } from "./interface";

class SchemaRepository implements ISchemaRepository {
  repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this.repository = repository;
  }
  findSchemaTypes = async (schema: IOptionalSchema, count: number, offset: number, select: ISchemaFilter): Promise <{ schemas: ISchema[], total: number } | InternalError > => 
    findSchemaTypes(this, schema, count, offset, select);

  findSchema = async (schema: IOptionalSchema, select: ISchemaFilter): Promise < ISchema | InternalError > => 
    findSchema(this, schema, select);

}

// init repository
const initSchemaRepository = (connection: PrismaWrapper): ISchemaRepository => new SchemaRepository(connection);

export { initSchemaRepository }