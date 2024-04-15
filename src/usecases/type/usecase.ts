import { ISchemaRepository } from "../../repository/schema/interface";
import { TypeUsecase } from "./type";

/* 
    TypeUsecase interface
*/

export interface ITypeUsecase {
    getMessageType(message: any): Promise<any | null>; 
}

// init type usecase
export const initTypeUsecase = (repository: ISchemaRepository): ITypeUsecase => new TypeUsecase(repository);