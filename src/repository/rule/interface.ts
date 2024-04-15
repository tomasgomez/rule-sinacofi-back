import { MessageSchema } from "../../entities/schema/messageSchema";

export interface IRuleRepository {
  find(message: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | null > ;
}
