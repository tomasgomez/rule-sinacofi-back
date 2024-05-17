import { Schema } from "../../entities/schema/interface";

export interface IEventRepository {
  find(message: Schema, count: string, offset: string): Promise < Schema[] | null > ;
}
