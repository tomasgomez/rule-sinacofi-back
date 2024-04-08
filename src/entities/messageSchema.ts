
export class MessageSchema {
    id: string;
    messageCode: string;
    description: string;
    parameters: Parameter[];

    constructor(id: string, messageCode: string, description: string, parameters: Parameter[]) {
        this.id = id;
        this.messageCode = messageCode;
        this.description = description;
        this.parameters = parameters;
    }
}