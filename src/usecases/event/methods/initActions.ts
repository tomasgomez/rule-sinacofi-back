import { Actions, Payload } from "../../../entities/event/action";
import { IMessageUsecase } from "../../message/usecase";

const initActions = (messageUscase: IMessageUsecase): any => {
    return {
        // CREATE_MESSAGE: async (payload: Payload) => actionFunction(messageUscase.createMessage, payload),
        // DELETE_MESSAGE: async (payload: Payload) => actionFunction(messageUscase.createMessage, payload),
        // UPDATE_MESSAGE: async (payload: Payload) => actionFunction(messageUscase.createMessage, payload),
    }
}

export { initActions };

