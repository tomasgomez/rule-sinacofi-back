import { IRepository } from "../../interfaces/repository";
import ITypeUsecase from "../../interfaces/typeUsecase";

/*
    TypeUsecase class is responsible for handling the usecases.
*/

export class TypeUsecase implements ITypeUsecase {
    // constructor
    constructor(private readonly repository: IRepository) {}
    
    // get mesasge type
    getMessageType = async (message: any): Promise<any | null> => {
        return message;
    }
}