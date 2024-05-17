import { Parameter } from "../paremeters/interface";


// Message Interface
type Message = {
    id?: string;
    messageCode: string;
    status?: string;
    parameters: MessageParameter[];

}

// Parameter Interface 
type MessageParameter = Pick<Parameter, "name" | "defaultValue" | "type" | "rules" > & { value: string };


export { Message, MessageParameter };