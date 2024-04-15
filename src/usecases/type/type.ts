import { IRepository } from "../../repository/interface";
import { ITypeUsecase } from "./usecase";

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