import { MessageRepository } from '../../interfaces/messageRepository';

import {
  PrismaClientWrapper
} from './client/prismaWrapper';

import { MessageSchema } from '../../entities/message';

export class PrismaMessageAdapter implements MessageRepository {
  async find(message: MessageSchema, count:string, offset: string): Promise<MessageSchema[] | null> {
    try {
      let messagesSchemas: MessageSchema[] = [];

      const prisma = new PrismaClientWrapper();

      const prismaClient = prisma.getClient();

      /* Desctructure the attributes from Message entity */
      const {
        id,
        messageCode,
      } = message;

      /* Initialize the where object with the possible attributes to search with */
      const where: {
        id?: number;
        messageCode?: string;
      } = {};

      /* If the attributes are present, add them to the where object */
      // if (id) where.id = id;
      // if (messageCode) where.messageCode = messageCode;

      // /* If count is not present then find all message */
      // if (count === '0' || count === '') {
      //   messages = await prismaClient.message.findMany({
      //     where
      //   });
      // } else {
      //   messages = await prismaClient.message.findMany({
      //     where,
      //     take: parseInt(count),
      //     skip: parseInt(offset)
      //   });
      // }

      // /* If the messages is not found, return an error */
      // if (messages.length === 0) {
      //   return null;
      // }

      return messagesSchemas;

    } catch (error) {

      //TODO: Handle errors appropriately
      console.error('Error fetching message:', error);
      return null;
    }
  }
}
