import { RuleAPI } from "./rule/interface";
import { SchemaAPI } from "./schema/interface";
import { TypeAPI } from "./type/interface";

// Define the Handler Calls interface
export interface Handler {
    typeCalls: TypeAPI;
    schemaCalls: SchemaAPI;
    ruleCalls: RuleAPI;
}

// init handler
export const initHandler = (typeCalls: TypeAPI, schemaCalls: SchemaAPI, ruleCalls: RuleAPI): Handler => {
    return {
        typeCalls,
        schemaCalls,
        ruleCalls,
    }
}