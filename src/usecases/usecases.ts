import { IRepository } from "../interfaces/repository";
import { SchemaUsecase } from "./schema/schema";
import { TypeUsecase } from "./type/type";

// Define the Usecase interface
export interface Usecase  {
    typeUsecase: TypeUsecase;
    schemaUsecase: SchemaUsecase; //
}

// init usecase
export const initUsecase = (repository: IRepository): Usecase => {
    return {
        typeUsecase: new TypeUsecase(repository),
        schemaUsecase: new SchemaUsecase(repository)
    }
}