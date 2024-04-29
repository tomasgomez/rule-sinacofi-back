
import { IMessageUsecase } from "./usecase";

/*
    MessageUsecase class is responsible for handling the message usecases.
*/

class MessageUsecase implements IMessageUsecase {
    // constructor
    constructor() {}
    
    // create mesasge 
    // createMessage = async (message: any): Promise<any | null> => {
    //     return message;
    // }

    // // update message
    // updateMessage = async (message: any): Promise<any | null> => {
    //     return message;
    // }

    // // delete message
    // deleteMessage = async (message: any): Promise<any | null> => {
    //     return message;
    // }
}

// init type usecase
export const initMessageUsecase = (): IMessageUsecase => new MessageUsecase();