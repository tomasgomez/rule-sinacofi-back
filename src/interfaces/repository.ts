import {
  MessageSchema
} from "../entities/messageSchema";
export interface IRepository {
  find(message: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | null > ;
}
