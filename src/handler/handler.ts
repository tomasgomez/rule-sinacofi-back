import { Schema } from "@prisma/client";
import { TypeCalls } from "./type/api";
import { SchemaCalls } from "./schema/api";
import { Usecase } from "../usecases/usecases";

// Define the Handler Calls interface
export interface Handler {
    typeCalls: TypeCalls;
    schemaCalls: SchemaCalls;
}

// init handler
export const initHandler = (usecases: Usecase): Handler => {
    return {
        typeCalls: new TypeCalls(usecases.typeUsecase),
        schemaCalls: new SchemaCalls(usecases.schemaUsecase)
    }
}