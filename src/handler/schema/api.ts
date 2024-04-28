import { Calls } from "../../entities/calls/calls";
import express from 'express';
import { ISchemaUsecase } from "../../usecases/schema/usecase";
import { ISchemaAPI } from "./interface";
import { getSchemaTypes } from "../type/methods/getSchemaTypes";

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
}

export const initSchemaCalls = (usecase: ISchemaUsecase): ISchemaAPI => new SchemaCalls(usecase);