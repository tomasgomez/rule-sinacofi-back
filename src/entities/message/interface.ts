import { Prisma } from "@prisma/client";
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

// export interface IMessage {
//     id?: string;
//     TSN ? : number | null;
//     OSN ? : number | null;
//     NSE ? : number | null;
//     LSN ? : number | null;
//     NSR ? : number | null;
//     messageCode?: string | null;
//     description?: string | null;
//     priority?: string | null;
//     status?: string | null;
//     sender?: string | null;
//     creationDate?: string | null;
//     creationTime?: string | null;
//     receiver?: string | null;
//     receivedDate?: string | null;
//     receivedTime?: string | null;
//     cukCode ? : string | null;
//     actions?: any;
//     documents?: any;
//     parameters?: any;
// }

export { Message, MessageParameter };