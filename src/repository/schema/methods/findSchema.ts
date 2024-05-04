import { Prisma } from "@prisma/client";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IOptionValue, IParameter } from "../../../entities/paremeters/interface";
import { Rule } from "../../../entities/rule/rule";
import { IOptionalSchema, ISchema, Schema } from "../../../entities/schema/schema";
import { ISchemaRepository } from "../interface";
import { IRule } from "../../../entities/rule/interface";

const findSchema = async(context: ISchemaRepository, schema: IOptionalSchema, select: Prisma.SchemaSelect): Promise < ISchema | InternalError >  => {
    

    try {
        
        const client = context.repository.getClient();
        
        /* Initialize the where object with the possible attributes to search with if schema is empty return all schemas */
        const where: Prisma.SchemaWhereUniqueInput = { messageCode: schema.messageCode }
        const schemaFetched = await client.schema.findUnique({ where, select });

        /* If the schema is not found, return an error */
        if (!schemaFetched) {
            console.error('Message not found');
            return new InternalError('Message not found', ErrorCode.NOT_FOUND, undefined, 404);
        }
        const { id, messageCode, description, name, createdAt, updatedAt, parameters } = schemaFetched;
        // parameters
        const parametersAdapted: IParameter[] = parameters.map((parameter: any) => {
            const { id, name, messageCode, label, type, placeholder, description, priority, createdAt, updatedAt, rules, row, column, defaultValue, optionValues } = parameter;
                const rulesAdapted = rules?.map((r: any) => {
                    const rule: IRule = r.rule;
                    new Rule(rule.id, rule.name,rule.type,rule.description,rule.condition,rule.value,rule.priority,rule.createdAt,rule.updatedAt)
                });
                const optionValuesAdapted = optionValues?.map((values: any) => {
                    const optionValue = values.optionValue;
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

            const r: IParameter = {id, name, messageCode, label, type, placeholder, description, priority, rules: rulesAdapted, optionValues: optionValuesAdapted, row, column, defaultValue, createdAt, updatedAt};
            return r;
        })

        return new Schema(id, messageCode, description, name, new Date(), new Date(), parametersAdapted, []);


    } catch (error: any) {
        console.error(error);
        return new InternalError('Internal Server Error', ErrorCode.INTERNAL_SERVER_ERROR, error, 500);
    }
}

export { findSchema };