import { Calls } from "../../entities/calls/calls";
import express from 'express';
import { ISchemaUsecase } from "../../usecases/schema/usecase";
import { SchemaAPI } from "./interface";
import { findSchema } from "./methods/findSchema";

/*
    SchemaCalls class is responsible for handling the requests and responses for the type API.
*/

class SchemaCalls extends Calls implements SchemaAPI {
    // constructor
    usecase: ISchemaUsecase;
    constructor(schemaUsecase: ISchemaUsecase) {
        super();
        this.usecase = schemaUsecase;
    }

    // Get default schema value
    GET_DEFAULT_SCHEMA = async (req: express.Request, res: express.Response): Promise<void> => findSchema(this, req, res);
    // Get Schema 
    GET_SCHEMA = async (req: express.Request, res: express.Response): Promise<void> => findSchema(this, req, res);

}

export const initSchemaCalls = (usecase: ISchemaUsecase): SchemaAPI => new SchemaCalls(usecase);