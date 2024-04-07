import {
  MessageSchema
} from "../entities/message";
export interface IRepository {
  find(message: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | null > ;
}
