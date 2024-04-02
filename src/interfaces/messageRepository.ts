import {
  MessageSchema
} from "../entities/message";
export interface MessageRepository {
  find(message: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | null > ;
}
