import { ISchemaRepository } from "./interface";
import { MessageSchema } from "../../entities/schema/messageSchema";
import { PrismaWrapper } from "../prismaWrapper";
import { InternalError } from "../../entities/internalError";
import { find } from "./find";

class SchemaRepository implements ISchemaRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (schema: MessageSchema, count: string, offset: string): Promise<MessageSchema[] | InternalError> => 
    find(this._repository, schema, count, offset);

}

// init repository
export const initSchemaRepository = (connection: PrismaWrapper): ISchemaRepository => new SchemaRepository(connection);