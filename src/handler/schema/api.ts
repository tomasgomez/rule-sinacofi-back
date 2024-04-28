import { Calls } from "../../entities/calls/calls";
import express from 'express';
import { ISchemaUsecase } from "../../usecases/schema/usecase";
import { ISchemaAPI } from "./interface";
import { getSchema } from "./methods/getSchema";

/*
    SchemaCalls class is responsible for handling the requests and responses for the type API.
*/

class SchemaCalls extends Calls implements ISchemaAPI {
    // constructor
    usecase: ISchemaUsecase;
    constructor(schemaUsecase: ISchemaUsecase) {
        super();
        this.usecase = schemaUsecase;
    }

    // get schema type
    GET_SCHEMA = async (req: express.Request, res: express.Response): Promise<void> => getSchema(this, req, res);

}

export const initSchemaCalls = (usecase: ISchemaUsecase): ISchemaAPI => new SchemaCalls(usecase);