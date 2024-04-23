import {
    PrismaWrapper
} from '../prismaWrapper';

import {
    MessageSchema
} from '../../entities/schema/messageSchema';

import {
    InternalError,
} from '../../entities/internalError/error';

import {
    ErrorCode
} from '../../entities/internalError/errorCode';

/**
 * Find a message by its attributes
 * @param repository PrismaWrapper
 * @param messageSchema MessageSchema
 * @param count string
 * @param offset string
 * @returns Promise < MessageSchema[] | Error >
 */
export async function find(repository: PrismaWrapper, messageSchema: MessageSchema, count: string, offset: string): Promise < MessageSchema[] | InternalError > {
    try {
        let schemas: MessageSchema[] = [];

        const client = repository.getClient();

        /* Desctructure the attributes from Message entity */
        const {
            id,
            messageCode,
        } = messageSchema;

        /* Initialize the where object with the possible attributes to search with */
        const where: {
            id ? : string;
            messageCode ? : string;
        } = {};

        /* If the attributes are present, add them to the where object */
        if (id) where.id = id;
        if (messageCode) where.messageCode = messageCode;

        let select = {
            id: true,
            messageCode: true,
            description: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            parameters: false
        };

        let schemasFetched = [];

        /* If count is not present then find all message */
        if (count === '0' || count === '') {
            schemasFetched = await client.schema.findMany({
                where,
                select
            });
        } else {
            schemasFetched = await client.schema.findMany({
                where,
                select,
                take: parseInt(count),
                skip: parseInt(offset)
            });
        }

        /* If the messages is not found, return an error */
        if (schemasFetched.length === 0) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }

        for (let i = 0; i < schemasFetched.length; i++) {
            const {
                id,
                messageCode,
                description,
                name,
                createdAt,
                updatedAt
            } = schemasFetched[i];

            schemas.push(new MessageSchema(id, messageCode, description, name, createdAt, updatedAt));
        }

        return schemas;

    } catch (error: any) {
        console.error(error);
        return new InternalError('Internal Server Error', ErrorCode.INTERNAL_SERVER_ERROR, error, 500);
    }
}