

import { IEventRepository } from "../../repository/event/interface";
import { IEventUsecase } from "./usecase";


/*
    EventUsecase class is responsible for handling the usecases.
*/

export class EventUsecase implements IEventUsecase {
    // constructor
    constructor(private readonly repository: IEventRepository) {}


    
}