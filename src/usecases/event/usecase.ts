import { IEventRepository } from "../../repository/event/interface";
import { EventUsecase } from "./event";

/* 
    Rule interface
*/

export interface IEventUsecase {
   
}

// init type usecase
export const initEventUsecase = (repository: IEventRepository): IEventUsecase => new EventUsecase(repository);