import { ISchemaRepository } from "../../repository/schema/interface";
import { ITypeUsecase } from "./usecase";

/*
    TypeUsecase class is responsible for handling the usecases.
*/

export class TypeUsecase implements ITypeUsecase {
    // constructor
    constructor(private readonly repository: ISchemaRepository) {}
    
    // get mesasge type
    getMessageType = async (message: any): Promise<any | null> => {
        return message;
    }
}