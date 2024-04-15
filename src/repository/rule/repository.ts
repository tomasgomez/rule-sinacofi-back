import { IRuleRepository } from "./interface";
import { MessageSchema } from "../../entities/schema/messageSchema";
import { PrismaWrapper } from "../prismaWrapper";

class RuleRepository implements IRuleRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (message: MessageSchema, count: string, offset: string): Promise<MessageSchema[] | null> => 
    null;
}

// init repository
export const initRuleRepository = (connection: PrismaWrapper): IRuleRepository => new RuleRepository(connection);