import { IEvent } from "../../entities/event/interface";
import { IEventRepository } from "../../repository/event/interface";

/* 
    Rule interface
*/
export interface IEventUsecase {
    getEvent(event: IEvent): Promise<any | Error>
}

