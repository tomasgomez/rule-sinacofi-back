import { IRequest } from "../../../entities/calls/pagination/interface";
import { ErrorCode, InternalError } from "../../../entities/internalError";
import { IMessage, IMessageParams } from "../../../entities/message/interface";
import { IOptionalSchema } from "../../../entities/schema/schema";
import { IRuleUsecase } from "../usecase";


const validateMessage = async (context: IRuleUsecase ,message: IMessage): Promise < boolean | InternalError > => {

    try {
        // get shcema type
        const request :IRequest<IOptionalSchema, any> = { data: { messageCode: message.messageCode }, count: 1, offset: 0 }
        const schema = await context.schemaUsecase.findSchema(request);
        if(schema instanceof InternalError) {
            console.log("Error getting schemaType")
            return schema;
        }
        const messageErrors: any[] = [];

        // validate parameters of the message
        message.parameters.forEach((parameter: IMessageParams) => {
            const schemaParameter = schema.parameters.find((schemaParameter) => schemaParameter.name === parameter.name);
            if (!schemaParameter) {
                return new InternalError(`Parameter ${parameter.name} not found in schema`, ErrorCode.BAD_REQUEST, null, 400);
            }
            
            // get rules
            const rules = schemaParameter.rules;
            // check the rules
            const ruleErrors = rules?.forEach((rule) => {
                const ruleValidation = context.validateRule(rule, parameter.value);
                if (ruleValidation instanceof InternalError) {
                    messageErrors.push(ruleValidation);
                }
            });
        });

        // check if there are any errors
        if (messageErrors.length > 0) {
            return new InternalError("Error validating message", ErrorCode.VALIDATION_ERROR, messageErrors, 400);
        }

        return true;

    } catch (error) {
        throw new InternalError("Error message validaiton", ErrorCode.INTERNAL_SERVER_ERROR, null, 500)
    }
};

export { validateMessage };