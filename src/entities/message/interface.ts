import { MessageParameter } from "../paremeters/interface";


// Message Interface
type Message = {
    id?: string;
    messageCode: string;
    status?: any[];
    origin?: string;
    destination?: string;
    parameters: MessageParameter[];
    actions?: any;
    previousMessageCode?: string;
    statusCode?: string;
}


export { Message };