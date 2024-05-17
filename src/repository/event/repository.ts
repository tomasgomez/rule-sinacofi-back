import { IEventRepository } from "./interface";
import { Schema } from "../../entities/schema/interface";
import { PrismaWrapper } from "../prismaWrapper";

class EventRepository implements IEventRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (message: Schema, count: string, offset: string): Promise<Schema[] | null> => 
    null;
}

// init repository
export const initEventRepository = (connection: PrismaWrapper): IEventRepository => new EventRepository(connection);