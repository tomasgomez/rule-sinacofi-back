import { Calls } from "../../entities/calls/calls";
import express from 'express';
import { ISchemaUsecase } from "../../usecases/schema/usecase";
import { ISchemaAPI } from "./interface";
import { InternalError } from "../../entities/internalError";
import { ErrorCode } from "../../entities/internalError";

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
    
    async GET(req: express.Request, res: express.Response) {
        try {
            console.log("Endpoint GET /schema called")
            console.log("req.body", req.body)

            console.log("usecase", this._usecase)

            let response = await this._usecase.getSchema(req.body);
    
            if (response instanceof InternalError && response.statusCode) {
                res.status(response.statusCode).json(response); // Handle error
            } else if ( response instanceof InternalError ) {
                res.status(500).json(response); // Handle error
            }
    
            res.status(200).json(response);
        } catch (error: any) {
            console.log(error);
            res.status(500).json(new InternalError(error.message, ErrorCode.INTERNAL_SERVER_ERROR, error, 500));
        }
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
