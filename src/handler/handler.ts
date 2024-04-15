import { ICalls } from "../entities/calls/interface";

// Define the Handler Calls interface
export interface Handler {
    typeCalls: ICalls;
    schemaCalls: ICalls;
}

// init handler
export const initHandler = (typeCalls: ICalls, schemaCalls: ICalls): Handler => {
    return {
        typeCalls: typeCalls,
        schemaCalls: schemaCalls
    }
}