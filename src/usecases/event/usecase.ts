import { IEvent } from "../../entities/event/interface";

/* 
    Rule interface
*/
export interface IEventUsecase {
    getEvent(event: IEvent): Promise<void | Error>
}

