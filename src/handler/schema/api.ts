import { Calls } from "../../entities/calls/calls";
import express from 'express';
import { ICalls } from "../../entities/calls/interface";
import { ISchemaUsecase } from "../../usecases/schema/usecase";
import { ISchemaAPI } from "./interface";

/*
    SchemaCalls class is responsible for handling the requests and responses for the type API.
*/

class SchemaCalls extends Calls implements ISchemaAPI {
    // constructor
    _usecase: ISchemaUsecase;
    constructor(typeUsecase: ISchemaUsecase) {
        super();
        this._usecase = typeUsecase;
    }
    
    async GET(req: express.Request, res: express.Response) {
        res.status(200).json({ message: 'GET method' });
    }

    async POST(req: express.Request, res: express.Response) {
        let response = await this._usecase.createSchema(req.body);

        if ( response instanceof Error ) {
            res.status(500).json({ message: response.message }); // Handle error
        }

        res.status(200).json(response);
    }
}

export const initSchemaCalls = (usecase: ISchemaUsecase): ISchemaAPI => new SchemaCalls(usecase);
