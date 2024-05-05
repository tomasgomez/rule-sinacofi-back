import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchema } from "../../../entities/schema/schema";
import { ISchemaSelect } from "../../../repository/schema/entities/schema";
import { createFindSchemaSelect } from "../../../repository/schema/select/findSchema";
import { ISchemaUsecase } from "../usecase";



const getSchema = async(context: ISchemaUsecase, request: IRequest<IOptionalSchema, any>): Promise < ISchema | InternalError > => {

    // check if request has filters and if is empty set a default value
    // define select Filter
    const select: ISchemaSelect = createFindSchemaSelect(
        ['id', 'messageCode', 'description', 'name', 'createdAt', 'updatedAt', 'parameters', 'rules'] as const,
        ['name', 'messageCode', 'label', 'type', 'placeholder', 'priority', 'row', 'column', 'defaultValue', 'rules', 'optionValues'] as const,
        ['name', 'condition', 'type', 'value'] as const,
        ['value', 'label'] as const
    )
    return  await context.repository.findSchema(request.data, select);
    
};

export { getSchema };