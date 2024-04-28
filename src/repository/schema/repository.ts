import { ISchemaRepository } from "./interface";
import { MessageSchema } from "../../entities/schema/messageSchema";
import { PrismaWrapper } from "../prismaWrapper";
import { InternalError } from "../../entities/internalError";
import { find } from "./find";
import { findSchemaTypes } from "./methods.ts/findSchemaTypes";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../entities/schema/schema";

class SchemaRepository implements ISchemaRepository {
  repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this.repository = repository;
  }
  // find = async (schema: MessageSchema, count: string, offset: string): Promise<MessageSchema[] | InternalError> => 
  //   find(this.repository, schema, count, offset);
  
  findSchemaTypes = async (schema: IOptionalSchema, count: number, offset: number, select: ISchemaFilter): Promise <{ schemas: ISchema[], total: number } | InternalError > => 
    findSchemaTypes(this, schema, count, offset, select);

}

// init repository
export const initSchemaRepository = (connection: PrismaWrapper): ISchemaRepository => new SchemaRepository(connection);