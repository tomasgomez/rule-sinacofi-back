import { IRepository } from './interface';
import { MessageSchema } from '../entities/schema/messageSchema';
import { PrismaWrapper } from './prismaWrapper';

export class Repository implements IRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (message: MessageSchema, count: string, offset: string): Promise<MessageSchema[] | null> => 
    null;
}
