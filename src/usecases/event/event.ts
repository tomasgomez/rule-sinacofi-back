// interfaces
import { IEventRepository } from "../../repository/event/interface";
import { IEventUsecase } from "./usecase";
import { IEvent } from "../../entities/event/interface";

// methods
import { getEvent } from "./methods";

/*
    EventUsecase class is responsible for handling the event usecases.
*/

class EventUsecase implements IEventUsecase {
    // constructor
    constructor(private readonly repository: IEventRepository) {}

     // get event
     getEvent = async (event: IEvent): Promise<any | Error> => getEvent(this.repository, event);


    
}

// init type usecase
export const initEventUsecase = (repository: IEventRepository): IEventUsecase => new EventUsecase(repository);