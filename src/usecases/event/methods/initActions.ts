import { Actions, Action, Payload, actionFunction } from "../../../entities/event/action";
import { IMessageUsecase } from "../../message/usecase";

const initActions = (messageUscase: IMessageUsecase): Actions => {
    return {
        CREATE_MESSAGE: async (payload: Payload) => actionFunction(messageUscase.createMessage, payload),
        DELETE_MESSAGE: async (payload: Payload) => actionFunction(messageUscase.createMessage, payload),
        UPDATE_MESSAGE: async (payload: Payload) => actionFunction(messageUscase.createMessage, payload),
    }
}

export { initActions };