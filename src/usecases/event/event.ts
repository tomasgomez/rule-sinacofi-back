

import { IEventRepository } from "../../repository/event/interface";
import { IEventUsecase } from "./usecase";


/*
    EventUsecase class is responsible for handling the usecases.
*/

class EventUsecase implements IEventUsecase {
    // constructor
    constructor(private readonly repository: IEventRepository) {}


    
}

// init type usecase
export const initEventUsecase = (repository: IEventRepository): IEventUsecase => new EventUsecase(repository);