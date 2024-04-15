import { IParameter } from "../paremeters/interface";

export interface IMessageSchema {
    id: string;
    messageCode: string;
    description: string;
    parameters: IParameter[];
}