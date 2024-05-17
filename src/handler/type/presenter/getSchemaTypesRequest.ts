import express from "express";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { OptionalSchema, SchemaFilter } from "../../../entities/schema/interface";

// Get schema types request

const getSchemaTypesRequest = (req: express.Request): IRequest<OptionalSchema, SchemaFilter> | InternalError => {

    try {    
    // get params from query parameters, if count is not provided set a default value
    const count = req.query.count ? Number(req.query.count) : 10;

    // get params from query parameters, if offset is not provided set a default value
    const offset = req.query.offset ? Number(req.query.offset) : 0;

    // get params from query parameters, if messageCode is not provided set a default value
    const messageCode = req.query.messageCode ?? "";

    // Set values
    const schema: OptionalSchema = typeof messageCode === 'object' ? {} : { messageCode: messageCode.toString() };

    // Set Request
    const IRequest: IRequest<OptionalSchema, SchemaFilter> = {
        data: schema,
        count: count,
        offset: offset,
        filter: undefined
    };

    return IRequest;

    } catch (error) {
        console.log('Error checking values from request', error)
        return { message: 'Error checking values from request', code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500 };
    }
};

export { getSchemaTypesRequest };