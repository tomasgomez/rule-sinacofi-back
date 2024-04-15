import { MessageSchema } from "../../entities/schema/messageSchema";

export interface IEventRepository {
  find(message: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | null > ;
}
