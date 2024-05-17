import { Calls } from "../../entities/calls/calls";
import express from 'express';
import { ITypeUsecase } from "../../usecases/type/usecase";
import { getSchemaTypes } from "./methods/getSchemaTypes";
import { TypeAPI } from "./interface";

/*
    TypeAPI class is responsible for handling the requests and responses for the type API.
*/

class TypeCalls extends Calls implements TypeAPI {
    // constructor
    usecase: ITypeUsecase;
    constructor(typeUsecase: ITypeUsecase) {
        super();
        this.usecase = typeUsecase;
    }
    GET = async (req: express.Request, res: express.Response): Promise<void> => getSchemaTypes(this, req, res);
}

export const initTypeCalls = (usecase: ITypeUsecase): TypeAPI => new TypeCalls(usecase);