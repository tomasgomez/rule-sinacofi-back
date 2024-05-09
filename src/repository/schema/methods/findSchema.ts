import { Prisma } from "@prisma/client";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { OptionalSchema, Schema } from "../../../entities/schema/interface";
import { ISchemaRepository } from "../interface";
import { ISchemaArgs, ISchemaResponse, ISchemaSelect } from "../entities/schema";
import { IParameterResponse } from "../entities/parameter";
import { parameterToEntity } from "../adapters/parameterToEntity";

const findSchema = async(context: ISchemaRepository, schema: OptionalSchema, select: ISchemaSelect): Promise < Schema | InternalError >  => {
    
    try { 
        const client = context.repository.getClient();
        
        /* Initialize the where object with the possible attributes to search with if schema is empty return all schemas */
        const where: Prisma.SchemaWhereUniqueInput = { messageCode: schema.messageCode }
        
        const query: ISchemaArgs <Prisma.SchemaFindUniqueArgs>= { where, select };
        const schemaFetched: ISchemaResponse<Prisma.SchemaFindUniqueArgs> | null = await client.schema.findUnique(query);

        /* If the schema is not found, return an error */
        if (!schemaFetched) {
            console.error('Message not found');
            return { message: 'Message not found', code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 };
        }
        
        const { id, messageCode, description, name, parameters } = schemaFetched;

        // check values
        if (!id || !messageCode || !description || !name || !parameters) {
            console.error('Message not found');
            return { message: 'Message not found', code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 };
        }

        // check type of values
        if (typeof id !== 'string' || typeof messageCode !== 'string' || typeof description !== 'string' || typeof name !== 'string' || !Array.isArray(parameters)) {
            console.error('Message not found');
            return { message: 'Message not found', code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 };
        }

        // check if parameters is empty
        if (parameters.length === 0) {
            console.error('Message not found');
            return { message: 'Message not found', code: ErrorCode.NOT_FOUND, data: null, statusCode: 404 };
        }

        // cast parameters to IParameterResponse and check if all values are present
        const parametersCasted = parameters as IParameterResponse[];

        const parametersAdapted = parameterToEntity(parametersCasted);
        return { id, messageCode, description, name, parameters: parametersAdapted, rules: [], createdAt: new Date(), updatedAt: new Date() };
   


    } catch (error) {
        console.error(error);
        return { message: 'Internal server error', code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500 };
    }
}

export { findSchema };