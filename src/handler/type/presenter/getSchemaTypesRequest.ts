import express from "express";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchemaFilter } from "../../../entities/schema/schema";

// Get schema types request

const getSchemaTypesRequest = (req: express.Request): IRequest<IOptionalSchema, ISchemaFilter> | InternalError => {

    try {    
    // get params from query parameters, if count is not provided set a default value
    const count = req.query.count ? Number(req.query.count) : 10;

    // get params from query parameters, if offset is not provided set a default value
    const offset = req.query.offset ? Number(req.query.offset) : 0;

    // get params from query parameters, if messageCode is not provided set a default value
    const messageCode = req.query.messageCode ? req.query.messageCode : undefined;

    // get params from query fields, if parameters is not provided set a default value
    const parameters = req.query.fields ? req.query.fields : undefined;

    // Set values
    const schema: IOptionalSchema = messageCode ? { messageCode: messageCode.toString() } : {} as IOptionalSchema;

    // Set Request
    const IRequest: IRequest<IOptionalSchema, ISchemaFilter> = {
        data: schema,
        count: count,
        offset: offset,
        filter: undefined
    };

    return IRequest;

    } catch (error) {
        console.log('Error checking values from request', error)
        return new InternalError('Error creating Rule from request', ErrorCode.INTERNAL_SERVER_ERROR, null ,500);
    }
};

export { getSchemaTypesRequest };