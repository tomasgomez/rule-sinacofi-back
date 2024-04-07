import { Calls } from "../../entities/calls";
import express from 'express';
import { ICalls } from "../../interfaces/calls";

/*
    SchemaCalls class is responsible for handling the requests and responses for the type API.
*/

export class SchemaCalls extends Calls implements ICalls {
    // constructor
    _usecase: any;
    constructor(typeUsecase: any) {
        super();
        this._usecase = typeUsecase;
    }
    
    async GET(req: express.Request, res: express.Response) {
        res.status(200).json({ message: 'GET method' });
    }
}