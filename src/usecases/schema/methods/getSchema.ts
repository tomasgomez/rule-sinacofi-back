import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchema } from "../../../entities/schema/schema";
import { ISchemaUsecase } from "../usecase";



const getSchema = async(context: ISchemaUsecase, request: IRequest<IOptionalSchema, any>): Promise < ISchema | InternalError > => {

    // check if request has filters and if is empty set a default value
    const select = { 
        messageCode: true, 
        description: true, 
        name: true, 
        createdAt: true, 
        updatedAt: true, 
        rules: {select: { 
            name: true,
            // description: true,
            // createdAt: true,
            // updatedAt: true,
            condition: true,
            value: true,
            // type: true,
            priority: true, 
        }},
        parameters: {
            select:{ 
            name: true, 
            schemaName: true, 
            label: true, 
            type: true, 
            placeholder: true, 
            description: true, 
            priority: true, 
            rules: {select :{
                name: true,
                // description: true,
                condition: true,
                value: true,
                // type: true,
                priority: true,
            }}, 
            row: true, 
            column: true, 
            defaultValue: true,
            optionValues:{select: {
                optionValue: { select: {
                    // name: true,  
                    // type: true,
                    // description: true,
                    value: true,
                    label: true,       
                }}
            }}
         }}
    };
    
    // set filters
   
    return  await context.repository.findSchema(request.data, select);
    
};

export { getSchema };