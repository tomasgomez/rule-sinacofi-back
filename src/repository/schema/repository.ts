import { ISchemaRepository } from "./interface";
import { MessageSchema } from "../../entities/schema/messageSchema";
import { PrismaWrapper } from "../prismaWrapper";

class SchemaRepository implements ISchemaRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (message: MessageSchema, count: string, offset: string): Promise<MessageSchema[] | null> => 
    null;
}

// init repository
export const initSchemaRepository = (connection: PrismaWrapper): ISchemaRepository => new SchemaRepository(connection);