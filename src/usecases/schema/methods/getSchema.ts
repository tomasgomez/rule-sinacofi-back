import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchema, ISchemaFilter } from "../../../entities/schema/schema";
import { ISchemaUsecase } from "../usecase";



const getSchema = async(context: ISchemaUsecase, request: IRequest<IOptionalSchema, any>): Promise < ISchema | InternalError > => {

    // check if request has filters and if is empty set a default value
    const select = { 
        messageCode: true, 
        description: true, 
        name: true, 
        rules: {
          select: { 
            name: true,
            condition: true,
            type: true,
            value: true,
          }
        },
        parameters: {
          select: {
            name: true,  // Corrected, was select
            messageCode: true, 
            label: true, 
            type: true, 
            placeholder: true, 
            priority: true,
            rules: {
              select: {
                name: true,
                condition: true,
                type: true,
                value: true,
              }
            }, 
            row: true, 
            column: true, 
            defaultValue: true,
            optionValues: {
              select: {
                value: true,
                label: true,
              }
            }
          }
        }
      };
      
    
    // set filters
   
    return  await context.repository.findSchema(request.data, select);
    
};

export { getSchema };