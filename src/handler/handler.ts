import { ICalls } from "../entities/calls/interface";
import { IRuleAPI } from "./rule/interface";
import { ISchemaAPI } from "./schema/interface";
import { ITypeAPI } from "./type/interface";

// Define the Handler Calls interface
export interface Handler {
    typeCalls: ITypeAPI;
    schemaCalls: ISchemaAPI;
    ruleCalls: IRuleAPI;
}

// init handler
export const initHandler = (typeCalls: ITypeAPI, schemaCalls: ISchemaAPI, ruleCalls: IRuleAPI): Handler => {
    return {
        typeCalls,
        schemaCalls,
        ruleCalls,
    }
}