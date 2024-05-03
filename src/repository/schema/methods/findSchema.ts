import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IOptionValue } from "../../../entities/paremeters/interface";
import { Parameter } from "../../../entities/paremeters/parameter";
import { Rule } from "../../../entities/rule/rule";
import { IOptionalSchema, ISchema, Schema } from "../../../entities/schema/schema";
import { ISchemaRepository } from "../interface";



const findSchema = async(context: ISchemaRepository, schema: IOptionalSchema, select: any): Promise < ISchema | InternalError >  => {
    try {
        
        const client = context.repository.getClient();
        
        /* Initialize the where object with the possible attributes to search with if schema is empty return all schemas */
        const where = { messageCode: schema.messageCode }

    
        const schemaFetched: any = await client.schema.findUnique({ where: where, include: { parameters: { include: {optionValues: true, rules: true }} } });
        
        /* If the schema is not found, return an error */
        if (!schemaFetched) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }

        // parameters
        const parametersAdapted: any[] = schemaFetched.parameters.map((parameter:any) => {
            const { name, schemaName, label, type, placeholder, description, priority, rules, row, column, defaultValue, optionValues } = parameter;
                const rulesAdapted = rules.map((rule: any) => new Rule(rule.id, rule.name,rule.type,rule.description,rule.condition,rule.value,rule.priority,rule.createdAt,rule.updatedAt));
                const optionValuesAdapted = optionValues.map((optionValue: any) => {
                const opt: IOptionValue  = {
                    name: optionValue.name,
                    type: optionValue.type,
                    description: optionValue.description,
                    value: optionValue.value,
                    label: optionValue.label,
                    createdAt: optionValue.createdAt,
                    updatedAt: optionValue.updatedAt   
                }
                return opt;
            })

            return new Parameter(parameter.id, name, schemaName, label, type, placeholder, description, priority, parameter.createdAt, parameter.updatedAt, rulesAdapted, optionValuesAdapted, row, column, defaultValue);
        })


        
        return new Schema(schemaFetched.id, schemaFetched.messageCode, schemaFetched.description, schemaFetched.name, schemaFetched.createdAt, schemaFetched.updatedAt, parametersAdapted, []);


    } catch (error: any) {
        console.error(error);
        return new InternalError('Internal Server Error', ErrorCode.INTERNAL_SERVER_ERROR, error, 500);
    }
}

export { findSchema };