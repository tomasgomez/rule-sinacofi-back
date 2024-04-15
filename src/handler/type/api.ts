import { Calls } from "../../entities/calls/calls";
import express from 'express';
import { ICalls } from "../../entities/calls/interface";
import { ITypeUsecase } from "../../usecases/type/usecase";

/*
    TypeAPI class is responsible for handling the requests and responses for the type API.
*/

export class TypeCalls extends Calls implements ICalls {
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

export const initTypeCalls = (usecase: ITypeUsecase): ICalls => new TypeCalls(usecase);