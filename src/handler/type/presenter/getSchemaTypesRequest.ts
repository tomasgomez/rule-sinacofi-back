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
    const messageCode = req.query.messageCode ?? "";

    // Set values
    const schema: IOptionalSchema = typeof messageCode === 'object' ? {} : { messageCode: messageCode.toString() };

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