import { SchemaCalls } from "./schema/api";
import { ITypeUsecase } from "../usecases/type/usecase";
import { ISchemaUsecase } from "../usecases/schema/usecase";
import { ICalls } from "../entities/calls/interface";
import { TypeCalls } from "./type/api";

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