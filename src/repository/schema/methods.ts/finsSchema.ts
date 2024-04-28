import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IParameter } from "../../../entities/paremeters/interface";
import { Parameter } from "../../../entities/paremeters/parameter";
import { IRule } from "../../../entities/rule/interface";
import { IOptionalSchema, ISchema, ISchemaFilter, Schema } from "../../../entities/schema/schema";
import { ISchemaRepository } from "../interface";



const findSchema = async(context: ISchemaRepository, schema: IOptionalSchema, select: any): Promise < ISchema | InternalError >  => {
    try {
        
        const client = context.repository.getClient();
        
        /* Initialize the where object with the possible attributes to search with if schema is empty return all schemas */
        const where = { messageCode: schema.messageCode }

    
        const schemaFetched = await client.schema.findUnique({ where, select });
        
        /* If the schema is not found, return an error */
        if (!schemaFetched) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }

        const parmeters: IParameter[] = schemaFetched.parameters.map((parameter) => {
            // const rules = parameter.rules?.map((rule: any) => {});
            return new Parameter(
            parameter.id, 
            parameter.name,
            parameter.schemaName,
            parameter.label,
            parameter.type,
            parameter.placeholder,
            parameter.description,
            parameter.priority,
            parameter.createdAt,
            parameter.updatedAt,
            [],
            [],
            parameter.row? parameter.row : 3,
            parameter.column? parameter.column : 1,
            parameter.defaultValue? parameter.defaultValue : ''
            );
        });
        // todo: add rules
        const rules: IRule[] = [];

        const result = new Schema(schemaFetched.id, schemaFetched.messageCode, schemaFetched.description, schemaFetched.name, schemaFetched.createdAt, schemaFetched.updatedAt, parmeters , rules);

        return result;


    } catch (error: any) {
        console.error(error);
        return new InternalError('Internal Server Error', ErrorCode.INTERNAL_SERVER_ERROR, error, 500);
    }
}

export { findSchema };