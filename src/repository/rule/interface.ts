import { Schema } from "../../entities/schema/interface";

export interface IRuleRepository {
  find(message: Schema, count: string, offset: string): Promise < Schema[] | null > ;
}
