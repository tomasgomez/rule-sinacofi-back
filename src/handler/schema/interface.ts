import express from "express";
import { DefaultCalls } from "../../entities/calls/interface";
import { ISchemaUsecase } from "../../usecases/schema/usecase";

// Define the Rule API interface

interface SchemaAPI extends DefaultCalls {
    usecase: ISchemaUsecase;

    // Retrieve the schema default value
    GET_DEFAULT_SCHEMA(req: express.Request, res: express.Response): Promise<void>;
    // Retrieve the schema with predefined values for the message code
    GET_SCHEMA(req: express.Request, res: express.Response): Promise<void>;
}

export { SchemaAPI };