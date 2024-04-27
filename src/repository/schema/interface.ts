import { InternalError } from "../../entities/internalError";
import { MessageSchema } from "../../entities/schema/messageSchema";

export interface ISchemaRepository {
  find(schema: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | InternalError > ;
  findSchemaTypes(): Promise < MessageSchema[] | InternalError > ;
  findSchemaDetails(messageCode: string): Promise < MessageSchema | InternalError > ;
}
