import { ErrorCode, InternalError } from "../../../entities/internalError";
import { OptionalSchema, Schema, SchemaFilter } from "../../../entities/schema/interface";
import { ISchemaRepository } from "../interface";

/**
 * Find a message by its attributes
 * @param context ISchemaRepository
 * @param messageSchema MessageSchema
 * @param count string
 * @param offset string
 * @returns Promise < MessageSchema[] | Error >
 */
 const findSchemaTypes = async(context: ISchemaRepository, schema: OptionalSchema, count: number | undefined, offset: number | undefined, select: SchemaFilter): Promise <{ schemas: Schema[], total: number } | InternalError >  => {
    try {
        
        const client = context.repository.getClient();
        
        /* Initialize the where object with the possible attributes to search with if schema is empty return all schemas */
        const where = !schema.messageCode ? undefined : { messageCode: schema.messageCode }; 

        /* If count is not present then find all message */
        if (count === 0) count = undefined;
        if (offset === 0) offset = undefined;

        const schemasFetched = await client.schema.findMany({ where, select, take: count, skip: offset });
        const total = await client.schema.count({ where });

        /* If the messages is not found, return an error */
        if (schemasFetched.length === 0) {
            console.error('Message not found');
            return {message: 'Message not found', code: ErrorCode.NOT_FOUND, data: undefined, statusCode: 404};
        }

        // Map the fetched messages to the Message entity
        const schemas: Schema[] = schemasFetched.map((response: any) => {
            const s: Schema = { id: response.id, messageCode: response.messageCode, description: response.description, name: response.name, createdAt: response.createdAt, updatedAt: response.updatedAt, parameters: [], rules: [] };
            return s;
        });
    
        return { schemas, total };

    } catch (error: any) {
        console.error(error);
        return { message: 'Internal Server Error', code: ErrorCode.INTERNAL_SERVER_ERROR, data: error, statusCode: 500 };
    }
}

export { findSchemaTypes };