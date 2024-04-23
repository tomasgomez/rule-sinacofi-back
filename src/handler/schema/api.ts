import {
    Calls
} from "../../entities/calls/calls";
import express from 'express';
import {
    ISchemaUsecase
} from "../../usecases/schema/usecase";
import {
    ISchemaAPI
} from "./interface";
import {
    getSchemaTypes
} from "./methods/getSchemaTypes";

/*
    SchemaCalls class is responsible for handling the requests and responses for the type API.
*/

class SchemaCalls extends Calls implements ISchemaAPI {
    // constructor
    _usecase: ISchemaUsecase;
    constructor(schemaUsecase: ISchemaUsecase) {
        super();
        this._usecase = schemaUsecase;
    }

    GET = async (req: express.Request, res: express.Response) => getSchemaTypes(this._usecase, req, res);

    POST = async (req: express.Request, res: express.Response) => {};
}

export const initSchemaCalls = (usecase: ISchemaUsecase): ISchemaAPI => new SchemaCalls(usecase);