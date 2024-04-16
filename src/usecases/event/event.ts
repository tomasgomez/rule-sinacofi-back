// interfaces
import { IEventRepository } from "../../repository/event/interface";
import { IEventUsecase } from "./usecase";
import { IEvent } from "../../entities/event/interface";

// methods
import { getEvent } from "./methods";
import { IMessageUsecase } from "../message/usecase";
import { Actions } from "../../entities/event/action";
import { initActions } from "./methods/initActions";

/*
    EventUsecase class is responsible for handling the event usecases.
*/

class EventUsecase implements IEventUsecase {
    _actions: Actions;
    // constructor
    constructor(private readonly repository: IEventRepository, private messageUsecases: IMessageUsecase) {
        this._actions = initActions(this.messageUsecases);
    }

    // get event
    getEvent = async (event: IEvent): Promise<any | Error> => getEvent(this.repository, event);

    // execute event
    executeEvent = async (event: IEvent): Promise<any | Error> => {
        try {
            return event.executeEvent();
        } catch (error: any) {
            console.error('Error executing event:', error);
            return error;
        }
    }

    
}

// init type usecase
export const initEventUsecase = (repository: IEventRepository,  messageUsecases: IMessageUsecase): IEventUsecase => new EventUsecase(repository, messageUsecases);