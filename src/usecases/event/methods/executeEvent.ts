import { IEvent } from "../../../entities/event/interface";


// execute event
const executeEvent = async (event: IEvent): Promise<any | Error> => {
    try {
        return event.executeEvent();
    } catch (error: any) {
        console.error('Error executing event:', error);
        return error;
    }
 }

export { executeEvent };