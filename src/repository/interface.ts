import { MessageSchema } from "../entities/schema/messageSchema";

export interface IRepository {
  find(message: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | null > ;
}
