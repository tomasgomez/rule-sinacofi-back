import { Prisma } from "@prisma/client";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IOptionValue, IParameter } from "../../../entities/paremeters/interface";
import { Rule } from "../../../entities/rule/rule";
import { IOptionalSchema, ISchema, Schema } from "../../../entities/schema/schema";
import { IRule } from "../../../entities/rule/interface";
import { ISchemaRepository } from "../interface";
import { ISchemaArgs, ISchemaResponse, ISchemaSelect } from "../entities/schema";
import { IParameterResponse } from "../entities/parameter";
import { IRuleResponse } from "../entities/rule";
import { IParamterRuleResponse } from "../entities/manyToMany";
import { parameterToEntity } from "../adapters/parameterToEntity";

const findSchema = async(context: ISchemaRepository, schema: IOptionalSchema, select: ISchemaSelect): Promise < ISchema | InternalError >  => {
    
    try { 
        const client = context.repository.getClient();
        
        /* Initialize the where object with the possible attributes to search with if schema is empty return all schemas */
        const where: Prisma.SchemaWhereUniqueInput = { messageCode: schema.messageCode }
        
        const query: ISchemaArgs <Prisma.SchemaFindUniqueArgs>= { where, select };
        const schemaFetched: ISchemaResponse<Prisma.SchemaFindUniqueArgs> | null = await client.schema.findUnique(query);

        /* If the schema is not found, return an error */
        if (!schemaFetched) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }
        
        const { id, messageCode, description, name, parameters } = schemaFetched;

        // check values
        if (!id || !messageCode || !description || !name || !parameters) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }

        // check type of values
        if (typeof id !== 'string' || typeof messageCode !== 'string' || typeof description !== 'string' || typeof name !== 'string' || !Array.isArray(parameters)) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }

        // check if parameters is empty
        if (parameters.length === 0) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }

        // cast parameters to IParameterResponse and check if all values are present
        const parametersCasted = parameters as IParameterResponse[];

        const parametersAdapted = parameterToEntity(parametersCasted);

        return new Schema(id, messageCode, description, name, new Date(), new Date(), parametersAdapted, []);


    } catch (error: any) {
        console.error(error);
        return new InternalError('Internal Server Error', ErrorCode.INTERNAL_SERVER_ERROR, error, 500);
    }
}

export { findSchema };