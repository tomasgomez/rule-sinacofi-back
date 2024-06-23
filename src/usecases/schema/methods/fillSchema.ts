import { actionCategory, ActionCategory } from "../../../entities/actions/actionCategory";
import { actionType } from "../../../entities/actions/actionTypes";
import { fillParameterWithMsg } from "../../../entities/actions/actions/fillParameter";
import { fillParameterWithUser } from "../../../entities/actions/actions/fillUser";
import { Action, ActionInput, executeAction } from "../../../entities/actions/interface";
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
        return schema
    }

    const { parameters } = schema;
    
    /* Select all FILL actions */
    parameters.forEach((param: Parameter | MessageParameter) => {

        /* Cast parameter to Parameter */
        let paramCasted = param as Parameter

        /* get FILL actions */
        const fillActions = paramCasted.actions?.filter(action => action.category === actionCategory.FILL)

        /* Execute all FILL actions*/
        fillActions?.forEach((action) => {

            /* Execute action */
            const parameterFilled = executeAction(action, {parameter: paramCasted, messageParameters: request.data.schema.parameters as MessageParameter[], user: request.data.user})
            
            if (isInternalError(parameterFilled)){
                return parameterFilled
            }

            paramCasted = parameterFilled as Parameter;
        });
        return paramCasted
    })

    /* Map actions from */
    const actionsRequired = request.data.schema.allowedActions;

    // validate the schema actions
    actionsRequired?.forEach((action) => {
        const actionToBeApplied = schema.allowedActions?.filter(a => a.name == action.name && a.category == actionCategory.FILL) as Action[];
        actionToBeApplied.forEach(act => {
            let schemaUpdated = executeAction(act, {schema: schema}) 
            if (isInternalError(schemaUpdated)){
                return schemaUpdated
            }
        })

    });

    // filter actions
    let allowedActionsFiltered: Action[]= []
    schema.allowedActions.forEach((action) => {
        const actionCasted = action as Action;
        actionsRequired?.forEach(r => {
            if (r.name == action.name || r.category !== actionCategory.FILL) {
                allowedActionsFiltered.push(actionCasted)
            }
        })
    })
    if (allowedActionsFiltered){
        schema.allowedActions = allowedActionsFiltered;
    }



    return schema
    
};

export { fillSchema };