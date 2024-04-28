import express from "express";
import { ICalls } from "../../entities/calls/interface";
import { ISchemaUsecase } from "../../usecases/schema/usecase";

// Define the Rule API interface

interface ISchemaAPI extends ICalls {
    usecase: ISchemaUsecase;

    GET_SCHEMA(req: express.Request, res: express.Response): Promise<void>;
    
}

export { ISchemaAPI };