import { IParameter } from "../paremeters/interface";
import { IMessageSchema } from "./interface";

export class MessageSchema implements IMessageSchema {
   
    constructor(
        public id: string,
        public messageCode: string,
        public description: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public parameters?: IParameter[]
    ) {}
}
