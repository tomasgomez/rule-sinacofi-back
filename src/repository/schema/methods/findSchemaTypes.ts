import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter, Schema } from "../../../entities/schema/schema";
import { ISchemaRepository } from "../entities/repository";

/**
 * Find a message by its attributes
 * @param context ISchemaRepository
 * @param messageSchema MessageSchema
 * @param count string
 * @param offset string
 * @returns Promise < MessageSchema[] | Error >
 */
 const findSchemaTypes = async(context: ISchemaRepository, schema: IOptionalSchema, count: number | undefined, offset: number | undefined, select: ISchemaFilter): Promise <{ schemas: ISchema[], total: number } | InternalError >  => {
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
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }

        // Map the fetched messages to the Message entity
        const schemas: ISchema[] = schemasFetched.map((response: any) => new Schema(response.id, response.messageCode, response.description, response.name, response.createdAt, response.updatedAt, [], []));

        return { schemas, total };

    } catch (error: any) {
        console.error(error);
        return new InternalError('Internal Server Error', ErrorCode.INTERNAL_SERVER_ERROR, error, 500);
    }
}

export { findSchemaTypes };