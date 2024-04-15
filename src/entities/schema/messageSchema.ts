import { IParameter } from "../paremeters/interface";
import { IMessageSchema } from "./interface";

export class MessageSchema implements IMessageSchema {
    id: string;
    messageCode: string;
    description: string;
    parameters: IParameter[];

    constructor(id: string, messageCode: string, description: string, parameters: IParameter[]) {
        this.id = id;
        this.messageCode = messageCode;
        this.description = description;
        this.parameters = parameters;
    }
}
