

import { IRepository } from "../../repository/interface";
import { TypeUsecase } from "./type";

/* 
    TypeUsecase interface
*/

export interface ITypeUsecase {
    getMessageType(message: any): Promise<any | null>; 
}

// init type usecase
export const initTypeUsecase = (repository: IRepository): ITypeUsecase => new TypeUsecase(repository);