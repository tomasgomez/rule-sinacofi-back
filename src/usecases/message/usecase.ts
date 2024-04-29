import { InternalError } from "../../entities/internalError";
import { IMessage } from "../../entities/message/interface";

interface IMessageUsecase {
    // validateMessage(message: any): Promise < IMessage | InternalError >;
}

export { IMessageUsecase };