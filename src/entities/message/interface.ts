import { MessageParameter } from "../paremeters/interface";


// Message Interface
type Message = {
    id?: string;
    messageCode: string;
    status?: string;
    destination?: string;
    parameters: MessageParameter[];

}


export { Message };