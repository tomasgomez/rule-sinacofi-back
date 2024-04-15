import { IEventRepository } from "./interface";
import { MessageSchema } from "../../entities/schema/messageSchema";
import { PrismaWrapper } from "../prismaWrapper";

class EventRepository implements IEventRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (message: MessageSchema, count: string, offset: string): Promise<MessageSchema[] | null> => 
    null;
}

// init repository
export const initEventRepository = (connection: PrismaWrapper): IEventRepository => new EventRepository(connection);