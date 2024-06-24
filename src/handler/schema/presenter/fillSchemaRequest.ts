import express from "express";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { OptionalSchema, SchemaFilter } from "../../../entities/schema/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { User } from "../../../entities/user/interface";
import { MessageParameter } from "../../../entities/paremeters/interface";
import { FilledParametersRequest } from "../../../entities/calls/filledSchemaRequest";
import { Action } from "../../../entities/actions/interface";


/*
    Fill Schema request
*/

const fillSchemaRequest = (req: express.Request): IRequest<FilledParametersRequest, SchemaFilter> | InternalError => {
    try {    
        // get params from query parameters, if messageCode is not provided set a default value
        const messageCode = req.params.messageCode ? req.params.messageCode : undefined;
        if (!messageCode) {
            console.log("message code")
            return {message: 'Error getting message code from request', code: ErrorCode.BAD_REQUEST, data: null, statusCode: 400};
        }

        // Set values
        const schema: OptionalSchema = messageCode ? { messageCode: messageCode.toString() } : {} as OptionalSchema;

        /* Check body */
        let { user, parameters, actions } = req.body;


        if(!user) {
            console.log("user empty");
            return {message: 'Error getting user', code: ErrorCode.BAD_REQUEST, data: null, statusCode: 400};
        }

        if (!parameters) {
            console.log("parameters empty")
            return {message: 'Error getting paramters', code: ErrorCode.BAD_REQUEST, data: null, statusCode: 400};
        }
        
        // casting user and parameters
        user = user as User
        parameters = parameters as MessageParameter[]

        if (Array.isArray(parameters)){
        // create params
        const params: MessageParameter[] = parameters.reduce((acc: MessageParameter[], parameter: unknown) => {
            if (typeof parameter === 'object' && parameter !== null) {
                const castedParameter = parameter as MessageParameter;
                if (castedParameter.name && castedParameter.messageCode && castedParameter.value) {
                    acc.push(castedParameter);
                }
            }
            return acc;
        }, []);

        const actionsCasted = actions as string[]
        console.log(actionsCasted);
        let allowedActions = actionsCasted.map((d) => {
            const act: Partial<Action> = {
                name: d
            }
            return act
        })
        
        // set parameters
        schema.parameters = params;
        schema.allowedActions = allowedActions;
    }

    // set request
    const data: FilledParametersRequest = { user, schema }


    // Set Request
    const request: IRequest<FilledParametersRequest, SchemaFilter> = {
        data: data,
        count: 1,
        offset: 0,
        filter: undefined
    };

    return request;

    } catch (error) {
        console.log('Error checking values from request', error)
        const e: InternalError = { message: 'Error creating Rule from request', code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500};
        return e;
    }
};

export { fillSchemaRequest };