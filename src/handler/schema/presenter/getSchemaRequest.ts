import express from "express";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { OptionalSchema, SchemaFilter } from "../../../entities/schema/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";


/*
    Get schema request
*/
const getSchemaRequest = (req: express.Request): IRequest<OptionalSchema, SchemaFilter> | InternalError => {

    try {    
    // get params from query parameters, if messageCode is not provided set a default value
    const messageCode = req.params.messageCode ? req.params.messageCode : undefined;
    if (!messageCode) {
        return {message: 'Error getting message code from request', code: ErrorCode.BAD_REQUEST, data: null, statusCode: 400};
    }

    // Set values
    const schema: OptionalSchema = messageCode ? { messageCode: messageCode.toString() } : {} as OptionalSchema;

    // Set Request
    const IRequest: IRequest<OptionalSchema, SchemaFilter> = {
        data: schema,
        count: 1,
        offset: 0,
        filter: undefined
    };

    return IRequest;

    } catch (error) {
        console.log('Error checking values from request', error)
        const e: InternalError = { message: 'Error creating Rule from request', code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500};
        return e;
    }
};

export { getSchemaRequest };