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
    let schema = await context.findSchema(findSchemaRequest)

    if (isInternalError(schema)){
        console.log(schema)
        return schema
    }

    // fill values
    /* Select all FILL actions */
    const { parameters } = schema;
    const parametersFilled: Parameter[] = parameters.map((param: Parameter | MessageParameter) => {
        let paramCasted = param as Parameter
        // get FILL actions
        const fillActions = paramCasted.actions?.filter(action => action.category === actionCategory.FILL)
        fillActions?.forEach((action) => {
            const parameterFilled = executeAction(action, {parameter: paramCasted, messageParameters: request.data.schema.parameters as MessageParameter[], user: request.data.user})
            if (isInternalError(parameterFilled)){
                console.log(parameterFilled)
                return parameterFilled
            }

            paramCasted = parameterFilled as Parameter;
        });
        return paramCasted
    })

    console.log(request.data.schema.parameters)
    return schema
    
};

export { fillSchema };