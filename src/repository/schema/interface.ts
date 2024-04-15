import { MessageSchema } from "../../entities/schema/messageSchema";

export interface ISchemaRepository {
  find(message: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | null > ;
}
