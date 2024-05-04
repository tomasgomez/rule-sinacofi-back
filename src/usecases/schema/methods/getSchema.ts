import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError } from "../../../entities/internalError";
import { IOptionalSchema, ISchema } from "../../../entities/schema/schema";
import { ISchemaUsecase } from "../usecase";



const getSchema = async(context: ISchemaUsecase, request: IRequest<IOptionalSchema, any>): Promise < ISchema | InternalError > => {

    // check if request has filters and if is empty set a default value
    const select = {
        id: true,
        messageCode: true,
        description: true,
        name: true,
        parameters: {
            select: {
                name: true,
                messageCode: true, 
                label: true, 
                type: true, 
                placeholder: true, 
                priority: true,
                row: true, 
                column: true, 
                defaultValue: true,
                rules: {
                    select: {
                        rule: {
                            select: {
                                name: true,
                                condition: true,
                                type: true,
                                value: true,
                            }
                        }
                    }
                },
                optionValues: {
                    select: {
                        optionValue: {
                            select: {
                                value: true,
                                label: true,
                            }
                         }
                    }
                },
            },
        } 
    };
    
    // set filters
   
    return  await context.repository.findSchema(request.data, select);
    
};

export { getSchema };