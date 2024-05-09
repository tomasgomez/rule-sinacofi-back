import { IRuleRepository } from "./interface";
import { Schema } from "../../entities/schema/interface";
import { PrismaWrapper } from "../prismaWrapper";

class RuleRepository implements IRuleRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (message: Schema, count: string, offset: string): Promise<Schema[] | null> => null;
}

// init repository
export const initRuleRepository = (connection: PrismaWrapper): IRuleRepository => new RuleRepository(connection);