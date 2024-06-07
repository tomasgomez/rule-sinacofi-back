import { IRequest } from "../../../entities/calls/pagination/interface";
import { ErrorCode, InternalError, isInternalError } from "../../../entities/internalError";
import { Message } from "../../../entities/message/interface";
import { MessageParameter } from "../../../entities/paremeters/interface";
import { Rule } from "../../../entities/rule/interface";
import { OptionalSchema } from "../../../entities/schema/interface";
import { IRuleUsecase } from "../usecase";


const validateMessage = async (context: IRuleUsecase ,message: Message): Promise < boolean | InternalError > => {

    try {
        // get shcema type
        const request :IRequest<OptionalSchema, any> = { data: { messageCode: message.messageCode }, count: 1, offset: 0 }
        const schema = await context.schemaUsecase.findSchema(request);
        if (isInternalError(schema)) {
            console.log("Error getting schemaType")
            return schema;
        }
        
        const messageErrors: any[] = [];

        // validate parameters of the message
        message.parameters.forEach((parameter: MessageParameter) => {
            const schemaParameter = schema.parameters.find((schemaParameter) => schemaParameter.name === parameter.name);
            if (!schemaParameter) {
                console.log(`Parameter ${parameter.name} not found in schema`);
                return { message: `Parameter ${parameter.name} not found in schema`, code: ErrorCode.BAD_REQUEST, data: null, status: 400 };
            }
            
            // get rules
            const rules = schemaParameter.rules;
            // check the rules
            rules?.forEach((rule: Rule) => {
                const ruleValidation = context.validateRule(rule, parameter.value);
                if (isInternalError(ruleValidation)) {
                    messageErrors.push(ruleValidation);
                }
            });
        });

        // check if there are any errors
        if (messageErrors.length > 0) {
            console.log("Error validating message")
            return { message: "Error validating message", code: ErrorCode.VALIDATION_ERROR, data: messageErrors, statusCode: 400 };
        }

        return true;

    } catch (error) {
        console.log("Error message validaiton")
        throw { message: "Error message validaiton", code: ErrorCode.INTERNAL_SERVER_ERROR, data: null, statusCode: 500 };
    }
};

export { validateMessage };