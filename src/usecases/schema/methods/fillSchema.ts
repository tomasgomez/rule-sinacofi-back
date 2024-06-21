import { actionCategory, ActionCategory } from "../../../entities/actions/actionCategory";
import { actionType } from "../../../entities/actions/actionTypes";
import { fillParameterWithMsg } from "../../../entities/actions/actions/fillParameter";
import { fillParameterWithUser } from "../../../entities/actions/actions/fillUser";
import { ActionInput, executeAction } from "../../../entities/actions/interface";
import { FilledParametersRequest } from "../../../entities/calls/filledSchemaRequest";
import { IRequest } from "../../../entities/calls/pagination/interface";
import { InternalError, isInternalError } from "../../../entities/internalError";
import { MessageParameter, Parameter } from "../../../entities/paremeters/interface";
import { OptionalSchema, Schema } from "../../../entities/schema/interface";
import { User } from "../../../entities/user/interface";
import { ISchemaUsecase } from "../usecase";



const fillSchema = async(context: ISchemaUsecase, request: IRequest<FilledParametersRequest, any>): Promise < Schema | InternalError > => {

    // get Schema
    let findSchemaRequest: IRequest<OptionalSchema, any> = {
        data: request.data.schema,
        count: 1,
        offset: 0,
        filter: undefined
    }

    // Get schema
    let schema = await context.findSchema(findSchemaRequest)

    if (isInternalError(schema)){
        console.log(schema)
        return schema
    }

    const { parameters } = schema;
    
    /* Select all FILL actions */
    const parametersFilled: Parameter[] = parameters.map((param: Parameter | MessageParameter) => {

        /* Cast parameter to Parameter */
        let paramCasted = param as Parameter

        /* get FILL actions */
        const fillActions = paramCasted.actions?.filter(action => action.category === actionCategory.FILL)

        /* Execute all FILL actions*/
        fillActions?.forEach((action) => {

            /* Execute action */
            const parameterFilled = executeAction(action, {parameter: paramCasted, messageParameters: request.data.schema.parameters as MessageParameter[], user: request.data.user})
            
            if (isInternalError(parameterFilled)){
                console.log(parameterFilled)
                return parameterFilled
            }

            paramCasted = parameterFilled as Parameter;
        });
        return paramCasted
    })
    schema.parameters = parametersFilled;


    return schema
    
};

export { fillSchema };