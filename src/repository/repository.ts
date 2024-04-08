import { IRepository } from '../interfaces/repository';
import { MessageSchema } from '../entities/messageSchema';
import { PrismaWrapper } from './prismaWrapper';

export class Repository implements IRepository {
  _repository: PrismaWrapper;
  constructor(repository: PrismaWrapper){
    this._repository = repository;
  }
  find = async (message: MessageSchema, count: string, offset: string): Promise<MessageSchema[] | null> => 
    null;
}
