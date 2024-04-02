import { MessageRepository } from '../../interfaces/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../adapters/prisma/message';
import { MessageSchema } from '../../entities/message';

export class GetMessage {
    constructor(private readonly messageRepository: MessageRepository) {} 
  
    async execute(messageSchema: MessageSchema): Promise<MessageSchema[] | null> {
      try {
        const message = await this.messageRepository.find(messageSchema, '0', '0');
        return message;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return null;
      }
    }
  }


const messageRepository: MessageRepository = new PrismaAdapter();
const getMessageUseCase = new GetMessage(messageRepository); // Add it on the api layer