import { Prisma } from "@prisma/client";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError } from "../../../entities/internalError";
import { OptionalSchema, Schema } from "../../../entities/schema/interface";
import { ISchemaSelect } from "../../../repository/schema/entities/schema";
import { createFindSchemaSelect, selectValues } from "../../../repository/schema/select/findSchema";
import { ISchemaUsecase } from "../usecase";



const getSchema = async(context: ISchemaUsecase, request: IRequest<OptionalSchema, any>): Promise < Schema | InternalError > => {

    // set values retrieves
    const schemaSelectParams = ['id', 'messageCode', 'description', 'name', 'createdAt', 'updatedAt', 'parameters', 'rules'];
    const parametersSelectParams = ['name', 'messageCode', 'label', 'type', 'placeholder', 'priority', 'row', 'column', 'defaultValue', 'rules', 'optionValues'];
    const ruleSelectParams= ['name', 'condition', 'type', 'value', 'category'];
    const optionValuesSelectParams = ['value', 'label'];
    const actionSelectParams = ['name', 'type', 'value', 'priority', 'category', 'action'];

    // define select Filter
    const select: ISchemaSelect = selectValues(schemaSelectParams, parametersSelectParams, ruleSelectParams, optionValuesSelectParams,actionSelectParams);
    return  await context.repository.findSchema(request.data, select);
    
};

export { getSchema };