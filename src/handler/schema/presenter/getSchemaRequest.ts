import express from "express";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { IOptionalSchema, ISchemaFilter } from "../../../entities/schema/schema";
import { ErrorCode, InternalError } from "../../../entities/internalError";


/*
    Get schema request
*/
const getSchemaRequest = (req: express.Request): IRequest<IOptionalSchema, ISchemaFilter> | InternalError => {

    try {    

    // get params from query parameters, if messageCode is not provided set a default value
    const messageCode = req.params.messageCode ? req.params.messageCode : undefined;
    if (!messageCode) {
        return new InternalError('Error getting message code from request', ErrorCode.BAD_REQUEST, null, 400);
    }

    // Set values
    const schema: IOptionalSchema = messageCode ? { messageCode: messageCode.toString() } : {} as IOptionalSchema;

    // Set Request
    const IRequest: IRequest<IOptionalSchema, ISchemaFilter> = {
        data: schema,
        count: 1,
        offset: 0,
        filter: undefined
    };

    return IRequest;

    } catch (error) {
        console.log('Error checking values from request', error)
        return new InternalError('Error creating Rule from request', ErrorCode.INTERNAL_SERVER_ERROR, null ,500);
    }
};

export { getSchemaRequest };