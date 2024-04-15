import { ISchemaUsecase } from "./schema/usecase";
import { ITypeUsecase } from "./type/usecase";

// Define the Usecase interface
export interface Usecase  {
    typeUsecase: ITypeUsecase;
    schemaUsecase: ISchemaUsecase; //
}

// init usecase
export const initUsecase = (typeUsecase: ITypeUsecase, schemaUsecase: ISchemaUsecase): Usecase => {
    return {
        typeUsecase: typeUsecase,
        schemaUsecase: schemaUsecase
    }
}