import { IParameter } from "../paremeters/interface";

export interface IMessageSchema {
    id: string;
    messageCode: string;
    description: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    parameters?: IParameter[];
}

