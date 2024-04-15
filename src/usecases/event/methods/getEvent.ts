import { IEvent } from "../../../entities/event/interface";
import { IEventRepository } from "../../../repository/event/interface";

/*
    getEvent method is responsible for getting the event by id.
    @param repository: IEventRepository

*/
export async function getEvent(repository: IEventRepository, event: IEvent): Promise<IEvent | Error> {
    try {
    //   return repository.find(message, "0", "0")
        return event;
      
    } catch (error:  any) {
      console.error('Error updating message:', error);
      return error;
    }
  }
  